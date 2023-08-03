require('dotenv').config();
const express = require('express');
const asyncHandler = require('express-async-handler');
// const Op = Sequelize.Op

const { Restaurant } = require('../../db/models');
const { Review } = require('../../db/models');
const { User } = require('../../db/models');
const { Rating } = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateCreateInfo = [
	check('name')
		.exists({ checkFalsy: true })
		.custom((value) => {
			return Restaurant.findOne({ where: { name: value } }).then((rest) => {
				if (rest) {
					return Promise.reject('Restaurant Name is already in use');
				}
				return false;
			});
		}),

	check('location')
		.exists({ checkFalsy: true })
		.custom((value) => {
			return Restaurant.findOne({ where: { location: value } }).then((rest) => {
				if (rest) {
					return Promise.reject('Restaurant Location is already in use');
				}
				return false;
			});
		}),

	check('phoneNumber')
		.exists({ checkFalsy: true })
		.custom((value) => {
			return Restaurant.findOne({ where: { phoneNumber: value } }).then(
				(rest) => {
					if (rest) {
						return Promise.reject('Restaurant PhoneNumber is already in use');
					}
					return false;
				}
			);
		}),
	handleValidationErrors,
];

const validateEditInfo = [
	check('name')
		.exists({ checkFalsy: true })
		.custom((value, { req }) => {
			return Restaurant.findOne({ where: { name: value } }).then((rest) => {
				if (rest) {
					if (!rest.id === req.body.restaurantId) {
						return Promise.reject('Restaurant Name is already in use');
					}
				}
				return false;
			});
		}),

	check('location')
		.exists({ checkFalsy: true })
		.custom((value, { req }) => {
			return Restaurant.findOne({ where: { location: value } }).then((rest) => {
				if (rest) {
					if (!rest.id === req.body.restaurantId) {
						return Promise.reject('Restaurant Location is already in use');
					}
				}
				return false;
			});
		}),

	check('phoneNumber')
		.exists({ checkFalsy: true })
		.custom((value, { req }) => {
			return Restaurant.findOne({ where: { phoneNumber: value } }).then(
				(rest) => {
					if (rest) {
						if (!rest.id === req.body.restaurantId) {
							return Promise.reject('Restaurant PhoneNumber is already in use');
						}
					}
					return false;
				}
			);
		}),
	handleValidationErrors,
];

// GET all restaurants
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const restaurants = await Restaurant.findAll({ order: [['id', 'DESC']] });
		return res.json(restaurants);
	})
);

// GET all restaurants based on location
router.post(
	'/nearby',
	asyncHandler(async (req, res) => {
		const locationObj = req.body;
		const { location, latitude, longitude } = locationObj;

		// search database for restaurants based on location

		// %2C == ' comma '
		// %20 == ' space '
		// escape spaces and commas from location
		const newLocation = encodeURI(location).replace(/,/g, '%2C');
		const searchObj = {
			location: `${newLocation}`,
			term: 'restaurants',
			radius: '10000',
			categories: 'restaurants&categories=breakfast&categories=lunch&categories=dinner',
			locale: 'en_US',
			price: '1%2C2%2C3%2C4',
			open_now: 'false',
			attributes: 'open_to_all',
			sort_by: 'rating',
			limit: '50',
			offset: '0'
		}
		const sdk = require('api')('@yelp-developers/v1.0#z7c5z2vlkqskzd6');
		sdk.auth(`Bearer ${process.env.YELP_FUSION_API_KEY}`);
		try {
			const resu = await sdk.v3_business_search(latitude && longitude ? { ...searchObj, ...latitude, ...longitude } : searchObj)
			console.log(resu.data.region)
		} catch(err) {
			console.log(err)
		}

	})
)

// GET one restaurant
router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const id = parseInt(req.params.id, 10);
		const restaurant = await Restaurant.findByPk(id);
		const reviews = await Restaurant.findByPk(id, {
			include: [
				{
					model: Review,
					required: true,
					where: { restaurantId: id },
				},
				{
					model: Rating,
					require: true,
					where: { restaurantId: id },
				},
			],
		});

		if (reviews) {
			return res.json(reviews);
		} else {
			return res.json(restaurant);
		}
	})
);

// CREATE a new restaurant
router.post(
	'/',
	validateCreateInfo,
	asyncHandler(async (req, res) => {
		const { name, location, phoneNumber, imgSrc, userId } = req.body;

		const newRestaurant = await Restaurant.create({
			name,
			location,
			phoneNumber,
			imgSrc,
			userId,
		});
		return res.json(newRestaurant);
	})
);

// Edit an existing restaurant
router.put(
	'/:id',
	validateEditInfo,
	asyncHandler(async (req, res) => {
		const { name, location, phoneNumber, img, restaurantId } = req.body;

		const updateRestaurantId = await Restaurant.update(
			{
				name,
				location,
				phoneNumber,
				img,
			},
			{ where: { id: restaurantId } }
		);

		const restaurant = await Restaurant.findByPk(...updateRestaurantId);
		return res.json(restaurant);
	})
);

// Delete a restaurant
router.delete(
	'/:id',
	asyncHandler(async (req, res) => {
		const id = req.params.id;
		await Restaurant.destroy({ where: { id } });

		return res.json(id);
	})
);

module.exports = router;
