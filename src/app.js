const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

// configuracion
app.set('port', process.env.port || 4000);


// funciones de inicio antes de rutas
app.use(cors());
// verifica si las peticiones vienen en json 
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// rutas
app.use('/api/eventos', require('./routes/eventos'));

module.exports = app;