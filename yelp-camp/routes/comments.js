const
    express = require('express'),
    router = express.Router( {mergeParams: true}),
    Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middleware = require('../middleware');

// new comment form
router.get('/new', middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err){
            console.log(err)
        } else {
            res.render('comments/new', {campground: campground});
        }
    })
});

// comment create
router.post('/', middleware.isLoggedIn, (req, res) => {
    req.body.comment = middleware.sanitizeComment(req);
    Campground.findById(req.params.id, (err, campground) => {
        if (err){
            console.log(err)
            res.redirect('/campgrounds')
        } else {
            Comment.create(req.body.comment, (err, comment) =>{
                if(err) {
                    req.flash('error', 'Something went wrong');
                    console.log(err)
                } else {
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash('success', 'successfully added comment');
                    res.redirect('/campgrounds/' + campground.id)
                }
            });
        }
    });
});

// COMMENT UPDATE
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    req.body.comment = middleware.sanitizeComment(req);
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment,(err, updatedComment) => {
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// edit comment form
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err){
            res.redirect("back");
        } else {
            res.render('comments/edit', {
                campground_id: req.params.id,
                comment: foundComment
            });
        }
    });
});

// delete campground
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id,(err) => {
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            req.flash('success', 'Comment Deleted');
            res.redirect('back');
        }
    });
});


module.exports = router;
