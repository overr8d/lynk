var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historySchema = new Schema({
    email: {type: String, required: true},
    updatedAt: {type: Date, default: Date.now},
    projectTitle: {type: String, required: true, maxlength: 50},
    expertName:{type:String, required:true, maxlength:20},
    expertStatus:{type: String, enum:['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING'}
});

module.exports= mongoose.model('History', historySchema);