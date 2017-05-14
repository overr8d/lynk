var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var projectSchema = new Schema({
    title: {type: String, required: true, unique: true}
});


// userSchema.pre('save', function(next) {
//     var user = this;
//     bcrypt.hash(user.password, null, null, function(err, hash) {
//         console.log(hash);
//         if (err) return next(err);
//         user.password = hash;
//         next();
//     });
//
// });
//
// userSchema.methods.comparePassword = function (password) {
//     console.log(password);
//     console.log(this.password);
//     return bcrypt.compareSync(password, this.password);
// };

module.exports= mongoose.model('Project', projectSchema);