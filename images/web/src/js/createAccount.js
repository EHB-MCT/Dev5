//User let for storage
let username = "";
let password = "";

//Excecutes function on load
window.onload = function(){
    loginInputs();
};

//Reads the value's from the form
function loginInputs(){
    document.getElementById('createUserForm').addEventListener('submit', event => {
        event.preventDefault();

        username = document.getElementById('username').value;
        password = document.getElementById('password').value;

        saveUser();
    });
}

//Saves a new user in the database
async function saveUser(){
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    //Json object for the database
    let raw = JSON.stringify({
    "name": username,
    "password": password
    });

    let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    //Fetches the api and pushes the new user to the database
    fetch("http://localhost:1000/users", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error))
    .then(document.location.href = "valoAgents.html");

}