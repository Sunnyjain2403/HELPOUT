const express=require('express')
const router=express.Router()


const tweet = require('../model/tweet')
const user=require('../model/user')
const comment=require('../model/comment')


const { genSalt,hash,compare }=require('bcryptjs')
const { sign }=require('jsonwebtoken')
const { check }=require('../jwt')











module.exports= async (req,res)=>{
    try{
      // req.session.username= "5ef891587f55f1263c56439d"
      
       const comment1=new comment({
        username :    req.session.username,
        comment  :    req.body.comment,
        owner    :    req.body.tweetid
       })
  
       await comment1.save()
       
     }
     catch(e)
     {
         console.log('error')
     }
    }


   