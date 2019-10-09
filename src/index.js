import env from './env';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Request from './services/Request';

function login() {

    var loginBtn = document.getElementById('btnLogin');

    var data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        email: document.getElementById('username').value
    };

    loginBtn.setAttribute('disabled', true);
    const request = new Request();
    request.post(`${env.API_PATH}/login`, data).then(response => {

        if (response.status === 201) {
            loginBtn.textContent = 'Loged!';
            window.localStorage.setItem('token', response.token)
        } else {
            loginBtn.removeAttribute('disabled');
            alert('credenciales invalidas');
        }
    }).catch(error => {
        console.log(error);
    })

}

function register() {
    var registerBtn = document.getElementById('btnRegister');

    var data = {
        name: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password1').value
    };

    registerBtn.setAttribute('disabled', true);

    const request = new Request();
    request.post(`${env.API_PATH}/register`, data).then(response => {

        if (response.status === 201) {
            registerBtn.textContent = 'Registered!';
        } else {
            registerBtn.removeAttribute('disabled');
            document.getElementById('emailExtisOnRegister').classList.remove('hide');
            document.getElementById('emailExtisOnRegister').classList.add('show');
        }
    }).catch(error => {
        console.log(error);
        registerBtn.removeAttribute('disabled');
    })

}

function validateForm(form) {
    event.preventDefault();
    if (form.checkValidity() === false) {
        event.stopPropagation();
    } else {
        if (form.getAttribute('id') === 'registerForm') {
            register();
        } else if (form.getAttribute('id') === 'loginForm') {
            login();
        }
    }
    form.classList.add('was-validated');
}

window.onload = () => {
    const forms = document.getElementsByClassName('need-validation');
    const formCount = forms.length - 1;

    for (let i = 0; i <= formCount; i++) {
        forms[i].addEventListener('submit', form => {
            validateForm(form.target);
        });
    }
}