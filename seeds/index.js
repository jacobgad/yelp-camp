const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 400; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: '6002a767c5cf4e473040270d', //User ID
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description:
				'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, maiores voluptatem voluptas pariatur veniam perferendis eius repudiandae, culpa quo ut fugit! Suscipit nihil similique delectus vel nisi ducimus possimus facere!',
			price,
			geometry: {
				type: 'Point',
				coordinates: [cities[random1000].longitude, cities[random1000].latitude],
			},
			images: [
				{
					url: 'https://res.cloudinary.com/dwkzmlsra/image/upload/v1610619374/YelpCamp/bq7xzozfacrtrvltvokd.jpg',
					filename: 'YelpCamp/bq7xzozfacrtrvltvokd',
				},
				{
					url: 'https://res.cloudinary.com/dwkzmlsra/image/upload/v1610619373/YelpCamp/dezivtjvzzy8d3w6ebbo.jpg',
					filename: 'YelpCamp/dezivtjvzzy8d3w6ebbo',
				},
				{
					url: 'https://res.cloudinary.com/dwkzmlsra/image/upload/v1610619374/YelpCamp/sh3l156ilvrbgkdwzzf3.jpg',
					filename: 'YelpCamp/sh3l156ilvrbgkdwzzf3',
				},
				{
					url: 'https://res.cloudinary.com/dwkzmlsra/image/upload/v1610619374/YelpCamp/lswwfz0tmdaxzcyhx7ig.jpg',
					filename: 'YelpCamp/lswwfz0tmdaxzcyhx7ig',
				},
			],
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
