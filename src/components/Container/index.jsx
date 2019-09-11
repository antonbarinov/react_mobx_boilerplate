import React from 'react';
import { observer } from 'mobx-react';

import styles from './styles.module.scss';


export default function Container({ children, innerRef, ...props }) {
    return (
        <div className={ styles.container } ref={ innerRef } { ...props } >
            { children }
        </div>
    );
}

Container = observer(Container);
