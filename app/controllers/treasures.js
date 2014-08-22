'use strict';
var Treasure = require('../models/treasure'),
    mp       = require('multiparty');

exports.init = function(req, res){
  res.render('treasures/init');
};

exports.create = function(req, res){
  var form = new mp.Form();
  from.parse(req, function(err, fields, file){
    Treasure.create(fields, file, function(){
      res.redirect('/treasures');
    });
  });
};

exports.index = function(req, res){
  Treasure.all(function(err, treasures){
    res.render('treasures/index', {treasures:treasures});
  });
};

exports.show = function(req, res){
  Treasure.findById(req.params.id, function(err, treasure){
    res.render('treasures/show', {treasure:treasure});
  });
};

exports.found = function(req, res){
  Treasure.findById(req.params.id, function(err, treasure){
    treasure.found = true;
    treasure.save(function(){
      res.redirect('/treasures');
    });
  });
};

