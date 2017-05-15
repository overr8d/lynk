var User = require('../models/user');
var Project = require('../models/projects');
var History = require('../models/history');
var jwt = require('jsonwebtoken');
var secret = 'lynkMEANStack';

module.exports = function(router) {
    // http://localhost:8080/api/signup
    router.post('/signup', function (req, res) {
        var user = new User();
        user.email = req.body.email;
        user.password = req.body.password;
        if(req.body.email == null || req.body.email == ''|| req.body.password == null || req.body.password == ''){
            res.json({success: false, message: "Ensure email and password were provided!"});
        } else {
            user.save(function(err){
                if(err){
                    res.json({success: false, message: "Email already exists!!"});
                } else {
                    var token = jwt.sign({email: user.email}, secret, {expiresIn: '24h'});
                    res.json({success: true, message: "User created!", token: token});
                }
            });
        }
    });
    // http://localhost:8080/api/login
    router.post('/login', function (req, res) {
        User.findOne({email:req.body.email}).select('email password').exec(function(err, user){
            if(err) throw err;
            if(!user){
                res.json({success:false, message: 'Could not log the user in!'});
            } else if(user){
                if(req.body.password){

                    if(!user.comparePassword(req.body.password)){
                        res.json({success: false, message: 'Password invalid!'});
                    } else {
                        var token = jwt.sign({email: user.email}, secret, {expiresIn: '24h'});
                        res.json({success: true, message: 'User logged in!', token: token});
                    }
                } else {

                    res.json({success: false, message:'No password provided!'});
                }
            }
        });


    });

        // Define a middleware to decode the token
    router.use(function(req,res,next){
        var token = req.body.token || req.body.query ||req.headers['x-access-token'];
        if(token){
            jwt.verify(token, secret, function (err, decoded) {
                if(err){
                    res.json({success: false, message: 'Token invalid!'});
                } else {
                    req.decoded = decoded;
                    next(); // will proceed to next router
                }
            });
        } else {
            res.json({success: false, message: 'No token provided!'});
        }
    });
    // http://localhost:8080/api/me
    router.post('/me', function (req, res) {
        res.send(req.decoded);
    });

    // http://localhost:8080/api/dashboard
    router.get('/dashboard', function (req, res) {
        Project.find(function (err, projects) {
            if(err){
                res.json({success: false, message: "There is no project in the database"});
            }
            res.json({success: true, projects: projects});
        });
    });

    // http://localhost:8080/api/dashboard
    router.post('/dashboard', function (req, res) {
        var project = new Project();
        project.title = req.body.title;
        if(req.body.title == null || req.body.title == ''){
            res.json({success: false, message: 'Title invalid!'});
        } else {
            project.save(function (err) {
                if(err){
                    res.json({success: false, message: "Title already exists!!"});
                } else {
                    res.json({success: true, message: "Project created!"});
                }
            });
        }
    });
    // http://localhost:8080/api/project/:project_id
    router.get('/project/:project_id', function (req, res) {
        Project.findOne({_id: req.params.project_id}, function (err, project) {
            if(err){
                res.json({success: false, message: "Unable to find the specified project!"});
            } else {
                res.json({success: true, message: "successfully found the project!", project: project});
            }
        });
    });
    // http://localhost:8080/api/project/:project_id
    router.put('/project/:project_id', function (req, res) {
        Project.findById(req.params.project_id, function (err, project) {
            if(err) res.send(err);
            project.title = req.body.title;
            project.createdAt = req.body.createdAt;
            project.updatedAt = req.body.updatedAt;
            project.status = req.body.status;
            project.experts = req.body.experts;
            project.save(function (err) {
                if(err) {
                    res.json({success:false, message: 'project not updated!'});
                }
                res.json({success:true, message: 'project updated!'});
            })
        });
    });

    // http://localhost:8080/api/history
    router.get('/history', function (req, res) {
        History.find(function (err, history) {
            if(err){
                res.json({success: false, message: "There is no project in the database"});
            }
            res.json({success: true, history: history});
        });
    });
    // http://localhost:8080/api/history
    router.post('/history', function (req, res) {
        var history = new History();
        history.email = req.body.email;
        if(req.body.updatedAt){
            history.updatedAt = req.body.updatedAt;
        }
        history.projectTitle = req.body.projectTitle;
        history.expertName = req.body.expertName;
        if(req.body.expertStatus){
            history.expertStatus = req.body.expertStatus;
        }
        history.save(function (err) {
            if(err){
                res.json({success: false, message: "Error occurred!"});
            } else {
                res.json({success: true, message: "History created!"});
            }
        });
    });


    return router;
}

