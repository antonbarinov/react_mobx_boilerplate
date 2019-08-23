import * as React from 'react';
import { observer } from 'mobx-react';
import { BaseComponent } from 'components/BaseComponent';
import { hookHandleInitialFetching } from 'hooks/layouts/hookHandleInitialFetching';

import Header from './header';
import Footer from './footer';

import userState from 'globalState/user';

import styles from './styles.module.scss';


@observer
export default class MainLayout extends BaseComponent {
    constructor(props) {
        super(props);

        this.useEffect(hookHandleInitialFetching);
    }

    render() {
        const { initialFetching } = userState;
        if (initialFetching) return null;

        return (
            <span>
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
