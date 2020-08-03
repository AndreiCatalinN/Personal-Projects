const express = require('express');
const Book = require('../models/booksCollection');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

    const cursor = db.collection('quotes').find();
    console.log(cursor);
    res.send("Works");
    //get all books
    //get books based on search criteria?
    //get users books, probably in user?
});

router.post('/', (req, res) =>{
    // create new book
   const book =  new Book({
       isbn: 1234,
       title: "The art of War",
       author: "Sun Tzu",
       description: "Description",
       genre: "Classics",
       publication_year: "200BC",
       publisher: "Rao",
       book_image: "art-of-war.png"
   });

   // add it to db
    book.save((err, result) => {
        if (err) { console.log(err) }
        else { res.json(result) }
    });
});

module.exports = router;
