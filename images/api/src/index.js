const express = require("express");

const app = express();

//root route
app.get("/", (request, response) => {
    //response.status(300).redirect("/info.html")
    response.send("Hello world")
})

//GET: All users

//GET: Users by ID

//POST: save user

//PUT: Update user

//DELETE: delete user

//port
app.listen(3000, (err) => {
    if(!err){
        console.log("running on port" + 3000);
    }
    else {
        console.error(err)
    }
})