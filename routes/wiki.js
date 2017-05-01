const express = require('express');
const router = express.Router();
const nunjucks = require('nunjucks');
var models = require('../models');
var Page = models.Page;
var User = models.User;

module.exports = router;

router.get('/', function (req, res, next) {
  res.redirect('/');
});

router.get('/add', function (req, res, next) {
  res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {
  var urlTitle = req.params.urlTitle;
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
    .then(function (foundPage) {
      // res.json(foundPage);
      res.render('wikipage', { page: foundPage });
    })
    .catch(next);
  // res.send('dynamic route at ' + req.params.urlTitle);
});

router.post('/', function (req, res, next) {
  console.log(req.body);

  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
    .then(function (values) {

      var user = values[0];

      var page = Page.build({
        title: req.body.title,
        content: req.body.content
      });

      return page.save().then(function (page) {
        return page.setAuthor(user);
      });

    })
    .then(function (page) {
      res.redirect(page.route);
    })
    .catch(next);


});


