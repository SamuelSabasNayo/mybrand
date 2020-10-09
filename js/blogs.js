
// selectors
const form = document.querySelector('#add-blog');

// ------------- variables -------------
let title = form.title.value,
        author = form.author.value,
        content = form.content.value,
        time = form.time.value;
let files = [];
let reader;

// ------------- selection process ------------
document.getElementById('upload-image').onclick = function(e) {

        let input = document.createElement('input');
        input.type = 'file';

        input.onchange = e => {
        files = e.target.files;
        // reader = new FileReader();
        // reader.onload = function() {
                // document.getElementById('myimg').src = reader.result;
        // }
        // reader.readAsDataURL(files[0]);
        }
        input.click();
};

// ------------- upload process ------------
document.getElementById('submit-image').onclick = function() {
        ImgName = blogRandomId();
        let uploadTask = firebase.storage().ref('images/'+ImgName+'.png').put(files[0]);

        uploadTask.on('state_changed', function() {
        // console.log('my-image stored');
                db.collection('blogs').doc(`${ImgName}`).set({
                        title: 'Friday Demo',
                imageUrl: 'images/'+ImgName+'.png',
                author: 'Samuel Sabas',
                content: content,
                time: time
                }).then(() => {
                console.log('Blog created');
                })
        },
        // ------------- error handling ------------
        function(error) {
                console.log('error in saving the image');
        }

        // ------------- submit image link to firestore ------------
        // uploadTask.snapshot.ref('images/'+ImgName+'.png').getDownloadURl().then(function(url) {
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




const blogList = document.querySelector('blogs-holder');

        //setup blogs
        // const setupBlogs = (data) => {

        //     let html = '';
        //     data.forEach(doc => {
        //         const blog = doc.data();
        //         console.log(blog);
        //     });
        // }

// const userData = [];
// const userlist = async () => {
//     const users = await db.collection('users');
//     const userSnapshot = await users.get();
//     for (let doc of userSnapshot.docs) {
//         userData.push(doc.data());
//     }
// };

// userlist();