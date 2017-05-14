var mongoose = require('mongoose');

// Schema
var cdSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  artist:{
    type: String,
    required: true
  },
  genre:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  img_url:{
    type: String,
  },
  create_date:{
    type: Date,
    default: Date.now
  }
});

// Make the Genre obj globally accessible from outside
var Cd =  module.exports = mongoose.model('Cd', cdSchema);

// Make a method globally accessible
// callback to be entered to the route file and limit is optional
module.exports.getCd = function(callback, limit){
  Cd.find(callback).limit(limit);
};

// Add cd
module.exports.addCd = function(newcd, callback){
  Cd.create(newcd, callback);
};

// Update cd
module.exports.updateCd = function(id, cd, options, callback){
  var query = {_id: id};
  var update = {
    title: cd.title,
    artist: cd.artist,
    genre: cd.genre,
    price: cd.price,
    img_url: cd.img_url
  };
  Cd.findOneAndUpdate(query, update, options, callback);
};

// Delete cd
module.exports.removeCd = function(id, callback){
  var query = {_id: id};
  Cd.remove(query, callback);
};
