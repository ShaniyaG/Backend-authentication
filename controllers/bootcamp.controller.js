const Bootcamp = require('../models/Bootcamp.js');
const asyncHandler = require('../middlewares/async.js');
const ErrorResponse = require('../utilis/errorResponse.js');
const geocoder = require('../utilis/geocode.js');


// @desc get all bootcamps
// @route Get api/v1/bootcamps
// @access public


exports.getBootcamps = async (req,res,next)=>{
    try {
        let query;
        let queryString = JSON.stringify(req.query);
        queryString.replace(/\b(gt|gte|lt|lte|in)\b/g,match=>`$${match}`);
        console.log(queryString);
        query =  Bootcamp.find(JSON.parse(queryString));
        console.log(query,'checking')
        const bootcamp = await query;
        res.status(200).json({success:true,data:bootcamp,count:bootcamp.length})
    } catch (error) {
        res.status(400).json({success:false});
        console.log(error);
    }
}

// @desc get One bootcamps
// @route Get api/v1/bootcamp
// @access public


exports.getBootcamp = async(req,res,next)=>{
    try {
       
        const bootcamp = await Bootcamp.findById(req.params.id);
        if(!bootcamp){
            return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404));
        }
        res.status(200).json({success:true, bootcamp});

    } catch (error) {
        // res.status(400).json({success:false});
        // console.log(error);
        next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404));
        // next(error);

    }
}


// @desc Create new bootcamps
// @route Get api/v1/bootcamps
// @access public


exports.createBootcamps = async (req,res,next)=>{
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
         success:true,
         bootcamp
        })
    } catch (error) {
        res.status(400).json({success:false,message:error.message});
        console.log(error);
    }

}
// @desc Update  bootcamps
// @route Put api/v1/bootcamps
// @access public


exports.updateBootcamps = async (req,res,next)=>{
    try {
        const bootCamp = await Bootcamp.findByIdAndUpdate(req.params.id,req.body);
        if(!bootCamp){
            return res.status(400).json({success:false});
    
        }
        res.status(200).json({success:true, data:bootCamp});  
    } catch (error) {
        res.status(400).json({success:false});
        console.log(error);
    }

}
// @desc delete all bootcamps
// @route dekete api/v1/bootcamps
// @access public

exports.deleteBootcamps = async (req,res,next)=>{
    try {
        const bootCamp = await Bootcamp.findByIdAndDelete(req.params.id);
        if(!bootCamp) {
            return res.status(400).json({success:false});

        }
        res.status(200).json({success:true,count:bootCamp.length}) 
    } catch (error) {
        res.status(400).json({success:false});
        console.log(error);
    }

}




// @desc get bootcamps within a radius
// @route Get api/v1/bootcamp/radius/:zipcode/:distance
// @access Private


exports.getBootcampWithinRadius = async (req,res,next)=>{
    try { 
        const { zipcode, distance } = req.params;

        // Get lat/lng from geocoder
        const loc = await geocoder.geocode(zipcode);
        const lat = loc[0].latitude;
        const lng = loc[0].longitude;
      
        // Calc radius using radians
        // Divide dist by radius of Earth
        // Earth Radius = 3,963 mi / 6,378 km
        const radius = distance / 3963;
      
        const bootcamps = await Bootcamp.find({
          location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
        });
      
        res.status(200).json({
          success: true,
          count: bootcamps.length,
          data: bootcamps
        });

    } catch (error) {
        next(new ErrorResponse(`Bootcamp not found with id of ${req.params.distance}`,404));
     

    }
}