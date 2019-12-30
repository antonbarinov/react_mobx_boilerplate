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

const invalidReactToMessage = `reactTo (second argument) must be function that return array or just don't pass this argument`;

export class EnhancedComponent extends React.Component {
    state = {};
    __effects = [];
    __cleanupEffects = [];
    __lifeCycles = {
        update: [],
        mount: [],
        unmount: [],
    };

    constructor(props) {
        super(props);
    }

    /**
     * useScroll callback function
     * @callback useEffectCallback
     * @param {boolean} mount
     * @param {boolean} update
     * @param {Object} prevProps
     * @param {Object} prevState
     */
    /**
     * reactTo callback function
     * @callback reactToCallback
     */
    /**
     * useEffect
     * @param {useEffectCallback} callback
     * @param {reactToCallback} [reactTo]
     */
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

    /**
     * onUpdate callback function
     * @callback onUpdateCallback
     * @param {Object} prevProps
     * @param {Object} prevState
     */
    /**
     * onUpdate
     * @param {onUpdateCallback} callback
     */
    onUpdate = (callback) => {
        this.__lifeCycles.update.push(callback);
    };

    /**
     * onMount callback function
     * @callback onMountCallback
     */
    /**
     * onMount
     * @param {onMountCallback} callback
     */
    onMount = (callback) => {
        this.__lifeCycles.mount.push(callback);
    };

    /**
     * onUnmount callback function
     * @callback onUnmountCallback
     */
    /**
     * onUnmount
     * @param {onUnmountCallback} callback
     */
    onUnmount = (callback) => {
        this.__lifeCycles.unmount.push(callback);
    };

    componentWillUnmount() {
        for (const callback of this.__cleanupEffects) {
            callback();
        }

        for (const callback of this.__lifeCycles.unmount) {
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

        for (const callback of this.__lifeCycles.update) {
            callback(prevProps, prevState);
        }
    }

    componentDidMount() {
        for (const { callback } of this.__effects) {
            const result = callback(true, false);
            if (typeof result === 'function') this.__cleanupEffects.push(result);
        }

        for (const callback of this.__lifeCycles.mount) {
            callback();
        }
    }
}
