const User = require('../models/User');
const ErrorResponse = require('../utilis/errorResponse.js');

// @desc Register all User
// @route Get api/v1/auth/register
// @access public

exports.register =  async (req,res,next)=>{
    const { name,email,role,password } = req.body;
    const user = await User.create({
        name,
        email,
        role,
        password
    })
    sendTokeResponse(user,200,res);   

}


// @desc Login all User
// @route Get api/v1/auth/login
// @access public

exports.login =  async (req,res,next)=>{
try {
    const { email,password } = req.body;
    if(!email ||  !password) {
    //   return res.status(400).json({message:'Please enter Valid Credentials'});
    return  next(new ErrorResponse(`Please enter Valid Credentials`,400));

    }

    const user = await User.findOne({email}).select('+password');
    if(!user){
    //   return  res.status(401).json({message:'User not found'});
    return  next(new ErrorResponse(`User not found`,401));

    }
    //  if password matches
    const isMatch = await user.getPasswordCompare(password);
    console.log(isMatch)
    if(!isMatch){
    //    return res.status(400).json({message:'Please enter Valid Credentials'});
    return  next(new ErrorResponse(`Please enter Valid Credentials`,400));

    }
    sendTokeResponse(user,200,res);   
} catch (error) {
    res.status(400).json({success:false});
    return  next(new ErrorResponse(`${error}`,400));
    console.log(error);
}
}


// Get token from Model,create cookie and send Response

const sendTokeResponse = (user,statusCode,res)=>{
    // create Token 
    const token = user.getSignedJwtToken();

    const options = {
        expries:new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 2*60*60*1000
        ),
        httpOnly:true
    }
    res
    .status(statusCode)
    .cookie('token',token,options)
    .json({
        success:true,
        token
    });
    if(process.env.NODE_ENV === 'production') {
        options.secure = true;
    }
}


// @desc Get CurrentUser
// @route Get api/v1/auth/me
// @access public

exports.getMe = (async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({success:true,data:user});
})
