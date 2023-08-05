'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const ratingsData = {"0":4.5,"1":4.5,"2":4.5,"3":4.5,"4":4,"5":4,"6":4,"7":4,"8":4,"9":4,"10":4,"11":4,"12":4,"13":4,"14":4,"15":4,"16":4,"17":3.5,"18":3.5,"19":3.5,"20":3.5,"21":3.5,"22":3,"23":3,"24":3,"25":3,"26":3,"27":3,"28":2.5,"29":5,"30":5,"31":5,"32":4.5,"33":4.5,"34":4.5,"35":4.5,"36":4.5,"37":4.5,"38":4.5,"39":4.5,"40":4.5,"41":4.5,"42":4.5,"43":4.5,"44":4.5,"45":4.5,"46":4.5,"47":4.5,"48":4.5,"49":4.5,"50":4.5,"51":4.5,"52":4.5,"53":4.5,"54":4.5,"55":4.5,"56":4.5,"57":4.5,"58":4.5,"59":4.5,"60":4.5,"61":4.5,"62":4.5,"63":4.5,"64":4.5,"65":4.5,"66":4.5,"67":4.5,"68":4.5,"69":4.5,"70":4.5,"71":4.5,"72":4.5,"73":4.5,"74":4.5,"75":4.5,"76":4.5,"77":4.5,"78":4.5}


const reviewBody = {
  '1': [
    "The lasagna was cold and tasteless. Service was very slow and the staff seemed uninterested. Despite the welcoming decor, the overall experience was disappointing.",
    "The menu lacks variety, especially for vegetarians. The food we ordered was bland and the service was poor. Would not recommend for a good dining experience.",
    "The sushi was not fresh, making it unappetizing. The service was equally poor and the restaurant was too loud. There are better sushi places in the city.",
    "The pizza was too doughy and lacked enough toppings. The service was not attentive, and the restaurant seemed unclean. Not a pleasant dining experience.",
    "The food was unsatisfactory, both main course and dessert. The staff was not friendly and the service was very slow. I will not be visiting again."
  ],
  '2': [
    "The lasagna was overcooked and lacked flavor. The staff seemed uninterested. While the interior was inviting, the overall dining experience left much to be desired.",
    "The menu was surprisingly limited, especially for vegetarians. The food was mediocre and service was slow. Unfortunately, it was not the experience we were hoping for.",
    "The sushi was not as fresh as expected, which was quite disappointing. Service was lackluster and the restaurant was a bit noisy, making it difficult to enjoy our meal.",
    "The pizza was doughy and toppings lacked freshness. Although the service was okay, the overall quality of food and ambiance didn't meet our expectations.",
    "The main courses were bland and the desserts were overly sweet. The wait staff seemed distracted and the service was not up to par. This place needs to step up its game.",
  ],
  '3': [
    "The food was average, and the service was decent. We had the lasagna which was okay, but nothing special. Dessert (tiramisu) was the highlight of the meal. Could do better with the main course.",
    "The vegetarian options were quite limited. The veggie burger was good, but the salad lacked freshness. Service was quick and the staff was polite. A mixed experience overall.",
    "The sushi was average, not quite as fresh as we hoped. The ambiance was nice though and the staff was attentive. More suitable for casual dining than a sushi feast",
    "The pizza was decent but the crust was a bit doughy. A larger selection of toppings would be great. The service was excellent, and the atmosphere was enjoyable.",
    "The desserts were quite enjoyable, particularly the blueberry pie. The main courses, however, were a bit bland. The wait staff could be more attentive. Not bad, but room for improvement.",
  ],
  '4': [
    "We found the food to be delightful, the pasta was homemade and the sauce was flavorful. The staff were friendly, but service was a bit slow. An otherwise 5-star experience was slightly marred by the wait time.",
    "Tasty plant-based menu with an impressive range of options. The tofu stir-fry was a standout. Ambiance could use a bit of sprucing up, but the food quality makes up for it.",
    "Excellent sushi with fresh ingredients, the chef's selection didn't disappoint. However, the restaurant was a bit too noisy, which impacted the overall experience.",
    "The pizzas here are good with a nice, crispy crust and generous toppings. It's just a shame that the seating is a bit cramped. Overall, a solid choice for pizza lovers.",
    "Fantastic desserts, especially the apple tart. The main dishes were good, not great. Nevertheless, it's worth a visit for the dessert alone. The service was courteous and efficient.",
  ],
  '5': [
    "Our visit to this restaurant was absolutely perfect. The service was impeccable, the wait staff was attentive and helpful. The ribeye steak was cooked to perfection, while the garlic mashed potatoes were creamy and delicious. Don't miss their house special dessert! Truly a 5-star experience.",
    "This place has the best vegan options in town! I had the lentil loaf with roasted veggies, and it was packed full of flavor. My partner tried the vegan lasagna and it was equally outstanding. The atmosphere was warm and inviting, with very friendly staff. Highly recommend!",
    "The sushi here is just incredible - the freshest fish and perfect rice. We ordered the chef's selection and every single piece was amazing. The sake recommendations from the staff were spot on and complemented the meal perfectly. A memorable experience.",
    "The best pizza place in town, hands down. The crust was light and crispy, toppings were fresh and plentiful. We loved the classic margherita and the gourmet truffle pizza. Paired with a cold local beer, it was the perfect meal. Cozy, casual atmosphere with stellar service.",
    "This quaint restaurant is a hidden gem! While their entire menu is excellent, the desserts are truly out of this world. The chocolate lava cake was rich and decadent, while the apple crumble was the perfect balance of sweet and tart. Can't wait to go back!"
  ],
}


function getRandomNum(min, max) {
  const raw = Math.random() * (max - min) + min;
  return Math.floor(raw);
}

const generateReviews = (target) => {
  const reviews = [];

  // iterate from 0 to max restaurant reviews (78 in this case)
  for (let i = 0; i <= target; i++) {
    const currentRating = ratingsData[i];
    // generate random number of reviews per restaurant
    const amountOfReviews = getRandomNum(5, 10)
    for (let j = 0; j < amountOfReviews; j++) {

    }
  }
}

function makeReviews(target) {
  const reviews = [];
  for (let i = 2; i <= target; i++) {
    const randomNum1 = getRandomNum(1, 6);
    const randomNum2 = getRandomNum(1, 6);

    const newReview = {
      body: reviewBody[String(randomNum1)][String(randomNum2)],
      userId: getRandomNum(1, 5),
      restaurantId: getRandomNum(1, 28),
      rating: randomNum,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    reviews.push(newReview);
  }
  return reviews;
}

const seedReviews = [
  ...makeReviews(100),
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, seedReviews, {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, null, {});
  }
};
