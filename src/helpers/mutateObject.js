import { set, toJS, isObservable, remove, observable } from 'mobx';

const isEnumerable = (value) => {
    return value !== null && typeof value === 'object';
};

const cleanArray = (oldArray, newArray) => {
    if (newArray.length < oldArray.length) {
        oldArray.splice(newArray.length, oldArray.length - newArray.length);
    }
    return oldArray;
};

function getHelperFunctions(mobxVersion) {
    let isArray, mutateObjectFn, cleanObj;
    if (mobxVersion === 4) {
        isArray = (value) => {
            if (typeof value.slice !== 'function') return false;
            return Array.isArray(value.slice());
        };

        cleanObj = (oldObj, newObj) => {
            for (const prop in oldObj) {
                if (oldObj.hasOwnProperty(prop) && !newObj.hasOwnProperty(prop)) {
                    remove(oldObj, prop);
                }
            }
        };

        mutateObjectFn = (oldState, newState, preserveRootProps) => {
            if (isEnumerable(newState)) {
                const isSrcArray = isArray(newState);
                oldState =
                    (isEnumerable(toJS(oldState)) &&
                        isArray(toJS(oldState)) === isSrcArray &&
                        oldState) ||
                    (isSrcArray ? [] : {});
                if (!preserveRootProps) {
                    isSrcArray ? cleanArray(oldState, newState) : cleanObj(oldState, newState);
                }
                if (isSrcArray) {
                    newState.forEach((value, i) => {
                        if (oldState.length < i + 1) {
                            oldState.push([]);
                        }
                        oldState[i] = mutateObject(oldState[i], value, false);
                    });
                } else {
                    for (const i in newState) {
                        if (newState.hasOwnProperty(i)) {
                            if (!isObservable(oldState)) {
                                try {
                                    oldState = observable(oldState);
                                } catch (e) {
                                    oldState = observable(JSON.parse(JSON.stringify(oldState)));
                                }
                            }

                            set(oldState, i, mutateObject(oldState[i], newState[i], false));
                        }
                    }
                }
                return oldState;
            }
            return newState;
        };
    } else {
        isArray = (value) => {
            return Array.isArray(value);
        };

        cleanObj = (oldObj, newObj) => {
            for (const prop in oldObj) {
                if (oldObj.hasOwnProperty(prop) && !newObj.hasOwnProperty(prop)) {
                    delete oldObj[prop];
                }
            }
        };

        mutateObjectFn = (oldState, newState, preserveRootProps) => {
            if (isEnumerable(newState)) {
                const isSrcArray = isArray(newState);
                oldState =
                    (isEnumerable(oldState) && isArray(oldState) === isSrcArray && oldState) ||
                    (isSrcArray ? [] : {});
                if (!preserveRootProps) {
                    isSrcArray ? cleanArray(oldState, newState) : cleanObj(oldState, newState);
                }
                if (isSrcArray) {
                    newState.forEach((value, i) => {
                        if (oldState.length < i + 1) {
                            oldState.push([]);
                        }
                        oldState[i] = mutateObject(oldState[i], value, false);
                    });
                } else {
                    for (const i in newState) {
                        if (newState.hasOwnProperty(i)) {
                            oldState[i] = mutateObject(oldState[i], newState[i], false);
                        }
                    }
                }
                return oldState;
            }
            return newState;
        };
    }

    return { isArray, mutateObjectFn, cleanObj };
}

const { mutateObjectFn } = getHelperFunctions(5); // Put MobX version here 4 or 5

const mutateObject = (oldState, newState, preserveRootProps) => {
    return mutateObjectFn(oldState, newState, preserveRootProps);
};

export default mutateObject;
