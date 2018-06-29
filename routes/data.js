const express = require('express'),
        mongo = require('mongodb'),
        MongoClient = mongo.MongoClient,
        config = require('../config'),
        bodyParser = require('body-parser');

let router = express.Router();
router.use(bodyParser.json());
// define the /data route
router.route('/data')
// define the post handler
.post((req, res) => {
    MongoClient.connect(config.mongoURL, { useNewUrlParser: true },
            (err, client) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }

        const db = client.db(config.dbName);

        db.collection('data').insertOne(req.body)
        .then((response) => {
            res.sendStatus(200);
            client.close();
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
            client.close();
        });
    });
});

module.exports = router;
