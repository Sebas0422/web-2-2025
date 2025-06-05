import { sequelize } from "../config/db.config.js";
import { User, Ad, Crypto} from "../models/index.js";
import bcrypt from "bcryptjs";

const seed = async () => {
  try {
    // Forzar reinicio de las tablas
    await sequelize.sync({ force: true });
    console.log('📦 Base de datos sincronizada (con eliminación previa)');

    // Hashear contraseñas
    const hashedPassword1 = await bcrypt.hash('password123', 10);
    const hashedPassword2 = await bcrypt.hash('admin123', 10);

    // Crear usuarios
    const users = await Promise.all([
      User.create({
        email: 'user1@example.com',
        password: hashedPassword1,
        permissions: ['user'],
      }),
      User.create({
        email: 'admin@example.com',
        password: hashedPassword2,
        permissions: ['admin', 'user'],
      }),
    ]);

    // Crear criptomonedas
    const cryptos = await Promise.all([
      Crypto.create({ name: 'Bitcoin', symbol: 'BTC', usdCost: 30000 }),
      Crypto.create({ name: 'Ethereum', symbol: 'ETH', usdCost: 2000 }),
      Crypto.create({ name: 'Litecoin', symbol: 'LTC', usdCost: 150 }),
    ]);

    await Promise.all([
      Ad.create({
        title: 'Vendo 0.5 BTC',
        description: 'Precio negociable',
        price: 15000,
        userId: users[0].id,
        cryptoId: cryptos[0].id,
        amount: 0.5,
        paymentMethod: 'Transferencia bancaria',
        type: 'sell',
      }),
      Ad.create({
        title: 'Compro 2 ETH',
        description: 'Pago inmediato',
        price: 3000,
        userId: users[1].id,
        cryptoId: cryptos[1].id,
        amount: 2,
        paymentMethod: 'PayPal',
        type: 'buy',
      }),
    ]);

    console.log('✅ Datos insertados correctamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al insertar datos:', error);
    process.exit(1);
  }
};

seed();