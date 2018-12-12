import { fetch } from 'whatwg-fetch';
import userState from 'globalStates/user';


const API_BASE_URL = 'http://localhost:3001';

class apiRequest {
    __unifyErrorsHandler = true;
    __method = 'GET';
    __url = '/';
    __options = {
        credentials: 'include',
        headers: {},
    };
    __data = null;

    constructor(url = 'GET /', unifyErrorsHandler = true) {
        this.__unifyErrorsHandler = unifyErrorsHandler;
        const spaceIndex = url.indexOf(' ');
        this.__method = url.substr(0, spaceIndex).trim().toUpperCase();
        this.__url = url.substr(spaceIndex + 1).trim();
    }

    qs(params = {}) {
        const esc = encodeURIComponent;
        const query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');

        this.__url += (this.__url.indexOf('?') === -1 ? '?' : '&') + query;

        return this;
    }

    options (options = {}) {
        this.__options = {
            ...this.options,
            ...options
        };

        return this;
    }

    async __send() {
        let options = {
            ...this.__options,
            method: this.__method
        };
        if (this.__data !== null) options.body = this.__data;

        const userAccessToken = getUserAccessToken();
        if (userAccessToken) options.headers['Authorization'] = userAccessToken;

        let baseUrl = window.API_BASE_URL || API_BASE_URL;
        const url = baseUrl + this.__url;

        let response;

        response = await fetch(url, options);

        if (response.status >= 200 && response.status < 300) {
            let resp = await response.json(); // we have JSON api
            if (resp.data) resp = resp.data;
            return resp;
        }
        else if (response.status === 401) {
            userState.logout();
        }
        else {
            const resp = await response.json();
            const msg = resp.message || response.statusText;

            let error = new Error(msg);
            error.response = response;

            if (!this.__unifyErrorsHandler) throw error;

            console.error(error);
            // Any default error catching behavior

            throw error;
        }
    }

    async sendJSON(data = {}) {
        this.__data = JSON.stringify(data);

        this.__options.headers = {
            'Content-Type': 'application/json'
        };

        return this.__send();
    }

    async send(data = null) {
        this.__data = data;

        return this.__send();
    }
}

function getUserAccessToken() {
    return window.localStorage.getItem('accessToken');
}



export default apiRequest;