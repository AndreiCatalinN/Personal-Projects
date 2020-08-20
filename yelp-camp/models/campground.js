const mongoose = require('mongoose');

const campgroundsSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: "Comment"
    }]
});

module.exports = mongoose.model("campgrounds", campgroundsSchema);
