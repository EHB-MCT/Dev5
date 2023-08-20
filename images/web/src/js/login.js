//User let for storage
let username = "";
let password = "";
let id = "";

//Excecutes function on load
window.onload = function(){
    loginInputs();
};

//Compares the inputted value's with the database 
function checkInputs(data){
    for(let i of data){

        //Does the username exist?
        if(username == i.name){
            
            //Is the password correct?
            if (password == i.password){
                id = i._id;
                window.localStorage.setItem("id", id);
                window.location.href = "valoAgents.html";
            
            //Else throw and error
            } else{
                console.log("wrong password");
                document.getElementById('message').insertAdjacentHTML("beforebegin",
                    "<p>Password is incorrect</p>"
                );
            };
        
        //Else throw and error
        } else{
            console.log("wrong username");
            document.getElementById('message').insertAdjacentHTML("beforebegin",
                    "<p>Name is incorrect</p>"
                );
        };
    };
    
};

//Reads the inputted value's
function loginInputs(){
    document.getElementById('loginForm').addEventListener('submit', event => {
        event.preventDefault();

        username = document.getElementById('username').value;
        password = document.getElementById('password').value;
        getUser();

        window.localStorage.setItem("username", username);
        window.localStorage.setItem("password", password);
    });
}

//Fetches the user from the database
async function getUser(){
    let response = await fetch(`http://localhost:1000/users`);
    return await response.json()
    .then(data => {
        console.log(data);
        checkInputs(data);
    });
};