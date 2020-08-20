const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://<user>:<password>@yelpcamp.11vik.mongodb.net/test?retryWrites=true&w=majority");

const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

const cat = mongoose.model("cat", catSchema);

cat.create({
    name: "grumpy",
    age: 5,
    temperament: "grumpy"
}, (err, cat) => {
    if(err){
        console.log("error");
        console.log(err);
    } else {
        console.log("new cat created");
        console.log(cat);
    }
});

let first  = new cat({
    name: "George",
    age: 11,
    temperament: "playful"
});

first.save( (err, cat) => {
    if (err){
        console.log("something went wrong");
    } else {
        console.log("you saved a cat to the db");
        console.log(cat);
    }
});

cat.find({}, (err, cat) => {
   if (err){
       console.log('error');
       console.log(err)
   } else {
       console.log("all the cats");
       console.log(cat)
   }
});

