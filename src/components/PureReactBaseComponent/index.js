import React from 'react';

function isEqual(one = [], two = []) {
    if (one.length !== two.length) return false;

    for (let i = 0; i < one.length; i++) {
        const o = one[i];
        const t = two[i];
        if (o !== t) return false;
    }

    return true;
}

export class PureReactBaseComponent extends React.PureComponent {
    state = {};
    __effects = [];
    __cleanupEffects = [];

    useEffect = (callback, getReactions) => {
        if (typeof getReactions !== 'function') {
            throw new Error('getReactions must be function that return array');
        }

        if (typeof callback !== 'function') {
            throw new Error('Only functions can be passed into useEffect()');
        }

        const reactions = getReactions();
        if (!Array.isArray(reactions)) {
            throw new Error('getReactions must be function that return array');
        }

        const effect = {
            callback,
            getReactions,
            lastReactions: [...reactions],
        };

        this.__effects.push(effect);
    };

    componentWillUnmount() {
        for (const callback of this.__cleanupEffects) {
            callback();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        for (const effect of this.__effects) {
            const reactions = effect.getReactions();
            if (!isEqual(effect.lastReactions, reactions)) {
                effect.lastReactions = reactions;
                effect.callback(false, true, prevProps, prevState);
            }
        }
    }

    componentDidMount() {
        for (const { callback } of this.__effects) {
            const result = callback(true, false);
            if (typeof result === 'function') this.__cleanupEffects.push(result);
        }
    }
}
