import { useEffect } from 'react';
import { autorun } from 'mobx';
import userState from 'globalState/user';

let timeout = null;

function handleInitialFetching() {
    clearTimeout(timeout);

    if (!userState.initialFetching) {
        // Let's react take some time to render page before we hide preloader
        timeout = setTimeout(() => {
            // Hide global preloader
            document.getElementById('preloader').classList.add('hidden');
        }, 10);
    } else {
        // Show global preloader
        document.getElementById('preloader').classList.remove('hidden');
    }
}

export function useLayoutGlobalLoader() {
    useEffect(() => {
        return autorun(handleInitialFetching);
    });
}
