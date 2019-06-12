import * as React from 'react';
import { observer } from 'mobx-react';
import { Route as ReactRouterRoute, Switch, Redirect, withRouter } from 'react-router-dom';
import userState from 'globalState/user';

import { setHistory } from './helpers/redirect';

import MainPage from './pages/main';
import LoginPage from './pages/login';
import NotFoundPage from './pages/notFound';
import SignUpPage from './pages/signup';
import ProfilePage from './pages/profile';
import MainLayout from 'layouts/main';
import AuthLayout from 'layouts/auth';


@withRouter
@observer
export default class Routes extends React.Component {
    render() {
        return <React.Fragment>
            <ReactRouterRoute component={ HistorySetter } />
            <Switch>
                <Route path="/" exact><MainLayout><MainPage /></MainLayout></Route>
                <Route path="/login" exact><AuthLayout><LoginPage /></AuthLayout></Route>
                <Route path="/signup" exact><AuthLayout><SignUpPage /></AuthLayout></Route>

                <PrivateRoute path="/profile"><MainLayout><ProfilePage /></MainLayout></PrivateRoute>

                <Route><MainLayout><NotFoundPage /></MainLayout></Route>
            </Switch>
        </React.Fragment>;
    }
}

function HistorySetter({ history }) {
    setHistory(history);
    return null;
}

const PrivateRoute = observer(({ children, ...rest }) => {
    const { initialFetching, user } = userState;

    const renderFunc = (props) => {
        if (initialFetching === true || user) return React.cloneElement(children, props);

        window.localStorage.setItem('redirect', window.location.pathname + window.location.search);

        return <Redirect to={ {
            pathname: '/login',
            state: { from: props.location },
        } } />;
    };

    return (
        <ReactRouterRoute { ...rest } render={renderFunc} />
    );
});

const Route = observer(({ children, ...rest }) => {
    const renderFunc = (props) => {
        return React.cloneElement(children, props);
    };

    return (
        <ReactRouterRoute { ...rest } render={renderFunc} />
    );
});
