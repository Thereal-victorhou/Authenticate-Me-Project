const express = require('express');
const asyncHandler = require('express-async-handler');
const { Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')

const router = express.Router();

router.get('/:id', asyncHandler( async(req, res) => {
    const id = req.params.id;
    console.log("inside review api router =====================>", id)
    const reviews = await Review.findByPk(id);
    res.json(reviews);
}))

router.get('/restaurant/:id', asyncHandler( async(req, res) => {
    const { id } = req.params.id;
    const reviews = await Review.findAll({
        where: { restaurantId: id }
    })
    res.json(reviews);
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
        res.json(newPost);
    }));

// edit review
router.put(
    '/restaurant/:id',
    asyncHandler( async(req, res) => {
        console.log("inside put api!!!")
        const { body, userId, restaurantId } = req.body;
        console.log(body, "     ", userId, "    ", restaurantId);
        const updatedReview = await Review.update({
            body,
            userId,
            restaurantId,
            where: { id: req.params.id}
        });
        console.log('After update!!!============>')
        res.json(updatedReview);
    }));

module.exports = router;
