const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const app = express();
const port = 3000;
const db = require('./config/db.config');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.set(('view engine', 'ejs'));
app.use(express.static('public'));

app.use(fileUpload({
    createParentPath: true,
}));

app.use(session({
    secret:'esta es la clave de encriptación de la sesión y puede ser cualquier texto', 
    })
)

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('Base de datos sincronizada');
    })
    .catch((err) => {
        console.error('Error al sincronizar la base de datos:', err);
    }
);

require('./routes')(app);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
}
);