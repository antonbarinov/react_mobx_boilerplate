const fse = require('fs-extra');
const env = process.env.NODE_ENV || 'development';

fse.copy('./assets', './dist/assets', err => {
    if (err) return console.error(err);
    console.log('assets copied success!')
});

const file = env === 'development' ? './index.html' : './index.production.html';

fse.copy(file, './dist/index.html', err => {
    if (err) return console.error(err);
    console.log('index.html copied success!')
});

const prodFiles = [
    './node_modules/react/umd/react.production.min.js',
    './node_modules/react-dom/umd/react-dom.production.min.js',
    './node_modules/mobx/lib/mobx.umd.min.js'
];

const devFiles = [
    './node_modules/react/umd/react.development.js',
    './node_modules/react-dom/umd/react-dom.development.js',
    './node_modules/mobx/lib/mobx.umd.min.js'
];

const files = env === 'development' ? devFiles : prodFiles;

for (let f of files) {
    fse.copy(f, './dist/' + f, err => {
        if (err) return console.error(err);
        console.log(f + ' copied success!')
    });
}