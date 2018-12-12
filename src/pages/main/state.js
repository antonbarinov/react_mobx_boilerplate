import { observable } from 'mobx';

class State {
    @observable time = new Date().toISOString();

    constructor() {
        setInterval(() => {
            this.time = new Date().toISOString();
        }, 1000);
    }
}

export default new State();
