const
    mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    user: String,
    password: String,
    email: String,
    name: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
});

userSchema.plugin(passportLocalMongoose);
module.exports =  mongoose.model('User', userSchema);
