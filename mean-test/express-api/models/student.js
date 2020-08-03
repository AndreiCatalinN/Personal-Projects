let mongoose = require('mongoose')
let studentSchema = mongoose.Schema({
  name: String,
  marks: [],
  teachers: {
    name: String,
    class: String
  }
}, { collection: 'students' })
let Student = mongoose.model('Student', studentSchema)
module.exports = Student
