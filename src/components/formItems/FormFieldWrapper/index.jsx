import * as React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { BaseComponent } from 'components/BaseComponent';

import styles from './styles.module.scss';

@observer
export default class FormFieldWrapper extends BaseComponent {
    static filterProps = (props) => {
        let result = {};
        for (const key in props) {
            if (!props.hasOwnProperty(key)) continue;

            if (this.propTypes[key] !== undefined) {
                result[key] = props[key];
                delete props[key];
            }
        }

        return result;
    };

    render() {
        const { children, msg, label, field, className } = this.props;
        let classesStr = [styles.container];
        if (className) classesStr.push(className);
        if (msg || (field && field.errorMessage)) classesStr.push(styles.error);

        return (
            <div className={classesStr.join(' ')}>
                {label && <div className={styles.label}>{label}</div>}
                {children}
                <div className={styles.msg}>{msg || (field && field.errorMessage)}</div>
            </div>
        );
    }
}

FormFieldWrapper.propTypes = {
    msg: PropTypes.string,
    label: PropTypes.string,
    field: PropTypes.object,
};
