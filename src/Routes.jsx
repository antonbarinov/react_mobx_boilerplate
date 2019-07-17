import * as React from 'react';
import { observer } from 'mobx-react';
import { autorun, observable } from 'mobx';
import { currentRoute, redirect, Router } from 'components/router';
import userState from 'globalState/user';


import MainPage from './pages/main';
import LoginPage from './pages/login';
import NotFoundPage from './pages/notFound';
import SignUpPage from './pages/signup';
import ProfilePage from './pages/profile';
import MainLayout from 'layouts/main';
import AuthLayout from 'layouts/auth';

const authorizationRoutes = {
    '/login': <AuthLayout><LoginPage /></AuthLayout>,
    '/signup': <AuthLayout><SignUpPage /></AuthLayout>,
};


@observer
export default class Routes extends React.Component {
    render() {
        return <Router global routes={ {
            '/': <MainLayout><MainPage /></MainLayout>,
            '/page/:page': <MainLayout><MainPage /></MainLayout>,
            ...authorizationRoutes,
            '/profile': <PrivateRoute><MainLayout><ProfilePage /></MainLayout></PrivateRoute>,
            '': <MainLayout><NotFoundPage /></MainLayout>,
        } } />;
    }
}


@observer
class PrivateRoute extends React.Component {
    @observable component = null;
    autoRunDispose;

    constructor(props) {
        super(props);

        this.autoRunDispose = autorun(() => {
            this.autoRunReactiveHandler();
        });
    }

    componentWillUnmount() {
        this.autoRunDispose();
    }

    autoRunReactiveHandler = () => {
        const { children } = this.props;
        const { initialFetching, user } = userState;

        if (initialFetching === true || user) {
            this.component = children;
        }
        else {
            window.localStorage.setItem('redirect', currentRoute.fullPath);
            redirect('/login');
            this.component = null;
        }
    };

    render() {
        return this.component;
    }
}
