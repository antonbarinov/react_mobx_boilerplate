import React from 'react';
import { observer } from 'mobx-react';

import styles from './styles.module.scss';

import { useLocalState } from './state';

export default function ReactFunctionalComponent(props) {
    const state = useLocalState();

    return (
        <div className={styles.ComponentName}>
            <h1>Hello world</h1>
        </div>
    );
}

ReactFunctionalComponent = observer(ReactFunctionalComponent);
