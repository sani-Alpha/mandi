'use strict';//using strict mode to resolve errors right away

//importing all the required dependencies
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const localStrat = require('passport-local').Strategy;
const mongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const env = require('dotenv').config();
const PORT = process.env.PORT || 3000;
const publicRoot = process.env.MANDIPATH;
const job = require('./mandiDB.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//declaring express app
const app = express();

//statically serving the client dist
app.use(express.static(publicRoot));

//enabling body-parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//enabling cookie-session
app.use(cookieSession({
    name: 'mysession',
    keys: [process.env.SECRET],
    maxAge: 24*60*60*1000 //milliseconds to 24hrs
}));

//enabling passport for auth
app.use(passport.initialize());
app.use(passport.session());

let database,collection;
//temp data storage || will later be switched with database
mongoClient.connect(process.env.USER_URI||'mongodb://localhost/users', {useUnifiedTopology: true}, (error,client) => {
                if(error)
                    throw error;
                database = client.db('Users')
                collection = database.collection('users')
                console.log('connected to Users');
            });

//get request to home page
app.get('/', (req,res) => {
    res.status(200).sendFile('index.html', {root: publicRoot});
});

//post request to register into db user details
app.post('/api/register', (req,res) => {
    let data = {
        'name': req.body.name,
        'username': req.body.username,
        'email': req.body.email,
        'password': req.body.password,
    };
    collection.insert(data, (err, res) => {
        if(err) throw err;
        console.log('Number of documents inserted: ' + res.insertedCount);
    });
    res.status(200).send('Signup Successful');
});

//post request from client to login page
app.post('/api/login', (req,res,next) => {
    passport.authenticate('local', (err,user,info) => {
        if(err) 
            return next(err);
        if(!user) 
            return res.status(400).send([user,'Cannot Log In!',info]);
        
        req.login(user,err => {
            if(err) console.log(err);
            res.send('Logged In!');
        });
    })(req,res,next);
});

//get request from client to logout
app.get('/api/logout', (req,res) => {
    req.logout();
    console.log('Logged Out!');
    return res.send();
});

//defining middleware filter
const authMiddleware = (req,res,next) => {
    if(!req.isAuthenticated())
        res.status(401).send('You are not Authenticated!');
    else
        return next();
}

//get request from client to fetch authenticated users
app.get('/api/user', authMiddleware, (req,res) => {
    let user = collection.find(user => {
        return user.id === req.session.passport.user;
    });
    console.log([user, req.session]);
    res.send({user:user});
});

//using local auth strategy
passport.use(
    new localStrat(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        (username,password,done) => {
            collection.findOne({email:username})
                .then((user) => {
                if( user.email === username && user.password === password)
                    return done(null,user);
                else
                    return done(null, false, {message:'Incorrect username or password'});
            })
            .catch((err)=>{
                done(err);
            });               
        },
    )
);

//user identification from cookie using id
passport.serializeUser((user,done) => {
    console.log(user);
    done(null, user._id);
});

//fulffiling request to access secured URL 
passport.deserializeUser((id ,done) => {
    collection.findById(id, function (err, user) {
        if (err) {
          return done(err);
        }
        done(null, user);
      });
});

app.get('/api/mandi', (req,res) => {
    mongoClient.connect(process.env.MANDI_URI||'mongodb://localhost/mandi', {useUnifiedTopology: true}, (error,client) => {
        if(error)
            throw error;
        client.db('Mandi').collection('commodities').find({}).sort({"arrival_date":-1}).limit(192).toArray((error,result) =>{
            if(error)
                return res.status(500).send(error); 
            res.status(200).send(result);
        });
    });
})

//allowing express to listen to ports
app.listen(PORT, () => {
    console.log('server is runnning');
});