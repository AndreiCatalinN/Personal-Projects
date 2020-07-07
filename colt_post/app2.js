const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
   res.send("Home page");
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

app.get('*', (req, res) => {
    res.send("What are you doing!");
});

app.listen(port, () => {
   console.log(`Server can be opened at http://localhost:${port}`);
});
