// ----------- render users ---------------
const myUsers = document.getElementById('my-users');

const renderUsers = (doc) => {
    let myUser = document.createElement('div');
    let userName = document.createElement('p');
    let userEmail = document.createElement('p');
    let userLocation = document.createElement('div');
    let latitude = document.createElement('p');
    let longitude = document.createElement('p');
    let options = document.createElement('div');
    let upgradeUser = document.createElement('div');
    let deleteUser = document.createElement('div');

    myUser.setAttribute('class', 'admin-users');
    userName.setAttribute('class', 'blog-text');
    userEmail.setAttribute('class', 'blog-text');
    latitude.setAttribute('class', 'blog-text');
    longitude.setAttribute('class', 'blog-text');
    options.setAttribute('class', 'options');
    upgradeUser.setAttribute('class', 'edit-blog');
    upgradeUser.setAttribute('data-id', doc.id);
    deleteUser.setAttribute('class', 'delete-blog');
    deleteUser.setAttribute('data-id', doc.id);

    userName.textContent = `Name: ${doc.data().username}`;
    userEmail.textContent = `Email: ${doc.data().email}`;
    latitude.textContent = `Latitude: ${doc.data().latitude} degrees`;
    longitude.textContent = `Longitude: ${doc.data().longitude} degrees`;
    upgradeUser.textContent = 'Upgrade A User';
    deleteUser.textContent = 'Delete A User';
    
    myUser.appendChild(userName);
    myUser.appendChild(userEmail);
    userLocation.appendChild(latitude);
    userLocation.appendChild(longitude);
    myUser.appendChild(userLocation);
    options.appendChild(upgradeUser);
    options.appendChild(deleteUser);
    myUser.appendChild(options);

    myUsers.appendChild(myUser);
};


db.collection('users').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
        renderUsers(doc);
    })
});
db.collection('userLocations').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
        renderUsers(doc);
    })
});