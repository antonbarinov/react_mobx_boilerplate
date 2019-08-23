import * as React from 'react';
import { observer } from 'mobx-react';
import { BaseComponent } from 'components/BaseComponent';
import Container from 'components/Container';
import { currentRoute, Router } from 'lib/router';

import State from './state';

const localState = new State();

function updateTime() {
    const state = this.state;

    const interval = setInterval(() => {
        state.time = new Date().toISOString();
    }, 100);

    // Return cleanup function if need
    return () => {
        clearInterval(interval);
    };
}



@observer
export default class MainPage extends BaseComponent {
    constructor(props) {
        super(props);

        document.title = 'Main Page | Boilerplate';

        // or this.state = new State(); if we don't want to store last state of this component
        this.state = localState;

        this.useEffect(updateTime.bind(this));
    }

    render() {
        const { routeParams, currentLocation } = currentRoute;
        const { page } = routeParams;
        const searchParams = currentRoute.searchParams;
        const state = this.state;

        return (
            <Container>
                <h1>{ state.title }</h1>
                <input value={ state.title } onChange={ state.handleTitleChange } />
                { page && <h3>Route param "page": { page }</h3> }
                <div>This time is { state.time }</div>
                <div>Hash: { currentLocation.location.hash }</div>
                <div>searchParams: { JSON.stringify(searchParams) }</div>
            </Container>
        );
    }
}
