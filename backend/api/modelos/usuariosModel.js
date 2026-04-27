var mongoose = require("mongoose")

var usuariosModel = {}

var usuariosSchema = new mongoose.Schema({
    nombre:     { type: String },
    email:      { type: String },
    password:   { type: String },
    idrol:      { type: String },
    rol:        { type: String },
    estado:     { type: String },
    codigoact:  { type: String },
    fecha:      { type: Date, default: Date.now }
})

const Mymodel = mongoose.model("usuarios", usuariosSchema)

usuariosModel.BuscarporEmail = function(post, callback){
    Mymodel.find({email: post.email}).then(function(respuesta){
        callback(respuesta)
    })
}

usuariosModel.Guardar = function(post, callback){
    var nuevo = new Mymodel(post)
    nuevo.save().then(function(respuesta){
        callback({state: true, data: respuesta})
    }).catch(function(error){
        callback({state: false, data: error})
    })
}

usuariosModel.Registrar = function(post, callback){
    var nuevo = new Mymodel(post)
    nuevo.save().then(function(respuesta){
        callback({state: true, data: respuesta})
    }).catch(function(error){
        callback({state: false, data: error})
    })
}

usuariosModel.ExisteId = function(post, callback){
    Mymodel.find({_id: post._id}).then(function(respuesta){
        callback(respuesta)
    }).catch(function(error){
        callback([])
    })
}

usuariosModel.Actualizar = function(post, callback){
    Mymodel.findByIdAndUpdate(
        post._id,
        { nombre: post.nombre, idrol: post.idrol, rol: post.rol, estado: post.estado },
        { new: true }
    ).then(function(respuesta){
        callback({state: true, data: respuesta})
    }).catch(function(error){
        callback({state: false, data: error})
    })
}

usuariosModel.Eliminar = function(post, callback){
    Mymodel.findByIdAndDelete(post._id).then(function(respuesta){
        callback({state: true, data: respuesta})
    }).catch(function(error){
        callback({state: false, data: error})
    })
}

usuariosModel.ListarTodos = function(post, callback){
    Mymodel.find({}).then(function(respuesta){
        callback(respuesta)
    })
}

usuariosModel.ListarId = function(post, callback){
    Mymodel.find({_id: post._id}).then(function(respuesta){
        callback(respuesta)
    }).catch(function(error){
        callback([])
    })
}

usuariosModel.Login = function(post, callback){
    Mymodel.find({email: post.email, password: post.password}).then(function(respuesta){
        callback(respuesta)
    })
}

usuariosModel.Activar = function(post, callback){
    Mymodel.findByIdAndUpdate(
        post._id,
        { estado: "Activo", codigoact: "" },
        { new: true }
    ).then(function(respuesta){
        callback({state: true, data: respuesta})
    }).catch(function(error){
        callback({state: false, data: error})
    })
}

usuariosModel.CambiarPassword = function(post, callback){
    Mymodel.findByIdAndUpdate(
        post._id,
        { password: post.password },
        { new: true }
    ).then(function(respuesta){
        callback({state: true, data: respuesta})
    }).catch(function(error){
        callback({state: false, data: error})
    })
}

usuariosModel.Mymodel = Mymodel

module.exports.usuariosModel = usuariosModel