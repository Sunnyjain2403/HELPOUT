const user = require("../model/user")

module.exports=
async(req,res)=>

{
req.session.destroy();
res.render('login',{user:{},errors:{}})
}
