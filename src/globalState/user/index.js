import { observable, action } from 'mobx';
import apiRequest, { getUserAccessToken } from 'lib/apiRequest';


class User {
    @observable initialFetching = true;
    @observable isFetching = true;
    @observable user = false;
    @observable authorized = false;

    constructor() {
        this.fetchMe().catch(console.error);
    }

    @action
    async fetchMe() {
        const accessToken = getUserAccessToken();

        try {
            if (accessToken) {
                this.isFetching = true;
                const response = await new apiRequest('GET /me').send();
                this.user = response.getData();
                this.authorized = true;
            }
        }
        catch (e) {
            this.user = false;
            this.authorized = false;

            throw e;
        }
        finally {
            this.initialFetching = false;
            this.isFetching = false;
        }
    }

    @action logout() {
        window.localStorage.removeItem('accessToken');
        this.user = false;
        this.authorized = false;
    }

    @action
    async login(data) {
        const response = await new apiRequest('POST /login', false).sendJSON(data);
        const respData = response.getData();

        if (respData.accessToken) {
            window.localStorage.setItem('accessToken', respData.accessToken);

            await this.fetchMe();
        }
        // Something wrong here
        else {
            throw new Error(`Unexpected server authorization error`);
        }

        return respData;
    }

    @action
    async signup(data) {
        const response = await new apiRequest('POST /signup', false).sendJSON(data);
        const respData = response.getData();

        if (respData.accessToken) {
            window.localStorage.setItem('accessToken', respData.accessToken);
            await this.fetchMe();
        }
        // Something wrong here
        else {
            throw new Error(`Unexpected server registration error`);
        }

        return respData;
    }
}


export default new User();
