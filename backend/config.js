const mongoose = require('mongoose');

const config = {
    MONGODB_URI: "mongodb+srv://dbUser-N:D7Hy.%25f%23U74wJ7f@cluster0.8tx0mgk.mongodb.net/productos_db?retryWrites=true&w=majority&appName=Cluster0",
    PORT: process.env.PORT || 3000,
    JWT_SECRET: "sawedr5t6789okmn45678ujhbbvgcfdre567u"
};

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://dbUser-N:8wReRAodIID68ixa@cluster0.8tx0mgk.mongodb.net/productos_db?retryWrites=true&w=majority&appName=Cluster0');
        console.log('MongoDB Atlas conectado correctamente');
    } catch (error) {
        console.error('Error al conectar MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = {
    config,
    connectDB
};
