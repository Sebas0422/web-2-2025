const db = require("../models");
const Burger = db.Burger;
const Rating = db.Rating

exports.getBurgerList = async (req, res) => {
  try {
    const burgers = await Burger.findAll();
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.status(200).json(burgers);
    } else {
      res.render("pages/burgers/BurgerList.ejs", { burgers });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving burgers", error: error.message || error.toString(), });
  }
};

exports.getBurger = async (req, res) => {
  const { id } = req.params;
  try {
    const burger = await Burger.findOne({
      where: { id },
      include: [{
        model: Rating,
        where: { sessionId: req.session.userId },
        required: false, 
      }],
    });

    if (!burger) {
      return res.status(404).json({ message: "Burger not found" });
    }

    const rating = burger.Ratings && burger.Ratings.length > 0 ? burger.Ratings[0].rating : 0;
    const tasted = burger.Ratings && burger.Ratings.length > 0 ? burger.Ratings[0].tasted : false;
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.status(200).json({ burger, rating, tasted });
    } else {
      res.render('pages/burgers/BurgerDetail.ejs', { burger, rating, tasted });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving burger", error });
  }
};


exports.createBurger = async (req, res) => {
  const { errors, burger } = validateBurgerForm(req);
  if (errors) {
    return res.status(400).json(errors);
  }
  try {
    const newburger = await Burger.create(burger);
    res.status(201).json(newburger);
  } catch (error) {
    res.status(500).json({ message: "Error creating burger", error });
  }
};

exports.updateBurger = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, imageUrl } = req.body;
  try {
    const [updated] = await Burger.update(
      { name, description, price, imageUrl },
      { where: { id } }
    );
    if (!updated) {
      return res.status(404).json({ message: "burger not found" });
    }
    const updatedburger = await Burger.findByPk(id);
    res.status(200).json(updatedburger);
  } catch (error) {
    res.status(500).json({ message: "Error updating burger", error });
  }
};

exports.deleteBurger = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Burger.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "burger not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting burger", error });
  }
};

const validateBurgerForm = (req) => {
  const { name, description, price, imageUrl } = req.body;
  const errors = {};
  if (!name) errors.name = "Name is required";
  if (!description) errors.description = "Description is required";
  if (!price) errors.price = "Price is required";
  if (!imageUrl) errors.imageUrl = "Image URL is required";
  if (Object.keys(errors).length > 0) {
    errors.message = "Todos los campos son requeridos";
    return { errors, burger: req.body };
  }

  return { errors: null, burger: req.body };
};


exports.rateBurger = async (req, res) => {
  const { id } = req.params;
  const { rating, tasted } = req.body;
  const sessionId = req.session.userId;

  try {
    const existingRating = await Rating.findOne({
      where: { burgerId: id, sessionId }
    });

    if (existingRating) {
      await existingRating.update({ rating, tasted });
    } else {
      await Rating.create({
        burgerId: id,
        rating,
        tasted,
        sessionId,
      });
    }

    res.status(200).json({ message: 'Rating guardado con éxito' });
  } catch (err) {
    res.status(500).json({ message: 'Error al guardar la calificación', error: err });
  }
};

