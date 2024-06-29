const sendEmail = require("../email")

exports.sendEmail = async(req,res,next)=>{
    const {review} = req.body;    
    try {
        await sendEmail({
           review
        });

    res.status(200).json({
        status: 'success',
        message: 'Email sent successfully',
    })}
    catch(error){
        console.log(error)
        res.status(500).json({
            status: 'error',
            message: 'Email not sent',
        })}
}
