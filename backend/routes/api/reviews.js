const express = require('express');
const asyncHandler = require('express-async-handler');
const { Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')

const router = express.Router();

router.get('/:id', asyncHandler( async(req, res) => {
    const id = req.params.id;
    const reviews = await Review.findByPk(id, { order: [['updatedAt', 'DESC']]});
    res.json(reviews);
}))

router.get('/restaurant/:id', asyncHandler( async(req, res) => {
    const id = req.params.id;
    const reviews = await Review.findAll(
        {where: { restaurantId: id },
        order: [['id', 'DESC']]})
    res.json(reviews);
}));

// get add reviews page
router.post(
    '/restaurant/:id',
    asyncHandler( async(req, res) => {
        const { body, userId, restaurantId, rating} = req.body;
        const newPost = await Review.create({
            body,
            userId,
            restaurantId,
            rating
        });
        res.json(newPost);
    }));

// edit review
router.put(
    '/review/:id',
    asyncHandler( async(req, res) => {
        const { body, userId, restaurantId, rating } = req.body;
        const updatedReview = await Review.update({
            body,
            userId,
            restaurantId,
            rating
        }, { where: { id: req.params.id }});
        res.json(updatedReview);
    }));

// delete review
router.delete(
    '/review/:id',
    asyncHandler( async(req, res) => {
        const id = req.params.id;
        const resDelete = await Review.destroy({where: {id}})

        res.json(resDelete)
    }));

module.exports = router;
