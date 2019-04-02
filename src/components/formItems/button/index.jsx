import * as React from 'react';

import styles from './styles.module.scss';


function FormButton({ innerRef, ...props }) {
    return (
        <div className={ styles.button } { ...props } ref={ innerRef }>
            { props.children }
        </div>
    );
}


export default React.forwardRef((props, ref) => <FormButton innerRef={ ref } { ...props } />);