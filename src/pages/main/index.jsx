import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, reaction } from 'mobx';
import Container from 'components/container';
import { currentRoute, Router } from 'components/router';


@observer
export default class MainPage extends React.Component {
    @observable time = new Date();
    reactionDisposers = [];

    constructor(props) {
        super(props);

        document.title = 'Main Page | Boilerplate';

        console.log('constructor');

        this.reactionDisposers.push(reaction(
            () => {
                return currentRoute.currentLocation.location.hash;
            },
            () => {
                console.log('now hash is:', currentRoute.currentLocation.location.hash);
            },
            { fireImmediately: true, delay: 1 },
        ));

        this.updateInterval = setInterval(() => {
            this.time = new Date();
        }, 100);
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval);
        this.reactionDisposers.forEach(d => d());
    }

    render() {
        const { routeParams, currentLocation } = currentRoute;
        const { page } = routeParams;
        const searchParams = currentRoute.searchParams;

        return (
            <Container>
                <h1>Main page</h1>
                { page && <h3>Route param "page": { page }</h3> }
                <div>This time is { this.time.toISOString() }</div>
                <div>Hash: { currentLocation.location.hash }</div>
                <div>searchParams: { JSON.stringify(searchParams) }</div>

                <Router routes={ {
                    '/page/:p': <div>Matching <b>/page/:p</b> route</div>,
                } } />
            </Container>
        );
    }
}
