import { action, observable } from 'mobx';
import { useState } from 'react';

class MainPageState {
    @observable time = new Date().toISOString();
    @observable title = 'Main page';

    @action
    handleTitleChange = (e) => {
        this.title = e.target.value;
    };
}

/**
 * @returns {MainPageState}
 */
export const useLocalState = () => {
    const [state] = useState(() => new MainPageState());

    return state;
};
