import * as React from 'react';
import { observer } from 'mobx-react';
import { autorun, observable } from 'mobx';
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
    history.pushState({}, title, to);
    currentRoute.setCurrentRoute();
}


class CurrentRoute {
    routesHistory = [];
    @observable currentLocation = {
        path: '',
        fullPath: '',
        location: {},
    };
    @observable fullPath = window.location.pathname + window.location.search;
    @observable routeParams = {};
    @observable currentRegExp = null;


    constructor() {
        this.setCurrentRoute();
    }

    setCurrentRoute() {
        const windowLocation = JSON.parse(JSON.stringify(window.location));

        let path = window.location.pathname;
        let fullPath = path + window.location.search;

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
    @observable currentComponent = null;

    constructor(props) {
        super(props);

        autorun(() => {
            this.navigate();
        });
    }

    navigate() {
        const { routes, global } = this.props;
        let result = routes[''] || null;

        let isRouteChanged = false;

        for (const route in routes) {
            if (!routes.hasOwnProperty(route)) continue;

            if (route === '') continue;
            const component = routes[route];

            const keys = [];
            const regexp = pathToRegexp(route, keys);
            const res = exec(regexp, currentRoute.currentLocation.path, keys);

            if (res) {
                // Does route actually changed?
                if (regexp + '' !== currentRoute.currentRegExp + '') {
                    isRouteChanged = true;
                }

                // Set global route params only from global router, not from local
                if (global) {
                    currentRoute.routeParams = res;
                    if (isRouteChanged) currentRoute.currentRegExp = regexp;
                }
                result = component;
                break;
            }
        }

        if (isRouteChanged) this.currentComponent = result;
    }

    render() {
        return this.currentComponent;
    }
}


/**
 * Props explanation:
 * to - link url
 * exact - mark active only if to === currentLocation.fullPath instead of current global route regexp match
 * grabActive - callback function that tells is link active or not
 */
@observer
export class Link extends React.Component {
    @observable active = false;

    constructor(props) {
        super(props);

        autorun(() => {
            this.calcActive();
        });
    }

    handleClick = (e) => {
        e.preventDefault();
        const { to } = this.props;

        redirect(to);
    };

    calcActive = () => {
        const { to, exact, grabActive } = this.props;
        const { currentRegExp, currentLocation } = currentRoute;

        let active = false;
        if (exact) {
            active = (to === currentLocation.fullPath);
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
        const { to, children, grabActive, exact, ...restProps } = this.props;
        const { active } = this;

        return <a { ...restProps } href={ to } data-active={ active } onClick={ this.handleClick }>{ children }</a>;
    }
}
