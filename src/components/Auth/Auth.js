import Route from '../../libs/route';
import Secutiry from '../../services/Security';

class Auth extends Route {

    constructor(){
        super('auth', { htmlName : 'public/views/Auth/Auth.html' });
        this.onMountCb = this.whenMounted
    }

    async whenMounted(){
        const forms = document.getElementsByClassName('need-validation');
        const formCount = forms.length - 1;
    
        for (let i = 0; i <= formCount; i++) {
          forms[i].addEventListener('submit', form => {
            validateForm(form.target);
          });
        }
    }
}


function login() {

    var loginBtn = document.getElementById('btnLogin');

    var data = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
      email: document.getElementById('username').value
    };

    loginBtn.setAttribute('disabled', true);
    const secutiry = new Secutiry(`${API_PATH}/login`);
    secutiry.login(data).then(response => {

      if (response.status === 201) {
        loginBtn.textContent = 'Loged!';
        window.localStorage.setItem('token', response.token);

        setTimeout(()=>{
          window.location.href = '#posts';
        },1000)
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

    const secutiry = new Secutiry(`${API_PATH}/register`);
    secutiry.register(data).then(response => {

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

var auth = new Auth();
export default auth;