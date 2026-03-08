const permisosModel = require("../modelos/permisosModel")

const permisosController = {}

permisosController.Guardar = function (request, response) {
  const post = {
    nombre: request.body.nombre,
    email: request.body.email ? request.body.email.toLowerCase() : "",
    password: request.body.password
  }

  if (!post.nombre || post.nombre.trim() === "") {
    return response.json({ state: false, mensaje: "El nombre es obligatorio" })
  }

  if (!post.email || post.email.trim() === "") {
    return response.json({ state: false, mensaje: "El email es obligatorio" })
  }

  if (!post.password || post.password.trim() === "") {
    return response.json({ state: false, mensaje: "El password es obligatorio" })
  }

  permisosModel.BuscarPorEmail(post.email, function (existe) {
    if (existe) {
      return response.json({
        state: false,
        mensaje: "El correo ya existe"
      })
    }

    permisosModel.Guardar(post, function (respuesta) {
      return response.json({
        state: true,
        mensaje: "Usuario guardado correctamente",
        data: respuesta
      })
    })
  })
}

permisosController.Listar = function (req, res) {
  permisosModel.Listar(function (respuesta) {
    return res.json({ state: true, data: respuesta })
  })
}

permisosController.Obtener = function (req, res) {
  const id = req.params.id

  permisosModel.Obtener(id, function (respuesta) {
    return res.json({ state: true, data: respuesta })
  })
}

permisosController.Actualizar = function (req, res) {
  const id = req.params.id
  const datos = req.body

  permisosModel.Actualizar(id, datos, function (respuesta) {
    return res.json({
      state: true,
      mensaje: "Usuario actualizado",
      data: respuesta
    })
  })
}

permisosController.Eliminar = function (req, res) {
  const id = req.params.id

  permisosModel.Eliminar(id, function (respuesta) {
    return res.json({
      state: true,
      mensaje: "Usuario eliminado"
    })
  })
}

module.exports = permisosController
