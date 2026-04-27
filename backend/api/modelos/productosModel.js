var mongoose = require("mongoose")

var productosModel = {}

var productosSchema = new mongoose.Schema({
    codigo:     { type: String },
    nombre:     { type: String },
    cantidad:   { type: Number },
    precio:     { type: Number },
    descripcion:{ type: String, default: "" },
    estado:     { type: String },
    fecha:      { type: Date, default: Date.now }
})

const Mymodel = mongoose.model("productos", productosSchema)

productosModel.BuscarporCodigo = function(post, callback){
    Mymodel.find({codigo: post.codigo}).then(function(respuesta){
        callback(respuesta)
    })
}

productosModel.Guardar = function(post, callback){
    var nuevo = new Mymodel(post)
    nuevo.save().then(function(respuesta){
        callback({state: true, data: respuesta})
    }).catch(function(error){
        callback({state: false, data: error})
    })
}

productosModel.ExisteId = function(post, callback){
    Mymodel.find({_id: post._id}).then(function(respuesta){
        callback(respuesta)
    }).catch(function(error){
        callback([])
    })
}

productosModel.Actualizar = function(post, callback){
    Mymodel.findByIdAndUpdate(
        post._id,
        { nombre: post.nombre, cantidad: post.cantidad, precio: post.precio, descripcion: post.descripcion, estado: post.estado },
        { new: true }
    ).then(function(respuesta){
        callback({state: true, data: respuesta})
    }).catch(function(error){
        callback({state: false, data: error})
    })
}

productosModel.Eliminar = function(post, callback){
    Mymodel.findByIdAndDelete(post._id).then(function(respuesta){
        callback({state: true, data: respuesta})
    }).catch(function(error){
        callback({state: false, data: error})
    })
}

productosModel.ListarTodos = function(post, callback){
    Mymodel.find({}).then(function(respuesta){
        callback(respuesta)
    })
}

productosModel.ListarId = function(post, callback){
    Mymodel.find({_id: post._id}).then(function(respuesta){
        callback(respuesta)
    }).catch(function(error){
        callback([])
    })
}

productosModel.Mymodel = Mymodel

module.exports.productosModel = productosModel