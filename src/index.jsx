import '@babel/polyfill'; // Need for async/await

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as mobx from 'mobx';

mobx.configure({
    reactionScheduler: (f) => {
        setTimeout(f, 0);
    }
});

import App from './App';

import './index.css';


ReactDOM.render(
    <App />,
    document.getElementById('root'),
);
