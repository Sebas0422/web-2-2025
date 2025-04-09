const db = require('../models');
const Burguer = db.Burguer;

exports.getBurguerList = async (req, res) => {
    try {
        const burguers = await Burguer.findAll();
        res.status(200).json(burguers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving burguers', error });
    }
}

exports.getBurguer = async (req, res) => {
    const { id } = req.params;
    try {
        const burguer = await Burguer.findByPk(id);
        if (!burguer) {
            return res.status(404).json({ message: 'Burguer not found' });
        }
        res.status(200).json(burguer);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving burguer', error });
    }
}

exports.createBurguer = async (req, res) => {
    const { errors, burguer} = validateBurguerForm(req);
    if (errors) {
        return res.status(400).json(errors);
    }
    try {
        const newBurguer = await Burguer.create(burguer);
        res.status(201).json(newBurguer);
    } catch (error) {
        res.status(500).json({ message: 'Error creating burguer', error });
    }
}

exports.updateBurguer = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, imageUrl } = req.body;
    try {
        const [updated] = await Burguer.update({ name, description, price, imageUrl }, { where: { id } });
        if (!updated) {
            return res.status(404).json({ message: 'Burguer not found' });
        }
        const updatedBurguer = await Burguer.findByPk(id);
        res.status(200).json(updatedBurguer);
    } catch (error) {
        res.status(500).json({ message: 'Error updating burguer', error });
    }
}

exports.deleteBurguer = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Burguer.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ message: 'Burguer not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting burguer', error });
    }
}

const validateBurguerForm = (req) => {
    const { name, description, price, imageUrl } = req.body;
    const errors = {};
    if (!name) errors.name = 'Name is required';
    if (!description) errors.description = 'Description is required';
    if (!price) errors.price = 'Price is required';
    if (!imageUrl) errors.imageUrl = 'Image URL is required';
    if (Object.keys(errors).length > 0) {
        errors.message = "Todos los campos son requeridos";
        return { errors, burguer: req.body };
    }

    return { errors: null, burguer: req.body };
}