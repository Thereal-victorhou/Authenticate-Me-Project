const express = require('express');
const asyncHandler = require('express-async-handler');
const { Review } = require('../../db/models');
const { User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// Define Association
// User.hasMany(Review);
// Review.belongsTo(User);

router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const id = req.params.id;
		const reviews = await Review.findByPk(id, {
			order: [['updatedAt', 'DESC']],
		});
		res.json(reviews);
	})
);

router.get(
	'/restaurant/:id',
	asyncHandler(async (req, res) => {
		const restaurantId = req.params.id;
		const reviews = await Review.findAll({
			where: { restaurantId: restaurantId},
			order: [['rating', 'DESC']],
		});

		if (reviews) {
			const reviewsAndUser = reviews.map( async (review) => {
				const userId = review.userId;
				const user = await User.findByPk(userId)

				return {...review.dataValues, ...user.dataValues}
			})
			const results = await Promise.all(reviewsAndUser);

			res.json(results);

		} else {
			res.json(reviews)
		}
	})
);

// add reviews page
router.post(
	'/restaurant/:id',
	asyncHandler(async (req, res) => {
		const { body, userId, restaurantId, rating } = req.body;
		const newPost = await Review.create({
			body,
			userId,
			restaurantId,
			rating,
		});
		res.json(newPost);
	})
);

// edit review
router.put(
	'/review/:id',
	asyncHandler(async (req, res) => {
		const { body, userId, restaurantId, rating } = req.body;
		const updatedReview = await Review.update(
			{
				body,
				userId,
				restaurantId,
				rating,
			},
			{ where: { id: req.params.id } }
		);
		res.json(updatedReview);
	})
);

// delete review
router.delete(
	'/review/:id',
	asyncHandler(async (req, res) => {
		const id = req.params.id;
		try {
			const deleted = await Review.destroy({ where: { id: id } });
			res.json(deleted)
		} catch(err) {
			console.log('error in reviews backend api: ', err)
		}
	})
);

module.exports = router;
