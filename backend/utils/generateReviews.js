const { randomValuesObj } = require('./randomValuesArr');

const reviewBody = {
	1: [
		'The lasagna was cold and tasteless. Service was very slow and the staff seemed uninterested. Despite the welcoming decor, the overall experience was disappointing.',
		'The menu lacks variety, especially for vegetarians. The food we ordered was bland and the service was poor. Would not recommend for a good dining experience.',
		'The sushi was not fresh, making it unappetizing. The service was equally poor and the restaurant was too loud. There are better sushi places in the city.',
		'The pizza was too doughy and lacked enough toppings. The service was not attentive, and the restaurant seemed unclean. Not a pleasant dining experience.',
		'The food was unsatisfactory, both main course and dessert. The staff was not friendly and the service was very slow. I will not be visiting again.',
	],
	2: [
		'The lasagna was overcooked and lacked flavor. The staff seemed uninterested. While the interior was inviting, the overall dining experience left much to be desired.',
		'The menu was surprisingly limited, especially for vegetarians. The food was mediocre and service was slow. Unfortunately, it was not the experience we were hoping for.',
		'The sushi was not as fresh as expected, which was quite disappointing. Service was lackluster and the restaurant was a bit noisy, making it difficult to enjoy our meal.',
		"The pizza was doughy and toppings lacked freshness. Although the service was okay, the overall quality of food and ambiance didn't meet our expectations.",
		'The main courses were bland and the desserts were overly sweet. The wait staff seemed distracted and the service was not up to par. This place needs to step up its game.',
	],
	3: [
		'The food was average, and the service was decent. We had the lasagna which was okay, but nothing special. Dessert (tiramisu) was the highlight of the meal. Could do better with the main course.',
		'The vegetarian options were quite limited. The veggie burger was good, but the salad lacked freshness. Service was quick and the staff was polite. A mixed experience overall.',
		'The sushi was average, not quite as fresh as we hoped. The ambiance was nice though and the staff was attentive. More suitable for casual dining than a sushi feast',
		'The pizza was decent but the crust was a bit doughy. A larger selection of toppings would be great. The service was excellent, and the atmosphere was enjoyable.',
		'The desserts were quite enjoyable, particularly the blueberry pie. The main courses, however, were a bit bland. The wait staff could be more attentive. Not bad, but room for improvement.',
	],
	4: [
		'We found the food to be delightful, the pasta was homemade and the sauce was flavorful. The staff were friendly, but service was a bit slow. An otherwise 5-star experience was slightly marred by the wait time.',
		'Tasty plant-based menu with an impressive range of options. The tofu stir-fry was a standout. Ambiance could use a bit of sprucing up, but the food quality makes up for it.',
		"Excellent sushi with fresh ingredients, the chef's selection didn't disappoint. However, the restaurant was a bit too noisy, which impacted the overall experience.",
		"The pizzas here are good with a nice, crispy crust and generous toppings. It's just a shame that the seating is a bit cramped. Overall, a solid choice for pizza lovers.",
		"Fantastic desserts, especially the apple tart. The main dishes were good, not great. Nevertheless, it's worth a visit for the dessert alone. The service was courteous and efficient.",
	],
	5: [
		"Our visit to this restaurant was absolutely perfect. The service was impeccable, the wait staff was attentive and helpful. The ribeye steak was cooked to perfection, while the garlic mashed potatoes were creamy and delicious. Don't miss their house special dessert! Truly a 5-star experience.",
		'This place has the best vegan options in town! I had the lentil loaf with roasted veggies, and it was packed full of flavor. My partner tried the vegan lasagna and it was equally outstanding. The atmosphere was warm and inviting, with very friendly staff. Highly recommend!',
		"The sushi here is just incredible - the freshest fish and perfect rice. We ordered the chef's selection and every single piece was amazing. The sake recommendations from the staff were spot on and complemented the meal perfectly. A memorable experience.",
		'The best pizza place in town, hands down. The crust was light and crispy, toppings were fresh and plentiful. We loved the classic margherita and the gourmet truffle pizza. Paired with a cold local beer, it was the perfect meal. Cozy, casual atmosphere with stellar service.',
		"This quaint restaurant is a hidden gem! While their entire menu is excellent, the desserts are truly out of this world. The chocolate lava cake was rich and decadent, while the apple crumble was the perfect balance of sweet and tart. Can't wait to go back!",
	],
};

function getRandomNum(min, max) {
	const raw = Math.random() * (max - min) + min;
	return Math.floor(raw);
}

// function generateArrayWithDistinctValues(target, failedStarts = []) {
//   const length = 10;

//   // If target is 1 or 5, fill the array with that value
//   if (target === 1) return Array(length).fill(1);
//   if (target === 5) return Array(length).fill(5);

//   function getRandomDistinctValues(arr) {
//       while (true) {
//           const randValue = Math.floor(Math.random() * 5) + 1; // 1 to 5
//           if (!arr.includes(randValue)) arr.push(randValue);
//           if (arr.length === 3) break;
//       }
//       return arr.sort((a, b) => a - b).join(",");
//   }

//   let distinctStart = getRandomDistinctValues([]);
//   while (failedStarts.includes(distinctStart)) {
//       distinctStart = getRandomDistinctValues([]);
//   }

//   const result = distinctStart.split(",").map(Number);
//   let remainingSum = target * length - result.reduce((a, b) => a + b, 0);

//   const remainingSlots = length - 3;
//   let approximateValue = Math.round(remainingSum / remainingSlots);

//   // Adjust values if they fall outside of the 1-5 range
//   if (approximateValue < 1) approximateValue = 1;
//   if (approximateValue > 5) approximateValue = 5;

//   for (let i = 0; i < remainingSlots; i++) {
//       result.push(approximateValue);
//   }

//   // Adjust sum to make sure it meets the target
//   let difference = (target * length) - result.reduce((a, b) => a + b, 0);
//   for (let i = 3; i < length; i++) {
//       if ((result[i] + difference) >= 1 && (result[i] + difference) <= 5) {
//           result[i] += difference;
//           break;
//       }
//   }

//   // Check average
//   if (Math.round((result.reduce((a, b) => a + b, 0) / length) * 10) / 10 === target) {
//       return result;
//   } else {
//       failedStarts.push(distinctStart);
//       return generateArrayWithDistinctValues(target, failedStarts);
//   }
// }

// Examples
// console.log(generateArrayWithDistinctValues(1));   // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// console.log(generateArrayWithDistinctValues(5));   // [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
// console.log(generateArrayWithDistinctValues(3.6));

const generateReviews = async (target, currentRestaurantId) => {
	const reviews = [];

	const currentRating = target;
	// generate random number of reviews per restaurant
	// const amountOfReviews = generateArrayWithDistinctValues(currentRating);
	const totalArrs = randomValuesObj[currentRating].length - 1; // Get total arrays within each obj
	const rand = getRandomNum(0, totalArrs);
	const amountOfReviews = randomValuesObj[currentRating][rand];

	for (let j = 0; j < amountOfReviews.length; j++) {
		const randomRating = amountOfReviews[j];
		const randomNum = getRandomNum(0, 5);

		const newReview = {
			body: reviewBody[randomRating][randomNum],
			userId: getRandomNum(1, 30),
			restaurantId: currentRestaurantId,
			rating: randomRating,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		reviews.push(newReview);
	}

	return reviews;
};

module.exports = { generateReviews };
