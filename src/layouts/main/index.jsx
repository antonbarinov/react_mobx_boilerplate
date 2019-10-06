import * as React from 'react';
import { observer } from 'mobx-react';
import OfflineOverlay from 'components/OfflineOverlay';
import { useLayoutGlobalLoader } from 'hooks/layouts/useLayoutGlobalLoader';

import Header from './header';
import Footer from './footer';

import userState from 'globalState/user';

import styles from './styles.module.scss';

export default function MainLayout({ children }) {
    useLayoutGlobalLoader();

    const { initialFetching } = userState;
    if (initialFetching) return null;

    return (
        <>
            <OfflineOverlay />
            <div className={styles.wrap}>
                <Header />
                <div className={styles.main}>{children}</div>
            </div>
            <Footer />
        </>
    );
}

MainLayout = observer(MainLayout);
