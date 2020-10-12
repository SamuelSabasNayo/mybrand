// ---------------- signOut ------------------------------
// selectors
const logout = document.getElementById('logout');

async function logOut() {
    try {
        auth.signOut()
            .then(() => {
                console.log('User signed out');
                alert('User signed out.');
                window.location.href = 'blogs.html';
            });

            // init();
    } catch (error) {
        console.log(error);
    }
};