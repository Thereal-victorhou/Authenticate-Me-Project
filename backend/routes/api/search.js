const express = require('express');
const { Op } = require('sequelize');
const asyncHandler = require('express-async-handler');
const { Restaurant } = require('../../db/models');

const router = express.Router();

// Live Search
router.put(
	'/',
	asyncHandler(async (req, res) => {
		const { searchInput, location } = req.body;
		console.log('===================== location ', location);

		const searchObjLocation = {
			where: {
				name: { [Op.iLike]: `%${searchInput}%` },
				location: { [Op.contains]: location },
			},
			order: [[`name`, 'ASC']],
			limit: 4,
		};

		const searchObj = {
			where: {
				name: { [Op.iLike]: `%${searchInput}%` },
			},
			order: [[`name`, 'ASC']],
			limit: 4,
		};

		try {
			const restaurants = await Restaurant.findAll(
				location === 'undefined' ? searchObj: searchObjLocation
			);
			res.json(restaurants);
		} catch (err) {
			console.log(err);
		}
	})
);

module.exports = router;
