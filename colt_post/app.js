const express =  require('express');
const app = express();
const port = 3000;
// for ejs
const body_parser = require('body-parser');
app.use(body_parser.urlencoded({extended: true}));
app.set("view engine", "ejs");

let friends = ["Dan", "Andre", "Catalin"];

app.get('/', (req, res) =>{
    res.render("home");
});

app.get('/friends', (req, res) =>{
    res.render("friends", {friends: friends});
});


app.post('/addfriend', (req, res) =>{
    friends.push(req.body.newfriend);
    res.redirect('/friends');
});


app.listen(port, () =>{
   console.log(`Server can be opened at http://localhost:${port}`);
});
