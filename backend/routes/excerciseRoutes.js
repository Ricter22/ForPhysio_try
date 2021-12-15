const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const excerciseDb = require('../models/excerciseModel');

router.post('/addExcercise', (req, res)=>{
    const excercise = req.body;

    excerciseDb.find({name:excercise.name, description:excercise.description}, function(err, result){
        if (result.length >= 1){
            return res.status(422).send({message: 'excercise already saved'});
        }
        else{
            const newExcercise = new excerciseDb({name:excercise.name, description:excercise.description, timesPerWeek:excercise.timesPerWeek});
            newExcercise.save();
            res.status(200).send({message: 'excercise saved'});
        }
    })
})

router.post('/excercises', (req, res)=>{
    const name = req.body.name;
    excerciseDb.find({'name':name}, function(err, result){
        if(err){ console.log("Error with the database");};
        if(result){
            return res.status(200).send(result);
        }
    })
    
})


module.exports = router