import { action, observable } from 'mobx';
import ApiRequest, { getUserAccessToken } from 'lib/apiRequest';


class User {
    @observable initialFetching = true;
    @observable isFetching = true;
    @observable user = false;
    @observable authorized = false;

    constructor() {
        this.fetchMe().catch(console.error);
    }

    @action fetchMe = async () => {
        const accessToken = getUserAccessToken();

        try {
            if (accessToken) {
                this.isFetching = true;
                const response = await new ApiRequest('GET /me').send();
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

    @action logout = () => {
        window.localStorage.removeItem('accessToken');
        this.user = false;
        this.authorized = false;
    }

    @action login = async (data) => {
        const response = await new ApiRequest('POST /login', false).sendJSON(data);
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

    @action signup = async (data) => {
        const response = await new ApiRequest('POST /signup', false).sendJSON(data);
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

const userState = new User();

export default userState;
