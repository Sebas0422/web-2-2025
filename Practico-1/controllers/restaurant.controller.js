const db = require("../models");
const Restaurant = db.Restaurant;
const Burger = db.Burger;

exports.getRestaurantList = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.status(200).json(restaurants);
    } else {
      res.render("pages/restaurants/RestaurantList.ejs", { restaurants });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving restaurants", error });
  }
};

exports.getRestaurant = async(req, res) => {
	const { id } = req.params;
	try{
		const restaurant = await Restaurant.findOne({
      where: { id },
      include: [{
        model: Burger,
        as: "burgers",
        required: false,
      }]
    });
		if(!restaurant){
			return res.status(404).json({message:'Restaurant not found'})
		}
		if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.status(200).json(restaurant);
    } else {
      return res.render("pages/restaurants/RestaurantDetail.ejs", { restaurant });
    }
	}catch(error){
		res.status(500).json({ message: "Error retrieving Restaurant", error });
	}
}

exports.postCreateRestaurant= async (req,res)=> {
	const { name, logoUrl } = req.body;
	try {
		const restaurant = await Restaurant.create({ name, logoUrl });
		if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.status(200).json(restaurant);
    } else {
      res.render("pages/restaurants/RestaurantList.ejs", { restaurant });
    }
	} catch (error) {
		res.status(500).json({ message: "Error creating restaurant", error });
	}
}

