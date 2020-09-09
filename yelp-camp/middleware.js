const
    Campground = require('./models/campground'),
    Comment = require('./models/comment');

let middlewareObj = {};

middlewareObj.checkCommentOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
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
};

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
    if( req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err){
                req.flash("error", "Campground not found");
                res.redirect('back');
            } else {
                if (foundCampground.author.id.equals(req.user.id)) {
                    next();
                }
                else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect('back');
    }
};

middlewareObj.sanitizeComment = (req) => {
    req.body.comment.text = req.sanitize(req.body.comment.text);
    return req.body.comment;
};

middlewareObj.sanitizeCampground = (req) => {
    req.body.campground.name = req.sanitize(req.body.campground.name);
    req.body.campground.description = req.sanitize(req.body.campground.description);
    req.body.campground.image = req.sanitize(req.body.campground.image);
    req.body.campground.price = req.sanitize(req.body.campground.price);
    return req.body.campground;
};

middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login first");
    res.redirect('/login');
};


module.exports = middlewareObj;
