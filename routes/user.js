const express = require('express');
const router = express.Router();
module.exports = router;
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next) {
  User.findAll({}).then(function(users) {
    console.log('users', users);
    res.render('authors', { users: users});
  }).catch(next);
});

router.get('/:id', function(req, res, next) {
  Page.findAll({
    where: {
      authorId: req.params.id
    }
  })
  .then(function(pages) {
    res.render('index', {pages: pages})
  })
});
