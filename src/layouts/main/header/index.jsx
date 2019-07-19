import * as React from 'react';
import { Link } from 'lib/router';
import { observer } from 'mobx-react';
import userState from 'globalState/user';

import styles from './styles.module.scss';


@observer
export default class LayoutHeader extends React.Component {
    render() {
        const { user } = userState;

        return (
            <header className={ styles.header }>
                <AuthorizedOnlyLink to="/profile">Profile</AuthorizedOnlyLink>
                <NotAuthorizedOnlyLink to="/login">Login</NotAuthorizedOnlyLink>
                <CustomLink to="/" exact dontIgnoreHash>Main</CustomLink>
                <CustomLink to="/#hash2" exact dontIgnoreHash>Main (hash 2)</CustomLink>
                <CustomLink to="/#hash3" exact dontIgnoreHash>Main (hash 3)</CustomLink>
                <CustomLink to="/page/1?foo=bar" exact>Page 1</CustomLink>
                <CustomLink to="/page/2?a=b" exact>Page 2</CustomLink>
                <CustomLink to="/qweqweewq/3">Page not found</CustomLink>
                <CustomLink to="/profile" exact dontIgnoreHash>Private route</CustomLink>
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

    return <Link to={ to } { ...rest } className={ stylesStr.join(' ') }>{ children }</Link>
}
