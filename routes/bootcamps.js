const express = require('express');
const { getBootcamps,getBootcamp,createBootcamps,updateBootcamps,deleteBootcamps ,getBootcampWithinRadius } = require('../controllers/bootcamp.controller')
const router = express.Router();

const { protect,authorize } = require('../middlewares/auth')

router.route('/radius/:zipcode/:distance').get(getBootcampWithinRadius);
router.route('/').get(getBootcamps).post(protect,authorize('publisher','admin'),createBootcamps);
router.route('/:id').get(getBootcamp).put(protect,authorize('publisher','admin'),updateBootcamps).delete(protect,authorize('publisher','admin'), deleteBootcamps);

module.exports = router;