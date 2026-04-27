module.exports = function (req, res, next) {

  if (!req.session.usuario) {
    return res.status(401).json({
      state: false,
      mensaje: "No autorizado"
    });
  }

  next();
};
