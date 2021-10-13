const express = require('express');
const asyncHandler = require('express-async-handler');

const { Review } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler( async(req, res) => {
    const reviews = await Review.findAll()
    console.log(reviews)
    return res.json(reviews);
}));

// router.post('/', asyncHandler(async (req, res) => {
//     const { body } = req.body;

// }))

module.exports = router;
