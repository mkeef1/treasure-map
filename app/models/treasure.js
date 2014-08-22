'use strict';
var Mongo = require('mongodb'),
    _     = require('lodash'),
    fs    = require('fs'),
    path  = require('path');

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

Treasure.create = function(t, cb){
  var o = new Treasure(t);
  Treasure.collection.save(o, cb);
};

Treasure.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Treasure.collection.findOne({_id:_id}, function(err, obj){
    cb(err, _.create(Treasure.prototype, obj));
  });
};

Treasure.prototype.toggle = function(){
  this.found = true;
};

Treasure.prototype.save = function(cb){
  Treasure.collection.save(this, cb);
};

Treasure.prototype.uploadPhoto = function(file, cb){
  var dir   = __dirname + '/../static/img/' + this._id,
      exist = fs.existsSync(dir),
      self  = this;

  if(!exist){fs.mkdirSync(dir);}

  file.photo(function(photo){
    var ext    = path.extname(photo.path),
        rel    = '/img/' + self._id + '/' + self.photo + ext,
        abs    = dir + '/' + self.photo + ext;
    fs.renameSync(photo.path, abs);
    self.photo = rel;
  });

  Treasure.collection.save(self, cb);
};

// Private Function //

function changePrototype(obj){
  var treasure = _.create(Treasure.prototype, obj);
  return treasure;
}
module.exports = Treasure;
