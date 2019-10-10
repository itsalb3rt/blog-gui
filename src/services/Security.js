import Request from './Request'

export default class Security {

    constructor(path) {
        this.path = path;
        this.request = new Request();
    }

    async login(credentials) {
        let response = await this.request.post(`${this.path}`, credentials);
        return response;
    }

    async register(user) {

        let response = await this.request.post(`${this.path}`, user);
        return response;
    }

}