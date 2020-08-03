let express = require('express')
let cors= require('cors')
let bodyParser = require('body-parser')
let path = require('path')
let mongoose = require('mongoose')
//import Student Model from ./models
let Student = require('./models/student.js')
//initialize express app
let app = express()
//configure express app to parse json content and form data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
//configure express app to serve static files
app.use(express.static(path.join(__dirname, 'public')))
//connect to mongodb instance where database is mydb
mongoose.connect('mongodb://127.0.0.1:27017/mydb')
//save new student
app.post('/', (req, res, next) => {
  //create new student using schema
  let newStudent = new Student({
    name: req.body.name,
    marks: req.body.marks,
    teachers: req.body.teachers
  })
  //save new student to db
  newStudent.save((err, result) => {
    if (err) { console.log(err) }
    else { res.json(result) }
  })
})
app.get('/', (req, res, next) => {
  //use find() method to return all students
  Student.find((err, result) => {
    if(err) { console.log(err) }
    else { res.json(result) }
  })
})
//listen on port 3000
app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000')
})
