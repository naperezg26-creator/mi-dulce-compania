const mongoose = require('mongoose');

const rolSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    descripcion: {
        type: String,
        trim: true,
        default: ''
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo'],
        default: 'activo'
    }
}, {
    timestamps: true
});

const Rol = mongoose.model('Rol', rolSchema);
module.exports = Rol;
