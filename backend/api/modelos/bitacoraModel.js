var mongoose = require("mongoose")

var bitacoraModel = {}

var bitacoraSchema = new mongoose.Schema({
    accion:     { type: String },
    usuario:    { type: String },
    fecha:      { type: Date, default: Date.now }
})

const Mymodel = mongoose.model("bitacora", bitacoraSchema)

bitacoraModel.Mymodel = Mymodel

module.exports.bitacoraModel = bitacoraModel
