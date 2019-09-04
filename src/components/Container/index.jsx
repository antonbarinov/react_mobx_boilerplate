import * as React from 'react';
import { observer } from 'mobx-react';
import { BaseComponent } from 'components/BaseComponent';

import styles from './styles.module.scss';


@observer
export default class Container extends BaseComponent {
    render() {
        const { children, innerRef, ...props } = this.props;

        return (
            <div className={ styles.container } ref={ innerRef } { ...props } >
                { children }
            </div>
        );
    }
}
