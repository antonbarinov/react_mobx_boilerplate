import axios from 'axios';
import { observable } from 'mobx';
import userState from 'globalState/user';

/**
 * API BASE URL
 */
let apiUrl = 'http://localhost:3010';

// Environment api path
if (NODE_ENV === 'production') {
    apiUrl = 'http://localhost:3010';
}
else if (NODE_ENV === 'staging') {
    apiUrl = 'http://localhost:3010';
}

window.API_BASE_URL = apiUrl;

export const API_BASE_URL = apiUrl;
/**
 * API BASE URL -- END
 */

function getDataHandler(resp) {
    return () => {
        return resp.data || resp.Data;
    };
}


export default class ApiRequest {
    __unifyErrorsHandler = true;
    __method = 'GET';
    __url = '/';
    __options = {
        headers: {},
    };
    __data = null;
    __onUploadProgress = false;
    __apiReactiveResponse = null;

    constructor(url = 'GET /', unifyErrorsHandler = true) {
        this.__unifyErrorsHandler = unifyErrorsHandler;
        const spaceIndex = url.indexOf(' ');
        this.__method = url.substr(0, spaceIndex).trim().toUpperCase();
        this.__url = url.substr(spaceIndex + 1).trim();

        if (!this.isAbsolute()) this.__url = (window.API_BASE_URL || API_BASE_URL) + this.__url;
    }

    isAbsolute() {
        return this.__url.indexOf('http://') === 0 || this.__url.indexOf('https://') === 0;
    }

    withApiReactiveResponse(apiReactiveResponse) {
        this.__apiReactiveResponse = apiReactiveResponse;

        return this;
    }

    qs(params = {}) {
        const url = new URL(this.__url, window.location.href);
        for (const key in params) {
            if (!params.hasOwnProperty(key)) continue;
            url.searchParams.set(key, params[key]);
        }

        this.__url = url.href;

        return this;
    }

    onUploadProgress(func) {
        this.__onUploadProgress = func;

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

        options.url = this.__url;

        // Upload progress
        options.onUploadProgress = (progressEvent) => {
            let uploadPercentage = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total) + '');
            if (typeof this.__onUploadProgress === 'function') {
                this.__onUploadProgress(uploadPercentage);
            }
        };

        const ar = this.__apiReactiveResponse;

        ar && ar.reset();
        ar && (ar.isFetching = true);

        let response;
        let error;

        try {
            response = await axios(options);
        }
        catch (e) {
            error = e;
            response = e.response;
        }
        finally {

        }

        ar && (ar.response = response);
        if (ar) {
            setTimeout(() => {
                ar.isFetching = false;
                ar.responseDone = true;
            });
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

            resp.getData = getDataHandler(resp);

            return resp;
        }
        /**
         * Errors
         */
        else {
            error.message = (response.data && response.data.message) || error.message;

            ar && (ar.error = true);
            ar && (ar.errorText = error.message);

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

export class ApiReactiveResponse {
    @observable responseDone = false;
    @observable isFetching = false;
    @observable response = null;
    @observable error = false;
    @observable errorText = null;

    reset = () => {
        this.responseDone = false;
        this.error = false;
        this.errorText = null;
    };
}
