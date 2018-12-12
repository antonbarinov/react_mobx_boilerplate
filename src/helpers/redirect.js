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