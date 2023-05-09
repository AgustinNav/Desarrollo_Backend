const form = document.getElementById('loginForm')

form.addEventListener('submit', e=>{
    e.preventDefault();
    const data = new FormData(form);
    const obj  = {};
    data.forEach((value, key) => obj[key]=value);
    console.log("Usuario login: " + obj);
    fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result=>{
        if(result.status === 200) {
            alert("Login exitoso! Redirigiendo...")
            window.location.replace('/api/products')
        }
        else {
            alert ("Login invalido.")
        }
    })
})