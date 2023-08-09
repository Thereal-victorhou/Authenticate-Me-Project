require('dotenv').config();
const express = require('express');
const asyncHandler = require('express-async-handler');
const sdk = require('api')('@yelp-developers/v1.0#z7c5z2vlkqskzd6');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// const Op = Sequelize.Op

const { Restaurant } = require('../../db/models');
const { Review } = require('../../db/models');
const { User } = require('../../db/models');
const { Rating } = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

sdk.auth(`Bearer ${process.env.YELP_FUSION_API_KEY}`);

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
		const restaurants = await Restaurant.findAll({ order: [['id', 'ASC']], limit: 8 });
		return res.json(restaurants);
	})
);

// Get all restaurants based on searchInput
router.post('/restaurant/search/results', asyncHandler( async (req, res) => {
	const { searchInput, locationObj } = req.body;
	// console.log('SEARCH INPUT............. ', searchInput);
	// console.log('LOCATIONOBJ............. ', locationObj);
}))

// GET all restaurants based on location
router.post(
	'/nearby',
	asyncHandler(async (req, res) => {
		const locationObj = req.body;
		const { location, latitude, longitude } = locationObj;
		const locationArr = location.replace(',', '').split(' ');

		const queryObjLocation = {
			where: {
				location: {
					[Op.contains]: locationArr,
				},
			},
			order: [['rating', 'DESC']],
		}

		// search database for restaurants based on location
		// otherwise, fetch restaurant data and save to db if it doesn't aready exist
		// create random amount of reviews based on each restaurant rating and save to db
		const localRestaurants = await Restaurant.findAll(queryObjLocation);

		if (localRestaurants.length > 0) return res.json('Already In Database');
		else {

			const newLocation = encodeURI(location).replace(/,/g, '%2C');
			const searchObj = {
				location: `${newLocation}`,
				term: 'restaurants',
				radius: '12000',
				categories: '%28food%2C%20All%29',
				locale: 'en_US',
				price: '1%2C2%2C3%2C4',
				open_now: 'false',
				attributes: 'open_to_all',
				sort_by: 'rating',
				limit: '50',
				offset: '0',
			};
			// sdk.auth(`Bearer ${process.env.YELP_FUSION_API_KEY}`);

			try {
				const resu = await sdk.v3_business_search(
					latitude && longitude
						? { ...searchObj, ...latitude, ...longitude }
						: searchObj
				);
				const restaurantData = resu.data.businesses;
				const restaurantArr = [];
				await restaurantData.forEach( async (restaurant) => {
					const restaurantObj = {
						yelpId: restaurant.id,
						name: restaurant.name,
						imgSrc: `${restaurant.image_url}`,
						categories: [...restaurant.categories?.map((each) => each.alias)],
						rating: restaurant.rating,
						coordinates: [
							`${restaurant.coordinates.latitude}`,
							`${restaurant.coordinates.longitude}`,
						],
						price: restaurant.price,
						location: [
							`${restaurant.location.address1}`,
							`${restaurant.location.address2}`,
							`${restaurant.location.address3}`,
							`${restaurant.location.city}`,
							`${restaurant.location.zip_code}`,
							`${restaurant.location.country}`,
							`${restaurant.location.state}`,
							`${restaurant.location.display_address?.join('')}`,
						],
						phoneNumber: restaurant.phone,
						displayPhone: restaurant.display_phone,
						distance: restaurant.distance,
						region: [
							`${resu.data?.region?.center?.longitude}`,
							`${resu.data?.region?.center?.latitude}`,
						],
						createdAt: new Date(),
						updatedAt: new Date(),
					};
					// restaurantArr.push(restaurantObj);
					// Check if restaurant already exists in database
					const alreadyExist = await Restaurant.findOne({
						where: {
							name: { [Op.like]: restaurant.name },
						}
					});
					if (!alreadyExist) await Restaurant.create(restaurantObj);
				});

				return res.json('Sucessfully Added New Restaurants');
			} catch (err) {
				return res.json(err);
			}
		}
	})
);

// Convert Military Time to Standard Time
const numberToDay = {
  '0': 'Mon',
  '1': 'Tue',
  '2': 'Wed',
  '3': 'Thu',
  '4': 'Fri',
  '5': 'Sat',
  '6': 'Sun'
}
const formatOperatingHours = async (arr) => {

  const dailyHours = {};

  await arr.forEach(day => {

    const dayWord = numberToDay[day.day];
    const startTime = convertMilitaryToStandard(day.start);
    const endTime = convertMilitaryToStandard(day.end);;

    if (!(dayWord in dailyHours)) dailyHours[dayWord] = [[startTime, endTime]]
    else dailyHours[dayWord].push([startTime, endTime])

  })

  return dailyHours

}
function convertMilitaryToStandard(time) {
  // Ensure time is in 'HH:mm' format

  const hour = time.slice(0, 2)
  const minute = time.slice(2)

  const modifier = +hour < 12 ? 'AM' : 'PM';
  let standardHours = +hour % 12 || 12;

  return `${standardHours}:${minute} ${modifier}`;
}


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
			],
		});

		const businessDetails = await sdk.v3_business_info({locale: 'en_US', business_id_or_alias: `${restaurant.yelpId}`})
		const businessData = businessDetails.data;
		const adjustedHours = await formatOperatingHours(businessData.hours[0]?.open)
		const businessDataObj = {
			id: restaurant.id,
			yelpId: restaurant.yelpId,
			name: restaurant.name,
			imgSrc: restaurant.imgSrc,
			isClaimed: businessData.is_claimed,
			isClosed: businessData.is_closed,
			phone: restaurant.phone,
			displayPhone: restaurant.displayPhone,
			categories: restaurant.categories,
			rating: restaurant.rating,
			location: restaurant.location,
			coordinates: restaurant.coordinates,
			photos: businessData.photos,
			price: restaurant.price,
			hours: { hoursType: businessData.hours[0]?.hours_type, isOpenNow: businessData.hours[0]?.is_open_now, open: adjustedHours},
			transactions: businessData.transactions
		};
		console.log(businessData.hours[0])
		if (reviews && businessDetails.status === 200) return res.json(businessDataObj)
		if (reviews) return res.json(reviews);
		res.json(restaurant);


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
