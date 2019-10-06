import { action, observable } from 'mobx';

window.addEventListener('offline', updateOnline);
window.addEventListener('online', updateOnline);

function updateOnline() {
    onlineState.online = navigator.onLine;
}
updateOnline = action(updateOnline);

class Online {
    @observable online = navigator.onLine;
}

const onlineState = new Online();

export default onlineState;
