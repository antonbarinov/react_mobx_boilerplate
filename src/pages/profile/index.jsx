import * as React from 'react';
import { observer } from 'mobx-react';
import CSSModules from 'react-css-modules';
import userState from 'globalStates/user';

@observer
@CSSModules(require('./styles.scss'), { allowMultiple: true })
export default class ProfilePage extends React.Component {
    render() {
        return (
            <div className="container">
                <h1 styleName="title">Hello, {userState.user.full_name}!</h1>
            </div>
        );
    }
}