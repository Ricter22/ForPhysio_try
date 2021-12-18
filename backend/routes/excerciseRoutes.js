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

router.post('/updateExercise', (req, res)=>{
    const name = req.body.name;
    const oldDescription = req.body.oldDescription;
    const newDescription = req.body.newDescription;
    const newTimes = req.body.newTimes;

    excerciseDb.updateOne({name: name, description: oldDescription},
        {name:name, description:newDescription, timesPerWeek:newTimes}, function(err, result){
            if(err){console.log('Error with the db')}
            else{
                if(result.modifiedCount == 1){
                    res.status(200).send({message: 'exercise updated'})
                }
                else{
                    res.status(422).send({message: 'exercise not updated'})
                }
            }
        })

})

router.post('/deleteExercise', (req, res)=>{
    const name = req.body.name;
    const description = req.body.description;
    
    excerciseDb.deleteOne({name:name, description:description}, function(err, result){
        if(err){console.log('Error with the db')}
        else{
            if(result.deletedCount == 1){
                res.status(200).send({message: 'exercise deleted'});
            }
            else{
                res.status(422).send({message: 'exercise not deleted'});
            }
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