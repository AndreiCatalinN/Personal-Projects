const
    mongoose = require('mongoose'),
    Comment = require('./models/comment'),
    Campground = require('./models/campground');

let data = [
    {
        name: "Salmon Creek",
        image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "gibberish"
    },
    {
        name: "Azuga",
        image: "https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "gibberish"
    },
    {
        name: "Sinaia",
        image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "gibberish"
    },
    {
        name: "Valea Prahovei",
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
        description: "gibberish"
    },
    {
        name: "Lepsa",
        image: "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
        description: "gibberish"
    },
    {
        name: "Salmon Creek",
        image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "gibberish"
    },
    {
        name: "Azuga",
        image: "https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "gibberish"
    },
    {
        name: "Sinaia",
        image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "gibberish"
    }
];


function seedDB() {
    Campground.remove({}, (err) => {
        if (err){
            console.log(err)
        } else console.log('removed campgrounds');
    });

    data.forEach( (seed) =>{
        Campground.create(seed, (err, campground) => {
            if (err){
                console.log(err)
            } else {
                console.log('added a campground');
                Comment.create({
                    text: "Great place, no internet",
                    author: "Homer"
                }, (err, comment) => {
                    if (err){
                        console.log(err)
                    } else {
                        campground.comments.push(comment)
                        campground.save()
                        console.log("Created new comment")
                    }
                });
            }
        });
    });
}

module.exports = seedDB;
