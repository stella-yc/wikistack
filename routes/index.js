const express = require('express');
const router = express.Router();
module.exports = router;
const nunjucks = require('nunjucks');
var models = require('../models');
var Page = models.Page;
var User = models.User;

const wikiRouter = require('./wiki');
const userRouter = require('./user');
router.use('/wiki', wikiRouter);
router.use('/users', userRouter);

router.get('/', function (req, res, next) {
  Page.findAll( {} )
    .then(function (pages) {
      console.log('pages ', pages);
      res.render('index', { pages: pages });
    });

});
