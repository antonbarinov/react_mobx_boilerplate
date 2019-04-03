import * as React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import userState from 'globalState/user';

import styles from './styles.module.scss';


@withRouter
@observer
export default class LayoutHeader extends React.Component {
    render() {
        const { user } = userState;

        return (
            <header className={ styles.header }>
                <AuthorizedOnlyLink to="/profile">Profile</AuthorizedOnlyLink>
                <NotAuthorizedOnlyLink to="/login">Login</NotAuthorizedOnlyLink>
                <CustomLink to="/">Main</CustomLink>
                { user &&
                <span className={ styles.link } onClick={ () => userState.logout() }>Logout</span>
                }
            </header>
        );
    }
}

const AuthorizedOnlyLink = observer(({ children, ...rest }) => {
    const { user } = userState;
    if (!user) return null;
    return <CustomLink { ...rest }>{ children }</CustomLink>;
});

const NotAuthorizedOnlyLink = observer(({ children, ...rest }) => {
    const { user } = userState;
    if (user) return null;
    return <CustomLink { ...rest }>{ children }</CustomLink>;
});

function CustomLink({ children, to, className, ...rest }) {
    const stylesStr = [ styles.link ];
    if (className) stylesStr.push(className);

    return (
        <Route
            path={ to }
            exact
            children={ ({ match }) => (
                <Link to={ to } { ...rest } className={ stylesStr.join(' ') } data-active={ match ? 'active' : '' }>{ children }</Link>
            ) }
        />
    );
}