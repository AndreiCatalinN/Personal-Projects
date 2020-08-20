const request = require("request");
const express = require('express');
const app = express();
// for parsing forms
const body_parser = require('body-parser');
app.use(body_parser.urlencoded({extended: true}));
// for ejs
app.set("view engine", "ejs");

const port = 3100;

app.get('/', (req,res) => {

    res.render('search');
});

app.get('/results', (req, res) => {
    const search = req.query.search !== undefined ? req.query.search : 'Guardian';
    request(`http://www.omdbapi.com/?s=${search}&apikey=thewdb`, (error, response, body) => {
        if(error) {
           console.log("Something went wrong");
           console.log(error);
        } else if(response.statusCode == 200){
            const data = JSON.parse(body);
            // console.log(data);
            res.render('results', {data: data['Search']});
        }
   });
});


app.listen(port, () =>{
    console.log(`Server can be opened at http://localhost:${port}`);
});
