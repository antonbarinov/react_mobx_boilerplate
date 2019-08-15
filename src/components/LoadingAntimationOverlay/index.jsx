import * as React from 'react';
import { observer } from 'mobx-react';
import { BaseComponent } from 'components/BaseComponent';

import svg from './animation.svg';

import styles from './styles.module.scss';

@observer
export default class LoadingAnimationOverlay extends BaseComponent {
    constructor(props) {
        super(props);

        this.pushEffect(() => {
            const { bluredContainerRef } = this.props;
            bluredContainerRef.style.filter = 'blur(2px)';

            return () => {
                bluredContainerRef.style.filter = '';
            }
        });
    }

    render() {
        return (
            <div className={ styles.overlay }>
                <span dangerouslySetInnerHTML={ { __html: svg } } />
            </div>
        );
    }
}
