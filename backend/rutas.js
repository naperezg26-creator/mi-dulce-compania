const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const usuariosController = require('./api/controladores/usuariosController');
const productosController = require('./api/controladores/productosController');
const rolesController   = require('./api/controladores/rolesController');
const categoriasController = require('./api/controladores/categoriasController');

// Configuración de multer para subir imágenes
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'uploads'),
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

// ── USUARIOS - Auth ──────────────────────────────────────────
router.post('/usuarios/registro',   usuariosController.Guardar);
router.post('/usuarios/login',      usuariosController.Login);

// ── USUARIOS - CRUD ──────────────────────────────────────────
router.get('/usuarios/ListarTodos', usuariosController.listarTodos);
router.get('/usuarios/ListarId',    usuariosController.listarPorId);
router.put('/usuarios/Actualizar',  usuariosController.actualizar);
router.delete('/usuarios/Eliminar', usuariosController.eliminar);

// ── PRODUCTOS - CRUD ─────────────────────────────────────────
router.post('/productos/Guardar', upload.single('imagen'), productosController.guardarProducto);
router.put('/productos/Actualizar',   productosController.actualizarProducto);
router.delete('/productos/Eliminar',  productosController.eliminarProducto);
router.get('/productos/ListarId',     productosController.listarPorId);
router.get('/productos/ListarTodos',  productosController.listarTodos);

// ── ROLES - CRUD ─────────────────────────────────────────────
router.post('/roles/Guardar',     rolesController.guardarRol);
router.put('/roles/Actualizar',   rolesController.actualizarRol);
router.delete('/roles/Eliminar',  rolesController.eliminarRol);
router.get('/roles/ListarId',     rolesController.listarPorId);
router.get('/roles/ListarTodos',  rolesController.listarTodos);

// ── CATEGORIAS - CRUD ───────────────────────────────────────
router.post('/categorias/Guardar', upload.single('imagen'), categoriasController.guardarCategoria);
router.put('/categorias/Actualizar',   categoriasController.actualizarCategoria);
router.delete('/categorias/Eliminar',  categoriasController.eliminarCategoria);
router.get('/categorias/ListarId',     categoriasController.listarPorId);
router.get('/categorias/ListarTodos',  categoriasController.listarTodos);

module.exports = router;
