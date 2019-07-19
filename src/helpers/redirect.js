import { redirect } from 'lib/router';

export function smartRedirect(to) {
    const redirectTo = window.localStorage.getItem('redirect');
    if (redirectTo) {
        window.localStorage.removeItem('redirect');
        redirect(redirectTo);
    } else {
        redirect(to);
    }
}
