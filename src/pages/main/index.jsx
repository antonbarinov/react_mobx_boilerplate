import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Container from 'components/Container';
import { currentRoute } from 'lib/router';

import { useLocalState } from './state';

/**
 * @param state {MainPageState}
 * @returns {Function}
 */
const updateTimeEffect = (state) => () => {
    document.title = 'Main Page | Boilerplate';

    const interval = setInterval(() => {
        state.time = new Date().toISOString();
    }, 10);

    return () => {
        clearInterval(interval);
    };
};


export default function MainPage() {
    const state = useLocalState();

    // Update time
    useEffect(updateTimeEffect(state), []);


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
