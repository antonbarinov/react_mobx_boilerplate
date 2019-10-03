function contextHelper(context, key) {
    if (!context.__asyncHelpers) context.__asyncHelpers = {};
    if (!context.__asyncHelpers[key]) context.__asyncHelpers[key] = { value: 0 };

    return context.__asyncHelpers[key];
}

function debounceFunc(context, key) {
    key += '__debounce';
    const contextData = contextHelper(context, key);

    return (delayInMs = 300) => {
        const currentValue = ++contextData.value;

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(currentValue === contextData.value);
            }, delayInMs);
        });
    };
}

function stillActualChecker(context, key) {
    key += '__stillActualChecker';
    const contextData = contextHelper(context, key);
    const currentValue = ++contextData.value;

    return () => {
        const isActual = currentValue === contextData.value;
        if (!isActual) {
            const err = new Error('Not actual any more');
            err.nonActual = true;
            throw err;
        }

        return isActual;
    };
}

/**
 * Don't exec "func" if other "func" in progress yet
 * @param {Object} context
 * @param {string} key
 * @param {function} func
 */
export function withOnlyOneInTime(context, key, func) {
    (async () => {
        key += '__withOnlyOneInTime';
        const contextData = contextHelper(context, key);
        if (contextData.value === 1) return false;

        contextData.value = 1;

        try {
            await func();
        }
        catch (e) {
            throw e;
        }
        finally {
            contextData.value = 0;
        }
    })();
}

/**
 * Debounce function
 * @callback withAsyncHelpersDebounceFunction
 * @param {number} [ms=300]
 * @returns Promise<boolean>
 */
/**
 * Use helpers for typical async operations
 * @param {Object} context
 * @param {string} key
 * @param { function({ stillActualCheckpoint: {function(): void}, debounce: withAsyncHelpersDebounceFunction }) } func
 */
export function withAsyncHelpers(context, key, func) {
    (async () => {
        const stillActualCheckpoint = stillActualChecker(context, key);
        const debounce = debounceFunc(context, key);

        try {
            await func({
                stillActualCheckpoint,
                debounce,
            });
        }
        catch (e) {
            if (!e.nonActual) throw e;
        }
    })();
}


const sleep = (ms) => new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, ms);
});


export class WithRetries {
    maxRetries = 5;
    retriesPlan = [
        100,
        200,
        300,
        1000,
    ];
    stillActualFunction = null;

    setMaxRetries = (maxRetries) => {
        this.maxRetries = maxRetries;
        return this;
    };

    setRetriesPlan = (retriesPlan) => {
        this.retriesPlan = retriesPlan;
        return this;
    };

    setStillActualFunction = (stillActualFunction) => {
        this.stillActualFunction = stillActualFunction;
    };

    checkActuality = () => {
        if (typeof this.stillActualFunction === 'function') return this.stillActualFunction();
        return true;
    };

    exec = (func) => {
        const { maxRetries, retriesPlan } = this;

        const unActualResolveKey = 'unActual';
        const maxRetriesReachedKey = 'maxRetriesReachedKey';

        return new Promise(async (resolve, reject) => {
            try {
                if (!this.checkActuality()) {
                    resolve(unActualResolveKey);
                    return false;
                }

                const result = await func();
                resolve(result);
                return;
            }
            catch (e) {
                console.error(e);
                console.log('Trying to retry');

                for (let i = 0; i < maxRetries; i++) {
                    if (!this.checkActuality()) {
                        resolve(unActualResolveKey);
                        break;
                    }

                    const delay = retriesPlan[i] || retriesPlan[retriesPlan.length - 1];
                    await sleep(delay);
                    console.log(`Try after ${delay}ms delay`);

                    try {
                        const result = await func();
                        resolve(result);
                        break;
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
            }

            reject(maxRetriesReachedKey);
        });
    };
}
