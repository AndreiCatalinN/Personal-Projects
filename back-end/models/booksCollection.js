let mongoose = require('mongoose');
let bookSchema = mongoose.Schema({
    isbn: String,
    title: String,
    author: String,
    description: String,
    genre: String,
    publication_year: String,
    publisher: String,
    book_image: String
}, { collection: 'books' });

let UsersCollection = mongoose.model('books', bookSchema);
module.exports = UsersCollection;
