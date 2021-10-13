const express = require('express');
const asyncHandler = require('express-async-handler');

const { Restaurant } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async(req, res)=> {
    const restaurants = await Restaurant.findAll();
    return res.json(restaurants);
}));

router.get('/:id', asyncHandler(async(req, res)=> {
    const id = parseInt(req.params.id, 10);
    const restaurant = await Restaurant.findByPk(id);
    return res.json(restaurant);
}));

module.exports = router;
