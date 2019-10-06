import { useState } from 'react';

class ReactFunctionalComponentState {}

/**
 * @returns {ReactFunctionalComponentState}
 */
export const useLocalState = () => {
    const [state] = useState(() => new ReactFunctionalComponentState());

    return state;
};
