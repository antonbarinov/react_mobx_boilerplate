import * as React from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router-dom';
import userState from 'globalStates/user';

@CSSModules(require('./styles.scss'))
export default class LayoutHeader extends React.Component {
    render() {
        return (
            <header styleName="header">
                <div styleName="tbl">
                    <div styleName="tbc">
                        <AuthorizedOnlyLink to="/profile" styleName="link">Profile</AuthorizedOnlyLink>
                        <NotAuthorizedOnlyLink to="/login" styleName="link">Login</NotAuthorizedOnlyLink>
                        <Link to="/" styleName="link">Main</Link>
                        { userState.user &&
                            <span styleName="link" onClick={() => userState.logout()}>Logout</span>
                        }
                    </div>
                </div>
            </header>
        );
    }
}

function AuthorizedOnlyLink({ children, ...rest}) {
    if (!userState.user) return null;
    return <Link {...rest}>{children}</Link>;
}

function NotAuthorizedOnlyLink({ children, ...rest}) {
    if (userState.user) return null;
    return <Link {...rest}>{children}</Link>;
}