import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './config/db.config.js';
import { routes } from './routes/index.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT;
app.use(
  cors({
    origin: [process.env.URL_FRONTEND_DEV || 'http://localhost:5173'],
    optionsSuccessStatus: 200,
  }),
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

await sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Base de datos sincronizada correctamente');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });

routes(app);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
