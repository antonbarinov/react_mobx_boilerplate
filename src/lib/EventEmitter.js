export class EventEmitter {
    constructor() {
        this.events = {};
        this.logEmits = true;
    }

    // eventName can be also array of event names
    emit(eventName, ...restParams) {
        let eventNames = eventName;
        if (!Array.isArray(eventName)) eventNames = [eventName];

        for (const eventName of eventNames) {
            const events = this.events[eventName];

            if (this.logEmits) {
                let subscribersCount = 0;
                if (events) subscribersCount = events.size;

                console.log(`EventEmitter emits: "${eventName}", subscribers: ${subscribersCount}`);
            }

            if (events) {
                events.forEach((fn) => {
                    fn.call(null, ...restParams);
                });
            }
        }
    }

    // eventName can be also array of event names
    subscribe(eventName, fn) {
        let eventNames = eventName;
        if (!Array.isArray(eventName)) eventNames = [eventName];

        for (const eventName of eventNames) {
            if (!this.events[eventName]) {
                this.events[eventName] = new Set();
            }

            const events = this.events[eventName];

            events.add(fn);
        }

        // or use unsubscribe function
        return this.unsubscribe.bind(this, eventName, fn);
    }

    // eventName can be also array of event names
    unsubscribe(eventName, fn) {
        let eventNames = eventName;
        if (!Array.isArray(eventName)) eventNames = [eventName];

        for (const eventName of eventNames) {
            const events = this.events[eventName];

            if (events) events.delete(fn);
        }
    }
}

export const globalEventEmitter = new EventEmitter();
