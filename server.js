const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const port = process.env.port || 3000;
const dbuser = "root";
const dbpassword = "password123";
const db = `mongodb://${dbuser}:${dbpassword}@ds155663.mlab.com:55663/users`;

const UserList = mongoose.model('userlist', { name: String, position: String, imgurl: String}, "userlist" );
const User = mongoose.model('admin', { login: String, password: String}, "admin" );

const app = express();
app.use(express.static(path.join(__dirname, 'dist/AppSuperAdmin')));
mongoose.connect(db, { useNewUrlParser: true }, function (err, response) {
    if(err) console.log('Error connecting: ' + err);
        console.log('Connection database succesful!');
});

const server = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res) {
    res.send('index.html');
});

app.post('/admin',  function(req, res){
    let userData = req.body;
    
    User.findOne({login: userData.login}, (err, user) =>{
        if(err){
            console.log(err);
        }else {
            if(!user){ 
                res.status(401).send('Incorect Login!');
            } else
            if (user.password !== userData.password){
                res.status(401).send('Invalid Password');
            } else{
                let payload = { subject: user._id}
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({token});
            }
        }
    })
});

//get all users
app.get('/users', verifyToken, function (req, res) {
    UserList.find({}, function (err, users) {
        if(err){
            console.log(err);
        }
        res.json(users);
        console.log(users);
    });
});

//add new user
app.post('/users', verifyToken, function(req, res)
{
    var _name = req.body.name;
    var _position = req.body.position;
    var _url = req.body.imgurl;

    var user = new UserList({name: _name, position: _position, imgurl: _url});
    user.save(function (err) 
    {
        if (err) return handleError(err);
        res.sendStatus(201);
    });
});
 
// delete user
app.delete('/users/:id', verifyToken,  function(req,res)
{
    var id = req.params.id;
    UserList.findByIdAndRemove(id, function(err) 
    {
        if (!err) 
        {
            res.sendStatus(200);
        }
        else 
        {
            console.log(err);
            res.sendStatus(500);
        }
    });
});

function verifyToken(req, res, next) {
    if(!req.headers.autorization){
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.autorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

server.listen(port,
    function()
    {
        console.log(`App listening on port ${port}!`);
    });

