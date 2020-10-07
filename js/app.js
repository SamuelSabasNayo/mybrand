// ---------------- signUp ------------------------------
// selectors
const signupForm = document.querySelector('#signup-form');
const signupError = document.querySelector('#form-error');
const emailError = document.querySelector('#email-error');
const passwordError = document.querySelector('#password-error');
const confirmPasswordError = document.querySelector('#confirm-password-error');

async function signUp() {
    // get user infos
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    const confirmPassword = signupForm['confirm-password'].value;

    var regEx = /^([a-z0-9_\-.]+)@([a-z0-9\-.]+)\.([a-z]{2,5})$/;

    // ----------------- validate email -------------------------
    if (email == '' || password == '') {
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
        console.log('sam1');

        // let arr = ['At least 1 uppercase character.',
        //     'At least 1 lowercase character.',
        //     'At least 1 digit.',
        //     'At least 1 special character.',
        //     'Minimum 6 characters.'
        // ];

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
                });

                init();
        } catch (error) {
            var errorCode = error.code,
                errorMessage = error.message;
                
            if (errorCode == 'auth/weak-password') {
                // alert('The password is too weak.');
                    signupError.innerHTML = '<p>The password is too weak.</p>';
                    signupError.style.display = 'block';
            }
            else {
                console.log(errorMessage);
            }
        }
    }
};



// ----------------- send querry ----------------------------------
// selectors
const contactForm = document.querySelector('#contact-form');
const formError = document.querySelector('#form-error');
// const emailError = document.querySelector('#email-error');
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
                console.log('Hello Sam');
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



// ---------------- login ------------------------------
// selectors
const loginForm = document.getElementById('login-form');
const loginError = document.querySelector('#form-error');
// const emailError = document.querySelector('#email-error');
// const passwordError = document.querySelector('#password-error');


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
        console.log('sam1');

    } else {
        try {
            auth.signInWithEmailAndPassword(email, password)
                .then(user => {
                    console.log(user);
                });
            
            init();
        } catch (error) {
            console.log(error);
        }    
    }
};



// ---------------- signOut ------------------------------
// selectors
const logout = document.getElementById('logout');

async function logOut() {
    try {
        auth.signOut()
            .then(() => {
                console.log('User signed out');
            });

            init();
    } catch (error) {
        console.log(error);
    }
};



// -------------------- add a blog by form -------------------------
// selectors
const form = document.querySelector('#add-blog');

async function addBlog() {
    await db.collection('blogs').add({
        title: form.title.value,
        author: form.author.value,
        content: form.content.value,
        file: form.file.value,
        time: form.time.value
    }).then((blog) => {
        console.log(blog);
    });
    form.title.value = '',
    form.author.value = '',
    form.content.value = '',
    form.file.value = ''
    form.time.value = ''
};



// ----------------- render blogs ---------------------------
const myBlogs = document.getElementById('my-blogs');

const renderBlogs = (doc) => {
    let blog = document.createElement('div');
    let blogBox = document.createElement('div');
    let time = document.createElement('span');
    let author = document.createElement('span');
    let title = document.createElement('h2');
    let content = document.createElement('p');
    // let file = document.createElement('div');
    let p = document.createElement('p');
    let options = document.createElement('div');
    let editBlog = document.createElement('div');
    let deleteBlog = document.createElement('div');
    
    blog.setAttribute('class', 'blog');
    blogBox.setAttribute('class', 'blog-box');
    time.setAttribute('class', 'blog-time');
    author.setAttribute('class', 'blog-author');
    title.setAttribute('class', 'blog-title');
    content.setAttribute('class', 'blog-text');
    // p.setAttribute('class', 'p');
    options.setAttribute('class', 'options');
    editBlog.setAttribute('class', 'edit-blog');
    deleteBlog.setAttribute('class', 'delete-blog');
    deleteBlog.setAttribute('data-id', doc.id);

    blogBox.textContent = 'Image';
    time.textContent = doc.data().time;
    author.textContent = `by ${doc.data().author}`;
    title.textContent = doc.data().title;
    content.textContent = doc.data().content;
    // file.textContent = doc.data().file;
    editBlog.textContent = 'Edit A Blog';
    deleteBlog.textContent = 'Delete A Blog';
    
    blog.appendChild(blogBox);
    p.appendChild(time);
    p.appendChild(author);
    blog.appendChild(p);
    blog.appendChild(title);
    blog.appendChild(content);
    // blog.appendChild(file);
    options.appendChild(editBlog);
    options.appendChild(deleteBlog);
    blog.appendChild(options);

    myBlogs.appendChild(blog);

    
    // ----------------- deleting blogs ---------------------------

    deleteBlog.addEventListener('click', (e) => {
        e.stopPropagation();

        let dataId = e.target.getAttribute('data-id');
    
        db.collection('blogs').doc(dataId).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    })
};

db.collection('blogs').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderBlogs(doc);
    })
});



// ----------- rendering number of users --------------
const numberOfUsers = () => {

    db.collection("users").get().then(function(querySnapshot) {
        const allUsers = document.getElementById('all-users');

        let numUsers = document.createElement('p');

        numUsers.textContent = querySnapshot.size;

        allUsers.appendChild(numUsers);
    });
};

numberOfUsers();



// ------------ rendering number of blogs ----------------
const numberOfBlogs = () => {

    db.collection("blogs").get().then(function(querySnapshot) {
        const allBlogs = document.getElementById('all-blogs');

        let numBlogs = document.createElement('p');

        numBlogs.textContent = querySnapshot.size;
        
        allBlogs.appendChild(numBlogs);
    });
};

numberOfBlogs();


// ------------------ rendering number of querries ------------------------
const numberOfQueries = () => {

    db.collection("querries").get().then(function(querySnapshot) {
        const allQueries = document.getElementById('all-queries');

        let numQueries = document.createElement('p');

        numQueries.textContent = querySnapshot.size;

        allQueries.appendChild(numQueries);
    });
};

numberOfQueries();



//---------------------- storing files ----------------------------------
const uploadedFile = document.querySelector('#uploaded-file');

function upload(blog) {
    // uploadedFile.onchange = (event) => {
    //     let images = {};
    //     images = event.target.files[0];
    //     firebase.storage().ref(`blogs/image/${blog}`).put(images).then((images) => {
    //         db.collection('images').doc(blog).set({
    //             file: images
    //         });
    //     }).catch ((error) => {
    //         console.log(error);
    //     });
    // }
};



// --------- listen for auth status changes -------------
async function init() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log(`User logged in as: ${user.email}`);
            //  ----------- get blogs  --------------
            db.collection('blogs').get()
            .then((blogSnapshot) => {
                blogSnapshot.forEach((doc) => {
                console.log(`Blogs: ${ doc.id } => ${ doc.data  () }`);
                upload(doc.id);
                });
            });

            // renderBlogs(doc);

            //  ------------- redirect a user    --------------
            window.location.href = 'blogs-management.html';
            console.log('hello sam1');
        } else {
            // const setupBlogs = () => {
                console.log('User logged out');
            // }
            // setupBlogs();

            //  ------------- redirect a user    --------------
            window.location.href = 'blogs.html';
            // console.log('hello sam');
        }
    });



    // ---------- create data -------------
    // db.collection('users').add({
    //     name: 'Papa Papi',
    //     email: 'papi@papa.com',
    //     location: 'Kabuga I'
    // })
    //     .then((doc) => {
    //         console.log(`User added with ID: ${doc}`);
    //     })
    //     .catch((error) => {
    //         console.error(`Error adding user: ${error}`)
    //     });


    // ---------- read data ---------------
    // db.collection('users').get()
    //     .then((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //         console.log(`Users: ${ doc.id } => ${ doc.data() }`);
    //     });
    // });


    // function toggleForm() {
    //     const body = document.querySelector('body');
    //     body.classList.toggle('active');
    // }
};


// let loginSubmitBtn = document.getElementById('submit-btn');
// console.log(loginSubmitBtn.dataset.target);
// loginSubmitBtn.dataset.target = '#blogs-management.html';
// console.log(loginSubmitBtn.dataset.target);