var productosModel = require("../modelos/productosModel.js").productosModel

var productosController = {}

// ==================== GUARDAR ====================
productosController.Guardar = function(request, response){

    var post = {
        codigo: request.body.codigo,
        nombre: request.body.nombre,
        cantidad: request.body.cantidad,
        precio: request.body.precio,
        descripcion: request.body.descripcion,
        estado: request.body.estado
    }

    if(post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false, mensaje:"El campo codigo es obligatorio"})
        return false
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }

    if(post.cantidad == undefined || post.cantidad == null || post.cantidad == ""){
        response.json({state:false, mensaje:"El campo cantidad es obligatorio"})
        return false
    }

    if(post.precio == undefined || post.precio == null || post.precio == ""){
        response.json({state:false, mensaje:"El campo precio es obligatorio"})
        return false
    }

    if(post.estado == undefined || post.estado == null || post.estado == ""){
        response.json({state:false, mensaje:"El campo estado es obligatorio"})
        return false
    }

    productosModel.BuscarporCodigo(post, function(existe){
        if(existe.length == 0){
            productosModel.Guardar(post, function(respuesta){
                if(respuesta.state == true){
                    response.json({state:true, mensaje:"Producto almacenado Correctamente"})
                }else{
                    response.json({state:false, mensaje:"Se presento un error al crear el producto"})
                }
            })
        }else{
            response.json({state:false, mensaje:"El codigo ya existe intente con otro"})
        }
    })
}

// ==================== ACTUALIZAR ====================
productosController.Actualizar = function(request, response){

    var post = {
        _id: request.body._id,
        nombre: request.body.nombre,
        cantidad: request.body.cantidad,
        precio: request.body.precio,
        descripcion: request.body.descripcion,
        estado: request.body.estado
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

    if(post._id.length != 24){
        response.json({state:false, mensaje:"El campo _id debe ser de 24 caracteres"})
        return false
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }

    if(post.cantidad == undefined || post.cantidad == null || post.cantidad == ""){
        response.json({state:false, mensaje:"El campo cantidad es obligatorio"})
        return false
    }

    if(post.precio == undefined || post.precio == null || post.precio == ""){
        response.json({state:false, mensaje:"El campo precio es obligatorio"})
        return false
    }

    if(post.estado == undefined || post.estado == null || post.estado == ""){
        response.json({state:false, mensaje:"El campo estado es obligatorio"})
        return false
    }

    productosModel.ExisteId(post, function(data){
        if(data.length == 0){
            response.json({state:false, mensaje:"El _id no existe en la base de datos, no se puede actualizar"})
            return false
        }else{
            productosModel.Actualizar(post, function(respuesta){
                if(respuesta.state == true){
                    response.json({state:true, mensaje:"Registro Actualizado"})
                    return false
                }else{
                    response.json({state:false, mensaje:"no se pudo actualizar"})
                    return false
                }
            })
        }
    })
}

// ==================== ELIMINAR ====================
productosController.Eliminar = function(request, response){

    var post = {
        _id: request.body._id
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

    if(post._id.length != 24){
        response.json({state:false, mensaje:"El campo _id debe ser de 24 caracteres"})
        return false
    }

    productosModel.ExisteId(post, function(data){
        if(data.length == 0){
            response.json({state:false, mensaje:"El _id no existe en la base de datos, no se puede eliminar"})
            return false
        }else{
            productosModel.Eliminar(post, function(respuesta){
                if(respuesta.state == true){
                    response.json({state:true, mensaje:"Registro Eliminado"})
                    return false
                }else{
                    response.json({state:false, mensaje:"no se pudo eliminar"})
                    return false
                }
            })
        }
    })
}

// ==================== LISTAR TODOS ====================
productosController.ListarTodos = function(request, response){

    var post = {}

    productosModel.ListarTodos(post, function(respuesta){
        response.json({state:true, data:respuesta})
    })
}

// ==================== LISTAR POR ID ====================
productosController.ListarId = function(request, response){

    var post = {
        _id: request.body._id
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

    if(post._id.length != 24){
        response.json({state:false, mensaje:"El campo _id debe ser de 24 caracteres"})
        return false
    }

    productosModel.ListarId(post, function(respuesta){
        response.json({state:true, data:respuesta})
    })
}

module.exports = productosController