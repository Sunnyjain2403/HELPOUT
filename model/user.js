const mongoose = require('mongoose')
const Schema=mongoose.Schema

const  userschema=new Schema({

email:       {type:String,required:true},
username:    {type:String,required:true},
password:    {type:String,required:true},
dateofbirth: {type:String,required:true},
bio:         {type:String,required:true},
upload:       {type:String},
follow:       [],
followers:    []

})


userschema.virtual('tweet',
{
ref:'tweet',
localField:'_id',
foreignField:'owner'
})






module.exports = mongoose.model('user',userschema)