import { observable, reaction } from 'mobx';
import onlineState from 'globalState/online';

export default class {
    @observable showOverlay = onlineState.online === false;

    reactionOnOnlineChangeEffect = () => {
        const checkOverlay = () => {
            this.showOverlay = onlineState.online === false;
        };

        const disposer = reaction(
            () => [ onlineState.online ],
            checkOverlay
        );

        checkOverlay();

        return disposer;
    };

    handleClick = () => {
        this.showOverlay = false;
    }
}
