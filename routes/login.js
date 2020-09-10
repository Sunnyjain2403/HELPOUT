const express=require('express')
const router=express.Router()


const tweet = require('../model/tweet')
const user=require('../model/user')
const comment=require('../model/comment')


const { genSalt,hash,compare }=require('bcryptjs')
const { sign }=require('jsonwebtoken')
const { check }=require('../jwt')
const { validationResult } = require('express-validator')
const { matchedData,sanitizeBody } = require('express-validator/filter');







module.exports={
  post:async(req,res)  =>  {
 try{   
        
       const findUser=await user.findOne({ username : req.body.username})
       

        if(!findUser)
        {   const prevoususerDetails=matchedData(req)
            res.render('login',  {errors : {email:'username not Exist'}  ,user:prevoususerDetails }  )  
        }
       

        const confirmPassword=await compare(req.body.password,findUser.password)
        if(confirmPassword)
        {
        const token=await sign(req.body,'qwertyuiop')
        req.session.token=token
        req.session.username=findUser.username
        res.redirect('tweets')
        return
        }

        else
        {
            const prevoususerDetails=matchedData(req)
            return res.render('login',   {errors:{password:'password is incorrect'}  ,  user:prevoususerDetails})
        }

 
}
 catch(error)
 {
 res.send('error')

 }
},





get:(req,res)=>{
    res.render('login',{ errors:{},user:{}})   
    }

} 