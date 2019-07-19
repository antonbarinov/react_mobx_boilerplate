import * as React from 'react';
import { observer } from 'mobx-react';

import styles from './styles.module.scss';
import State from './state';
const localState = new State();


@observer
export default class ReactClassComponent extends React.Component {
    constructor(props) {
        super(props);

        // or this.state = new State(); if we don't want to store last state of this component
        this.state = localState;

        document.title = 'Some page title';
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className={ styles.ComponentName }>
                <h1>Hello world</h1>
            </div>
        );
    }
}
