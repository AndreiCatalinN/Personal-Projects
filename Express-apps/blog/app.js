const
    express = require('express'),
    app =  express(),
    port = 3100,
    mongoose = require('mongoose'),
    bodyParser = require("body-parser"),
    methodOverride = require('method-override'),
    expressSanitizer = require('express-sanitizer')
    config = require('../../../myCredentials')['credentials'];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(expressSanitizer());
mongoose.connect(
    `mongodb+srv://${config}.@yelpcamp.11vik.mongodb.net/blog?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    () => {
        console.log("Connected");
});

const blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type: Date, default: Date.now()},
});
const Blog = mongoose.model('Blog', blogSchema);


const postSchema = new mongoose.Schema({
    title: String,
    content: String
});
const Post = new mongoose.model('Post', postSchema);

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
const User = new mongoose.model('User', userSchema);

app.get('/', (req, res) => {
    res.redirect('blogs');
});

app.get('/newuser', (req, res) => {
    const newUser = new User({
        email: "andrew.brown@brown.edu",
        name: "andrew brown"
    });

    newUser.posts.push({
        title: "angry",
        content: "andrei"
    });

    newUser.save( (err, user ) => {
        if (err){
            console.log('err')
        } else {
            console.log(user);
        }
    });

    res.send("new user created");
});

app.get('/newuserpost', (req, res) => {
    User.findOne({name: "andrew brown"}, (err, user ) => {
        if (err){
            console.log('err')
        } else {
            user.posts.push({
                title: "I love programming",
                content: "I just do"
            });
            user.save((err1, user1) => {
                if (err1) {
                    console.log("failed while saving");
                } else {
                    console.log(user1);
                }
            })
        }
    });

    res.send("new user created");
});

app.get('/newpost', (req, res) => {
    const newPost = new Post({
        title: "something",
        content: "angry"
    });

    newPost.save( (err, post ) => {
        if (err){
            console.log('err')
        } else {
            console.log(post);
        }
    });

    res.send("new post created");
});

app.get('/blogs', (req, res) => {
    Blog.find({}, (err, blogs) => {
       if(err) {
           console.log("An error occured");
       } else {
           res.render('index', { blogs: blogs});
       }
    });
});

app.get('/blogs/new', (req, res) => {
    res.render("new");
});

app.post("/blogs", (req, res) => {
    req.body.blog = sanitizeInputs(req);
    Blog.create(req.body.blog, (err, newBlog) => {
        if (err){
            res.render('404notfound');
        } else {
            res.redirect('/blogs');
        }
    });
});

app.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err){
            res.redirect('/blogs');
        } else {
            res.render('show', { blog: foundBlog});
        }
    });
});

app.get('/blogs/:id/edit', (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err){
            res.redirect('/blogs');
        } else {
            res.render('edit', { blog: foundBlog});
        }
    });
});

app.put('/blogs/:id', (req, res) => {
    req.body.blog = sanitizeInputs(req);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog,(err, updatedBlog) => {
        if(err){
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs/' + req.params.id);
        }
    });
});

app.delete('/blogs/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id,(err) => {
        if(err){
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs');
        }
    });
});

app.listen(port, () =>{
    console.log(`App working at http://localhost:${port}`);
});

function sanitizeInputs(req) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    req.body.blog.title = req.sanitize(req.body.blog.title);
    req.body.blog.image = req.sanitize(req.body.blog.image);
    return req.body.blog;
}
