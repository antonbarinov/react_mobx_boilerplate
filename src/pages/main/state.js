import { observable } from 'mobx';

export default class State {
    @observable time = new Date().toISOString();
    @observable title = 'Main page';

    constructor() {
        setInterval(() => {
            this.time = new Date().toISOString();
        }, 100);
    }

    handleTitleChange = (e) => {
        this.title = e.target.value;
    }
}
