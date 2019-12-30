import * as React from 'react';
import { observer } from 'mobx-react';
import { EnhancedComponent } from 'components/EnhancedComponent';

import styles from './styles.module.scss';

@observer
export default class LoadingAnimation extends EnhancedComponent {
    render() {
        return (
            <div className={styles.lds_ellipsis}>
                <div />
                <div />
                <div />
                <div />
            </div>
        );
    }
}
