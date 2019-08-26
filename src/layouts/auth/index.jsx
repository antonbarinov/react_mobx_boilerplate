import * as React from 'react';
import { observer } from 'mobx-react';
import { BaseComponent } from 'components/BaseComponent';
import { hookHandleInitialFetching } from 'hooks/layouts/hookHandleInitialFetching';
import OfflineOverlay from 'components/OfflineOverlay';

import styles from './styles.module.scss';


@observer
export default class AuthLayout extends BaseComponent {
    constructor(props) {
        super(props);

        this.useEffect(hookHandleInitialFetching);
    }

    render() {
        return (
            <span>
                <OfflineOverlay />
                <div className={ styles.wrap }>
                    <div className={ styles.content_holder }>
                        <div>
                            { this.props.children }
                        </div>
                    </div>
                </div>
            </span>
        );
    }
}
