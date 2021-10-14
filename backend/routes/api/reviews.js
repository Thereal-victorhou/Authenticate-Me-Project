const express = require('express');
const asyncHandler = require('express-async-handler');
const { Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')

const router = express.Router();

router.get('/', asyncHandler( async(req, res) => {
    const reviews = await Review.findAll()
    return res.json(reviews);
}));

// get add reviews page
router.post(
    '/restaurant/:id',
    asyncHandler( async(req, res) => {
        const { body, userId, restaurantId } = req.body;
        const newPost = await Review.create({
            body,
            userId,
            restaurantId
        });
        return res.json(newPost);
    }))



// router.post('/', asyncHandler(async (req, res) => {
//     const { body } = req.body;

// }))

module.exports = router;
