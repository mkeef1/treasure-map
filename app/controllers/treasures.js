'use strict';
var Treasure = require('../models/treasure'),
    mp       = require('multiparty');

exports.init = function(req, res){
  res.render('treasures/init');
};

exports.create = function(req, res){
  Treasure.create(req.body, function(){
    res.redirect('/treasures');
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
    Treasure.toggle();
    Treasure.save(function(){
      res.redirect('/treasures');
    });
  });
};

exports.uploadPhoto = function(req, res){
  Treasure.findById(req.params.id, function(err, treasure){
    var form = new mp.Form();
    form.parse(req, function(err, fields, files){
      treasure.uploadPhoto(files, function(){
        res.redirect('/treasures/' + req.params.id);
      });
    });
  });
};
