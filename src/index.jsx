import 'react-hot-loader';
import '@babel/polyfill'; // Need for async/await
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { configure as mobxConfigure } from 'mobx';
import App from './App';

import 'index.scss';

mobxConfigure({
    enforceActions: 'always', // Changing data only inside actions wrapped by @action
});


ReactDOM.render(
    <App />,
    document.getElementById('root'),
);

/*
 // Register service workers
 if (navigator.serviceWorker) {
 window.addEventListener('load', () => {
 navigator.serviceWorker
 .register('/sw_cached_site.js?version=1.1')
 .then(reg => console.log('Service Worker: Registered (Caching site)'))
 .catch(err => console.log(`Service Worker: Error: ${err}`));
 });
 }*/
