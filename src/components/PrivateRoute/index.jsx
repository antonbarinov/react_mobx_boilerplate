import { observer } from 'mobx-react';
import * as React from 'react';
import { reaction } from 'mobx';
import userState from 'globalState/user';
import { redirect } from 'lib/router';


@observer
export default class PrivateRoute extends React.Component {
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
            window.localStorage.setItem('redirect', window.location.pathname + window.location.search + window.location.hash);
            redirect('/login');
        }
    };

    render() {
        return this.props.children;
    }
}
