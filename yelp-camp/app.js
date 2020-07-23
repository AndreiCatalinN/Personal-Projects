let express  = require('express');
let app = express();
// for stylesheets
app.use(express.static("public"));
// for parsing forms
const body_parser = require('body-parser');
app.use(body_parser.urlencoded({extended: true}));
let port = 3100;
app.set('view engine', 'ejs');

let campgrounds = [
    {
        name: "Salmon Creek",
        image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350"
    },
    {
        name: "Azuga",
        image: "https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350"
    },
    {
        name: "Sinaia",
        image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350"
    },
    {
        name: "Valea Prahovei",
        image: "https://pixabay.com/get/57e8d1464d53a514f1dc84609620367d1c3ed9e04e507440702b72d59045c7_340.jpg"
    },
    {
        name: "Lepsa",
        image: "https://pixabay.com/get/53e2dc4b4d54a514f1dc84609620367d1c3ed9e04e507440702b72d59045c7_340.jpg"
    },
    {
        name: "Salmon Creek",
        image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350"
    },
    {
        name: "Azuga",
        image: "https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350"
    },
    {
        name: "Sinaia",
        image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350"
    },
    {
        name: "Valea Prahovei",
        image: "https://pixabay.com/get/57e8d1464d53a514f1dc84609620367d1c3ed9e04e507440702b72d59045c7_340.jpg"
    },
    {
        name: "Lepsa",
        image: "https://pixabay.com/get/53e2dc4b4d54a514f1dc84609620367d1c3ed9e04e507440702b72d59045c7_340.jpg"
    },
];



app.get('/', (req, res) => {
   res.render("landing");
});

app.get('/campgrounds', (req, res) => {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get('/campgrounds/new', (req, res) => {
    res.render("new");
});

app.post('/campgrounds', (req, res) => {
    let image = req.body.image;
    let name = req.body.name;
    campgrounds.push({ name: name, image: image});
    res.redirect('/campgrounds');
});

app.listen(port, () => {
   console.log(`Yelp camp: http://localhost:${port}`);
});
