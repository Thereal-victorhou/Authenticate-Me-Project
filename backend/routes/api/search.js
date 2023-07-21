const express = require('express');
const { Op } = require("sequelize");
const asyncHandler = require('express-async-handler');
const { Restaurant } = require('../../db/models');

const router = express.Router();

// Live Search
router.put('/', asyncHandler(async (req, res) => {
    const { searchInput } = req.body;
    const restaurants = await Restaurant.findAll({
        where: { name: {[Op.iLike]: `%${searchInput}%`} }
    })

    res.json(restaurants)
}))

module.exports = router;
