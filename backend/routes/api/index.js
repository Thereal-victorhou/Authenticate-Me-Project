const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const restaurantRouter = require('./restaurants.js');
const reviewRouter = require('./reviews.js');
const ratingsRouter = require('./ratings.js');
const searchRouter = require('./search.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/restaurants', restaurantRouter);
router.use('/reviews', reviewRouter);
router.use('/ratings', ratingsRouter);
router.use('/search', searchRouter);


module.exports = router;
