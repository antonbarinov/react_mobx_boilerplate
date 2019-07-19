import * as React from 'react';
import { observer } from 'mobx-react';

import styles from './styles.module.scss';

const Container = observer(({ children, className, ...props }) => {
    const stylesStr = [ styles.container ];
    if (className) stylesStr.push(className);

    return (
        <div className={ stylesStr.join(' ') } { ...props } >
            { children }
        </div>
    );
});

export default Container;