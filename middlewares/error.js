const ErrorResponse = require('../utilis/errorResponse')

const erroResponse = require("../utilis/errorResponse");

const errorHandler = (err,req,res,next)=>{
    let error = {...err};
    error.message = err.message;

    // console.log(err.stack.red);
    if(err.message === 'CastError'){
        const message = `Bootcamp not found with the id of ${err.value}`
        error = new ErrorResponse(message,404);
    }
    console.log(err.name);
    res.status(error.statusCode || 500).json({
        success:false,
        error:error.message || 'Server Error'
    })
}


module.exports = errorHandler;