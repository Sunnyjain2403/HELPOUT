const express=require('express')
const router=express.Router()


const tweet = require('../model/tweet')
const comment=require('../model/comment')


const { genSalt,hash,compare }=require('bcryptjs')
const { sign }=require('jsonwebtoken')
const { check }=require('../jwt')




module.exports=
 async (req,res)=>{
     
    try{
    
        const id=req.params.id
       const tweet1= await tweet.findById(id).populate('comment').exec()
       console.log(tweet1)
       res.render('tweet',{tweet:tweet1,comment:tweet1.comment,username:req.session.username })
      }
     catch(e)
     {
         res.send('errorq')
     }
    }