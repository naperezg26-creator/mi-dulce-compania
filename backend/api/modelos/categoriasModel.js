const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
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

const Categoria = mongoose.model('Categoria', categoriaSchema);

module.exports = Categoria;
