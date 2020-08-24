const
    express = require('express'),
    router = express.Router(),
    Campground = require("../models/campground");

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

router.post('/', (req, res) => {
    req.body.campground = sanitizeCampground(req);
    Campground.create(req.body.campground, (err, newCamp) => {
        if (err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});

router.get('/new', (req, res) => {
    res.render("campgrounds/new");
});

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

router.put('/:id', (req, res) => {
    req.body.campground = sanitizeCampground(req);
    Campground.findByIdAndUpdate(req.params.id, req.body.campground,(err, updatedCampground) => {
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

router.delete('/:id', (req, res) => {
    Campground.findByIdAndRemove(req.params.id,(err) => {
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});

router.get('/:id/edit', (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.render('campgrounds/edit', { campground: foundCampground});
        }
    });
});

function sanitizeCampground(req) {
    req.body.campground.name = req.sanitize(req.body.campground.name);
    req.body.campground.description = req.sanitize(req.body.campground.description);
    req.body.campground.image = req.sanitize(req.body.campground.image);
    return req.body.campground;
}

module.exports = router;
