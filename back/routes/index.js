let express = require('express');
let app = express.Router();

let mongoose = require('mongoose');

app.get("/", function(req, res, next) {
    mongoose.connect("mongodb+srv://edupland:IXbRIqduk9asZ1o@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
        if (err) console.log(err);
        
})