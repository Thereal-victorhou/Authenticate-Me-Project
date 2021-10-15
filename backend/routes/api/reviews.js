const express = require('express');
const asyncHandler = require('express-async-handler');
const { Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')

const router = express.Router();

router.get('/:id', asyncHandler( async(req, res) => {
    const id = req.params.id;
    const reviews = await Review.findByPk(id);
    res.json(reviews);
}))

router.get('/restaurant/:id', asyncHandler( async(req, res) => {
    const id = req.params.id;
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
    '/review/:id',
    asyncHandler( async(req, res) => {
        console.log("in the router put", req.params.id);
        const { body, userId, restaurantId } = req.body;
        const updatedReview = await Review.update({
            body,
            userId,
            restaurantId
        }, { where: { id: req.params.id }});
        res.json(updatedReview);
    }));

// delete review
router.delete(
    '/review/:id',
    asyncHandler( async(req, res) => {
        const id = req.params.id;
        await Review.destroy({where: {id}})
    }));

module.exports = router;
