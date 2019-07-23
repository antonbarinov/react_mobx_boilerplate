import { reaction } from 'mobx';
import userState from 'globalState/user';

let timeout = null;

// This effect fires only when component will unmount
export function hookHandleInitialFetching() {
    function handleInitialFetching() {
        clearTimeout(timeout);

        if (!userState.initialFetching) {
            // Let's react take some time to render page before we hide preloader
            timeout = setTimeout(() => {
                // Hide global preloader
                document.getElementById('preloader').classList.add('hidden');
            }, 10);
        }
        else {
            // Show global preloader
            document.getElementById('preloader').classList.remove('hidden');
        }
    }

    const dispose = reaction(
        () => {
            return userState.initialFetching;
        },
        () => {
            handleInitialFetching();
        });

    handleInitialFetching();

    return dispose;
}
