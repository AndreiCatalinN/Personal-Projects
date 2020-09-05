const
    express = require('express'),
    router = express.Router(),
    Campground = require("../models/campground");

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
router.post('/', isLoggedIn, (req, res) => {
    req.body.campground = sanitizeCampground(req);
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
router.get('/new', (req, res) => {
    res.render("campgrounds/new");
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
router.put('/:id', checkCampgroundOwnership, (req, res) => {
    req.body.campground = sanitizeCampground(req);
    Campground.findByIdAndUpdate(req.params.id, req.body.campground,(err, updatedCampground) => {
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// delete campground
router.delete('/:id', (req, res) => {
    Campground.findByIdAndRemove(req.params.id,(err) => {
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});

// edit campground form
router.get('/:id/edit', checkCampgroundOwnership, (req, res) => {
       Campground.findById(req.params.id, (err, foundCampground) => {
           res.render('campgrounds/edit', {campground: foundCampground});
       });
});

function checkCampgroundOwnership(req, res, next) {
    if( req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err){
                res.redirect('back');
            } else {
                if (foundCampground.author.id.equals(req.user.id)) {
                    next();
                }
                else res.redirect('back');
            }
        });
    } else {
        res.redirect('back');
    }
}

function sanitizeCampground(req) {
    req.body.campground.name = req.sanitize(req.body.campground.name);
    req.body.campground.description = req.sanitize(req.body.campground.description);
    req.body.campground.image = req.sanitize(req.body.campground.image);
    return req.body.campground;
}

function isLoggedIn(req, res, next) {

    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
