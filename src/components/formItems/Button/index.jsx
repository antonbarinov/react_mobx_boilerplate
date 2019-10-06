import * as React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import LoadingAnimation from 'components/LoadingAntimation';
import { BaseComponent } from 'components/BaseComponent';

import styles from './styles.module.scss';

@observer
export default class FormButton extends BaseComponent {
    getContent = () => {
        const { loading } = this.props;

        if (loading) {
            return (
                <>
                    <span className={styles.animation}>
                        <LoadingAnimation />{' '}
                    </span>
                    <span>{loading + ''}</span>
                </>
            );
        } else {
            return this.props.children;
        }
    };

    render() {
        const { innerRef, loading, ...props } = this.props;

        const classes = [styles.button];
        if (props.className) classes.push(props.className);
        if (loading) classes.push(styles.loading);

        return (
            <div {...props} className={classes.join(' ')} ref={innerRef}>
                {this.getContent()}
            </div>
        );
    }
}

FormButton.propTypes = {
    loading: PropTypes.any,
};
