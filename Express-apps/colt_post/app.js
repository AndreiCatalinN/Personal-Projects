const express =  require('express');
const app = express();
const port = 3000;
// for stylesheets
app.use(express.static("public"));
// for parsing forms
const body_parser = require('body-parser');
app.use(body_parser.urlencoded({extended: true}));
// for ejs
app.set("view engine", "ejs");

let friends = ["a", "b", "h", "g", "f", "e"];


app.get('/', (req, res) =>{
    res.render("home", {saysHello: "default"});
});

app.get('/friends', (req, res) =>{
    res.render("friends", {friends: friends});
});

app.get('/posts', (req, res) =>{
    const posts = [
        {title: " post 1", author: "Andrie"},
        {title: " post 2", author: "Alina"},
        {title: " post 3", author: "Maria"},
    ];
    res.render("posts", {posts: posts});
});

app.get('/speak/:animal', (req, res) => {
    const sounds = {
        pig: "oink",
        cow: "moo",
        cat: "meow",
        sheep: "behe",
        dog: "woof"
    };
    const animal = req.params.animal.toLowerCase();
    if ( animal in sounds )
        res.send("The " + animal + " says: " + sounds[animal]);
    else res.send("Don't know that animal");
});

app.get('/repeat/:word/:times', (req, res) => {
    const word = req.params.word;
    const times = Number(req.params.times);

    res.send(word.repeat(times));
});

app.get('/:param', (req, res) =>{
    const param = req.params.param;
    res.render("home", {saysHello: param});
});

app.get('*', (req, res) => {
    res.send("What are you doing!");
});

app.post('/addfriend', (req, res) =>{
    friends.push(req.body.newFriend);
    res.redirect('/friends');
});

app.post('/addpost', (req, res) =>{
    posts.push(req.body.newPost);
    res.redirect('/posts');
});

app.listen(port, () =>{
   console.log(`Server can be opened at http://localhost:${port}`);
});
