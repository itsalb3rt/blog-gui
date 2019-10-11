import Router from './libs/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Auth,Logout,List} from './components/Components'
import Store from './services/Store';

//icons
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

async function validateSession(){

    //get token from local storage
    const token = localStorage.getItem('token');

    // // if token if null or undefined return to login page
    if (token === null || token === undefined){
        window.location.href = '/#auth';
    }
    
    if(window.location.pathname === '/'){
        window.location.href = '/#posts';
    }

    // Set this variables to global, will be use on SPA.
    window.store = new Store(API_PATH, token);
    // window.me = await blogapi.getMe();

    // if me is undefined resturn to login page.
    // if (me === undefined){
    //     localStorage.removeItem('token');
    //     window.location.href = '/#auth';
    // }

    // if all is fine handle create router handler.
    var routes = [Auth,Logout,List];
    var router = new Router('app', routes);
}


window.onload = () => {
    validateSession();
}