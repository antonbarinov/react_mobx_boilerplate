import * as React from 'react';
import { observer } from 'mobx-react';

import styles from './styles.module.scss';
import LoadingAnimation from 'components/LoadingAntimation';
import { BaseComponent } from 'components/BaseComponent';

@observer
class FormButton extends BaseComponent {
    getContent = () => {
        const { loading } = this.props;

        if (loading) {
            return (
                <>
                    <span className={styles.animation}><LoadingAnimation /> </span>
                    <span>{ loading }</span>
                </>
            );
        }
        else {
            return this.props.children;
        }
    };

    render() {
        const { innerRef, loading, ...props } = this.props;

        const classes = [ styles.button ];
        if (props.className) classes.push(props.className);
        if (loading) classes.push(styles.loading);

        return (
            <div { ...props } className={ classes.join(' ') } ref={ innerRef }>
                { this.getContent() }
            </div>
        );
    }
}


export default React.forwardRef((props, ref) => <FormButton innerRef={ ref } { ...props } />);
