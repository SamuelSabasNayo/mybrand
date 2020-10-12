// ----------- render users ---------------
const myUsers = document.getElementById('user-name');

const renderUsers = (doc) => {
    let userName = document.createElement('span');

    userName.textContent = `${doc.data().username}!`;

    myUsers.appendChild(userName);
};


db.collection('users').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
        renderUsers(doc);
    })
});