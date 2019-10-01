function login() {

    var loginBtn = document.getElementById('btnLogin');

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var data = {
        username: username,
        password: password,
        email: username
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

function validateForm(form) {

    if (form.checkValidity() === false) {
        event.preventDefault();
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