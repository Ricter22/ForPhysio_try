const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const userFromDb = require('../models/userModel');

router.post('/userList', (req, res)=>{
    const code = req.body.code;
    let list = [];

    userFromDb.find({'code':code}, function(err, result){
        if(err){ console.log("Error with the database");};
        if(result){
            result.forEach(user =>{
                if(!user.physio){
                    list.push(user.username);
                }
            })
            return res.status(200).send(list);
        }
    })
})

module.exports = router