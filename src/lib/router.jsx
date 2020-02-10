import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { action, observable, reaction, runInAction } from 'mobx';
import pathToRegexp from 'path-to-regexp';
import mutateObject from 'helpers/mutateObject';

function exec(re, str, keys = []) {
    const match = re.exec(str);

    if (match === null) return null;

    const paramsValues = match.slice(1);
    let result = {};
    for (let i = 0; i < paramsValues.length; i++) {
        const paramValue = paramsValues[i];
        const paramName = keys[i].name;

        result[paramName] = paramValue;
    }

    return result;
}

window.addEventListener('popstate', () => currentRoute.setCurrentRoute());
window.addEventListener('hashchange', () => currentRoute.setCurrentRoute());

export function redirect(to, replace = false, title = '') {
    const currentFullPath = window.location.href.substr(window.location.origin.length);
    if (currentFullPath === to) return;

    if (currentRoute.hashMode) to = '#' + to;

    if (replace) {
        history.replaceState({}, title, to);
    } else {
        history.pushState({}, title, to);
    }

    currentRoute.setCurrentRoute();
}

class CurrentRoute {
    @observable currentLocation = {
        path: '',
        fullPath: '',
        location: {
            hash: '',
            host: '',
            hostname: '',
            href: '',
            origin: '',
            pathname: '',
            port: '',
            protocol: '',
            search: '',
        },
    };
    @observable fullPath = window.location.pathname + window.location.search;
    @observable routeParams = {};
    @observable.ref currentRegExp = null;
    @observable searchParams = {};
    @observable hashMode = false;

    constructor() {
        this.setCurrentRoute();
    }

    @action setCurrentRoute = () => {
        const windowLocation = window.location;

        let path, fullPath;

        if (this.hashMode) {
            const hashPath = windowLocation.hash.substr(1);
            const parsedURL = new URL(hashPath, windowLocation.origin);
            path = parsedURL.pathname;
            fullPath = hashPath;
        } else {
            path = windowLocation.pathname;
            fullPath = path + windowLocation.search;
        }

        const parsedURL = new URL(fullPath, windowLocation.origin);
        const searchParams = Object.fromEntries(parsedURL.searchParams.entries());
        mutateObject(this.searchParams, searchParams);

        const route = {
            path,
            fullPath,
            location: windowLocation,
        };

        mutateObject(this.currentLocation, route);
    };
}

export const currentRoute = new CurrentRoute();

let globalRoutersCount = 0;

/**
 * Props explanation:
 * routes - key-value object where key is route and value is what must to rendered. If key is "" or "*" that means Page not found
 * global - mark router as global for populate currentRoute.routeParams and currentRoute.currentRegExp
 * hashMode - hash router instead of regular url's
 */
export function Router({ routes, global, hashMode }) {
    const [state] = useState(
        () => new (class {
                @observable.ref currentComponent = null;
        })(),
    );

    const navigate = useCallback(
        action(() => {
            let result = routes[''] || routes['*'] || null;

            let isRouteFound = false;

            const { path } = currentRoute.currentLocation;

            for (const route in routes) {
                if (!routes.hasOwnProperty(route)) continue;
                if (route === '' || route === '*') continue;
                const component = routes[route];

                let routePath = route;
                if (routePath.substr(-1) === '/')
                    routePath = routePath.substr(0, routePath.length - 1);

                const keys = [];
                const regexp = pathToRegexp(routePath, keys);
                const res = exec(regexp, path, keys);

                if (res) {
                    isRouteFound = true;
                    result = component;

                    // Set global route params only from global router, not from local
                    if (global) {
                        mutateObject(currentRoute.routeParams, res);
                        currentRoute.currentRegExp = regexp;
                    }

                    break;
                }
            }

            if (!isRouteFound) {
                mutateObject(currentRoute.routeParams, {});
                currentRoute.currentRegExp = pathToRegexp(currentRoute.currentLocation.path, []);
            }

            state.currentComponent = result;
        }),
        [],
    );

    useEffect(() => {
        if (global) globalRoutersCount++;
        if (globalRoutersCount > 1) throw new Error(`Only 1 router exemplar can be global`);

        const disposer = reaction(
            () => {
                return JSON.stringify(currentRoute.currentLocation);
            },
            () => {
                navigate();
            },
        );

        return () => {
            disposer();
            globalRoutersCount--;
        };
    }, []);

    useState(() => {
        runInAction(() => {
            currentRoute.hashMode = !!hashMode;
            if (hashMode && window.location.hash === '') window.location.hash = '/';
            currentRoute.setCurrentRoute();
        });
    }, [hashMode]);

    useState(() => navigate());

    return state.currentComponent;
}

Router = observer(Router);

/**
 * Props explanation:
 * to - link url
 * exact - mark active only if to === currentLocation.fullPath instead of current global route regexp match
 * dontIgnoreHash - Don't ignore hash when exact active
 * grabActive - callback function that tells is link active or not
 */
export function Link({
    to,
    exact,
    dontIgnoreHash,
    grabActive,
    activeClass,
    children,
    className,
    ...restProps
}) {
    const [state] = useState(
        () => new (class {
                @observable active = false;
        })(),
    );

    useEffect(
        () => reaction(
            () => {
                const { currentRegExp, currentLocation } = currentRoute;

                return [to, exact, currentLocation, currentRegExp];
            },
            () => {
                calcActive();
            },
        ),
        [],
    );

    const handleClick = useCallback((e) => {
        e.preventDefault();

        redirect(to);
    }, []);

    const calcActive = useCallback(
        action(() => {
            const { currentRegExp, currentLocation } = currentRoute;

            let active = false;
            if (exact) {
                if (dontIgnoreHash && !currentRoute.hashMode) {
                    active = to === currentLocation.fullPath + currentLocation.location.hash;
                } else {
                    active = to === currentLocation.fullPath;
                }
            } else if (currentRegExp && currentRegExp.exec(to)) {
                active = true;
            }

            if (active !== state.active) {
                state.active = active;
                grabActive && grabActive(active);
            }
        }),
        [],
    );

    useState(() => calcActive());

    let classNames = [];
    if (className) classNames.push(className);
    if (activeClass && state.active) classNames.push(activeClass);
    classNames = classNames.join(' ');

    return (
        <a
            {...restProps}
            className={classNames}
            href={to}
            data-active={state.active}
            onClick={handleClick}
        >
            {children}
        </a>
    );
}

Link = observer(Link);
