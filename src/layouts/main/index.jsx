import * as React from 'react';
import { observer } from 'mobx-react';
import Header from './header';
import Footer from './footer';

import userState from 'globalState/user';

import styles from './styles.module.scss';

const Layout = observer(({ children, ...restParams }) => {
    const { initialFetching } = userState;

    const renderContent = () => {
        if (initialFetching) return null;

        // Hide preloader
        document.getElementById('preloader').classList.add('hidden');

        return (
            <React.Fragment>
                <div className={ styles.wrap }>
                    <Header />
                    <div className={ styles.main }>
                        { React.cloneElement(children, restParams) }
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        );
    };


    return (
        <span>
            {renderContent()}
        </span>
    );
});


export default Layout;