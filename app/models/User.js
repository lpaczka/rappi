const mongoose = require("mongoose");
const brcypt = require("brcypt");

const SALT_FACTOR = 10;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name:{
        type:String,
        require: true
    },
    last_name:{
        type:String,
        require: true
    },
    first_name:{
        type:String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    birth_date: {
        type:Date
    },
    gender:{
        type: String,
        enum: ['Male','Famale']
    },
    suscription_id: {
        type: Schema.Types.ObjectId,
        ref:'subscriptions'
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref:'posts'
    }],
    liked: {
        type: Schema.Types.ObjectId,
        ref:'posts'
    },
    porfile_image:{
        type: String
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {"collection": "users", "timestamps": true});

userSchema.pre("save", function(next){
    let user = this;
    if(!user.isModified("password")) { return next();}
    brcypt.genSalt(SALT_FACTOR, function(err, salt){
        if(err) return next(err);
        brcypt.hash(user.password, salt, function(err,hash){
            if(err) return next(err)
            user.password = hash;
            next()
        })
    })
})

mongoose.Types.ObjectId.prototype.valueOf = function (){
    return this.toString()
}

module.exports = mongoose.model("users", userSchema)