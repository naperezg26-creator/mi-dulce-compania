const Rol = require('../modelos/rolesModel');

const rolesController = {};

rolesController.guardarRol = async (req, res) => {
    try {
        const { nombre, descripcion, estado } = req.body;

        const existe = await Rol.findOne({ nombre });
        if (existe) {
            return res.json({ state: false, mensaje: 'El rol ya existe' });
        }

        const nuevoRol = await Rol.create({ nombre, descripcion, estado });
        return res.json({ state: true, mensaje: 'Rol creado correctamente', data: nuevoRol });
    } catch (error) {
        return res.status(500).json({ state: false, mensaje: error.message });
    }
};

rolesController.actualizarRol = async (req, res) => {
    try {
        const { _id, nombre, descripcion, estado } = req.body;
        const rol = await Rol.findByIdAndUpdate(
            _id,
            { nombre, descripcion, estado },
            { new: true }
        );
        if (!rol) return res.json({ state: false, mensaje: 'Rol no encontrado' });
        return res.json({ state: true, mensaje: 'Rol actualizado correctamente', data: rol });
    } catch (error) {
        return res.status(500).json({ state: false, mensaje: error.message });
    }
};

rolesController.eliminarRol = async (req, res) => {
    try {
        const { _id } = req.body;
        await Rol.findByIdAndDelete(_id);
        return res.json({ state: true, mensaje: 'Rol eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ state: false, mensaje: error.message });
    }
};

rolesController.listarTodos = async (req, res) => {
    try {
        const roles = await Rol.find();
        return res.json({ state: true, data: roles });
    } catch (error) {
        return res.status(500).json({ state: false, mensaje: error.message });
    }
};

rolesController.listarPorId = async (req, res) => {
    try {
        const { _id } = req.query;
        const rol = await Rol.findById(_id);
        return res.json({ state: true, data: rol });
    } catch (error) {
        return res.status(500).json({ state: false, mensaje: error.message });
    }
};

module.exports = rolesController;
