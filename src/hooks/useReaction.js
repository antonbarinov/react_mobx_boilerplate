import { useEffect, useRef } from 'react';
import { reaction } from 'mobx';

export default function useReaction(reactionFunc, reactToFunc, debounce = 0, fireImmediately = false) {
    useEffect(() => {
        let index = 1;
        let timeout;
        let options = {
            fireImmediately
        };

        const disposer = reaction(
            reactToFunc,
            (data, reaction) => {
                const storedIndex = ++index;
                if (debounce) {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        if (storedIndex === index) reactionFunc(data, reaction);
                    }, debounce);
                } else {
                    reactionFunc(data, reaction);
                }
            }, options);

        return () => {
            clearTimeout(timeout);
            disposer();
        }
    }, []);
};