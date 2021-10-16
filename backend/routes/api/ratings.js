const express = require('express');
const asyncHandler = require('express-async-handler');
const { Rating } = require('../../db/models')

const router = express.Router();

router.get('/', asyncHandler( async(req, res) => {
    const ratingsArr = await Rating.findAll();
    res.json(ratingsArr);
}))

module.exports = router;
