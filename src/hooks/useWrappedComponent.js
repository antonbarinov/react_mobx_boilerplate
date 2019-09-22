import React, { useState } from 'react';
import { observer } from 'mobx-react';

/**
 * Wrap react functional components inside function to save context and don't loose optimisations
 * @param {*} Component
 * @returns {*} Component
 */
export default function useWrappedComponent(Component) {
    const [ c ] = useState(() => observer(Component));
    return c;
}