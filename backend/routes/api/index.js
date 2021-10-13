const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const restaurantRouter = require('./restaurants.js');
const reviewRouter = require('./reviews.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/restaurants', restaurantRouter);
router.use('/review', reviewRouter);


module.exports = router;
