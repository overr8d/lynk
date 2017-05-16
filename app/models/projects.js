var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// nested schema within project schema to hold expert details
var expertSchema = new Schema({
    name: {type:String, required:true, unique:true, maxlength:20},
    description: {type: String, required:true, maxlength:1000},
    status:{type: String, enum:['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING'}
});
// project schema that holds project details
var projectSchema = new Schema({
    title: {type: String, required: true, unique: true, maxlength: 50},
    createdAt: {type: Date, default: Date.now},
    status: {type: String, enum: ['NEW','PENDING','EXPIRED'], default: 'NEW'},
    experts: [expertSchema]
});



//***************** Hard-coded Test Data ********************
var Project = mongoose.model('Project', projectSchema);
var prj = [];
prj.push(new Project({title:"Ironman", createdAt:new Date(2008,1,1).toISOString(), status: 'EXPIRED'}));
prj.push(new Project({title:"Thor", createdAt:new Date(2018,1,1).toISOString()}));
prj.push(new Project({title:"Spiderman", createdAt:new Date(2018,1,1).toISOString()}));
prj.push(new Project({title:"Vision", createdAt:new Date(2019,11,11).toISOString()}));
prj.push(new Project({title:"Quicksilver", createdAt:new Date(2016,11,11).toISOString(), status: 'EXPIRED'}));
prj.push(new Project({title:"Antman", createdAt:new Date(2013,11,11).toISOString(),  status: 'EXPIRED'}));
prj.push(new Project({title:"Thanos", createdAt:new Date(2046,11,11).toISOString()}));
prj.push(new Project({title:"Hulk", createdAt:new Date(2032,11,11).toISOString()}));
prj.forEach(function (e) {
    if(e.status != "EXPIRED"){
    e.experts.push({name:'Wolverine', description:'Born with super-human senses and the power to heal from almost any wound'});
    e.experts.push({name:'Jean Grey', description:'Jean Elaine Grey is a Class Five mutant with immensely powerful telepathic and telekinetic'});
    e.experts.push({name:'Charles Xavier', description:'Charles Francis Xavier, also known as Professor X, is a mutant who possessed strong telepathy and arguably the most powerful mind on Earth'});
    }
    e.save();
});
//**************************************************
module.exports= mongoose.model('Project', projectSchema);