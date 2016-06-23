var express = require('express');
var mongoose = require( 'mongoose' );
var utils = require( 'connect' ).utils;
var crypto = require('crypto');

var router = express.Router();
var Classroom = mongoose.model( 'Classrooms' );
var Teacher = mongoose.model( 'Teachers' );
var Student = mongoose.model( 'Students' );
var Course = mongoose.model( 'Courses' );
var User = mongoose.model( 'User' );
var TimeSlot = mongoose.model( 'TimeSlots' );

router.get('/index', function(req, res, next) {
  if(!req.session.userId) {
    res.redirect('/');
  }
  else {
  	TimeSlot.
	  	find().
	   	sort( '-updated_at' ).
	   	populate(['course']).
	   	exec( function ( err, timeslots ){
	     	if( err ) return next( err );

		    res.render( 'dashboard/index', {
		        title : 'Dashboard',
		        req   : req,
		        timeslots : JSON.stringify(timeslots),
		        active: 0
		    });
	   });
  }
});



 // STUDENT
router.get('/students', function(req, res, next) {
  	if(!req.session.userId) res.redirect('/');
	   Student.
	   find().
	   populate('classroom').
	   sort( '-updated_at' ).
	   exec( function ( err, students ){
	     if( err ) return next( err );

	     res.render( 'dashboard/students', {
	         title : 'Students',
	         req   : req,
	         students : students,
	         active: 1
	     });
	   });
});

router.get('/students/add', function(req, res, next) {
	if(!req.session.userId) res.redirect('/');
	   Classroom.
	   find().
	   sort( '-updated_at' ).
	   exec( function ( err, classrooms ){
	     if( err ) return next( err );

	     res.render( 'dashboard/students_add', {
	         title : 'Students',
	         req   : req,
	         classrooms : classrooms,
	         active: 1
	     });
	   });
});

router.post('/students/add', function(req, res, next) {
	new Student({
		identifiant: "0",
      	lastname : req.body.lastname,
      	firstname : req.body.firstname,
      	email : req.body.mail,
      	classroom : req.body.classroom
	}).save(function(err, student, count) {
		if( err ) {
	      res.render( 'dashboard/students_add', {
	        title : 'Add Student',
	        req   : req,
	        error : err,
	        active: 1
	      });
	    }
	    else {
	      res.render( 'dashboard/students_add', {
	        title : 'Add Students',
	        req   : req,
	        success : "L'étudiant ("+req.body.firstname+ " " + req.body.lastname + ") vient d'être créé avec succès !",
	         active: 1
	      });
	    }
	});
});



 // TEACHER
router.get('/teachers', function(req, res, next) {
  if(!req.session.userId) {
    res.redirect('/');
  }
  else {
    User.
    find({role: "teacher"}).
    sort( '-updated_at' ).
    exec( function ( err, users ){
      if( err ) return next( err );

      res.render( 'dashboard/teachers', {
          title : 'Teachers',
          req   : req,
          teachers : users,
          active: 2
      });
    });
  }
});

router.get('/teachers/add', function(req, res, next) {
  if(!req.session.userId) {
    res.redirect('/');
  }
  else {
    res.render('dashboard/teachers_add', { title: 'Teachers', active: 2 });
  }
});

router.post('/teachers/add', function(req, res, next) {
  console.log(req.body);
	new User({
		    identifiant: "0",
      	firstname : req.body.firstname,
        lastname : req.body.lastname,
        mail : req.body.mail,
        password : crypto.createHmac('sha1', "bibinoulelapinou").update(req.body.password).digest('hex'),
        role : "teacher"
	}).save(function(err, teacher, count) {
		if( err ) {
        console.log(err);
	      res.render( 'dashboard/teachers', {
	        title : 'Add Teachers',
	        req   : req,
	        error : err,
	        active: 2
	      });
	    }
	    else {
        console.log("done");
	      res.render( 'dashboard/teachers_add', {
	        title : 'Add teachers',
	        req   : req,
	        success : "Le formateur ("+req.body.mail+") vient d'être créé avec succès !",
	        active: 2
	      });
	    }
	});
});



 // CLASSROOM
router.get('/classrooms', function(req, res, next) {
	if(!req.session.userId) res.redirect('/');
	   Classroom.
	   find().
	   sort( '-updated_at' ).
	   exec( function ( err, classrooms ){
	     if( err ) return next( err );

	     res.render( 'dashboard/classrooms', {
	         title : 'Classrooms',
	         req   : req,
	         classrooms : classrooms,
	         active: 3
	     });
	   });
});

router.get('/classrooms/add', function(req, res, next) {
  if(!req.session.userId) {
    res.redirect('/');
  }
  else {

    res.render('dashboard/classrooms_add', { title: 'Classrooms', active: 3 });
  }
});

router.post('/classrooms/add', function(req, res, next) {
	new Classroom({
		identifiant: "0",
      	name : req.body.name,
	}).save(function(err, student, count) {
		if( err ) {
	      res.render( 'dashboard/classrooms_add', {
	        title : 'Add Classroom',
	        req   : req,
	        error : err,
	        active: 3
	      });
	    }
	    else {
	      res.render( 'dashboard/classrooms_add', {
	        title : 'Add classroom',
	        req   : req,
	        success : "La classe ("+req.body.name+") vient d'être créé avec succès !",
	        active: 3
	      });
	    }
	});
});

// COURSES
router.get('/courses', function(req, res, next) {
	if(!req.session.userId) res.redirect('/');
	   Course.
	   find().
	   sort( '-updated_at' ).
	   populate('classroom').
     populate('teacher').
	   exec( function ( err, courses ){
	     if( err ) return next( err );
       console.log(courses);
	     res.render( 'dashboard/courses', {
	         title : 'Classrooms',
	         req   : req,
	         courses : courses,
	         active: 4
	     });
	   });
});

router.get('/courses/add', function(req, res, next) {
  if(!req.session.userId) {
    res.redirect('/');
  }
  else {
	Classroom.find().sort( '-updated_at' ).
   		exec( function ( err, classrooms ){
     		User.find({role: "teacher"}).sort( '-updated_at' ).
   				exec( function ( err, teachers ){
     				res.render('dashboard/courses_add', { title: 'Courses', classrooms : classrooms, teachers: teachers, active: 4 });
     		});
     	});
  	}
});

router.post('/courses/add', function(req, res, next) {
	new Course({
		identifiant: "0",
      	name : req.body.name,
      	classroom : req.body.classroom,
      	teacher : req.body.teacher,
	}).save(function(err, course, count) {
		if( err ) {
		    res.render( 'dashboard/courses_add', {
		        title : 'Add Courses',
		        req   : req,
		        error : err,
		        active: 4
		    });
		}
		else {
      var test = req.body.end_date.split("-");
      var day = parseInt(test[2])+parseInt(1);
			new TimeSlot({
				identifiant: "0",
	      		start_date : req.body.start_date,
	      		end_date : test[0]+"-"+test[1]+"-"+day,
	      		course : course.id,
			}).save(function(err, timeslot, count) {
				if( err ) {
			      res.render( 'dashboard/courses_add', {
			        title : 'Add Courses',
			        req   : req,
			        error : err,
			        active: 4
			      });
			    }
			    else {
			      res.render( 'dashboard/courses_add', {
			        title : 'Add course',
			        req   : req,
			        success : "Le cours ("+req.body.name+") vient d'être créé avec succès !",
			        active: 4
			      });
			    }
			});
		}
	});
});

 // MARKS
router.get('/marks', function(req, res, next) {
  if(!req.session.userId) {
    res.redirect('/');
  }
  else {
    res.render('dashboard/marks', { title: 'Marks' });
  }
});



 // ABSENTS
router.get('/absents', function(req, res, next) {
  if(!req.session.userId) {
    res.redirect('/');
  }
  else {
    res.render('dashboard/absents', { title: 'Absents' });
  }
});



 // ROOMS
router.get('/rooms', function(req, res, next) {
  if(!req.session.userId) {
    res.redirect('/');
  }
  else {
    res.render('dashboard/rooms', { title: 'Rooms' });
  }
});



 // TEMPLATES
router.get('/templates', function(req, res, next) {
  if(!req.session.userId) {
    res.redirect('/');
  }
  else {
    res.render('dashboard/templates', { title: 'Templates' });
  }
});



 // MAILS
router.get('/mails', function(req, res, next) {
  if(!req.session.userId) {
    res.redirect('/');
  }
  else {
    res.render('dashboard/mails', { title: 'Mails' });
  }
});



 // CAMPUS
router.get('/campus', function(req, res, next) {
  if(!req.session.userId) {
    res.redirect('/');
  }
  else {
    res.render('dashboard/campus', { title: 'Campus' });
  }
});



 // SEARCH
router.get('/search', function(req, res, next) {
  if(!req.session.userId) {
    res.redirect('/');
  }
  else {
    res.render('dashboard/search', { title: 'Search' });
  }
});


module.exports = router;
