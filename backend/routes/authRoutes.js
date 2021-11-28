const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const router = express.Router();
const userFromDb = require('../models/userModel');

//register post
router.post('/signup', (req, res)=>{
    console.log(req.body);

    const username = req.body.username;
    const password = req.body.password;

    userFromDb.findOne({'username':username}, function(err, result){
        if(err){ console.log("Error with the database");};

        if(result!=null){
            res.send('Username already used');
        }
        else{
            const user = new userFromDb({username:username, password:password});
            user.save();
            res.send('User registered');
        }
    })
})

//login post
router.post('/signin', (req, res)=>{
    console.log(req.body);

    const username = req.body.username;
    const password = req.body.password;
    userFromDb.findOne({'username':username}, function(err, result){
        if(err){ console.log("Error with the database");};

        if(result==null){
            res.send('Invalid username or password');
        }
        else{
            result.comparePassword(password, function(err, isMatch) {
                if (err) throw err;
                //console.log(password, isMatch);
                if (isMatch){
                    res.send('Login successful');
                }else{
                    alert("Invalid username e/o password");
                }
            });
        }
    })    
})

module.exports = router