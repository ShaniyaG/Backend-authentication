const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


 const UserSchema = new mongoose.Schema({
        name: {
          type: String,
          required: [true, 'Please add a name'],
        },
        email: {
          type: String,
          required: [true, 'Please add an email'],
          unique: true,
          match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
          ],
        },
        role: {
          type: String,
          enum: ['user', 'publisher'],
          default: 'user',
        },
        password: {
          type: String,
          required: [true, 'Please add a password'],
          minlength: 6,
          select: false,
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      })

// hashing the password

UserSchema.pre('save',async function(next){
  const salt = await bcryptjs.genSalt(10);
  this.password =  await bcryptjs.hash(this.password,salt);
})
// Sign JWT and return 

UserSchema.methods.getSignedJwtToken = function (){
  return jwt.sign({id:this._id},process.env.JWT_SECRET, {
    expiresIn:process.env.JWT_EXPIRE
  })
}

// Compare Password with db password

UserSchema.methods.getPasswordCompare = async function(enteredPassword){
  return await bcryptjs.compare(enteredPassword,this.password)
}
module.exports = mongoose.model('users',UserSchema);