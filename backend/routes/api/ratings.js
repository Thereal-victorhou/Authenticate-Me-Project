const express = require('express');
const asyncHandler = require('express-async-handler');
const { Rating } = require('../../db/models')

const router = express.Router();

// Get all ratings based on restaurantId
router.get('/restaurant/:id', asyncHandler( async(req, res) => {
    const id = req.params.id;
    const ratingsArr = await Rating.findAll({
        where: { restaurantId: id }
    });
    res.json(ratingsArr);
}));

module.exports = router;
