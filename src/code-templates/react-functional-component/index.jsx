import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import styles from './styles.module.scss';

import State from './state';

export default function ReactFunctionalComponent(props) {
    const [ state ] = useState(new State());

    return (
        <div className={ styles.ComponentName }>
            <h1>Hello world</h1>
        </div>
    );
};

ReactFunctionalComponent = observer(ReactFunctionalComponent);
