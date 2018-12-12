import * as React from 'react';
import Header from './header';
import Footer from './footer';
import userState from 'globalStates/user';

import './main.css';
import { observer } from 'mobx-react'; // Basic styles

@observer
export default class Layout extends React.Component {
    render() {
        return (
            <span data-user-token={userState.user ? userState.user.accessToken : false}>
                <div id="wrap">
                    <Header/>
                    <div id="main">
                        {this.props.children}
                    </div>
                </div>
                <Footer/>
            </span>
        );
    }
}