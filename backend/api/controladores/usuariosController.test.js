global.mongoose = require("mongoose")
global.config = require("../../config.js").config
const { request } = require("../../app.js")
const usuariosController = require("./usuariosController")
global.sha256 = require("sha256")
const usuariosModel = require("../modelos/usuariosModel.js").usuariosModel
const nodemailer = require("nodemailer")


//======GUARDAR=========

describe("POST: /usuarios/Guardar", () => {
    let request;
    let response;

    beforeAll((done) => {
        if(mongoose.connection.readyState === 0){
        mongoose.connect(config.bd.atlas + "/" + config.bd.test).then((respuesta) => {
            console.log("Conectado a Mongo Correctamente")
            done()
        }).catch((error) => {
            console.log(error)
        })}
    })

    beforeEach(() => {
        request = {body: {}, params: {}}
        response = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
    })

    test("Debe fallar cuando el nombre no este presente", (done) => {
        request.body.nombre = ""
        usuariosController.Guardar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo nombre es obligatorio"})
        done()
    })

    test("Debe fallar cuando el email no este presente", (done) => {
        request.body.nombre = "Natalia"
        usuariosController.Guardar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo email es obligatorio"})
        done()
    })

    test("Debe fallar cuando el email este vacio", (done) => {
        request.body.nombre = "Natalia"
        request.body.email = ""
        usuariosController.Guardar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo email es obligatorio"})
        done()
    })

    test("Debe fallar cuando el password no este presente", (done) => {
        request.body.nombre = "Natalia"
        request.body.email = "natalia@gmail.com"
        request.body.password = ""
        usuariosController.Guardar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo password es obligatorio"})
        done()
    })

    test("Debe fallar cuando el idrol no este presente", (done) => {
        request.body.nombre = "Natalia"
        request.body.email = "natalia@gmail.com"
        request.body.password = "123456"
        request.body.idrol = ""
        usuariosController.Guardar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo idrol es obligatorio"})
        done()
    })

    test("Debe fallar cuando el rol no este presente", (done) => {
        request.body.nombre = "Natalia"
        request.body.email = "natalia@gmail.com"
        request.body.password = "123456"
        request.body.idrol = "1"
        request.body.rol = ""
        usuariosController.Guardar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo rol es obligatorio"})
        done()
    })

    test("Debe guardar el usuario correctamente", (done) => {
        request.body.nombre = "Natalia"
        request.body.email = "natalia@gmail.com"
        request.body.password = "123456"
        request.body.idrol = "1"
        request.body.rol = "Admin"
        request.body.estado = "Activo"

        usuariosModel.Mymodel.deleteOne({email: "natalia@gmail.com"}).then((respuesta) => {
            usuariosController.Guardar(request, response)
        })

        response.json = jest.fn((data) => {
            expect(data).toEqual({state: true, mensaje: "Usuario almacenado Correctamente"})
            done()
        })
    })

    test("Debe fallar si el email esta duplicado", (done) => {
        request.body.nombre = "Natalia"
        request.body.email = "natalia@gmail.com"
        request.body.password = "123456"
        request.body.idrol = "1"
        request.body.rol = "Admin"
        request.body.estado = "Activo"

        usuariosController.Guardar(request, response)

        response.json = jest.fn((data) => {
            expect(data).toEqual({state: false, mensaje: "El correo ya existe intente con otro"})
            done()
        })
    })

    afterAll(() => {
        usuariosModel.Mymodel.deleteOne({email: "natalia@gmail.com"}).then()
    })

})


//======ACTUALIZAR=========

describe("PUT: /usuarios/Actualizar", () => {
    let request;
    let response;

    beforeAll((done) => {
        if(mongoose.connection.readyState === 0){
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
        usuariosController.Actualizar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo _id es obligatorio"})
        done()
    })

    test("Debe fallar cuando el id no sea de 24 caracteres", (done) => {
        request.body._id = "1"
        usuariosController.Actualizar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo _id debe ser de 24 caracteres"})
        done()
    })

    test("Debe fallar cuando el nombre no este presente", (done) => {
        request.body._id = "111111111111111111111111"
        request.body.nombre = ""
        usuariosController.Actualizar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo nombre es obligatorio"})
        done()
    })

    test("Debe fallar cuando el idrol no este presente", (done) => {
        request.body._id = "111111111111111111111111"
        request.body.nombre = "Natalia"
        request.body.idrol = ""
        usuariosController.Actualizar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo idrol es obligatorio"})
        done()
    })

    test("Debe fallar cuando el rol no este presente", (done) => {
        request.body._id = "111111111111111111111111"
        request.body.nombre = "Natalia"
        request.body.idrol = "1"
        request.body.rol = ""
        usuariosController.Actualizar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo rol es obligatorio"})
        done()
    })

    test("Debe fallar cuando el estado no este presente", (done) => {
        request.body._id = "111111111111111111111111"
        request.body.nombre = "Natalia"
        request.body.idrol = "1"
        request.body.rol = "Admin"
        request.body.estado = ""
        usuariosController.Actualizar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo estado es obligatorio"})
        done()
    })

    test("Debe guardar el usuario correctamente para luego actualizar", (done) => {
        request.body.nombre = "Natalia"
        request.body.email = "natalia@gmail.com"
        request.body.password = "123456"
        request.body.idrol = "1"
        request.body.rol = "Admin"
        request.body.estado = "Activo"

        usuariosModel.Mymodel.deleteOne({email: "natalia@gmail.com"}).then((respuesta) => {
            usuariosController.Guardar(request, response)
        })

        response.json = jest.fn((data) => {
            expect(data).toEqual({state: true, mensaje: "Usuario almacenado Correctamente"})
            done()
        })
    })

    test("Debe actualizar los datos del usuario", (done) => {
        request.body._id = ""
        request.body.nombre = "Natalia"
        request.body.idrol = "1"
        request.body.rol = "Admin"
        request.body.estado = "Activo"

        usuariosModel.Mymodel.find({email: "natalia@gmail.com"}).then((respuesta) => {
            request.body._id = respuesta[0]._id.toString()
            usuariosController.Actualizar(request, response)
        })

        response.json = jest.fn((data) => {
            expect(data).toEqual({state: true, mensaje: "Registro Actualizado"})
            done()
        })
    })

    afterAll(() => {
        usuariosModel.Mymodel.deleteOne({email: "natalia@gmail.com"}).then()
    })

})


//======ELIMINAR=========

describe("DELETE: /usuarios/Eliminar", () => {
    let request;
    let response;

    beforeAll((done) => {
        if(mongoose.connection.readyState === 0){
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
        usuariosController.Eliminar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo _id es obligatorio"})
        done()
    })

    test("Debe fallar cuando el id no sea de 24 caracteres", (done) => {
        request.body._id = "1"
        usuariosController.Eliminar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo _id debe ser de 24 caracteres"})
        done()
    })

    test("Debe fallar cuando el id no este en la base de datos", (done) => {
        request.body._id = "111111111111111111111111"

        usuariosController.Eliminar(request, response)

        response.json = jest.fn((data) => {
            expect(data).toEqual({state: false, mensaje: "El _id no existe en la base de datos, no se puede eliminar"})
            done()
        })
    })

    test("Debe guardar el usuario correctamente para luego eliminar", (done) => {
        request.body.nombre = "Natalia"
        request.body.email = "natalia@gmail.com"
        request.body.password = "123456"
        request.body.idrol = "1"
        request.body.rol = "Admin"
        request.body.estado = "Activo"

        usuariosModel.Mymodel.deleteOne({email: "natalia@gmail.com"}).then((respuesta) => {
            usuariosController.Guardar(request, response)
        })

        response.json = jest.fn((data) => {
            expect(data).toEqual({state: true, mensaje: "Usuario almacenado Correctamente"})
            done()
        })
    })

    test("Debe eliminar el usuario correctamente", (done) => {
        request.body._id = ""

        usuariosModel.Mymodel.find({email: "natalia@gmail.com"}).then((respuesta) => {
            request.body._id = respuesta[0]._id.toString()
            usuariosController.Eliminar(request, response)
        })

        response.json = jest.fn((data) => {
            expect(data).toEqual({state: true, mensaje: "Registro Eliminado"})
            done()
        })
    })

    afterAll(() => {
        usuariosModel.Mymodel.deleteOne({email: "natalia@gmail.com"}).then()
    })

})


//======LISTAR TODOS=========

describe("GET: /usuarios/ListarTodos", () => {
    let request;
    let response;

    beforeAll((done) => {
        if(mongoose.connection.readyState === 0){
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

    test("Debe guardar el usuario correctamente para luego listar", (done) => {
        request.body.nombre = "Natalia"
        request.body.email = "natalia@gmail.com"
        request.body.password = "123456"
        request.body.idrol = "1"
        request.body.rol = "Admin"
        request.body.estado = "Activo"

        usuariosModel.Mymodel.deleteOne({email: "natalia@gmail.com"}).then((respuesta) => {
            usuariosController.Guardar(request, response)
        })

        response.json = jest.fn((data) => {
            expect(data).toEqual({state: true, mensaje: "Usuario almacenado Correctamente"})
            done()
        })
    })

    test("Debe listar al menos un registro", (done) => {
        usuariosController.ListarTodos(request, response)

        response.json = jest.fn((data) => {
            expect(data.data.length).toBeGreaterThanOrEqual(1)
            done()
        })
    })

    afterAll(() => {
        usuariosModel.Mymodel.deleteOne({email: "natalia@gmail.com"}).then()
    })

})


//======LISTAR POR ID=========

describe("GET: /usuarios/ListarId/:_id", () => {
    let request;
    let response;

    beforeAll((done) => {
        if(mongoose.connection.readyState === 0){
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
        usuariosController.ListarId(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo _id es obligatorio"})
        done()
    })

    test("Debe fallar cuando el id no sea de 24 caracteres", (done) => {
        request.body._id = "1"
        usuariosController.ListarId(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo _id debe ser de 24 caracteres"})
        done()
    })

    test("Debe guardar el usuario correctamente para luego listar por id", (done) => {
        request.body.nombre = "Natalia"
        request.body.email = "natalia@gmail.com"
        request.body.password = "123456"
        request.body.idrol = "1"
        request.body.rol = "Admin"
        request.body.estado = "Activo"

        usuariosModel.Mymodel.deleteOne({email: "natalia@gmail.com"}).then((respuesta) => {
            usuariosController.Guardar(request, response)
        })

        response.json = jest.fn((data) => {
            expect(data).toEqual({state: true, mensaje: "Usuario almacenado Correctamente"})
            done()
        })
    })

    test("Debe listar el usuario por id", (done) => {
        request.body._id = ""

        usuariosModel.Mymodel.find({email: "natalia@gmail.com"}).then((respuesta) => {
            request.body._id = respuesta[0]._id.toString()
            usuariosController.ListarId(request, response)
        })

        response.json = jest.fn((data) => {
            var resspuesta = data.data[0]
            expect(resspuesta).toHaveProperty("rol", "Admin")
            done()
        })
    })

    afterAll(() => {
        usuariosModel.Mymodel.deleteOne({email: "natalia@gmail.com"}).then()
    })

})


//======REGISTRAR=========

describe("POST: /usuarios/Registrar", () => {
    let request;
    let response;

    beforeAll((done) => {
        if(mongoose.connection.readyState === 0){
        mongoose.connect(config.bd.atlas + "/" + config.bd.test).then((respuesta) => {
            console.log("Conectado a Mongo Correctamente")
            done()
        }).catch((error) => {
            console.log(error)
        })
    })

    beforeEach(() => {
        request = {body: {}, params: {}, session: {}}
        response = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
    })

    test("Debe fallar cuando el nombre no este presente", (done) => {
        usuariosController.Registrar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo nombre es obligatorio"})
        done()
    })

    test("Debe fallar cuando el email no este presente", (done) => {
        request.body.nombre = "Natalia"
        usuariosController.Registrar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo email es obligatorio"})
        done()
    })

    test("Debe fallar cuando el password no este presente", (done) => {
        request.body.nombre = "Natalia"
        request.body.email = "natalia@gmail.com"
        usuariosController.Registrar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo password es obligatorio"})
        done()
    })

    test("Debe registrar el usuario", (done) => {
        request.body.nombre = "Natalia"
        request.body.email = "natalia@gmail.com"
        request.body.password = "123456"

        usuariosModel.Mymodel.deleteOne({email: "natalia@gmail.com"}).then((respuesta) => {
            usuariosController.Registrar(request, response)
        })

        response.json = jest.fn((data) => {
            expect(data).toEqual({state: true, mensaje: "Usuario almacenado Correctamente, verifica tu correo electronico para activar la cuenta"})
            done()
        })
    })

    test("Deberia fallar al registrar el mismo usuario", (done) => {
        request.body.nombre = "Natalia"
        request.body.email = "natalia@gmail.com"
        request.body.password = "123456"

        usuariosController.Registrar(request, response)

        response.json = jest.fn((data) => {
            expect(data).toEqual({state: false, mensaje: "El correo ya existe, intente con otro"})
            done()
        })
    })

    afterAll((done) => {
        usuariosModel.Mymodel.deleteOne({email: "natalia@gmail.com"}).then((respuesta) => {
            done()
        })
    })

})


//======ACTIVAR=========

describe("POST: /usuarios/Activar", () => {
    let request;
    let response;

    beforeAll((done) => {
        if(mongoose.connection.readyState === 0){
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

    test("Debe fallar cuando el email no este presente", (done) => {
        usuariosController.Activar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo email es obligatorio"})
        done()
    })

    test("Debe fallar cuando el codigo no este presente", (done) => {
        request.body.email = "natalia@gmail.com"
        usuariosController.Activar(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo codigo es obligatorio"})
        done()
    })

    test("Debe registrar el usuario para luego activar", (done) => {
        request.body.nombre = "Natalia"
        request.body.email = "natalia@gmail.com"
        request.body.password = "123456"

        usuariosModel.Mymodel.deleteOne({email: "natalia@gmail.com"}).then((respuesta) => {
            usuariosController.Registrar(request, response)
        })

        response.json = jest.fn((data) => {
            expect(data).toEqual({state: true, mensaje: "Usuario almacenado Correctamente, verifica tu correo electronico para activar la cuenta"})
            done()
        })
    })

    test("Debe fallar con un codigo incorrecto", (done) => {
        request.body.email = "natalia@gmail.com"
        request.body.codigo = "123"

        usuariosController.Activar(request, response)

        response.json = jest.fn((data) => {
            expect(data).toEqual({state: false, mensaje: "Codigo de activacion incorrecto"})
            done()
        })
    })

    test("Deberia activar la cuenta correctamente", (done) => {
        request.body.email = "natalia@gmail.com"

        usuariosModel.Mymodel.find({email: "natalia@gmail.com"}).then((respuesta) => {
            request.body.codigo = respuesta[0].codigoact
            usuariosController.Activar(request, response)
        })

        response.json = jest.fn((data) => {
            expect(data).toEqual({state: true, mensaje: "Cuenta activada correctamente, dirigete al login"})
            done()
        })
    })

    afterAll((done) => {
        usuariosModel.Mymodel.deleteOne({email: "natalia@gmail.com"}).then((respuesta) => {
            done()
        })
    })

})


//======LOGIN=========

describe("POST: /usuarios/Login", () => {
    let request;
    let response;

    beforeAll((done) => {
        if(mongoose.connection.readyState === 0){
        mongoose.connect(config.bd.atlas + "/" + config.bd.test).then((respuesta) => {
            console.log("Conectado a Mongo Correctamente")
            done()
        }).catch((error) => {
            console.log(error)
        })
    })

    beforeEach(() => {
        request = {body: {}, params: {}, session: {}}
        response = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
    })

    test("Debe fallar cuando el email no este presente", (done) => {
        request.body.email = ""
        usuariosController.Login(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo email es obligatorio"})
        done()
    })

    test("Debe fallar cuando el password no este presente", (done) => {
        request.body.email = "natalia@gmail.com"
        request.body.password = ""
        usuariosController.Login(request, response)
        expect(response.json).toHaveBeenCalledWith({state: false, mensaje: "El campo password es obligatorio"})
        done()
    })

    test("Debe registrar el usuario para luego hacer login", (done) => {
        request.body.nombre = "Natalia"
        request.body.email = "natalia@gmail.com"
        request.body.password = "123456"

        usuariosModel.Mymodel.deleteOne({email: "natalia@gmail.com"}).then((respuesta) => {
            usuariosController.Registrar(request, response)
        })

        response.json = jest.fn((data) => {
            expect(data).toEqual({state: true, mensaje: "Usuario almacenado Correctamente, verifica tu correo electronico para activar la cuenta"})
            done()
        })
    })

    test("Debe fallar cuando el email o password sean incorrectos", (done) => {
        request.body.email = "natalia@gmail.com"
        request.body.password = "11111"

        usuariosController.Login(request, response)

        response.json = jest.fn((data) => {
            expect(data).toEqual({state: false, mensaje: "Email o password incorrectos"})
            done()
        })
    })

    test("Debe fallar cuando el usuario no esta activo", (done) => {
        request.body.email = "natalia@gmail.com"
        request.body.password = "123456"

        usuariosController.Login(request, response)

        response.json = jest.fn((data) => {
            expect(data).toEqual({state: false, mensaje: "Tu cuenta no ha sido verificada, revisa tu email"})
            done()
        })
    })

    test("Debe hacer login correctamente", (done) => {
        request.body.email = "natalia@gmail.com"
        request.body.password = "123456"

        usuariosModel.Mymodel.find({email: "natalia@gmail.com"}, {nombre: 1, email: 1}).then((datos) => {
            usuariosModel.Mymodel.findOneAndUpdate({email: "natalia@gmail.com"}, {estado: "Activo"}).then((respuesta) => {
                usuariosController.Login(request, response)
            })

            response.json = jest.fn((data) => {
                expect(data).toEqual({state: true, mensaje: "Bienvenido " + datos[0].nombre, nombre: datos[0].nombre, email: datos[0].email})
                done()
            })
        })
    })

    afterAll((done) => {
        usuariosModel.Mymodel.deleteOne({email: "natalia@gmail.com"}).then((respuesta) => {
            done()
        })
    })

})