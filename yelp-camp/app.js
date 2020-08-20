const
    express = require('express'),
    app =  express(),
    port = 3100,
    mongoose = require('mongoose'),
    bodyParser = require("body-parser"),
    methodOverride = require('method-override'),
    expressSanitizer = require('express-sanitizer'),
    config = require('../../myCredentials');

const
    seedDB = require("./seed"),
    Campground = require("./models/campground"),
    User = require("./models/user"),
    Comment = require("./models/comment");

// for stylesheets
app.use(express.static("public"));
// for parsing forms
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
// for update and delete
app.use(methodOverride('_method'));
//form sanitizing
app.use(expressSanitizer());

mongoose.connect(
    `mongodb+srv://@yelpcamp.11vik.mongodb.net/yelp-camp?retryWrites=true&w=majority`,
    {
        user: config.user,
        pass: config.pass,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    (err) => {
        if(err) {
            console.log(err)
        } else console.log("Connected");
    });
// seedDB();

app.get('/', (req, res) => {
   res.render("landing");
});

app.get('/campgrounds/new', (req, res) => {
    res.render("new");
});

app.get('/campgrounds', (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err)
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });

});

app.get('/campgrounds/:id', (req, res) => {
    Campground.findById(req.params.id).populate('comments')
        .exec((err, foundCampground) => {
            if(err){
                res.redirect('/campgrounds');
            } else {
                res.render('show', { campground: foundCampground});
            }
        });
});

app.get('/campgrounds/:id/edit', (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.render('edit', { campground: foundCampground});
        }
    });
});

app.post('/campgrounds', (req, res) => {
    req.body.campground = sanitizeCampground(req);
    Campground.create(req.body.campground, (err, newCamp) => {
        if (err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});

app.put('/campgrounds/:id', (req, res) => {
    req.body.campground = sanitizeCampground(req);
    Campground.findByIdAndUpdate(req.params.id, req.body.campground,(err, updatedCampground) => {
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

app.delete('/campgrounds/:id', (req, res) => {
    Campground.findByIdAndRemove(req.params.id,(err) => {
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});

app.listen(port, () => {
   console.log(`Yelp camp: http://localhost:${port}`);
});

function sanitizeCampground(req) {
    req.body.campground.name = req.sanitize(req.body.campground.name);
    req.body.campground.description = req.sanitize(req.body.campground.description);
    req.body.campground.image = req.sanitize(req.body.campground.image);
    return req.body.campground;
}
