import * as React from 'react';

import styles from './styles.module.scss';


export default function Container({ children, className, ...props }) {
    const stylesStr = [ styles.container ];
    if (className) stylesStr.push(className);

    return (
        <div className={ stylesStr.join(' ') } { ...props } >
            { children }
        </div>
    );
}