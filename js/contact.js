// ----------------- send querry ----------------------------------
// selectors
const contactForm = document.querySelector('#contact-form');
const formError = document.querySelector('#form-error');
const querryError = document.querySelector('#querry-error');

async function sendQuerry() {
    // get user infos
    const email = contactForm['contact-email'].value;
    const querry = contactForm['contact-message'].value;

    var regEx = /^([a-z0-9_\-.]+)@([a-z0-9\-.]+)\.([a-z]{2,5})$/;

    // ----------------- validate email -------------------------
    if (email == '' || querry == '') {
        let error1 = document.createElement('p');

        error1.setAttribute('id', 'error');

        error1.textContent = 'Enter email and querry.';

        formError.appendChild(error1);

    // ----------------- validate email with regEx ------------------
    } else if (!regEx.test(email)) {
        let error2 = document.createElement('p');

        error2.setAttribute('id', 'error');

        error2.textContent = 'Enter a valid email.';

        emailError.appendChild(error2);

    } else {
        try {
            db.collection('querries').add({
                email: email,
                querry: querry
            }).then((querry) => {
                console.log(querry);
                console.log('A query is sent');
            });
            email = '',
            querry = ''
        } catch (error) {
            var errorCode = error.code,
                errorMessage = error.message;

            console.log(errorMessage);
        }
    }
};