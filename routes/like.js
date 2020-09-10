const express=require('express')
const router=express.Router()


const tweet = require('../model/tweet')
const user=require('../model/user')
const comment=require('../model/comment')


const { genSalt,hash,compare }=require('bcryptjs')
const { sign }=require('jsonwebtoken')
const { check }=require('../jwt')




module.exports=
async (req,res)=>{
    try{
        
    
     
     const x=await tweet.findOne({$and:[{_id   :  req.body.tweetid},{ like :req.session.username }]})
     if(!x){
      await        tweet.updateOne({_id   :  req.body.tweetid},{$push:{like:req.session.username}})
     }       
      else{
      await        tweet.updateOne({_id   :  req.body.tweetid},{$pull:{like:req.session.username}})
    }
    
    }

     catch(e)
     {
         console.log('error')
     }
    }
    