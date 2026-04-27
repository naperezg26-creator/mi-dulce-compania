var config = {}

config.puerto = 3000

config.secret = "f87ds8a7f8sda76g7865gfd7g5afg58ggfds456456gf8$&/(jnkdfjfo8dsaf98a7f8f7dsaf765f4f67"

config.bd = {}
config.bd.ip = "127.0.0.1"
config.bd.puerto = "27017"
config.bd.nombre = "Proyecto"
config.bd.atlas = "mongodb+srv://User-N:TEST1234@cluster0.8tx0mgk.mongodb.net"
config.bd.test = "ProyectoTest"

config.email = {}
config.email.host = "smtp.gmail.com"
config.email.port = 587
config.email.user = "pruebasprogramacion123@gmail.com"
config.email.pass = "zeglztihqxmxuttu"

config.nombreempresa = "Mi dulce compania"
config.dominio = "http://localhost:4200"

config.cookie = {}
config.cookie.expiracion = (60000 * 5)
config.cookie.name = "CookieApp"

config.listablanca = [
    'http://localhost:3000',
    'http://127.0.0.1:5500',
    'http://localhost:4200'
]

module.exports.config = config