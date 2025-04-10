const db = require("../models");
const burger = db.burger;

exports.getburgerList = async (req, res) => {
  try {
    const burgers = await burger.findAll();
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.status(200).json(burgers);
    } else {
      res.render("pages/burgers/burgerList.ejs", { burgers });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving burgers", error: error.message || error.toString(), });
  }
};

exports.getburger = async (req, res) => {
  const { id } = req.params;
  try {
    const burger = await burger.findByPk(id);
    if (!burger) {
      return res.status(404).json({ message: "burger not found" });
    }
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.status(200).json(burger);
    } else {
      return res.render("pages/burgers/burgerDetail.ejs", { burger });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving burger", error });
  }
};

exports.createburger = async (req, res) => {
  const { errors, burger } = validateburgerForm(req);
  if (errors) {
    return res.status(400).json(errors);
  }
  try {
    const newburger = await burger.create(burger);
    res.status(201).json(newburger);
  } catch (error) {
    res.status(500).json({ message: "Error creating burger", error });
  }
};

exports.updateburger = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, imageUrl } = req.body;
  try {
    const [updated] = await burger.update(
      { name, description, price, imageUrl },
      { where: { id } }
    );
    if (!updated) {
      return res.status(404).json({ message: "burger not found" });
    }
    const updatedburger = await burger.findByPk(id);
    res.status(200).json(updatedburger);
  } catch (error) {
    res.status(500).json({ message: "Error updating burger", error });
  }
};

exports.deleteburger = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await burger.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "burger not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting burger", error });
  }
};

const validateburgerForm = (req) => {
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
