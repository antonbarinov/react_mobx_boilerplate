import * as React from 'react';
import { observer } from 'mobx-react';
import { reaction } from 'mobx';
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
    reactionDisposers = [];

    constructor(props) {
        super(props);

        this.reactionDisposers.push(reaction(
            () => {
                const { children } = this.props;
                const { initialFetching, user } = userState;

                return [
                    children,
                    initialFetching,
                    user,
                ];
            },
            () => {
                this.reactionHandler();
            }));

        this.reactionHandler();
    }

    componentWillUnmount() {
        this.reactionDisposers.forEach(d => d());
    }

    reactionHandler = () => {
        const { initialFetching, user } = userState;

        const doRedirect = (initialFetching === true || user) === false;

        if (doRedirect) {
            window.localStorage.setItem('redirect', currentRoute.fullPath);
            redirect('/login');
        }
    };

    render() {
        return this.props.children;
    }
}
