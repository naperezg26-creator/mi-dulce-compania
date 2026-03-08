const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    idrol: {
        type: String,
        required: true,
        enum: ['admin', 'cliente'],
        default: 'cliente'
    }
}, {
    timestamps: true
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
