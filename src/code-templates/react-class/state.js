import { observable } from 'mobx';

class State {
    @observable timer = 0;

    constructor() {
        this.timer = 1;

        setInterval(() => {
            this.timer++;
        }, 1000);
    }

    resetTimer() {
        this.timer = 0;
    }
}

export default new State();
