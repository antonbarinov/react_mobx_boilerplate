import * as React from 'react';
import { observer } from 'mobx-react';
import { BaseComponent } from 'components/BaseComponent';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';


@observer
export default class FormServerErrors extends BaseComponent {
    render() {
        const { msg } = this.props;
        if (!msg) return null;

        return (
            <div className={ styles.serverErrorsContainer }>
                <div className={ styles.msg }>{ msg }</div>
            </div>
        );
    }
}

FormServerErrors.propTypes = {
    msg: PropTypes.string,
};
