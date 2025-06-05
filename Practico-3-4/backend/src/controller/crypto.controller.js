import { Crypto } from "../models/index.js";

export const createCrypto = async (req, res) => {
  try {
    const { name, symbol, usdCost } = req.body;

    if (!name || !symbol) {
      return res.status(400).json({ message: "Faltan campos requeridos." });
    }

    const existing = await Crypto.findOne({ where: { symbol } });
    if (existing) {
      return res.status(400).json({ message: "Ya existe una cripto con ese símbolo." });
    }

    const crypto = await Crypto.create({ name, symbol, usdCost });
    res.status(201).json(crypto);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la criptomoneda",
      error: error.message,
    });
  }
};

export const getCryptos = async (_req, res) => {
  try {
    const cryptos = await Crypto.findAll();
    res.json(cryptos);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener criptomonedas",
      error: error.message,
    });
  }
};