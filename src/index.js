function login() {

    var loginBtn = document.getElementById('btnLogin');

    var data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        email: document.getElementById('username').value
    };

    loginBtn.setAttribute('disabled', true);

    fetch(`${API_PATH}/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {

            if (response.status === 400) {
                loginBtn.removeAttribute('disabled');
                alert('credenciales invalidas');
            } else if (response.status === 201) {
                loginBtn.textContent = 'Loged!';
            }

            return response.json();
        })
        .then(response => {
            console.log('Success:', response)
        })
        .catch(error => {
            loginBtn.removeAttribute('disabled');
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

    fetch(`${API_PATH}/register`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {

            if (response.status === 400) {
                registerBtn.removeAttribute('disabled');
                document.getElementById('emailExtisOnRegister').classList.remove('hide');
                document.getElementById('emailExtisOnRegister').classList.add('show');
            } else if (response.status === 201) {
                registerBtn.textContent = 'Registered!';
            }

            return response.json();
        })
        .then(response => {
            console.log('Success:', response)
        })
        .catch(error => {
            registerBtn.removeAttribute('disabled');
            console.log(error);
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

window.onload = () =>{
    const forms = document.getElementsByClassName('need-validation');
    const formCount = forms.length -1;

    for(let i = 0; i <= formCount ;i++){
       forms[i].addEventListener('submit',form=>{
            validateForm(form.target);
        });
    }
}