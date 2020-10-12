// ------ variables -----
let ImgName, ImgUrl;
let files = [];
let reader = new FileReader();

// ------ selection process -----
document.getElementById('select').onclick = (e) => {
    let input = document.createElement('input');
    input.type = 'file';
    input.click();

    input.onchange = e => {
        files = e.target.files;
        reader = new FileReader();
        reader.onload = () => {
            document.getElementById('myimg').src = reader.result;
        }
        reader.readAsDataURL(files[0]);
    }
    input.click();
}

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
                        document.getElementById('upload').onclick = function() {
                            ImgName = blogRandomId();
                            let currentTime = new Date();
                            let time = `${currentTime.getFullYear()}-${currentTime.getMonth()}-${currentTime.getDate()}`;
                            let email = currentUserEmail;
                            let uploadTask = firebase.storage().ref('profile-images/'+ImgName+'.png').put(files[0]);
                        
                            uploadTask.on('state_changed', function() {
                                db.collection('profile-infos').doc(`${ImgName}`).set({
                                    email: email,
                                    imageUrl: 'profile-images/'+ImgName+'.png',
                                    time: time
                                }).then(() => {
                                    console.log('Profile created');

                                    // window.location.href = 'new-blog.html';
                                }).catch((error) => {
                                    console.log(error);
                                });
                            });
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


document.getElementById('retrieve').onclick = () => {
    // function renderBlog() {
        db.collection('profile-infos').onSnapshot((image) => {
            image.forEach((image) => {
                // console.log(image);
                renderBlogs(image);
            })
        })
    // };

    // ----------- render blogs ---------------
    const myImg = document.getElementById('prof-image');

    async function renderBlogs(doc) {
        console.log(doc.data);
        const images = await storage.ref(doc.data().imageUrl).getDownloadURL().then((image) => {
            return image;
        }).catch((error) => {
            console.log(error);
        });
        let image = document.createElement('img')
    
        image.setAttribute('src', `${images}`);
    
        myImg.appendChild(image);
    };
};



// window.onload = () => {
//     renderBlog();
// };
console.log('hello sam');