// ---------------- signUp ------------------------------
// selectors
const signupForm = document.querySelector('#signup-form');
const signupError = document.querySelector('#form-error');
const usernameError = document.querySelector('#username-error');
const emailError = document.querySelector('#email-error');
const passwordError = document.querySelector('#password-error');
const confirmPasswordError = document.querySelector('#confirm-password-error');

async function signUp() {
    // get user infos
    const username = signupForm['signup-username'].value;
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    const confirmPassword = signupForm['confirm-password'].value;

    var regEx = /^([a-z0-9_\-.]+)@([a-z0-9\-.]+)\.([a-z]{2,5})$/;

    // ----------------- validate username -----------------------
    if (username == '') {
        let error0 = document.createElement('p');

        error0.setAttribute('id', 'error');

        error0.textContent = 'Enter a username.';

        usernameError.appendChild(error0);

    // ----------------- validate email -----------------------
    } else if (email == '' || password == '') {
        let error1 = document.createElement('p');

        error1.setAttribute('id', 'error');

        error1.textContent = 'Enter email and password.';

        signupError.appendChild(error1);

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

    } else if (password !== confirmPassword) {
        let error4 = document.createElement('p');

        error4.setAttribute('id', 'error');

        error4.textContent = 'Passwords do not match..';

        confirmPasswordError.appendChild(error4);
    } else {
        try {
            // signup the user
            auth.createUserWithEmailAndPassword(email, password)
                .then(user => {
                    console.log(user);
                    init();
                });
            db.collection('users').add({
                username: username,
                email: email
            }).then(() => {
                console.log('User created');
            })
        } catch (error) {
            var errorCode = error.code,
                errorMessage = error.message;
                
            if (errorCode == 'auth/weak-password') {
                    signupError.innerHTML = '<p>The password is too weak.</p>';
                    signupError.style.display = 'block';
            }
            else {
                console.log(errorMessage);
            }
        }
    }
};
const signupHint = document.getElementById('signup-hint');

function passwordHint() {
    signupHint.innerHTML =
    `Password must have:<br>
    - An uppercase letter<br>
    - A lowercse letter<br>
    - A number<br>
    - A special charcter<br>
    - At least 6 chacters `;
}


document.querySelectorAll('input')
    .forEach((input) => input
        .addEventListener('keydown', () => {
            signupError.innerHTML = '';
            usernameError.innerHTML = '',
            emailError.innerHTML = '';
            passwordError.innerHTML = '';
            signupHint.innerHTML = '';
            confirmPasswordError.innerHTML = '';
        })
    );


// --------- listen for auth status changes -------------
async function init() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log(`User logged in as: ${user.email}`);
            //  ------------- redirect a user    --------------
            window.location.href = 'new-user.html';
        }
    });
}