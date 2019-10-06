import { useEffect } from 'react';

export default function useOutSideClick(elemRef, cb) {
    useEffect(() => {
        const handleClick = (e) => {
            if (elemRef.current && !elemRef.current.contains(e.target)) cb(e);
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, []);
}
