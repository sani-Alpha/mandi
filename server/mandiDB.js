//fetching api data
const request = require('request');
const mongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const cronJob = require('cron').CronJob;

const job = new cronJob('00 47 15 * * 0-6', () => {
    request.get({
        url: `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${process.env.MANDI_KEY}&format=json&offset=0&limit=2`,
        headers: {
         'accept': 'applications/xml'
        }, 
    }, 
    (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let dataObj = JSON.parse(body).records;
    
            let database,collection;
    
            mongoClient.connect(process.env.MANDI_URI||'mongodb://localhost/mandi', {useUnifiedTopology: true}, (error,client) => {
                if(error)
                    throw error;
                database = client.db('Mandi');
                collection = database.collection('commodities');
                console.log('connected to Mandi');
                collection.insertMany(dataObj, (err, res) => {
                    if(err) throw err;
                    console.log('Number of documents inserted: ' + res.insertedCount);
                });
            });
        }
    });
});
job.start();