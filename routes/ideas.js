const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');
// Load Idea Model
require('../models/Idea');
//Aplication model
require('../models/Applications');
const Idea = mongoose.model('ideas');
const Applications = mongoose.model('application');

// Idea Index Page
router.get('/',ensureAuthenticated, (req, res) => {
  Idea.find({user: req.user.id})
    .sort({date:'desc'})
    .then(ideas => {
      res.render('ideas/index', {
        ideas:ideas
      });
    });
});
// Idea Global Page
router.get('/global', (req, res) => {
  Idea.find({})
    .sort({date:'desc'})
    .then(ideas => {
      res.render('ideas/global', {
        ideas:ideas
      });
    });
})
// Add Idea Form
router.get('/add',ensureAuthenticated, (req, res) => {
  res.render('ideas/add');
});

// Edit Idea Form
router.get('/edit/:id', ensureAuthenticated,(req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea => {
    if(idea.user != req.user.id){
      req.flash('error_msg','Not Authorized');
      res.redirect('/ideas/global');
    } else {
      res.render('ideas/edit', {
        idea:idea
      });
    }   
  });
});

// Process Form
router.post('/',ensureAuthenticated, (req, res) => {
  let errors = [];

  if(!req.body.title){
    errors.push({text:'Please add a title'});
  }
  if(!req.body.details){
    errors.push({text:'Please add some details'});
  }

  if(errors.length > 0){
    res.render('/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details,
      user: req.user.id
    }
    new Idea(newUser)
      .save()
      .then(idea => {
        req.flash('success_msg', 'Video idea added');
        res.redirect('/ideas');
      })
  }
});
//Process application
  router.post('/global/:id/:title',ensureAuthenticated, (req, res) => {
    console.log(req.user.id);
    console.log(req.params.id);
    Applications.findOne({
      user: req.user.id,
      idea: req.params.id
    })

      .then(application => {
        if(application){
          req.flash('error_msg', 'already applied');
          res.redirect('/ideas/global');
        } else {
          const newUser = {
            user: req.user.id,
            idea: req.params.id,
            name: req.params.title,
            applicant: req.user.name
            
          }
          new Applications(newUser)
          .save()
          .then(application =>{
            req.flash('success_msg', 'Successfully Applied');
            res.redirect('/ideas/global');
          })
          .catch(err =>{
            console.log(err);
            return;
          });

        }
      })

      }
    
  );

//My Applications
router.get('/application', ensureAuthenticated, (req, res)=>{
  Applications.find({user: req.user.id})
  .sort({date: 'desc'})
  .then(application =>{
    res.render('ideas/application', {
      application: application
    });

  })
 
});
//View Applicants
router.get('/viewapplicants/:id', ensureAuthenticated, (req, res) =>{
  Applications.find({idea: req.params.id})
   .sort({date:'desc'})
   .then(application =>{
     res.render('ideas/viewapplicants',{
       application: application
     });
   })
});
//update application
router.put('/viewapplicants/:id',ensureAuthenticated, (req, res)=>{
  console.log(req.params.id);
  Applications.findOne({_id: req.params.id})
  .then(application =>{
    application.status = req.body.status;
    application.save()
    .then(application =>{
      req.flash('success_msg', 'Video idea updated');
      res.redirect('/ideas');
    })
  });
  
  
});
//Edit Form process

router.put('/:id',ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea => {
    // new values
    idea.title = req.body.title;
    idea.details = req.body.details;

    idea.save()
      .then(idea => {
        req.flash('success_msg', 'Post updated');
        res.redirect('/ideas');
      })
  });
});


// Delete Idea
router.delete('/:id', ensureAuthenticated, (req, res) => {
  Idea.remove({_id: req.params.id})
    .then(() => {
      req.flash('success_msg', 'Video idea removed');
      res.redirect('/ideas');
    });
});

module.exports = router;