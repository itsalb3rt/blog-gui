import Route from '../../libs/route';

class Logout extends Route {

    constructor() {
        super('logout',{ content: '<h5>Loading page</h5>' });
        this.onMountCb = this.whenMounted;
    }

    async whenMounted() {
        document.getElementById('app-navbar').style.display = 'none';
        window.localStorage.removeItem('token');
        window.location.href = '#auth';
    }
}

var logout = new Logout();
export default logout;