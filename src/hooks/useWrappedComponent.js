import { useState } from 'react';
import { observer } from 'mobx-react';

/**
 * Wrap react functional components inside function to save context and don't loose optimisations
 * @param {function} component
 * @returns component
 */
export default function useWrappedComponent(component) {
    const [ c ] = useState(() => observer(component));
    return c;
}