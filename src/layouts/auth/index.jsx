import * as React from 'react';
import { observer } from 'mobx-react';
import { useLayoutGlobalLoader } from 'hooks/layouts/useLayoutGlobalLoader';
import OfflineOverlay from 'components/OfflineOverlay';

import styles from './styles.module.scss';

export default function AuthLayout({ children }) {
    useLayoutGlobalLoader();

    return (
        <>
            <OfflineOverlay />
            <div className={styles.wrap}>
                <div className={styles.content_holder}>
                    <div>{children}</div>
                </div>
            </div>
        </>
    );
}

AuthLayout = observer(AuthLayout);
