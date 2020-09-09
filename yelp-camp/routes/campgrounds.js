const
    express = require('express'),
    router = express.Router(),
    Campground = require("../models/campground"),
    middleware = require('../middleware');

// show all campgrounds
router.get('/', (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err)
        } else {
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds, currentUser: req.user
            });
        }
    });
});

// post a campground
router.post('/', middleware.isLoggedIn, (req, res) => {
    req.body.campground = middleware.sanitizeCampground(req);
    let newCampground = req.body.campground;
    let author = {
        id: req.user.id,
        username: req.user.username
    };
    newCampground.author = author;
    Campground.create(newCampground, (err, newCamp) => {
        if (err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});

// new campground form
router.get('/new', middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new" );
});

// show a specific campground
router.get('/:id', (req, res) => {
    Campground.findById(req.params.id).populate('comments')
        .exec((err, foundCampground) => {
            if(err){
                res.redirect('/campgrounds');
            } else {
                res.render('campgrounds/show', { campground: foundCampground});
            }
        });
});

// edit campground
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    req.body.campground = middleware.sanitizeCampground(req);
    Campground.findByIdAndUpdate(req.params.id, req.body.campground,(err, updatedCampground) => {
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// delete campground
router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id,(err) => {
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});

// edit campground form
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
       Campground.findById(req.params.id, (err, foundCampground) => {
           res.render('campgrounds/edit', {campground: foundCampground});
       });
});

module.exports = router;
