import * as React from 'react';
import { observer } from 'mobx-react';

import styles from './styles.module.scss';


const ReactFunctionalComponent = observer((props) => {
    return (
        <div className={ styles.ComponentName }>
            <h1>Hello world</h1>
        </div>
    );
});


export default ReactFunctionalComponent;
