import * as React from 'react';
import { observer } from 'mobx-react';
import { BaseComponent } from 'components/BaseComponent';
import PropTypes from 'prop-types';
import {
    formFieldsUniversalHandleChange,
    formFieldsUniversalValueParams,
} from 'helpers/formFields';

import styles from './styles.module.scss';

@observer
export default class FormTextarea extends BaseComponent {
    elem = React.createRef();

    constructor(props) {
        super(props);

        if (props.innerRef) {
            this.elem = props.innerRef;
        }

        this.useEffect(this.computeTextareaHeightEffect, true);
    }

    computeTextareaHeightEffect = () => {
        const el = this.elem.current;
        el.style.height = '';
        el.style.height = el.scrollHeight + 2 + 'px';
    };

    handleChange = formFieldsUniversalHandleChange.bind(this);

    render() {
        const { innerRef, className, field, ...props } = this.props;
        let classesStr = [styles.element];
        if (className) classesStr.push(className);
        if (field && field.errorMessage) classesStr.push(styles.error);

        const universalProps = formFieldsUniversalValueParams(this.props);

        return (
            <textarea
                className={classesStr.join(' ')}
                onChange={this.handleChange}
                {...universalProps}
                {...props}
                ref={this.elem}
            />
        );
    }
}

FormTextarea.propTypes = {
    innerRef: PropTypes.elementType,
    field: PropTypes.object,
};
