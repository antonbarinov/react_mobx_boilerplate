export function sleep(ms = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function arrayChunk(array = [], chunkSize = 2) {
    let result = [];
    let i, j;
    for (i = 0, j = array.length; i < j; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }

    return result;
}

export function reactClosest(currentElem, elemToFind) {
    if (currentElem === elemToFind) return true;

    let parent = currentElem.parentNode;
    while (parent) {
        if (parent === elemToFind) return true;

        parent = parent.parentNode;
    }

    return false;
}

export function clone(object) {
    return JSON.parse(JSON.stringify(object));
}

function isPrimitive(obj) {
    return obj !== Object(obj);
}

export function deepEqual(obj1, obj2) {
    if (obj1 === obj2) return true;
    if (isPrimitive(obj1) && isPrimitive(obj2)) return obj1 === obj2;
    let obj1Len;
    let obj2Len;

    if (Array.isArray(obj1)) {
        obj1Len = obj1.length;
    } else {
        obj1Len = Object.keys(obj1).length;
    }

    if (Array.isArray(obj2)) {
        obj2Len = obj2.length;
    } else {
        obj2Len = Object.keys(obj2).length;
    }

    if (obj1Len !== obj2Len) return false;

    for (let key in obj1) {
        if (!(key in obj2)) return false; //other object doesn't have this prop
        if (!deepEqual(obj1[key], obj2[key])) return false;
    }

    return true;
}
