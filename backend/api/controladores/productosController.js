const Producto = require('../modelos/productosModel');

exports.guardarProducto = async (req, res) => {
    try {
        const { codigo, nombre, cantidad, precio, descripcion, estado } = req.body;

        if (!codigo || !nombre || cantidad === null || precio === null || !estado) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos obligatorios: codigo, nombre, cantidad, estado'
            });
        }

        const productoExistente = await Producto.findOne({ codigo });
        if (productoExistente) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe un producto con ese código'
            });
        }

        const nuevoProducto = new Producto({
            codigo,
            nombre,
            cantidad,
            precio,
            descripcion: descripcion || '',
            imagen: req.file ? `/uploads/${req.file.filename}` : '',
            estado
        });

        await nuevoProducto.save();

        res.status(201).json({
            success: true,
            message: 'Producto guardado exitosamente',
            data: nuevoProducto
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al guardar el producto',
            error: error.message
        });
    }
};

exports.actualizarProducto = async (req, res) => {
    try {
        const { _id } = req.body;
        
        if (!_id) {
            return res.status(400).json({
                success: false,
                message: 'El _id es necesario para actualizar'
            });
        }

        const datosActualizar = { ...req.body };
        delete datosActualizar._id;
        delete datosActualizar.codigo;

        const productoActualizado = await Producto.findByIdAndUpdate(
            _id,
            datosActualizar,
            { new: true, runValidators: true }
        );

        if (!productoActualizado) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Producto actualizado exitosamente',
            data: productoActualizado
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el producto',
            error: error.message
        });
    }
};

exports.eliminarProducto = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).json({
                success: false,
                message: 'El _id es necesario para eliminar'
            });
        }

        const productoEliminado = await Producto.findByIdAndDelete(_id);

        if (!productoEliminado) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Producto eliminado exitosamente',
            data: productoEliminado
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el producto',
            error: error.message
        });
    }
};

exports.listarPorId = async (req, res) => {
    try {
        const { _id } = req.query;

        if (!_id) {
            return res.status(400).json({
                success: false,
                message: 'El _id es necesario'
            });
        }

        const producto = await Producto.findById(_id);

        if (!producto) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: producto
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar el producto',
            error: error.message
        });
    }
};

exports.listarTodos = async (req, res) => {
    try {
        const productos = await Producto.find();

        res.status(200).json({
            success: true,
            cantidad: productos.length,
            data: productos
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al listar los productos',
            error: error.message
        });
    }
};