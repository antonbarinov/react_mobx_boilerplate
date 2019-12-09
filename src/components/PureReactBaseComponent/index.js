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

const invalidReactToMessage = 'reactTo (second argument) must be function that return array';

export class PureReactBaseComponent extends React.PureComponent {
    state = {};
    __effects = [];
    __cleanupEffects = [];

    useEffect = (callback, reactTo) => {
        if (reactTo !== undefined && typeof reactTo !== 'function') {
            throw new Error(invalidReactToMessage);
        }

        if (typeof callback !== 'function') {
            throw new Error('Only functions can be passed into useEffect()');
        }

        let effect = {
            callback,
            reactTo,
        };

        // If we specify what we need react to when componentDidUpdate
        if (reactTo) {
            const reactions = reactTo();
            if (!Array.isArray(reactions)) {
                throw new Error(invalidReactToMessage);
            }

            effect.lastReactions = reactions;
        }

        this.__effects.push(effect);
    };

    componentWillUnmount() {
        for (const callback of this.__cleanupEffects) {
            callback();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        for (const effect of this.__effects) {
            if (effect.reactTo) {
                const reactions = effect.reactTo();
                if (!isEqual(effect.lastReactions, reactions)) {
                    effect.lastReactions = reactions;
                    effect.callback(false, true, prevProps, prevState);
                }
            } else {
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
