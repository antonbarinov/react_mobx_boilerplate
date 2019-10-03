import { observer } from 'mobx-react';
import * as React from 'react';
import { reaction } from 'mobx';
import userState from 'globalState/user';
import { redirect } from 'lib/router';
import { BaseComponent } from 'components/BaseComponent';


@observer
export default class PrivateRoute extends BaseComponent {
    constructor(props) {
        super(props);

        this.useEffect(this.privateCheckEffect);

        this.reactionHandler();
    }

    privateCheckEffect = () => {
        return reaction(
            () => {
                const { children } = this.props;
                const { initialFetching, user } = userState;

                return [
                    children,
                    initialFetching,
                    user,
                ];
            },
            this.reactionHandler);
    };

    reactionHandler = () => {
        const { initialFetching, user } = userState;

        const doRedirect = (initialFetching === true || user) === false;

        if (doRedirect) {
            window.localStorage.setItem('redirect', window.location.pathname + window.location.search + window.location.hash);
            redirect('/login');
        }
    };

    render() {
        return this.props.children;
    }
}
