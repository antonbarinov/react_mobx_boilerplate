import * as React from 'react';
import { observer } from 'mobx-react';
import { BaseComponent } from 'components/BaseComponent';
import { handleInitialFetchingEffect } from 'effects/layouts/handleInitialFetchingEffect';
import OfflineOverlay from 'components/OfflineOverlay';

import Header from './header';
import Footer from './footer';

import userState from 'globalState/user';

import styles from './styles.module.scss';


@observer
export default class MainLayout extends BaseComponent {
    constructor(props) {
        super(props);

        this.useEffect(handleInitialFetchingEffect);
    }

    render() {
        const { initialFetching } = userState;
        if (initialFetching) return null;

        return (
            <span>
                <OfflineOverlay />
                <div className={ styles.wrap }>
                    <Header />
                    <div className={ styles.main }>
                         { this.props.children }
                    </div>
                </div>
                <Footer />
            </span>
        );
    }
}
