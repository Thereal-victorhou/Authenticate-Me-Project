const express = require('express');
const asyncHandler = require('express-async-handler');

const { Restaurant } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async(req, res)=> {
    const restaurants = await Restaurant.findAll();
    return res.json(restaurants);
}));

module.exports = router;
