'use strict';
var Mongo = require('mongodb');

function Treasure(t){
  this.name = t.name;
  this.photo = t.photo;
  this.spot = t.spot;
  this.lat = parseFloat(t.lat);
  this.lng = parseFloat(t.lng);
  this.difficulty = t.difficulty;
  this.hints = t.hints;
  this.found = false;
}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasures');}
});

Treasure.all = function(cb){
  Treasure.collection.find().toArray(cb);
};

Treasure.save = function(t, cb){
  var o = new Treasure(t);
  Treasure.collection.save(o, cb);
};

Treasure.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Treasure.collection.findOne({_id:_id}, function(err, treasure){
    cb(err, treasure);
  });
};
module.exports = Treasure;

