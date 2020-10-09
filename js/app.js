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

    // ----------------- validate email -----------------------
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
                window.location = 'blogs-managemnt.html';
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



// ---------------- login ------------------------------
// selectors
const loginForm = document.getElementById('login-form');
const loginError = document.querySelector('#form-error');

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



// ---------------- signOut ------------------------------
// selectors
const logout = document.getElementById('logout');

async function logOut() {
    try {
        auth.signOut()
            .then(() => {
                console.log('User signed out');
                window.location.href = 'blogs.html';
            });

            // init();
    } catch (error) {
        console.log(error);
    }
};



//------------- storing images ----------------------------------
// const uploadedFile = document.querySelector('#uploaded-file');
// let blogImage = [];
// ------------- variables -------------
// let imgName, imgUrl;
// let files = [];
// let reader;

// // ------------- selection process ------------
// document.getElementById('uploadImage').onclick = function(e) {

//     let input = document.createElement('input');
//     input.type = 'file';

//     input.onchange = e => {
//         files = e.target.files;
//         reader = new FileReader();
//         reader.onload = function() {
//             document.getElementById('myimg').src = reader.result;
//         }
//         reader.readAsDataURL(files[0]);
//     }
//     input.click();
// };



// function uploadImage(e) {
//     if (e.target.files[0] != null) {
//         blogImage = e.target.files[0];
//         console.log(blogImage);
//     } else {
//         console.log('Image not captured.')
//     }
// }

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



// async function addBlog() {
//     await db.collection('blogs').add({
//         title: form.title.value,
//         author: form.author.value,
//         content: form.content.value,
//         time: form.time.value,
//         id = blogRandomId()

//     }).then((blog) => {
//         console.log(blog);
//     });
//     form.title.value = '',
//     form.author.value = '',
//     form.content.value = '',
//     // form.file.value = ''
//     form.time.value = ''
// };

function blogRandomId() {
    return Math.floor(Math.random() * 10000000000) + 1;
};

// ----------- render blogs ---------------
const myBlogs = document.getElementById('my-blogs');

const renderBlogs = (doc) => {
    let blog = document.createElement('div');
    let blogBox = document.createElement('div');
    let title = document.createElement('h2');
    let image = document.createElement('img');
    let time = document.createElement('span');
    let author = document.createElement('span');
    let content = document.createElement('p');
    // let file = document.createElement('div');
    let p = document.createElement('p');
    let options = document.createElement('div');
    let editBlog = document.createElement('div');
    let deleteBlog = document.createElement('div');
    
    blog.setAttribute('class', 'blog');
    blogBox.setAttribute('class', 'blog-box');
    title.setAttribute('class', 'blog-title');
    image.setAttribute('class', 'blog-image');
    time.setAttribute('class', 'blog-time');
    author.setAttribute('class', 'blog-author');
    content.setAttribute('class', 'blog-text');
    // p.setAttribute('class', 'p');
    options.setAttribute('class', 'options');
    editBlog.setAttribute('class', 'edit-blog');
    deleteBlog.setAttribute('class', 'delete-blog');
    deleteBlog.setAttribute('data-id', doc.id);

    blogBox.textContent = 'Image';
    time.textContent = doc.data().time;
    image.textContent = doc.data().image;
    author.textContent = `by ${doc.data().author}`;
    title.textContent = doc.data().title;
    content.textContent = doc.data().content;
    // file.textContent = doc.data().file;
    editBlog.textContent = 'Edit A Blog';
    deleteBlog.textContent = 'Delete A Blog';
    
    blog.appendChild(blogBox);
    blog.appendChild(title);
    blog.appendChild(image);
    p.appendChild(time);
    p.appendChild(author);
    blog.appendChild(p);
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
        // renderBlogs(doc);
        fetchImage();
    })
});




// ----------- render users ---------------
const myUsers = document.getElementById('my-users');

const renderUsers = (doc) => {
    let myUser = document.createElement('div');
    let userName = document.createElement('p');
    let userEmail = document.createElement('p');

    myUser.setAttribute('class', 'admin-users');
    userName.setAttribute('class', 'blog-text');
    userEmail.setAttribute('class', 'blog-text');

    userName.textContent = `Name: ${doc.data().name}`;
    userEmail.textContent = `Email: ${doc.data().email}`;
    
    myUser.appendChild(userName);
    myUser.appendChild(userEmail);

    myUsers.appendChild(myUser);
};


db.collection('users').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderUsers(doc);
    })
});




// ----------- render Queries ---------------
const myQueries = document.getElementById('my-queries');

const renderQueries = (doc) => {
    let myQuery = document.createElement('div');
    let userEmail = document.createElement('p');
    let userQuery = document.createElement('p');

    myQuery.setAttribute('class', 'admin-users');
    userEmail.setAttribute('class', 'blog-text');
    userQuery.setAttribute('class', 'blog-text');

    userEmail.textContent = `Email: ${doc.data().email}`;
    userQuery.textContent = `Name: ${doc.data().querry}`;
    
    myQuery.appendChild(userEmail);
    myQuery.appendChild(userQuery);

    myQueries.appendChild(myQuery);
};


db.collection('querries').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderQueries(doc);
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


// ------------ rendering number of querries -----------------
const numberOfQueries = () => {

    db.collection("querries").get().then(function(querySnapshot) {
        const allQueries = document.getElementById('all-queries');

        let numQueries = document.createElement('p');

        numQueries.textContent = querySnapshot.size;

        allQueries.appendChild(numQueries);
    });
};

numberOfQueries();




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

// selectors
const form = document.querySelector('#add-blog');

// ------------- variables -------------
let files = [];
let reader;

// ------------- selection process ------------
document.getElementById('upload-image').onclick = function(e) {

    let input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => {
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function() {
            document.getElementById('myimg').src = reader.result;
        }
        reader.readAsDataURL(files[0]);
    }
    input.click();
};

// ------------- upload process ------------
document.getElementById('submit-image').onclick = function() {
    ImgName = blogRandomId();
    let title = form.title.value,
        author = form.author.value,
        content = form.content.value,
        time = form.time.value;
    let uploadTask = firebase.storage().ref('images/'+ImgName+'.png').put(files[0]);

    uploadTask.on('state_changed', function() {
        // console.log('my-image stored');
        db.collection('blogs').doc(`${ImgName}`).set({
            title: title,
            imageUrl: 'images/'+ImgName+'.png',
            author: author,
            content: content,
            time: time
        }).then(() => {
            console.log('Blog created');
        })
    },

    function fetchImage() {
        db.collection('blogs').get().then((querySnapshot) => {
            querySnapshot.forEach((blog) => {
                storage.ref(blog.data().imageUrl).getDownloadURL().then((url) => {
                    blogs.push({
                        title: blog.data().title,
                        imageUrl: blog.data().imageUrl,
                        author: blog.data().author,
                        content: blog.data().content,
                        time: blog.data().time
                    });
                    console.log('Blog downloaded.');
                }).catch((error) => {
                    console.log(`Downloading error: ${error}`);
                });
            });
        }).catch((error) => {
            console.log(`Rendering error: ${error}`);
        });
    }
    // ------------- error handling ------------
    // function(error) {
    //     console.log('error in saving the image');
    // }

    // ------------- submit image link to firestore ------------
        // storage.ref(blog.data).getDownloadURl().then(function(url) {
            // ImgUrl = url;
            // return url;
            // console.log(url);
            // db.collecton('images/'+ImgUrl).set({
                // Name: ImgName,
                // Link: ImgUrl
            // });
            
        // })
        // }
    );
};

console.log('sam1');