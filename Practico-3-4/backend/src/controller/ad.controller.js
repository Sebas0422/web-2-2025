import { Ad, User, Crypto } from "../models/index.js";

export const createAd = async (req, res) => {
  try {
    const { type, price, amount, paymentMethod, userId, cryptoId } = req.body;

    const ad = await Ad.create({
      type,
      price,
      amount,
      paymentMethod,
      userId,
      cryptoId,
      isActive: true,
    });

    res.status(201).json(ad);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el anuncio",
      error: error.message,
    });
  }
};

export const getAds = async (req, res) => {
  try {
    const { type, cryptoId } = req.query;

    const whereClause = {};
    if (type) whereClause.type = type;
    if (cryptoId) whereClause.cryptoId = cryptoId;

    const ads = await Ad.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          attributes: ["id", "email"],
        },
        {
          model: Crypto,
          attributes: ["id", "name", "symbol", "usdCost"],
        },
      ],
    });

    res.json(ads);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los anuncios",
      error: error.message,
    });
  }
};