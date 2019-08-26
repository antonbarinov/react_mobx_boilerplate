import { observable } from 'mobx';

window.addEventListener('offline', updateOnline);
window.addEventListener('online', updateOnline);

function updateOnline() {
    onlineState.online = navigator.onLine;
}


class Online {
    @observable online = navigator.onLine;
}

const onlineState = new Online();

export default onlineState;
