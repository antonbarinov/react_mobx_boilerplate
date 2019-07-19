import * as React from 'react';
import { observer } from 'mobx-react';
import Container from 'components/Container';
import { currentRoute, Router } from 'lib/router';

import State from './state';
const localState = new State();

@observer
export default class MainPage extends React.Component {
    constructor(props) {
        super(props);

        document.title = 'Main Page | Boilerplate';

        // or this.state = new State(); if we don't want to store last state of this component
        this.state = localState;
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

                <Router routes={ {
                    '/page/:p': <div>Matching <b>/page/:p</b> route</div>,
                } } />
            </Container>
        );
    }
}
