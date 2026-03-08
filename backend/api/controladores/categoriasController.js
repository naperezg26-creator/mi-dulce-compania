const Categoria = require('../modelos/categoriasModel');

exports.guardarCategoria = async (req, res) => {
    try {
        const { nombre, descripcion, estado } = req.body;

        if (!nombre || !estado) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos obligatorios: nombre, estado'
            });
        }

        const nuevaCategoria = new Categoria({
            nombre,
            descripcion: descripcion || '',
            imagen: req.file ? `/uploads/${req.file.filename}` : '',
            estado
        });

        await nuevaCategoria.save();

        res.status(201).json({
            success: true,
            message: 'Categoría guardada exitosamente',
            data: nuevaCategoria
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al guardar la categoría',
            error: error.message
        });
    }
};

exports.actualizarCategoria = async (req, res) => {
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

        const categoriaActualizada = await Categoria.findByIdAndUpdate(
            _id,
            datosActualizar,
            { new: true, runValidators: true }
        );

        if (!categoriaActualizada) {
            return res.status(404).json({
                success: false,
                message: 'Categoría no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Categoría actualizada exitosamente',
            data: categoriaActualizada
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar la categoría',
            error: error.message
        });
    }
};

exports.eliminarCategoria = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).json({
                success: false,
                message: 'El _id es necesario para eliminar'
            });
        }

        const categoriaEliminada = await Categoria.findByIdAndDelete(_id);

        if (!categoriaEliminada) {
            return res.status(404).json({
                success: false,
                message: 'Categoría no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Categoría eliminada exitosamente',
            data: categoriaEliminada
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la categoría',
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

        const categoria = await Categoria.findById(_id);

        if (!categoria) {
            return res.status(404).json({
                success: false,
                message: 'Categoría no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            data: categoria
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar la categoría',
            error: error.message
        });
    }
};

exports.listarTodos = async (req, res) => {
    try {
        const categorias = await Categoria.find();

        res.status(200).json({
            success: true,
            cantidad: categorias.length,
            data: categorias
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al listar las categorías',
            error: error.message
        });
    }
};
