'use strict';//using strict mode to resolve errors right away

//importing all the required dependencies
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const localStrat = require('passport-local').Strategy;
const mongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const env = require('dotenv').config();
const path = require('path')
const PORT = process.env.PORT || 3000;
const publicRoot = path.join(__dirname, '../client/dist');
const job = require('./mandiDB.js');
const bcrypt = require('bcrypt');
const { ObjectId } = require('bson');

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

let database, Users, Commodities;
//temp data storage || will later be switched with database
mongoClient.connect(process.env.MANDI_URI||'mongodb://localhost/users', {useUnifiedTopology: true}, (error,client) => {
                if(error)
                    throw error;
                database = client.db('Mandi');
                Users = database.collection('users');
                Commodities = database.collection('commodities');
                console.log('connected to Users and Commodities');
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
        'password': bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        'favourites': [],
    };
    Users.insert(data, (err, res) => {
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
    Users.findOne({_id : ObjectId(req.user._id)})
     .then((user) => {
        if(user._id == req.session.passport.user){
            // console.log([user, req.session]);
            res.send({
                user: {
                    name: user.name,
                    authenticated: true,
                }
            });
        }
        else
            res.status(200).send("Please Log In");
    }).catch((err) => {
        throw err;
    });
});

//using local auth strategy
passport.use(
    new localStrat(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        (username,password,done) => {
            Users.findOne({email:username})
                .then((user) => {
                    bcrypt.compare(password, user.password, (err, result) => {
                        if(err) console.log(err);
                        if( user.email === username && result){
                            return done(null,user);
                        }
                        else
                            return done(null, false, {message:'Incorrect username or password'});
                    });
                })
                .catch((err)=>{
                    done(err);
            });               
        },
    )
);

//user identification from cookie using id
passport.serializeUser((user,done) => {
    done(null, user._id);
});

//fulffiling request to access secured URL 
passport.deserializeUser((id ,done) => {
    Users.findOne({ _id : ObjectId(id)})
     .then((user) => {
        done(null, user);
      })
     .catch((err)=>{
         done(err);
     }) ;
});

//to favourite unfavourite a commodity
app.post('/api/favourite', authMiddleware, (req,res) => {
    let data = {
        'commodity': req.body.commodity,
        'variety': req.body.variety
    };
    Users.findOne({_id : ObjectId(req.user._id)})
     .then((user) => {
        Users.updateOne({_id: ObjectId(user._id)},{$push: {'favourites': data}});
        res.status(200).send('Added commodity to favourites');
    }).catch((err) => {
        throw err;
    });
});

//to fetch and return the favourite commodities
app.get('/api/favourite', async (req,res) => {
    let favs = [];
    Users.findOne({ _id : ObjectId(req.user._id) })
    .then(async (user) => {
        let userFavs = user.favourites;
        for(let i=0;i<userFavs.length;i++){
            let result = await Commodities.find({commodity: userFavs[i].commodity, variety: userFavs[i].variety}).sort({"arrival_date":-1}).limit(1).toArray();
                favs.push(result[0]);
        }
        res.status(200).send(favs);
    })
});

//to unfavourite favourite commodities
app.post('/api/removeFavourite', authMiddleware, (req,res) => {
    Users.findOne({ _id : ObjectId(req.user._id) })
    .then((user) => {
        Users.updateOne({ _id: ObjectId(user._id) }, {$pull: {favourites: {commodity: req.body.commodity, variety: req.body.variety}}})
        res.status(200).send('Item removed');
    })
    .catch((err) => {
        console.log(err);
    })
});

//to fetch and return all commodities from MandiDB
app.get('/api/mandi', (req,res) => {
        Commodities.find({}).sort({"arrival_date":-1}).limit(200).toArray((error,result) =>{
            if(error)
                return res.status(500).send(error); 
            res.status(200).send(result);
        });
});

//allowing express to listen to ports
app.listen(PORT, () => {
    console.log(`server is runnning on "http://localhost:${PORT}"`);
});