import * as React from 'react';
import { observer } from 'mobx-react';

import styles from './styles.module.scss';


const FormServerErrors = observer(({ msg = '' }) => {
    if (!msg) return null;

    return (
        <div className={ styles.serverErrorsContainer }>
            <div className={ styles.msg }>{ msg }</div>
        </div>
    );
});


export default FormServerErrors;