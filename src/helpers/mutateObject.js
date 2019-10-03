const isArray = (value) => {
    return Array.isArray(value);
};

const isEnumerable = (value) => {
    return value !== null && typeof value === 'object';
};

const cleanArray = (oldArray, newArray) => {
    if (newArray.length < oldArray.length) {
        oldArray.splice(newArray.length, oldArray.length - newArray.length);
    }
    return oldArray;
};

const cleanObj = (oldObj, newObj) => {
    for (const prop in oldObj) {
        if (oldObj.hasOwnProperty(prop) && !newObj.hasOwnProperty(prop)) {
            delete oldObj[prop];
        }
    }
};

const mutateObject = (oldState, newState, preserveRootProps) => {
    if (isEnumerable(newState)) {
        const isSrcArray = isArray(newState);
        oldState = (isEnumerable(oldState) && isArray(oldState) === isSrcArray && oldState) || (isSrcArray ? [] : {});
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
        }
        else {
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

export default mutateObject;
