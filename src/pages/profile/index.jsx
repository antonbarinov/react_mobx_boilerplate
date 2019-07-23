import * as React from 'react';
import { observer } from 'mobx-react';
import { BaseComponent } from 'components/BaseComponent';
import Container from 'components/Container';
import userState from 'globalState/user';

import styles from './styles.module.scss';


@observer
export default class ProfilePage extends BaseComponent {
    constructor(props) {
        super(props);

        document.title = 'Profile Page | Boilerplate';
    }

    render() {
        const { user } = userState;

        return (
            <Container>
                <h1 className={ styles.title }>Hello, { user.full_name }!</h1>
            </Container>
        );
    }
}
