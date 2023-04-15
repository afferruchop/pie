const mongoose = require('mongoose');

console.log("conectar a ", process.env.MONGODB_URI);
const DB_URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/databasetest';

mongoose.connect(DB_URI, {
    useNewUrlParser: true
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Conectado a base de datos')
})