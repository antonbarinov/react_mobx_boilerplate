import * as React from 'react';
import { observer } from 'mobx-react';

import styles from './styles.module.scss';

const Container = observer(({ children, innerRef, className, ...props }) => {
    const stylesStr = [ styles.container ];
    if (className) stylesStr.push(className);

    return (
        <div className={ stylesStr.join(' ') } ref={ innerRef } { ...props } >
            { children }
        </div>
    );
});

export default React.forwardRef((props, ref) => <Container innerRef={ ref } { ...props } />);
