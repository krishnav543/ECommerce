const express = require("express");

const app = express();

const port = 4000;

app.get("/", (req, res) => {
    return res.send("Hello World..");
});

app.get("/login", (req, res) => {
    return res.send("Please Login");
});
app.get("/logout", (req, res) => {
    return res.send("logged ouot..");
});

app.get("/admin", (req, res) =>{
    return res.send("This is admin");
})

app.listen(port, () => {
    console.log("Server is running");
});