import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { setHistory } from './helpers/redirect';
import userState from 'globalStates/user';

import MainPage from './pages/main';
import LoginPage from './pages/login';
import NotFoundPage from './pages/notFound';
import SignUpPage from './pages/signup';
import ProfilePage from './pages/profile';


export default class Routes extends React.Component {
    render() {
        return [
            <Route key="1" component={HistorySetter}/>,
            <Switch key="2">
                <Route path="/" exact component={MainPage}/>
                <Route path="/login" exact component={LoginPage}/>
                <Route path="/signup" exact component={SignUpPage} />
                <PrivateRoute path="/profile" exact component={ProfilePage} />
                <Route component={NotFoundPage}/>
            </Switch>
        ];
    }
}

function HistorySetter({ history }) {
    setHistory(history);
    return null;
}

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                userState.user ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}