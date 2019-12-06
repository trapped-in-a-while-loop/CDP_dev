var mongoose = require('mongoose');
var project = require('./project');

var testSchema = new mongoose.Schema({
    Projet : {type: project.projectSchema, required: true},
    TestGiven : {type: String, required: true},
    TestWhen : {type: String, required: true},
    TestThen : {type: String, required: true}
});
var testModel = mongoose.model('test', testSchema, 'test');

exports.testModel = testModel;
exports.testSchema = testSchema;