import "@babel/polyfill"; // Need for async/await

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import userState from 'globalStates/user';

import App from './App';


(async () => {
    await userState.me().catch(console.error); // Fetch user data / check for authorization

    ReactDOM.render(
        <Router>
            <App/>
        </Router>,
        document.getElementById('root')
    );
})();
