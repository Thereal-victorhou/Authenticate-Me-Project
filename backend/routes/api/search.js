const express = require('express');
const { Op } = require('sequelize');
const asyncHandler = require('express-async-handler');
const { Restaurant } = require('../../db/models');
const { Review } = require('../../db/models')

const router = express.Router();

// Live Search
router.put(
	'/',
	asyncHandler(async (req, res) => {
		const { searchInput, locationObj } = req.body;
		const location = locationObj.location
		if (location !== undefined) {
			const localArr = location.replace(',', '').split(' ');

			const searchObjLocation = {
				where: {
					name: { [Op.iLike]: `%${searchInput}%` },
					location: { [Op.contains]: localArr },
				},
				limit: 5,
			};

			try {
					const restaurants = await Restaurant.findAll(searchObjLocation);
					res.json(restaurants);
			} catch (err) {
				console.log(err);
			}
		}
	})
);

// Search for restaurants based on input -> Search for corresponding reviews -> return both
router.put(
	'/results',
	asyncHandler(async (req, res) => {
		const { searchInput, locationObj } = req.body;
		const location = locationObj.location
		if (location !== undefined) {
			const localArr = location.replace(',', '').split(' ');

			const searchObjLocation = {
				where: {
					name: { [Op.iLike]: `%${searchInput}%` },
					location: { [Op.contains]: localArr },
				},
				limit: 10,
			};

			let restaurants;
			let restaurantAndReview;

			try {
					restaurants = await Restaurant.findAll(searchObjLocation);
					restaurantAndReview = restaurants.map(async (restaurant, i) => {

						const review = await findCorrespondingReview(restaurant.id);
						return {...restaurant.dataValues, review: review[0].dataValues}
					})

					const result = await Promise.all(restaurantAndReview);
					return res.json(result);
			} catch (err) {
				console.log(err);
				return res.json(restaurants);
			}
		}
	})
);

const findCorrespondingReview = async (id) => {
	try {
		const review = await Review.findAll({
			where: { restaurantId: id},
			order: [['rating', 'DESC']],
			limit: 1,
		});
		return review
	} catch (err) {
		console.log(err)
		return null;
	}
}

module.exports = router;
