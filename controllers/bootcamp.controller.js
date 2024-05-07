// @desc get all bootcamps
// @route Get api/v1/bootcamps
// @access public


exports.getBootcamps = (req,res,next)=>{
    res.status(200).json({success:true, message:'Get all bootcamps',hello:req.hello})
}

// @desc get One bootcamps
// @route Get api/v1/bootcamp
// @access public


exports.getBootcamp = (req,res,next)=>{
    res.status(200).json({success:true, message:'Get One bootcamps'})
}

// @desc Create new bootcamps
// @route Get api/v1/bootcamps
// @access public


exports.createBootcamps = (req,res,next)=>{
    res.status(200).json({success:true, message:'Create new bootcamps'})
}
// @desc Update  bootcamps
// @route Put api/v1/bootcamps
// @access public


exports.updateBootcamps = (req,res,next)=>{
    res.status(200).json({success:true, message:'Update  bootcamps'})
}
// @desc delete all bootcamps
// @route dekete api/v1/bootcamps
// @access public


exports.deleteBootcamps = (req,res,next)=>{
    res.status(200).json({success:true, message:'Delet  bootcamps'})
}