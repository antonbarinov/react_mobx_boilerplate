import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import Container from 'components/Container';
import userState from 'globalState/user';

import styles from './styles.module.scss';

export default function ProfilePage() {
    const { user } = userState;

    useEffect(() => {
        document.title = 'Profile Page | Boilerplate';
    }, []);

    return (
        <Container>
            <h1 className={styles.title}>Hello, {user.full_name}!</h1>
        </Container>
    );
}

ProfilePage = observer(ProfilePage);
