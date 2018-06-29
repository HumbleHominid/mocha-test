const express = require('express');

// routes
const data = require('./routes/data');

function Server() {
    let app = express();

    app.route('/')
    .get(function(req, res) {
        res.status(200).send('ok\n');
    });

    // use the middleware
    app.use(data);

    return app.listen(30125);
}

module.exports = Server;
