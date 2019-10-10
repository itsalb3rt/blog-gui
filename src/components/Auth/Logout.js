import Route from '../../libs/route';
import Secutiry from '../../services/Security';

class Logout extends Route {

    constructor() {
        super('logout',{ content: '<h5>Loading page</h5>' });
        this.onMountCb = this.whenMounted;
    }

    async whenMounted() {
        window.localStorage.removeItem('token');
        window.location.href = '#auth';
    }
}

var logout = new Logout();
export default logout;