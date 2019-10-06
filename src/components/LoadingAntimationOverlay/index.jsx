import * as React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { BaseComponent } from 'components/BaseComponent';

import svg from './animation.svg';

import styles from './styles.module.scss';

@observer
export default class LoadingAnimationOverlay extends BaseComponent {
    constructor(props) {
        super(props);

        this.useEffect(this.blurEffect);
    }

    blurEffect = () => {
        let container = this.props.bluredContainerRef;
        if (container.current) container = container.current;

        container.style.filter = 'blur(2px)';

        return () => {
            container.style.filter = '';
        };
    };

    render() {
        return (
            <div className={styles.overlay}>
                <span dangerouslySetInnerHTML={{ __html: svg }} />
            </div>
        );
    }
}

LoadingAnimationOverlay.propTypes = {
    bluredContainerRef: PropTypes.object.isRequired,
};
