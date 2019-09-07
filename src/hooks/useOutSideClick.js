import { useEffect } from 'react';

function closest(currentElem, elemToFind) {
    if (currentElem === elemToFind) return true;

    let parent = currentElem.parentNode;
    while (parent) {
        if (parent === elemToFind) return true;

        parent = parent.parentNode;
    }

    return false;
}

export default function useOutSideClick(elemRef, cb) {
    useEffect(() => {
        const elemToFind = elemRef.current || elemRef;

        const handleClick = (e) => {
            if (!closest(e.target, elemToFind)) cb();
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        }
    }, []);
}
