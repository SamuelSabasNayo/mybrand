// ----------- render blogs ---------------
const myBlogs = document.getElementById('my-blogs');

const renderBlogs = async (doc) => {
    console.log(doc.data().imageUrl)
    const images = await storage.ref(doc.data().imageUrl).getDownloadURL().then((image) => {
        return image;
    }).catch((error) => {
        console.log(error);
    });
    
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
    image.setAttribute('src', `${images}`);
    time.setAttribute('class', 'blog-time');
    author.setAttribute('class', 'blog-author');
    content.setAttribute('class', 'blog-text');
    // p.setAttribute('class', 'p');
    options.setAttribute('class', 'options');
    editBlog.setAttribute('class', 'edit-blog');
    editBlog.setAttribute('data-id', doc.id);
    deleteBlog.setAttribute('class', 'delete-blog');
    deleteBlog.setAttribute('data-id', doc.id);

    // blogBox.textContent = 'Image';
    time.textContent = doc.data().time;
    author.textContent = `by ${doc.data().author}`;
    title.textContent = doc.data().title;
    content.textContent = doc.data().content;
    // file.textContent = doc.data().file;
    editBlog.textContent = 'Edit A Blog';
    deleteBlog.textContent = 'Delete A Blog';
    
    blogBox.appendChild(image);
    blog.appendChild(blogBox);
    blog.appendChild(title);
    p.appendChild(time);
    p.appendChild(author);
    blog.appendChild(p);
    blog.appendChild(content);
    // blog.appendChild(file);
    options.appendChild(editBlog);
    options.appendChild(deleteBlog);
    blog.appendChild(options);

    myBlogs.appendChild(blog);


    // ----------------- editing blogs ---------------------------
    editBlog.addEventListener('click', (e) => {
        localStorage.setItem('dataId',e.target.getAttribute('data-id'));

        window.location.href = 'edit-blog.html';
    });


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



function renderBlog() {
    db.collection('blogs').onSnapshot((blogs) => {
        blogs.forEach((blog) => {
            // console.log(blog.data());
            renderBlogs(blog);
        })
    })
};



window.onload = () => {
    renderBlog();
    // console.log('sam1');
};