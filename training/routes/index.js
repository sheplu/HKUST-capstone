var express = require('express');
var mongoose = require( 'mongoose' );
var ObjectId = mongoose.Types.ObjectId;
var utils = require( 'connect' ).utils;
var crypto = require('crypto');

var router = express.Router();
var User = mongoose.model( 'User' );

router.get('/', function(req, res, next) {
  res.render('public/index', { title: 'Index' });
});

router.get('/about', function(req, res, next) {
  res.render('public/about', { title: 'About' });
});

router.get('/contact', function(req, res, next) {
  res.render('public/contact', { title: 'Contact' });
});

router.get('/register', function(req, res, next) {
  if(req.session.userId) {
    res.redirect('/dashboard');
  }
  res.render('public/register', {
    title: 'Register'
  });
});

router.get('/login', function(req, res, next) {
  if(req.session.userId) {
    res.redirect('/dashboard');
  }
  res.render('public/login', {
    title: 'Login'
  });
});

router.post('/register', function(req, res, next) {
  new User({
      identifiant: "0",
      firstname : req.body.firstname,
      lastname : req.body.lastname,
      mail : req.body.mail,
      password : crypto.createHmac('sha1', "bibinoulelapinou").update(req.body.password).digest('hex')
  }).save( function ( err, user, count ){
    if( err ) {
      res.render( 'public/register', {
        title : 'Register',
        req   : req,
        error : err
      });
    }
    else {
      res.render( 'public/register', {
        title : 'Register',
        req   : req,
        success : "Votre compte ("+req.body.mail+") vient d'être créé avec succès !"
      });
    }
  });
});

router.post('/login', function (req, res, next) {
  User.
    findOne({mail: req.body.mail, password: crypto.createHmac('sha1', "bibinoulelapinou").update(req.body.password).digest('hex')}).
    sort( '-updated_at' ).
    exec( function ( err, user ){
      if( err ) return next( err );

      if ( user ) {
        req.session.userId = user.id;
        console.log(req.session.userId);
        if(user.role == "admin") req.session.admin = 1;
        res.redirect('/dashboard/index');
      }
      else {
        res.redirect('/');
      }
    });
});

router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
