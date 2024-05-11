const ErrorResponse = require('../utilis/errorResponse');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.protect =  (async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
        token = req.headers.authorization.split(' ')[1];
    }
    // else if(req.cookies.token){
    //     token = req.cookies.token
    // }

    if(!token){
        // res.status(400).json({success:false,message:'Not Authorized to access this route on token'});

        return next(new ErrorResponse('Not Authorized to access this route',400));

    }
    try {
        // Verify token 
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        req.user = await User.findById(decoded.id);
        next();
        
    } catch (error) {
        console.log(error.message)

        return next(new ErrorResponse('Not Authorized to access this route',400));
        // res.status(400).json({success:false,message:'Not Authorized to access this route'});

    }
})



// Grand Access to specific roles 
exports.authorize =(...roles)=>{
    return (req,res,next)=>{
        console.log(roles.includes(req.user.role));
        if(!roles.includes(req.user.role)){
         return next(new ErrorResponse(`User role ${req.user.role} is not authorized`,403));
        }
        next();
    }
}

// // Grant access to specific roles
// exports.authorize = (...roles) => {
//     return (req, res, next) => {
//       if (!roles.includes(req.user.role)) {
//         return next(new ErrorResponse(`User role ${req.user.role} is not authorized`,403));

//       }
//       next();
//     };
//   };