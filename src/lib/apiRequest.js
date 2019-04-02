import axios from 'axios';
import userState from 'globalState/user';


const API_BASE_URL = 'http://localhost:3010';


class apiRequest {
    __unifyErrorsHandler = true;
    __method = 'GET';
    __url = '/';
    __options = {
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

    options(options = {}) {
        this.__options = {
            ...this.options,
            ...options,
        };

        return this;
    }

    async __send() {
        let options = {
            ...this.__options,
            method: this.__method,
        };
        if (this.__data !== null) options.data = this.__data;

        const userAccessToken = getUserAccessToken();
        if (userAccessToken) options.headers['Authorization'] = userAccessToken;

        let baseUrl = window.API_BASE_URL || API_BASE_URL;
        options.url = baseUrl + this.__url;

        let response;

        let error;

        try {
            response = await axios(options);
        } catch (e) {
            error = e;
            response = e.response;
        } finally {

        }

        /**
         * Not authorized
         */
        if (response.status === 401) {
            userState.logout();
        }

        /**
         * Success
         */
        if (response.status >= 200 && response.status < 300) {
            let resp = response.data;

            resp.getData = () => {
                return resp.data || resp.Data;
            };

            return resp;
        }
        /**
         * Errors
         */
        else {
            error.message = (response.data && response.data.message) || error.message;

            if (!this.__unifyErrorsHandler) throw error;

            // Universal error handling here
            console.error(error);

            throw error;
        }
    }

    async sendJSON(data = {}) {
        this.__data = JSON.stringify(data);

        this.__options.headers = {
            'Content-Type': 'application/json',
        };

        return this.__send();
    }

    async send(data = null) {
        this.__data = data;

        return this.__send();
    }
}


export function getUserAccessToken() {
    return window.localStorage.getItem('accessToken');
}


export default apiRequest;