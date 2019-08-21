import * as React from 'react';
import { observer } from 'mobx-react';
import { BaseComponent } from 'components/BaseComponent';
import PropTypes from 'prop-types';
import { formFieldsUniversalHandleChange, formFieldsUniversalValueParams } from 'helpers/formFields';

import styles from './styles.module.scss';


@observer
export default class FormInput extends BaseComponent {
    static propTypes = {
        innerRef: PropTypes.elementType,
        field: PropTypes.object,
    };

    handleChange = formFieldsUniversalHandleChange.bind(this);

    render() {
        const { innerRef, className, field, ...props } = this.props;
        let classesStr = [ styles.element ];
        if (className) classesStr.push(className);
        if (field && field.errorMessage) classesStr.push(styles.error);

        const universalProps = formFieldsUniversalValueParams(this.props);

        return <input
            ref={ innerRef }
            className={ classesStr.join(' ') }
            onChange={ this.handleChange }
            { ...universalProps }
            { ...props }
        />;
    }
}
