import 'dotenv/config';
import express from 'express';
import { findAvailablePort } from './utilities/findAvailablePort.js';

const app = express();
const PORT = process.env.PORT;

findAvailablePort(PORT).then((port) => {
  app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
  });
}).catch(err => {
  console.error("Error al encontrar un puerto disponible:", err);
});
