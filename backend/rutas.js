const express = require('express');
const router = express.Router();

const usuariosController = require('./api/controladores/usuariosController');
const productosController = require('./api/controladores/productosController');

router.post('/usuarios/registro', usuariosController.Registrar);
router.post('/usuarios/login', usuariosController.Login);
router.post('/productos/Guardar', productosController.Guardar);
router.put('/productos/Actualizar', productosController.Actualizar);
router.delete('/productos/Eliminar', productosController.Eliminar);
router.get('/productos/ListarId', productosController.ListarId);
router.get('/productos/ListarTodos', productosController.ListarTodos);

module.exports = router;


