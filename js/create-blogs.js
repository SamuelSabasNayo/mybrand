
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
    }
    input.click();
};


function blogRandomId() {
    return Math.floor(Math.random() * 10000000000) + 1;
};

// --------- listen for auth status changes -------------
async function init() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            //  ----------- get users  --------------
            db.collection('users').get()
            .then((userSnapshot) => {
                userSnapshot.forEach((doc) => {
                    const currentUserName = doc.data().username;
                const currentUserEmail = doc.data().email;
                    if (currentUserEmail === user.email) {
                        console.log(`User logged in as: ${currentUserName} with ${user.email}`);

                        // ------------- upload process ------------
                        document.getElementById('submit-image').onclick = function() {
                            ImgName = blogRandomId();
                            let currentTime = new Date();
                            let time = `${currentTime.getFullYear()}-${currentTime.getMonth()}-${currentTime.getDate()}`;
                            let title = form.title.value,
                                author = currentUserName,
                                content = form.content.value;
                            let uploadTask = firebase.storage().ref('images/'+ImgName+'.png').put(files[0]);
                        
                            uploadTask.on('state_changed', function() {
                                db.collection('blogs').doc(`${ImgName}`).set({
                                    title: title,
                                    imageUrl: 'images/'+ImgName+'.png',
                                    author: author,
                                    content: content,
                                    time: time
                                }).then(() => {
                                    console.log('Blog created');

                                    window.location.href = 'new-blog.html';
                                })
                            },
                            );
                        };
                    } 
                });
            });
        } else {
            console.log('User logged out');
        };
    });
};

init();