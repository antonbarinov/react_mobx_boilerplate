import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Container from 'components/Container';
import { currentRoute } from 'lib/router';

import State from './state';

export default function MainPage() {
    const [ state ] = useState(new State());

    // Update time
    useEffect(() => {
        document.title = 'Main Page | Boilerplate';

        const interval = setInterval(() => {
            state.time = new Date().toISOString();
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, []);


    const { routeParams, currentLocation, searchParams } = currentRoute;
    const { page } = routeParams;

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

MainPage = observer(MainPage);
