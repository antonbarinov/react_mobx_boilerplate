import React from 'react';
import { observer } from 'mobx-react';

import styles from './styles.module.scss';


export default function Container({ children, ...props }, ref) {
    return (
        <div className={ styles.container } ref={ ref } { ...props } >
            { children }
        </div>
    );
}

Container = observer(React.forwardRef(Container));
