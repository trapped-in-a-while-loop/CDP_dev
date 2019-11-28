var mongoose = require('mongoose');

var user = require('./user');

var projectSchema = new mongoose.Schema({
    Titre : { type: String, required: true},
    Description : { type: String},
    Proprietaire : { type: user.userSchema, required: true},
    Developpeurs : {type: [user.userSchema]},
    Clients : {type: [user.userSchema]}
});
var projectModel = mongoose.model('project', projectSchema, 'project');

exports.projectModel = projectModel;