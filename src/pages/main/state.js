import { observable } from 'mobx';

export default class State {
    @observable time = new Date().toISOString();
    @observable title = 'Main page';

    handleTitleChange = (e) => {
        this.title = e.target.value;
    }
}
