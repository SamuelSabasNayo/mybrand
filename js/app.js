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

