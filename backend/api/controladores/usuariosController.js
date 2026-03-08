const Usuario = require('../modelos/usuariosModel');
const jwt = require('jsonwebtoken');
const { config } = require('../../config');

const usuariosController = {};

// REGISTRO
usuariosController.Guardar = async function (req, res) {
    try {
        const { nombre, email, password, idrol } = req.body;

        const existe = await Usuario.findOne({ email: email.toLowerCase() });
        if (existe) {
            return res.json({ state: false, mensaje: 'El correo ya existe' });
        }

        const nuevoUsuario = await Usuario.create({
            nombre,
            email,
            password,
            idrol: idrol || 'cliente'
        });

        return res.json({
            state: true,
            mensaje: 'Usuario registrado correctamente',
            data: nuevoUsuario
        });
    } catch (error) {
        return res.status(500).json({ state: false, mensaje: error.message });
    }
};

// LOGIN
usuariosController.Login = async function (req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ state: false, mensaje: 'Todos los campos son requeridos' });
        }

        const usuario = await Usuario.findOne({ email: email.toLowerCase() });
        if (!usuario) {
            return res.json({ state: false, mensaje: 'Usuario no encontrado' });
        }

        if (usuario.password !== password) {
            return res.json({ state: false, mensaje: 'Contraseña incorrecta' });
        }

        const payload = {
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            idrol: usuario.idrol
        };

        const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '8h' });

        return res.json({
            state: true,
            mensaje: 'Login exitoso',
            token,
            usuario: payload
        });
    } catch (error) {
        return res.status(500).json({ state: false, mensaje: error.message });
    }
};

// LISTAR TODOS
usuariosController.listarTodos = async function (req, res) {
    try {
        const usuarios = await Usuario.find({}, { password: 0 });
        return res.json({ state: true, data: usuarios });
    } catch (error) {
        return res.status(500).json({ state: false, mensaje: error.message });
    }
};

// LISTAR POR ID
usuariosController.listarPorId = async function (req, res) {
    try {
        const { _id } = req.query;
        const usuario = await Usuario.findById(_id, { password: 0 });
        return res.json({ state: true, data: usuario });
    } catch (error) {
        return res.status(500).json({ state: false, mensaje: error.message });
    }
};

// ACTUALIZAR
usuariosController.actualizar = async function (req, res) {
    try {
        const { _id, nombre, email, idrol } = req.body;
        const usuario = await Usuario.findByIdAndUpdate(
            _id,
            { nombre, email, idrol },
            { new: true, projection: { password: 0 } }
        );
        if (!usuario) return res.json({ state: false, mensaje: 'Usuario no encontrado' });
        return res.json({ state: true, mensaje: 'Usuario actualizado correctamente', data: usuario });
    } catch (error) {
        return res.status(500).json({ state: false, mensaje: error.message });
    }
};

// ELIMINAR
usuariosController.eliminar = async function (req, res) {
    try {
        const { _id } = req.body;
        await Usuario.findByIdAndDelete(_id);
        return res.json({ state: true, mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ state: false, mensaje: error.message });
    }
};

module.exports = usuariosController;
