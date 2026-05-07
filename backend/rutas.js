const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const usuariosController = require('./api/controladores/usuariosController');
const productosController = require('./api/controladores/productosController');
const categoriasController = require('./api/controladores/categoriasController');
const rolesController = require('./api/controladores/rolesController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Usuarios
router.post('/usuarios/registro', usuariosController.Registrar);
router.post('/usuarios/login', usuariosController.Login);
router.get('/usuarios/ListarTodos', usuariosController.ListarTodos);
router.put('/usuarios/Actualizar', usuariosController.Actualizar);
router.delete('/usuarios/Eliminar', usuariosController.Eliminar);

// Productos
router.post('/productos/Guardar', upload.single('imagen'), productosController.Guardar);
router.put('/productos/Actualizar', productosController.Actualizar);
router.delete('/productos/Eliminar', productosController.Eliminar);
router.get('/productos/ListarId', productosController.ListarId);
router.get('/productos/ListarTodos', productosController.ListarTodos);

// Categorias
router.post('/categorias/Guardar', upload.single('imagen'), categoriasController.guardarCategoria);
router.put('/categorias/Actualizar', categoriasController.actualizarCategoria);
router.delete('/categorias/Eliminar', categoriasController.eliminarCategoria);
router.get('/categorias/ListarId', categoriasController.listarPorId);
router.get('/categorias/ListarTodos', categoriasController.listarTodos);

// Roles
router.post('/roles/Guardar', rolesController.guardarRol);
router.put('/roles/Actualizar', rolesController.actualizarRol);
router.delete('/roles/Eliminar', rolesController.eliminarRol);
router.get('/roles/ListarTodos', rolesController.listarTodos);

module.exports = router;
