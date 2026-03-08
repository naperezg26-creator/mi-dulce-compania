const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: [true, 'El código es obligatorio'],
        unique: true,
        trim: true
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    cantidad: {
        type: Number,
        required: [true, 'La cantidad es obligatoria'],
        min: [0, 'La cantidad no puede ser negativa']
    },
    precio: {
        type: Number,
        required: true
    },

    descripcion: {
        type: String,
        trim: true,
        default: ''
    },
    imagen: {
        type: String,
        default: ''
    },
    estado: {
        type: String,
        required: [true, 'El estado es obligatorio'],
        enum: {
            values: ['activo', 'inactivo'],
            message: 'El estado debe ser activo o inactivo'
        }
    }
}, {
    timestamps: true
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;