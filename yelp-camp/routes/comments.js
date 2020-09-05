const
    express = require('express'),
    router = express.Router( {mergeParams: true}),
    Campground = require("../models/campground"),
    Comment = require("../models/comment");

// new comment form
router.get('/new', isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err){
            console.log(err)
        } else {
            res.render('comments/new', {campground: campground});
        }
    })
});

// comment create
router.post('/', isLoggedIn, (req, res) => {
    req.body.comment = sanitizeComment(req);
    Campground.findById(req.params.id, (err, campground) => {
        if (err){
            console.log(err)
            res.redirect('/campgrounds')
        } else {
            Comment.create(req.body.comment, (err, comment) =>{
                if(err) {
                    console.log(err)
                } else {
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground.id)
                }
            });
        }
    });
});

// COMMENT UPDATE
router.put('/:comment_id', checkCommentOwnership, (req, res) => {
    req.body.comment = sanitizeComment(req);
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment,(err, updatedComment) => {
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// edit comment form
router.get('/:comment_id/edit', checkCommentOwnership, (req, res) => {
    req.body.comment = sanitizeComment(req);
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
router.delete('/:comment_id', checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id,(err) => {
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            res.redirect('back');
        }
    });
});

function checkCommentOwnership(req, res, next) {
    if( req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err){
                res.redirect('back');
            } else {
                if (foundComment.author.id.equals(req.user.id)) {
                    next();
                }
                else res.redirect('back');
            }
        });
    } else {
        res.redirect('back');
    }
}

function sanitizeComment(req) {
    req.body.comment.text = req.sanitize(req.body.comment.text);
    return req.body.comment;
}

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
