var usuariosModel = require("../modelos/usuariosModel.js").usuariosModel
var bitacoraModel = require("../modelos/bitacoraModel.js").bitacoraModel
const nodemailer = require("nodemailer")

var usuariosController = {}

// ==================== GUARDAR ====================
usuariosController.Guardar = function(request, response){

    var post = {
        nombre: request.body.nombre,
        email: request.body.email,
        password: request.body.password,
        idrol: request.body.idrol,
        rol: request.body.rol,
        estado: request.body.estado
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }

    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje:"El campo email es obligatorio"})
        return false
    }

    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje:"El campo password es obligatorio"})
        return false
    }

    if(post.idrol == undefined || post.idrol == null || post.idrol == ""){
        response.json({state:false, mensaje:"El campo idrol es obligatorio"})
        return false
    }

    if(post.rol == undefined || post.rol == null || post.rol == ""){
        response.json({state:false, mensaje:"El campo rol es obligatorio"})
        return false
    }

    if(post.estado == undefined || post.estado == null || post.estado == ""){
        response.json({state:false, mensaje:"El campo estado es obligatorio"})
        return false
    }

    post.password = sha256(post.password + config.secret)

    usuariosModel.BuscarporEmail(post, function(existe){
        if(existe.length == 0){
            post.codigoact = "G-" + Math.floor(Math.random() * (9999 - 1000) + 1000)

            usuariosModel.Guardar(post, function(respuesta){
                if(respuesta.state == true){
                    response.json({state:true, mensaje:"Usuario almacenado Correctamente"})
                }else{
                    response.json({state:false, mensaje:"Se presento un error al crear el usuario"})
                }
            })
        }else{
            response.json({state:false, mensaje:"El correo ya existe intente con otro"})
        }
    })
}

// ==================== ACTUALIZAR ====================
usuariosController.Actualizar = function(request, response){

    var post = {
        _id: request.body._id,
        nombre: request.body.nombre,
        idrol: request.body.idrol,
        rol: request.body.rol,
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

    if(post.idrol == undefined || post.idrol == null || post.idrol == ""){
        response.json({state:false, mensaje:"El campo idrol es obligatorio"})
        return false
    }

    if(post.rol == undefined || post.rol == null || post.rol == ""){
        response.json({state:false, mensaje:"El campo rol es obligatorio"})
        return false
    }

    if(post.estado == undefined || post.estado == null || post.estado == ""){
        response.json({state:false, mensaje:"El campo estado es obligatorio"})
        return false
    }

    usuariosModel.ExisteId(post, function(data){
        if(data.length == 0){
            response.json({state:false, mensaje:"El _id no existe en la base de datos, no se puede actualizar"})
            return false
        }else{
            usuariosModel.Actualizar(post, function(respuesta){
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
usuariosController.Eliminar = function(request, response){

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

    usuariosModel.ExisteId(post, function(data){
        if(data.length == 0){
            response.json({state:false, mensaje:"El _id no existe en la base de datos, no se puede eliminar"})
            return false
        }else{
            usuariosModel.Eliminar(post, function(respuesta){
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
usuariosController.ListarTodos = function(request, response){

    var post = {}

    usuariosModel.ListarTodos(post, function(respuesta){
        response.json({state:true, data:respuesta})
    })
}

// ==================== LISTAR POR ID ====================
usuariosController.ListarId = function(request, response){

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

    usuariosModel.ListarId(post, function(respuesta){
        response.json({state:true, data:respuesta})
    })
}

// ==================== REGISTRAR ====================
usuariosController.Registrar = function(request, response){

    var post = {
        nombre: request.body.nombre,
        email: request.body.email,
        password: request.body.password
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }

    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje:"El campo email es obligatorio"})
        return false
    }

    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje:"El campo password es obligatorio"})
        return false
    }

    post.password = sha256(post.password + config.secret)
    post.estado = "Inactivo"
    post.idrol = "cliente"
    post.rol = "cliente"

    usuariosModel.BuscarporEmail(post, function(existe){
        if(existe.length == 0){

            post.codigoact = "G-" + Math.floor(Math.random() * (9999 - 1000) + 1000)

            const transporter = nodemailer.createTransport({
                host: config.email.host,
                port: config.email.port,
                secure: false,
                requireTLS: true,
                auth: {
                    user: config.email.user,
                    pass: config.email.pass
                }
            })

            var mailOptions = {
                from: config.email.user,
                to: post.email,
                subject: "Activacion de cuenta - " + config.nombreempresa,
                html: `<h1>Hola ${post.nombre}</h1>
                       <p>Tu codigo de activacion es: <b>${post.codigoact}</b></p>
                       <p>Ingresa a: <a href="${config.dominio}">${config.dominio}</a></p>`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if(error){
                    console.log(error)
                    response.json({state:false, mensaje:"Se presento un error al enviar el correo electronico"})
                }else{
                    console.log(info)
                    usuariosModel.Registrar(post, function(respuesta){
                        if(respuesta.state == true){
                            response.json({state:true, mensaje:"Usuario almacenado Correctamente, verifica tu correo electronico para activar la cuenta"})
                        }else{
                            response.json({state:false, mensaje:"Se presento un error al crear el usuario"})
                        }
                    })
                }
            })
        }else{
            response.json({state:false, mensaje:"El correo ya existe, intente con otro"})
        }
    })
}

// ==================== ACTIVAR ====================
usuariosController.Activar = function(request, response){

    var post = {
        email: request.body.email,
        codigo: request.body.codigo
    }

    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje:"El campo email es obligatorio"})
        return false
    }

    if(post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false, mensaje:"El campo codigo es obligatorio"})
        return false
    }

    usuariosModel.BuscarporEmail(post, function(existe){
        if(existe.length == 0){
            response.json({state:false, mensaje:"El email no existe en la base de datos"})
            return false
        }else{
            if(existe[0].codigoact == post.codigo){
                var datos = {
                    _id: existe[0]._id.toString()
                }
                usuariosModel.Activar(datos, function(respuesta){
                    if(respuesta.state == true){
                        response.json({state:true, mensaje:"Cuenta activada correctamente, dirigete al login"})
                    }else{
                        response.json({state:false, mensaje:"no se pudo activar la cuenta"})
                    }
                })
            }else{
                response.json({state:false, mensaje:"Codigo de activacion incorrecto"})
            }
        }
    })
}

// ==================== LOGIN ====================
usuariosController.Login = function(request, response){

    var post = {
        email: request.body.email,
        password: request.body.password
    }

    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje:"El campo email es obligatorio"})
        return false
    }

    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje:"El campo password es obligatorio"})
        return false
    }

    post.password = sha256(post.password + config.secret)

    usuariosModel.Login(post, function(respuesta){
        if(respuesta.length > 0){
            if(respuesta[0].estado == "Activo"){
                request.session._id = respuesta[0]._id
                request.session.nombre = respuesta[0].nombre
                request.session.email = respuesta[0].email
                request.session.rol = respuesta[0].rol
                request.session.idrol = respuesta[0].idrol
                response.json({state:true, mensaje:"Bienvenido " + respuesta[0].nombre, nombre:respuesta[0].nombre, email:respuesta[0].email})
            }else{
                response.json({state:false, mensaje:"Tu cuenta no ha sido verificada, revisa tu email"})
            }
        }else{
            response.json({state:false, mensaje:"Email o password incorrectos"})
        }
    })
}

// ==================== CAMBIAR PASSWORD ====================
usuariosController.CambiarPassword = function(request, response){

    var post = {
        _id: request.session._id,
        password: request.body.password,
        confirm: request.body.confirm
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"para cambiar la contraseña se debe loguear"})
        return false
    }

    if(post._id.length != 24){
        response.json({state:false, mensaje:"el campo _id debe ser de 24 caracteres"})
        return false
    }

    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje:"el campo password es obligatorio"})
        return false
    }

    if(post.confirm == undefined || post.confirm == null || post.confirm == ""){
        response.json({state:false, mensaje:"el campo confirm es obligatorio"})
        return false
    }

    if(post.password != post.confirm){
        response.json({state:false, mensaje:"El Password y su confirmacion no coinciden"})
        return false
    }

    post.password = sha256(post.password + config.secret)

    usuariosModel.CambiarPassword(post, function(respuesta){
        if(respuesta.state == true){
            response.json({state:true, mensaje:"Password cambiado correctamente"})
        }else{
            response.json({state:false, mensaje:"no se pudo cambiar el password"})
        }
    })
}

module.exports = usuariosController