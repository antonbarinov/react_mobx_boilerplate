import { useEffect } from 'react';

/**
 * useScroll callback function
 * @callback useScrollCallback
 * @param e
 * @param {number} maxScrollTop
 * @param {number} scrollTop
 */

/**
 * Handle scroll event on element with helpers calculations
 * @param scrollContainerRef
 * @param {useScrollCallback} cb
 */
export default function useScroll(scrollContainerRef, cb) {
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;

        const handleScroll = e => {
            const { target } = e;
            const { scrollTop } = target;
            const maxScrollTop = target.scrollHeight - target.offsetHeight;

            cb(e, maxScrollTop, scrollTop);
        };

        scrollContainer.addEventListener('scroll', handleScroll);

        return () => {
            scrollContainer.removeEventListener('scroll', handleScroll);
        };
    }, []);
};