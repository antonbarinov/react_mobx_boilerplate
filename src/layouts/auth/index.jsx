import * as React from 'react';
import { observer } from 'mobx-react';
import { BaseComponent } from 'components/BaseComponent';
import { hookHandleInitialFetching } from 'hooks/layouts/hookHandleInitialFetching';

import styles from './styles.module.scss';


@observer
export default class AuthLayout extends BaseComponent {
    constructor(props) {
        super(props);

        this.pushEffect(hookHandleInitialFetching);
    }

    render() {
        return (
            <span>
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
