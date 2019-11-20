const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

mongoose.connect("mongodb+srv://ptomas:gtWefenhKP67PPCQ@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("MongoDB connected");
            app.get('/routes');
            app.listen(5000, function() {
                console.log("listening to port 5000");
            });
        }
    }
);

module.exports = app;
