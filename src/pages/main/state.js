import { observable, action } from 'mobx';

export default class MainPageState {
    @observable time = new Date().toISOString();
    @observable title = 'Main page';

    @action
    handleTitleChange = (e) => {
        this.title = e.target.value;
    }
}
