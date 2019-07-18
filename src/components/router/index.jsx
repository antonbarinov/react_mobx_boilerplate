import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, reaction } from 'mobx';
import pathToRegexp from 'path-to-regexp';

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

window.addEventListener('popstate', () => {
    currentRoute.setCurrentRoute();
});

export function redirect(to, title = '') {
    const currentFullPath = window.location.href.substr(window.location.origin.length);
    if (currentFullPath === to) return;

    history.pushState({}, title, to);
    currentRoute.setCurrentRoute();
}


class CurrentRoute {
    routesHistory = [];
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
    prevLocation = null;

    constructor() {
        this.setCurrentRoute();
    }

    setCurrentRoute() {
        const windowLocation = JSON.parse(JSON.stringify(window.location));
        if (this.prevLocation === JSON.stringify(windowLocation)) return false;
        this.prevLocation = JSON.stringify(windowLocation);

        let path = windowLocation.pathname;
        let fullPath = path + windowLocation.search;

        const parsedURL = new URL(windowLocation.href);
        const searchParams = {};

        for (let p of parsedURL.searchParams) {
            const key = p[0];
            const value = p[1];
            if (value !== '') searchParams[key] = value;
        }
        this.searchParams = searchParams;

        const route = {
            path,
            fullPath,
            location: windowLocation,
        };

        this.routesHistory.push(route);
        this.currentLocation = route;
    }
}


export const currentRoute = new CurrentRoute();


/**
 * Props explanation:
 * routes - key-value object where key is route and value is what must to rendered. If key is "" that means Page not found
 * global - mark router as global for populate currentRoute.routeParams and currentRoute.currentRegExp
 */
@observer
export class Router extends React.Component {
    @observable.ref currentComponent = null;
    reactionDisposers = [];

    constructor(props) {
        super(props);

        this.reactionDisposers.push(reaction(
            () => {
                return currentRoute.currentLocation;
            },
            () => {
                this.navigate();
            },
            { fireImmediately: true },
        ));
    }

    componentWillUnmount() {
        this.reactionDisposers.forEach(d => d());
    }

    navigate() {
        const { routes, global } = this.props;
        let result = routes[''] || routes['*'] || null;

        let isRouteFound = false;

        for (const route in routes) {
            if (!routes.hasOwnProperty(route)) continue;
            if (route === '' || route === '*') continue;
            const component = routes[route];

            const keys = [];
            const regexp = pathToRegexp(route, keys);
            const res = exec(regexp, currentRoute.currentLocation.path, keys);

            if (res) {
                isRouteFound = true;
                result = component;

                // Set global route params only from global router, not from local
                if (global) {
                    currentRoute.routeParams = res;
                    currentRoute.currentRegExp = regexp;
                }

                break;
            }
        }

        if (!isRouteFound) {
            currentRoute.routeParams = {};
            currentRoute.currentRegExp = pathToRegexp(currentRoute.currentLocation.path, []);
        }

        this.currentComponent = result;
    }

    render() {
        return this.currentComponent;
    }
}


/**
 * Props explanation:
 * to - link url
 * exact - mark active only if to === currentLocation.fullPath instead of current global route regexp match
 * dontIgnoreHash - Don't ignore hash when exact active
 * grabActive - callback function that tells is link active or not
 */
@observer
export class Link extends React.Component {
    @observable active = false;
    reactionDisposers = [];

    constructor(props) {
        super(props);

        this.reactionDisposers.push(reaction(
            () => {
                const { to, exact } = this.props;
                const { currentRegExp, currentLocation } = currentRoute;

                return [
                    to,
                    exact,
                    currentLocation,
                    currentRegExp,
                ];
            },
            () => {
                this.calcActive();
            },
            { fireImmediately: true },
        ));
    }

    componentWillUnmount() {
        this.reactionDisposers.forEach(d => d());
    }

    handleClick = e => {
        e.preventDefault();
        const { to } = this.props;

        redirect(to);
    };

    calcActive = () => {
        const { to, exact, dontIgnoreHash, grabActive } = this.props;
        const { currentRegExp, currentLocation } = currentRoute;

        let active = false;
        if (exact) {
            if (dontIgnoreHash) {
                active = to === currentLocation.fullPath + currentLocation.location.hash;
            }
            else {
                active = to === currentLocation.fullPath;
            }
        }
        else if (currentRegExp && currentRegExp.exec(to)) {
            active = true;
        }

        if (active !== this.active) {
            this.active = active;
            grabActive && grabActive(active);
        }
    };

    render() {
        const { to, children, dontIgnoreHash, grabActive, exact, ...restProps } = this.props;
        const { active } = this;

        return (
            <a
                { ...restProps }
                href={ to }
                data-active={ active }
                onClick={ this.handleClick }
            >
                { children }
            </a>
        );
    }
}
