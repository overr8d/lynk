var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// user schema that holds user details
var userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

// password check method before saving the user to db
userSchema.pre('save', function(next) {
   var user = this;
   bcrypt.hash(user.password, null, null, function(err, hash) {
       if (err) return next(err);
           user.password = hash;
           next();
   });

});

// user password comparison method
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports= mongoose.model('User', userSchema);