import React from 'react';


export class BaseComponent extends React.Component {
    __effects = [];
    __cleanupEffects = [];

    constructor(props) {
        super(props);
    }

    pushEffect = (callback) => {
        if (typeof callback === 'function') {
            this.__effects.push(callback)
        } else {
            throw new Error('Only functions can be passed into addEffect()');
        }
    }

    componentWillUnmount() {
        for (const cb of this.__cleanupEffects) {
            cb();
        }
    };

    componentDidMount() {
        for (const cb of this.__effects) {
            const result = cb();
            if (typeof result === 'function') this.__cleanupEffects.push(result);
        }
    };
}
