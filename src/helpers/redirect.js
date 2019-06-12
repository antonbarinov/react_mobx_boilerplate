let history = null;

export function setHistory(h) {
    history = h;
}

export function helperRedirect(to) {
    history && history.push(to);
}

export function helperRedirectReplace(to) {
    history && history.replace(to);
}

export function smartRedirect(to) {
    const redirectTo = window.localStorage.getItem('redirect');
    if (redirectTo) {
        window.localStorage.removeItem('redirect');
        helperRedirect(redirectTo);
    } else {
        helperRedirect(to);
    }
}
