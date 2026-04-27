global.mongoose = require("mongoose")
global.config = require("../../config.js").config
const productosController = require("./productosController")
const productosModel = require("../modelos/productosModel.js").productosModel


//======GUARDAR=========

describe("POST: /productos/Guardar", () => {
    let request;
    let response;

    beforeAll((done) => {
        mongoose.connect(config.bd.atlas + "/" + config.bd.test).then((respuesta) => {
            console.log("Conectado a Mongo Correctamente")
            done()
        }).catch((error) => {
            console.log(error)
        })
    })

    beforeEach(() => {
        request = {body: {}, params: {}}
        response = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
    })

    test("Debe fallar cuando el codigo no este presente", (done) => {
        request.body.codigo = ""
        productosController.Guardar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo codigo es obligatorio"})
        done()
    })

    test("Debe fallar cuando el nombre no este presente", (done) => {
        request.body.codigo = "P001"
        productosController.Guardar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo nombre es obligatorio"})
        done()
    })

    test("Debe fallar cuando el nombre este vacio", (done) => {
        request.body.codigo = "P001"
        request.body.nombre = ""
        productosController.Guardar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo nombre es obligatorio"})
        done()
    })

    test("Debe fallar cuando la cantidad no este presente", (done) => {
        request.body.codigo = "P001"
        request.body.nombre = "Producto Test"
        productosController.Guardar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo cantidad es obligatorio"})
        done()
    })

    test("Debe fallar cuando el precio no este presente", (done) => {
        request.body.codigo = "P001"
        request.body.nombre = "Producto Test"
        request.body.cantidad = 10
        productosController.Guardar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo precio es obligatorio"})
        done()
    })

    test("Debe fallar cuando el estado no este presente", (done) => {
        request.body.codigo = "P001"
        request.body.nombre = "Producto Test"
        request.body.cantidad = 10
        request.body.precio = 5000
        productosController.Guardar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo estado es obligatorio"})
        done()
    })

    test("Debe guardar el producto correctamente", (done) => {
        request.body.codigo = "P001"
        request.body.nombre = "Producto Test"
        request.body.cantidad = 10
        request.body.precio = 5000
        request.body.descripcion = "Descripcion test"
        request.body.estado = "activo"

        productosModel.Mymodel.deleteOne({codigo: "P001"}).then((respuesta) => {
            productosController.Guardar(request, response)
        })

        response.json = jest.fn((data) => {
            expect(data).toEqual({state: true, mensaje: "Producto almacenado Correctamente"})
            done()
        })
    })

    test("Debe fallar si el codigo esta duplicado", (done) => {
        request.body.codigo = "P001"
        request.body.nombre = "Producto Test"
        request.body.cantidad = 10
        request.body.precio = 5000
        request.body.descripcion = "Descripcion test"
        request.body.estado = "activo"

        productosController.Guardar(request, response)

        response.json = jest.fn((data) => {
            expect(data).toEqual({state: false, mensaje: "El codigo ya existe intente con otro"})
            done()
        })
    })

    afterAll(() => {
        productosModel.Mymodel.deleteOne({codigo: "P001"}).then()
    })

})


//======ACTUALIZAR=========

describe("PUT: /productos/Actualizar", () => {
    let request;
    let response;

    beforeAll((done) => {
        mongoose.connect(config.bd.atlas + "/" + config.bd.test).then((respuesta) => {
            console.log("Conectado a Mongo Correctamente")
            done()
        }).catch((error) => {
            console.log(error)
        })
    })

    beforeEach(() => {
        request = {body: {}, params: {}}
        response = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
    })

    test("Debe fallar cuando el id no este presente", (done) => {
        productosController.Actualizar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo _id es obligatorio"})
        done()
    })

    test("Debe fallar cuando el id no sea de 24 caracteres", (done) => {
        request.body._id = "1"
        productosController.Actualizar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo _id debe ser de 24 caracteres"})
        done()
    })

    test("Debe fallar cuando el nombre no este presente", (done) => {
        request.body._id = "111111111111111111111111"
        request.body.nombre = ""
        productosController.Actualizar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo nombre es obligatorio"})
        done()
    })

    test("Debe fallar cuando la cantidad no este presente", (done) => {
        request.body._id = "111111111111111111111111"
        request.body.nombre = "Producto Test"
        productosController.Actualizar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo cantidad es obligatorio"})
        done()
    })

    test("Debe fallar cuando el precio no este presente", (done) => {
        request.body._id = "111111111111111111111111"
        request.body.nombre = "Producto Test"
        request.body.cantidad = 10
        productosController.Actualizar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo precio es obligatorio"})
        done()
    })

    test("Debe fallar cuando el estado no este presente", (done) => {
        request.body._id = "111111111111111111111111"
        request.body.nombre = "Producto Test"
        request.body.cantidad = 10
        request.body.precio = 5000
        request.body.estado = ""
        productosController.Actualizar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo estado es obligatorio"})
        done()
    })

    test("Debe guardar el producto correctamente para luego actualizar", (done) => {
        request.body.codigo = "P001"
        request.body.nombre = "Producto Test"
        request.body.cantidad = 10
        request.body.precio = 5000
        request.body.descripcion = "Descripcion test"
        request.body.estado = "activo"

        productosModel.Mymodel.deleteOne({codigo: "P001"}).then((respuesta) => {
            productosController.Guardar(request, response)
        })

        response.json = jest.fn((data) => {
            expect(data).toEqual({state: true, mensaje: "Producto almacenado Correctamente"})
            done()
        })
    })

    test("Debe actualizar los datos del producto", (done) => {
        request.body._id = ""
        request.body.nombre = "Producto Actualizado"
        request.body.cantidad = 20
        request.body.precio = 8000
        request.body.descripcion = "Descripcion actualizada"
        request.body.estado = "activo"

        productosModel.Mymodel.find({codigo: "P001"}).then((respuesta) => {
            request.body._id = respuesta[0]._id.toString()
            productosController.Actualizar(request, response)
        })

        response.json = jest.fn((data) => {
            expect(data).toEqual({state: true, mensaje: "Registro Actualizado"})
            done()
        })
    })

    afterAll(() => {
        productosModel.Mymodel.deleteOne({codigo: "P001"}).then()
    })

})


//======ELIMINAR=========

describe("DELETE: /productos/Eliminar", () => {
    let request;
    let response;

    beforeAll((done) => {
        mongoose.connect(config.bd.atlas + "/" + config.bd.test).then((respuesta) => {
            console.log("Conectado a Mongo Correctamente")
            done()
        }).catch((error) => {
            console.log(error)
        })
    })

    beforeEach(() => {
        request = {body: {}, params: {}}
        response = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
    })

    test("Debe fallar cuando el id no este presente", (done) => {
        productosController.Eliminar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo _id es obligatorio"})
        done()
    })

    test("Debe fallar cuando el id no sea de 24 caracteres", (done) => {
        request.body._id = "1"
        productosController.Eliminar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo _id debe ser de 24 caracteres"})
        done()
    })

    test("Debe fallar cuando el id no este en la base de datos", (done) => {
        request.body._id = "111111111111111111111111"

        productosController.Eliminar(request, response)

        response.json = jest.fn((data) => {
            expect(data).toEqual({state: false, mensaje: "El _id no existe en la base de datos, no se puede eliminar"})
            done()
        })
    })

    test("Debe guardar el producto correctamente para luego eliminar", (done) => {
        request.body.codigo = "P001"
        request.body.nombre = "Producto Test"
        request.body.cantidad = 10
        request.body.precio = 5000
        request.body.descripcion = "Descripcion test"
        request.body.estado = "activo"

        productosModel.Mymodel.deleteOne({codigo: "P001"}).then((respuesta) => {
            productosController.Guardar(request, response)
        })

        response.json = jest.fn((data) => {
            expect(data).toEqual({state: true, mensaje: "Producto almacenado Correctamente"})
            done()
        })
    })

    test("Debe eliminar el producto correctamente", (done) => {
        request.body._id = ""

        productosModel.Mymodel.find({codigo: "P001"}).then((respuesta) => {
            request.body._id = respuesta[0]._id.toString()
            productosController.Eliminar(request, response)
        })

        response.json = jest.fn((data) => {
            expect(data).toEqual({state: true, mensaje: "Registro Eliminado"})
            done()
        })
    })

    afterAll(() => {
        productosModel.Mymodel.deleteOne({codigo: "P001"}).then()
    })

})


//======LISTAR TODOS=========

describe("GET: /productos/ListarTodos", () => {
    let request;
    let response;

    beforeAll((done) => {
        mongoose.connect(config.bd.atlas + "/" + config.bd.test).then((respuesta) => {
            console.log("Conectado a Mongo Correctamente")
            done()
        }).catch((error) => {
            console.log(error)
        })
    })

    beforeEach(() => {
        request = {body: {}, params: {}}
        response = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
    })

    test("Debe guardar el producto correctamente para luego listar", (done) => {
        request.body.codigo = "P001"
        request.body.nombre = "Producto Test"
        request.body.cantidad = 10
        request.body.precio = 5000
        request.body.descripcion = "Descripcion test"
        request.body.estado = "activo"

        productosModel.Mymodel.deleteOne({codigo: "P001"}).then((respuesta) => {
            productosController.Guardar(request, response)
        })

        response.json = jest.fn((data) => {
            expect(data).toEqual({state: true, mensaje: "Producto almacenado Correctamente"})
            done()
        })
    })

    test("Debe listar al menos un registro", (done) => {
        productosController.ListarTodos(request, response)

        response.json = jest.fn((data) => {
            expect(data.data.length).toBeGreaterThanOrEqual(1)
            done()
        })
    })

    afterAll(() => {
        productosModel.Mymodel.deleteOne({codigo: "P001"}).then()
    })

})


//======LISTAR POR ID=========

describe("GET: /productos/ListarId/:_id", () => {
    let request;
    let response;

    beforeAll((done) => {
        mongoose.connect(config.bd.atlas + "/" + config.bd.test).then((respuesta) => {
            console.log("Conectado a Mongo Correctamente")
            done()
        }).catch((error) => {
            console.log(error)
        })
    })

    beforeEach(() => {
        request = {body: {}, params: {}}
        response = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
    })

    test("Debe fallar cuando el id no este presente", (done) => {
        productosController.ListarId(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo _id es obligatorio"})
        done()
    })

    test("Debe fallar cuando el id no sea de 24 caracteres", (done) => {
        request.body._id = "1"
        productosController.ListarId(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo _id debe ser de 24 caracteres"})
        done()
    })

    test("Debe guardar el producto correctamente para luego listar por id", (done) => {
        request.body.codigo = "P001"
        request.body.nombre = "Producto Test"
        request.body.cantidad = 10
        request.body.precio = 5000
        request.body.descripcion = "Descripcion test"
        request.body.estado = "activo"

        productosModel.Mymodel.deleteOne({codigo: "P001"}).then((respuesta) => {
            productosController.Guardar(request, response)
        })

        response.json = jest.fn((data) => {
            expect(data).toEqual({state: true, mensaje: "Producto almacenado Correctamente"})
            done()
        })
    })

    test("Debe listar el producto por id", (done) => {
        request.body._id = ""

        productosModel.Mymodel.find({codigo: "P001"}).then((respuesta) => {
            request.body._id = respuesta[0]._id.toString()
            productosController.ListarId(request, response)
        })

        response.json = jest.fn((data) => {
            var resspuesta = data.data[0]
            expect(resspuesta).toHaveProperty("estado", "activo")
            done()
        })
    })

    afterAll(() => {
        productosModel.Mymodel.deleteOne({codigo: "P001"}).then()
    })

})