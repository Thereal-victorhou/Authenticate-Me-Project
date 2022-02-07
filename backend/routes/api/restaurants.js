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

const validateRestaurantInfo = [
    check('name')
        .exists({ checkFalsy: true })
        .custom(value => {
            return Restaurant.findOne({ where: { name:value }}).then(rest => {
                if (rest) {
                    return Promise.reject('Restaurant Name is already in use');
                }
                return false
            });
        }),

    check('location')
        .exists({ checkFalsy: true })
        .custom(value => {
            return Restaurant.findOne({ where: { location: value }}).then(rest => {
                if (rest) {
                    // console.log("\n\n\n\n\n", rest, "\n\n\n\n\n")
                    // // return rest
                    return Promise.reject('Restaurant Location is already in use');
                }
                return false
            });
        }),

    check('phoneNumber')
        .exists({ checkFalsy: true })
        .custom(value => {
            return Restaurant.findOne({ where: { phoneNumber:value }}).then(rest => {
                if (rest) {
                    return Promise.reject('Restaurant PhoneNumber is already in use');
                }
                return false
            })
        }),
    // check('imgSrc')
    //     .custom(value => {
    //         if (!value.length) {
    //             return Promise.reject('Please provide a restaurant image')
    //         }
    //     }),
    handleValidationErrors
];

// GET all restaurants
router.get('/', asyncHandler(async(req, res)=> {
    const restaurants = await Restaurant.findAll();
    return res.json(restaurants);
}));

// GET one restaurant
router.get('/:id', asyncHandler(async(req, res)=> {
    const id = parseInt(req.params.id, 10);
    const restaurant = await Restaurant.findByPk(id)
    const reviews =  await Restaurant.findByPk(id, {
        include: [
        {
            model: Review,
            required: true,
            where: { restaurantId: id },
        },
        {
            model: Rating,
            require: true,
            where: { restaurantId: id}
        }
        ],
    });
    if (reviews) {
        return res.json(reviews)
    } else {
        return res.json(restaurant);
    }


}));

// CREATE a new restaurant
router.post('/new', validateRestaurantInfo, asyncHandler( async(req, res) => {
    const { name, location, phoneNumber, imgSrc, userId } = req.body;
    // console.log("\n\n\n\n\n", name, "\n\n\n\n\n")

    const newRestaurant = await Restaurant.create({
        name, location, phoneNumber, imgSrc, userId
    })
    return res.json(newRestaurant);

}));

module.exports = router;
