fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "x-api-key": "123"
    },
    body: JSON.stringify({
        name: 'Emilia',
        email: 'emilia@gmail.com',
        phone: '099999999',
        password: 'pass123emilia'
    })
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
