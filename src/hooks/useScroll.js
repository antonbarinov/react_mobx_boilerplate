import { useEffect } from 'react';

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

