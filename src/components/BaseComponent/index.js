import React from 'react';


export class BaseComponent extends React.Component {
    __effects = [];
    __cleanupEffects = [];

    constructor(props) {
        super(props);
    }

    pushEffect = (callback, reactOnComponentDidUpdate = false) => {
        if (typeof callback === 'function') {
            this.__effects.push({
                callback,
                reactOnComponentDidUpdate
            });
        } else {
            throw new Error('Only functions can be passed into addEffect()');
        }
    }

    componentWillUnmount() {
        for (const callback of this.__cleanupEffects) {
            callback();
        }
    };

    componentDidUpdate() {
        for (const { callback, reactOnComponentDidUpdate } of this.__effects) {
            if (reactOnComponentDidUpdate) callback(false, true);
        }
    }

    componentDidMount() {
        for (const { callback } of this.__effects) {
            const result = callback(true, false);
            if (typeof result === 'function') this.__cleanupEffects.push(result);
        }
    };
}
