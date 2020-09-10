const mongoose = require('mongoose')
const Schema=mongoose.Schema

const  comment =  new Schema({
username:      {type:String,
                required:true},

comment:       {type:String,
               required:true},

owner:         {type:mongoose.Schema.Types.ObjectId,
                required:true,
                 ref:'tweet'  }               
}
,
{timestamps: true }
)


module.exports = mongoose.model('comment',comment)