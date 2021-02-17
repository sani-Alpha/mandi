'use strict';

const express = require('express');
const session = require('express-session');
const uuid = require('uuid').v4;
const fileStore = require('session-file-store')(session);
const mongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const env = require('dotenv').config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    genid: (req) => {
        console.log('Inside session middleware');
        console.log(req.sessionID);
        return uuid();
    },
    store: new fileStore(),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.get('/', (req,res) => {
    res.status(200).send('You have landed the home page');
    console.log('Inside homepage callback function');
    console.log(req.sessionID);
    app.use(express.static('client'));
});

app.route('/login')
    .get((req,res) => {
        res.send('you have landed the get : login page');
        console.log('inside GET /login callback function');
        console.log(req.sessionID);
    })
    .post((req,res) => {
        res.send('you have landed the post : login page');
        console.log('inside POST /login callback function');
        console.log(req.body);
    });

app.post('/register', (req,res) => {
    res.send('You have landed on registration page');
});

app.get('/mandi', (req,res) => {
    res.send('you have landed on Mandi Page');
});

app.listen(PORT, () => {
    console.log('server is runnning');
});