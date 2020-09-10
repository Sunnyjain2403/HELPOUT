//const express=require('express')
//const router=express.Router()


//const tweet = require('../model/tweet')
const user=require('../model/user')
//const comment=require('../model/comment')
const { body, validationResult } = require('express-validator');
const { genSalt,hash }=require('bcryptjs')
//const { sign }=require('jsonwebtoken')
//const { check }=require('../jwt') 





module.exports={
get:async(req,res)=>{
    res.render('upload')   
    },

post:async(req,res)=>{
   

    await user.update({username:req.session.username},{$set:{upload:req.file.filename}})
   res.redirect('/tweets')

}
}