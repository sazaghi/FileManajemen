var express = require('express');
var router = express.Router();
var User = require('../model/user');

router.get('/', async (req, res, next) => {
  try {
      const user = await User.findAll();
      res.json(user);
  } catch (err) {
      next(err);
  }
});

module.exports = router;
