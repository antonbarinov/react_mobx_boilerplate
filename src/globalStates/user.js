import { observable } from 'mobx';
import * as React from 'react';
import apiRequest from 'lib/apiRequest';
import { helperRedirect } from 'helpers/redirect';

class State {
    @observable user = false;

    async me() {
        const data = await new apiRequest('GET /me').send();
        this.user = data;
    }

    logout() {
        window.localStorage.removeItem('accessToken');
        this.user = false;
        helperRedirect('/login');
    }

    async login(data) {
        const res = await new apiRequest('POST /login', false).sendJSON(data);
        if (res.accessToken && res.user) {
            this.user = res.user;
            window.localStorage.setItem('accessToken', res.accessToken);
        }
        // Something wrong here
        else {
            throw new Error(`Unexpected server authorization error`);
        }


        return true;
    }

    async signup(data) {
        const res = await new apiRequest('POST /signup', false).sendJSON(data);
        if (res.accessToken && res.user) {
            this.user = res.user;
            window.localStorage.setItem('accessToken', res.accessToken);
        }
        // Something wrong here
        else {
            throw new Error(`Unexpected server registration error`);
        }


        return true;
    }
}

export default new State();
