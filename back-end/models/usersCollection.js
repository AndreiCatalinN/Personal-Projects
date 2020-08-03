const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    postalCode: String,
    phone: String,
    firstName: String,
    LastName: String,
    profile_picture: String,
    Bookmarks: []
}, { collection: 'users' })
const UsersCollection = mongoose.model('user', userSchema);
module.exports = UsersCollection;
