const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const router = express.Router();
const userFromDb = require('../models/userModel');

router.post('/test', (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    console.log( username + ' ' + password );
    if (username == 'test'){
        return res.status(200).send('Valid username');
    }
    else{
        return res.status(422).send('Invalid username');
    }
})

//register post
router.post('/signup', (req, res)=>{
    console.log(req.body);

    const username = req.body.username;
    const password = req.body.password;
    const physio = req.body.physio;
    const code = req.body.code;

    userFromDb.findOne({'username':username}, function(err, result){
        if(err){ console.log("Error with the database");};

        if(result!=null){
            return res.status(422).send('Invalid username')
        }
        else{
            if (physio){
                userFromDb.findOne({'code':code}, function(err, result){
                    if(err){ console.log("Error with the database");};
    
                    if (result!=null){
                        return res.status(423).send('Invalid code')
                    }
                    else{
                        const user = new userFromDb({username:username, password:password, physio:physio, code:code});
                        user.save();
                        res.status(200).send('User registered');
                    }
                })
            }
            else{
                const user = new userFromDb({username:username, password:password, physio:physio, code:code});
                user.save();
                res.status(200).send('User registered');
            }
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
            return res.status(422).send('Invalid username or password');
        }
        else{
            result.comparePassword(password, function(err, isMatch) {
                if (err) throw err;
                //console.log(password, isMatch);
                if (isMatch){
                    if (result.physio){
                        res.status(201).send('Physio');
                    }
                    else {
                        res.status(200).send(JSON.stringify({username: "Luca"}));
                    }
                }else{
                    return res.status(422).send('Invalid username or password');
                }
            });
        }
    })    
})

module.exports = router