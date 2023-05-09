const form = document.getElementById('registerForm')

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    console.log(data);
    const obj = {}
    data.forEach((value, key) => obj[key] = value);
    console.log(obj);
    fetch('/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.status === 201) {
            console.log(res.json())
            alert("Registro exitoso! Redirigiendo al login.")
            window.location.replace('/users/login');
        } else {
            alert("No se pudo crear el usuario. Error: " + res.status)
        }
    })
})