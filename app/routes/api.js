var User = require('../models/User');
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

    router.post('/me', function (req, res) {
        res.send(req.decoded);
    });

    return router;
}

