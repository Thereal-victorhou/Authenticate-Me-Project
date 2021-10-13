const express = require('express');
const asyncHandler = require('express-async-handler');
// const Op = Sequelize.Op

const { Restaurant } = require('../../db/models');
const { Review } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async(req, res)=> {
    const restaurants = await Restaurant.findAll();
    return res.json(restaurants);
}));

router.get('/:id', asyncHandler(async(req, res)=> {
    const id = parseInt(req.params.id, 10);
    const restaurant = await Restaurant.findByPk(id, {
        include: [{
            model: Review,
            required: true,
            where: { restaurantId: id },
        }],
    });
    const data = res.json(restaurant);
    console.log(data);
}));

module.exports = router;
