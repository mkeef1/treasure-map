/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Treasure    = require('../../app/models/treasure'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'treasures-test';

describe('Treasure', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Treasure object', function(){
      var t = new Treasure({name:'gold', photo:'gold.jpg', spot:'Nashville', coordinates:(36.166667, -86.78333299999997), difficulty:'easy'});
      expect(t).to.be.instanceof(Treasure);
    });
  });

  describe('.all', function(){
    it('should get all treasures', function(done){
      Treasure.all(function(err, treasures){
        expect(treasures).to.have.length(3);
        done();
      });
    });
  });

  describe('.create', function(){
    it('should create a new treasure', function(done){
      var t = new Treasure({name:'gold', photo:'gold.jpg', spot:'Nashville', coordinates:(36.166667, -86.78333299999997), difficulty:'easy', hints:'go north'});
      Treasure.create(t, function(treasure){
        expect(t.name).to.equal('gold');
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a treasure by its id', function(done){
      Treasure.findById('000000000000000000000001', function(err, treasure){
        expect(treasure.name).to.equal('gold');
        done();
      });
    });
  });
});

