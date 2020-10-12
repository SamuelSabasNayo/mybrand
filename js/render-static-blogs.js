// ----------- render blogs ---------------
const myBlogs = document.getElementById('blogs-holder');

const renderBlogs = async (doc) => {
    // console.log(doc.data().imageUrl);
    const images = await storage.ref(doc.data().imageUrl).getDownloadURL().then((image) => {
        return image;
    }).catch((error) => {
        console.log(error);
    });
    
    let blog = document.createElement('div');
    let a = document.createElement('a');
    let blogBox = document.createElement('div');
    let title = document.createElement('h2');
    let image = document.createElement('img');
    let time = document.createElement('span');
    let author = document.createElement('span');
    let content = document.createElement('p');
    let p = document.createElement('p');
    
    blog.setAttribute('class', 'blog');
    a.setAttribute('href', 'blog1.html');
    // a.setAttribute('href', 'blog1.html');
    blogBox.setAttribute('class', 'blog-box');
    title.setAttribute('class', 'blog-title');
    image.setAttribute('class', 'blog-image');
    image.setAttribute('src', `${images}`);
    time.setAttribute('class', 'blog-time');
    author.setAttribute('class', 'blog-author');
    content.setAttribute('class', 'blog-text');

    // console.log(doc.data());

    title.textContent = doc.data().title;
    image.textContent = doc.data().imageUrl;
    time.textContent = doc.data().time;
    author.textContent = `by ${doc.data().author}`;
    content.textContent = doc.data().content;
    
    blogBox.appendChild(image);
    a.appendChild(blogBox);
    a.appendChild(title);
    p.appendChild(time);
    p.appendChild(author);
    a.appendChild(p);
    a.appendChild(content);

    blog.appendChild(a);

    myBlogs.appendChild(blog);

    console.log('Static blogs rendered');
};



function renderBlog() {
    db.collection('static-blogs').onSnapshot((blogs) => {
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