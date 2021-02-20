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
const got = require('got');
const request = require('request');
let database,collection;

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

//temp data storage || will later be switched with database
let users = [
    {
        id: 1,
        name: 'Sandy',
        email: 'user@email.com',
        password: 'password'
    },
    {
        id: 2,
        name: 'Rai',
        email: 'rai@email.com',
        password: 'password'
    },
];

//get request to home page
app.get('/', (req,res) => {
    res.status(200).sendFile('index.html', {root: publicRoot});
});

//post request from client to login page
app.post('/api/login', (req,res,next) => {
    passport.authenticate('local', (err,user,info) => {
        if(err) 
            return next(err);
        if(!user) 
            return res.status(400).send([user,'Cannot Log In!',info]);
        
        req.login(user,err => {
            res.send('Logged In!');
        });
    })(req,res,next);
});

//get request from clien to logout
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

//get request from client to fetch authenticated users
app.get('/api/user', authMiddleware, (req,res) => {
    let user = users.find(user => {
        return user.id === req.session.passport.user;
    });
    console.log([user, req.session]);
    res.send({user:user});
});

}
//using local auth strategy
passport.use(
    new localStrat(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        (username,password,done) => {
            let user = users.find((user) => {
                return user.email === username && user.password === password;
            });
            if(user)
                done(null,user);
            else
                done(null, false, {message:'Incorrect username or password'});
        },
    )
);

//user identification from cookie using id
passport.serializeUser((user,done) => {
    done(null, user.id);
});

//fulffiling request to access secured URL 
passport.deserializeUser((id ,done) => {
    let user = users.find((user) => {
        return user.id === id;
    });
    done(null, user);
});

//fetching api data
request.get({
        url: `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${process.env.MANDI_KEY}&format=json&offset=10&limit=10`,
        headers: {
         'accept': 'applications/xml'
        }, 
    }, 
    (error, response, body) => {
        if (!error && response.statusCode == 200) {
            //console.log(body);
        }
    });

//allowing express to listen to ports
app.listen(PORT, () => {
    mongoClient.connect(process.env.DB_URI||'mongodb://localhost/mandi', {useUnifiedTopology: true}, (error,client) => {
        if(error)
            throw error;
        database = client.db('mandi');
        collection = database.collection('commodities');
        console.log('connected to Mandi');
    });
    console.log('server is runnning');
});