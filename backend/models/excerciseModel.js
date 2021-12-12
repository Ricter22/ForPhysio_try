const mongoose = require('mongoose');

const ExcerciseSchema = new mongoose.Schema({
    name: String,
    description: String,
    timesPerWeek: String
    
})

const excerciseDb = mongoose.model('excercises', ExcerciseSchema);
module.exports = excerciseDb;
