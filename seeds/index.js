const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "691deaf2d798b5e7ad75b67e",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque maiores ratione nihil tempora qui incidunt cum alias earum quibusdam assumenda autem sequi, id totam perferendis adipisci consectetur harum praesentium numquam?",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/dej8pfozy/image/upload/v1763838756/YelpCamp/qngmo6vqhtji8mzqwfwv.jpg",
          filename: "YelpCamp/qngmo6vqhtji8mzqwfwv",
        },
        {
          url: "https://res.cloudinary.com/dej8pfozy/image/upload/v1763838758/YelpCamp/vtlctznjtibhqzg6hbd3.jpg",
          filename: "YelpCamp/vtlctznjtibhqzg6hbd3",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
