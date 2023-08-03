'use strict';
import { faker } from '@faker-js/faker';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

// Generate Restaurant Seeder Data
const generateRestaurantData = async () => {
  // Variables for further mods
  const location = 'Stockton, CA';
  const longitude = { longitude: '-121.30142211914062' };
  const latitude = {latitude: '37.96242644994935' };
  const rad = '10000';
  const sort = 'rating';

  const newLocation = encodeURI(location).replace(/,/g, '%2C');
  const searchObj = {
    location: `${newLocation}`,
    term: 'restaurants',
    radius: `${rad}`,
    categories: 'restaurants&categories=breakfast&categories=lunch&categories=dinner',
    locale: 'en_US',
    price: '1%2C2%2C3%2C4',
    open_now: 'false',
    attributes: 'open_to_all',
    sort_by: `${sort}`,
    limit: '50',
    offset: '0'
  }
  const sdk = require('api')('@yelp-developers/v1.0#z7c5z2vlkqskzd6');
  sdk.auth(`Bearer ${process.env.YELP_FUSION_API_KEY}`);
  try {
    const result = await sdk.v3_business_search(latitude && longitude ? { ...searchObj, ...latitude, ...longitude } : searchObj)
    const restaurantData = result.data.businesses;
    const restaurantArr = [];

    restaurantData.forEach((restaurant) => {
      const restaurantObj = {
        yelpId: restaurant.id,
        name: restaurant.name,
        imageSrc: restaurant.image_url,
        categories: [...restaurant.categories.map(each => each.alias)],
        rating: restaurant.rating,
        coordinates: [`${restaurant.coordinates.latitude}`, `${restaurant.coordinates.longitude}`],
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
        region: [`${result.data.region.center.longitude}`, `${result.data.region.center.latitude}`],
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      restaurantArr.push(restaurantObj);
    })

    return restaurantArr;

  } catch(err) {
    console.log(err)
  }

}


module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Restaurants';
      return queryInterface.bulkInsert(options, generateRestaurantData(), {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Restaurants';
    return queryInterface.bulkDelete(options, null, {});
  }
};
