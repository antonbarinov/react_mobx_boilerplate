import * as React from 'react';
import { observer } from 'mobx-react';
import { BaseComponent } from 'components/BaseComponent';

import styles from './styles.module.scss';

@observer
export default class LoadingAnimation extends BaseComponent {
    render() {
        return (
            <div className={ styles.lds_ellipsis }>
                <div />
                <div />
                <div />
                <div />
            </div>
        );
    }
}
