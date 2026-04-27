const express = require('express');
const router = express.Router();

const usuariosController = require('./api/controladores/usuariosController');
const productosController = require('./api/controladores/productosController');
const { routes } = require('./app');


router.post('/usuarios/registro', usuariosController.Guardar);
router.post('/usuarios/login', usuariosController.Login);
router.post('/productos/Guardar', productosController.guardarProducto);
router.put('/productos/Actualizar', productosController.actualizarProducto);
router.delete('/productos/Eliminar', productosController.eliminarProducto);
router.get('/productos/ListarId', productosController.listarPorId);
router.get('/productos/ListarTodos', productosController.listarTodos);




module.exports = router;


