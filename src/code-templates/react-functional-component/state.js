import { useState } from 'react';
import { observable } from 'mobx';

class ReactFunctionalComponentState {

}

/**
 * @returns {ReactFunctionalComponentState}
 */
export const useLocalState = () => {
    const [ state ] = useState(new ReactFunctionalComponentState());

    return state;
};