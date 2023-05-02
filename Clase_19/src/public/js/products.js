const form = document.getElementById('logoutForm')

form.addEventListener('submit', e=>{
    fetch('/api/sessions/logout', {
        method: 'POST',
        body: {},
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(()=>{
        window.location.replace('/users/login');
    })
})