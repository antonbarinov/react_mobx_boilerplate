import { observable } from 'mobx';
import * as React from 'react';

class State {
    @observable validationFields = {
        login: { msg: false, ref: React.createRef() },
        password: { msg: false, ref: React.createRef() },
    };

    @observable serverError = null;

    reset() {
        this.validationFields = {
            login: { msg: false, ref: React.createRef() },
            password: { msg: false, ref: React.createRef() },
        };
        this.serverError = null;
    }
}

export default new State();
