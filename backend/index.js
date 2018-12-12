const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const app = express();

let users = [];

app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.setHeader('Allow', 'GET,POST,PUT,DELETE,OPTIONS');

    }

    if (req.headers.origin) res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'content-type, authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
    req.user = false;

    if (req.headers.authorization) {
       let user = users.filter(u => req.headers.authorization === u.accessToken);
       user = user.length ? user[0] : false;
       req.user = user;
    }

    next();
});

app.post('/signup', (req, res) => {
    const data = req.body;
    const filtered = users.filter(u => u.login === data.login);
    if (filtered.length) {
        res.status(400);
        res.send({
           status: 'FAIL',
           message: `User with this login already exist`
        });
    } else {
        const accessToken = getRandomHash();
        const user = {
            ...data,
            accessToken
        };

        users.push(user);

        res.send({
            status: 'OK',
            accessToken,
            user,
        });
    }
});

app.post('/login', (req, res) => {
    const data = req.body;
    const filtered = users.filter(u => u.login === data.login && u.password === data.password);
    if (filtered.length) {
        const user = filtered[0];

        res.send({
            status: 'OK',
            accessToken: user.accessToken,
            user,
        });
    } else {
        res.status(400);
        res.send({
            status: 'FAIL',
            message: `Invalid login or password`
        });
    }
});

app.get('/me', authOnlyMiddleware, (req, res) => {
    res.send({
        status: 'OK',
        data: req.user
    });
});


function getRandomHash(algo = 'sha1') {
    const secret = new Date() + Math.random().toString() + Math.random().toString() + Math.random().toString();
    return crypto.createHmac(algo, secret)
        .update(new Date().getTime().toString() + Math.random().toString() + Math.random().toString())
        .digest('hex');
}

function authOnlyMiddleware(req, res, next) {
    if (!req.user) {
        res.status(401);
        res.send({
            status: 'FAIL',
            message: 'Unauthorized'
        });
    } else {
        next();
    }
}


app.listen(3001);