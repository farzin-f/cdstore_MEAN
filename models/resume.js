var mongoose = require('mongoose');

// Schema
var resumeSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  create_date:{
    type: Date,
    default: Date.now
  }
});

// Creating the resume obj using mongoose.model and the schema we defined
// Make the obj globally accessible from outside by module.exports
var Resume =  module.exports = mongoose.model('Resume', resumeSchema);

// Get cd list
// Make a method globally accessible by module.exports
// callback to be entered to the route file and limit is optional
module.exports.getResume = function(callback, limit){
  Resume.find(callback).limit(limit);
};

// Add Resume
module.exports.addResume = function(resume, callback){
  Resume.create(resume);
};

// Update Resume
module.exports.updateResume = function(id, resume, options, callback){
  var query = {_id: id};
  var update = {
    name: resume.name
  };
  Resume.findOneAndUpdate(query, update, options, callback);
};

// Delete Resume
module.exports.removeResume = function(id, callback){
  var query = {_id: id};
  Resume.remove(query, callback);
};
