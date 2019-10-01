function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var data = {
        username: username,
        password: password,
        email: username
    };
    
    fetch(`${API_PATH}/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => console.log('Success:', response))
        .catch(error => console.error('Error:', error))

}

function validateForm(form) {

    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }else{
        if(form.getAttribute('id') === 'registerForm'){
            register();
        }else if(form.getAttribute('id') === 'loginForm'){
            login();
        }
    }
    form.classList.add('was-validated');

}
