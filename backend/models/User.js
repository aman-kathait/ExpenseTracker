const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profileImageUrl:{
        type:String,
        default:'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
    }
}, {timestamps:true}
);

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password=await bcrypt.hash(this.password,12);
    next();
});

userSchema.methods.comparePassword=async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User=mongoose.model('User',userSchema);
module.exports=User;