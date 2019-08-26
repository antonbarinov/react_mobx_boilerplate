import * as React from 'react';
import { observer } from 'mobx-react';
import { BaseComponent } from 'components/BaseComponent';

import styles from './styles.module.scss';

import State from './state';
const localState = new State();



@observer
export default class OfflineOverlay extends BaseComponent {
    constructor(props) {
        super(props);

        // or this.state = new State(); if we don't want to store last state of this component
        this.state = localState;

        this.useEffect(this.state.reactionOnOnlineChangeEffect);
    }

    render() {
        const state = this.state;
        const classes = [ styles.OfflineOverlay ];
        if (state.showOverlay) classes.push(styles.visible);

        return (
            <div className={ classes.join(' ') } onClick={ state.handleClick }>
                Offline (click to close this alert)
            </div>
        );
    }
}
