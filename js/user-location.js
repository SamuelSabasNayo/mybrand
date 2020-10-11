// --------- listen for auth status changes -------------
auth.onAuthStateChanged((user) => {
    if (user) {
        // console.log(userEmail);
        console.log(`User logged in as: ${user.email}`);
        getLocation();
    }
});


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }  else { 
        console.log(`Browser not supported.`);
    }
};
    
function showPosition(position) {
    console.log(`Latitude:  ${position.coords.latitude} Longitude: ${position.coords.longitude}`);
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let latitude = lat.toFixed(2)
    let longitude = long.toFixed(2);
    const user = auth.currentUser;
    
    console.log(latitude, longitude);
    db.collection('userLocations').add({
        email: user.email,
        latitude: latitude,
        longitude: longitude
    }).then(() => {
        console.log('User location saved');
    })
};
