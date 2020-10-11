// ----------- render users ---------------
const myUsers = document.getElementById('my-users');

const renderUsers = (doc) => {
    let myUser = document.createElement('div');
    let userName = document.createElement('p');
    let userEmail = document.createElement('p');
    let userLocation = document.createElement('div');
    let latitude = document.createElement('p');
    let longitude = document.createElement('p');

    myUser.setAttribute('class', 'admin-users');
    userName.setAttribute('class', 'blog-text');
    userEmail.setAttribute('class', 'blog-text');
    latitude.setAttribute('class', 'blog-text');
    longitude.setAttribute('class', 'blog-text');

    userName.textContent = `Name: ${doc.data().username}`;
    userEmail.textContent = `Email: ${doc.data().email}`;
    latitude.textContent = `Latitude: ${doc.data().latitude} degrees`;
    longitude.textContent = `Longitude: ${doc.data().longitude} degrees`;
    
    myUser.appendChild(userName);
    myUser.appendChild(userEmail);
    userLocation.appendChild(latitude);
    userLocation.appendChild(longitude);
    myUser.appendChild(userLocation);

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