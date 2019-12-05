var mongoose = require('mongoose');
var project = require('./project');

var issueSchema = new mongoose.Schema({
  Projet : {type: project.projectSchema, required: true},
  Role : {type: String, required: true},
  Action : {type: String, required: true},
  Raison : {type: String, required: true}
});
var issueModel = mongoose.model('issue', issueSchema, 'issue');

exports.issueModel = issueModel;
exports.issueSchema = issueSchema;