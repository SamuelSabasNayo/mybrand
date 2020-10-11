// ---------------- login ------------------------------
// selectors
const loginForm = document.getElementById('login-form');
// const signupError = document.querySelector('#form-error');
const emailError = document.querySelector('#email-error');
const loginError = document.querySelector('#form-error');
const passwordError = document.querySelector('#password-error');

async function login() {
    // get user infos
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;


    var regEx = /^([a-z0-9_\-.]+)@([a-z0-9\-.]+)\.([a-z]{2,5})$/;

    // ----------------- validate email -------------------------
    if (email == '' || password == '') {
        let error1 = document.createElement('p');

        error1.setAttribute('id', 'error');

        error1.textContent = 'Enter email and password.';

        loginError.appendChild(error1);

    // ----------------- validate email with regEx ------------------
    } else if (!regEx.test(email)) {
        let error2 = document.createElement('p');

        error2.setAttribute('id', 'error');

        error2.textContent = 'Enter a valid email.';

        emailError.appendChild(error2);

    // ----------------- validate password with regEx ------------------
    } else if (!password.match(/[^a-zA-Z\d]/) || password.length <= 6 || password.length >= 12) {
        let error3 = document.createElement('p');

        error3.setAttribute('id', 'error');

        error3.textContent = 'Enter a valid password.';

        passwordError.appendChild(error3);
        console.log('sam1');

    } else {
        try {
            auth.signInWithEmailAndPassword(email, password)
                .then(user => {
                    console.log(user);
                });
            
                window.location = 'blogs-management.html';
        } catch (error) {
            console.log(error);
        }    
    }
};


document.querySelectorAll('input')
    .forEach((input) => input
    .addEventListener('keydown', () => {
        // signupError.innerHTML = '';
        emailError.innerHTML = '';
        passwordError.innerHTML = '';
        loginError.innerHTML = '';
    }));