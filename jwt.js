const { verify }=require('jsonwebtoken')
const session=require('express-session')

module.exports={
verify : (req,res,next)=>
{
if(!req.session.token){

   res.status(404).render('error_page', {title: "Sorry, page not found"});
}

else
{
   verify(req.session.token,'qwertyuiop',(err,decoded)=>
{if(err)
{
   res.status(404).render('error_page', {title: "Sorry, page not found"});
}
else {
	next();
}});

}
}}