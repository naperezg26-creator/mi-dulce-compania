const jwt = require('jsonwebtoken');
const { config } = require('../config');

module.exports = function (req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ state: false, mensaje: 'No autorizado - Token requerido' });
    }

    try {
        const token = authHeader.startsWith('Bearer ')
            ? authHeader.slice(7)
            : authHeader;

        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ state: false, mensaje: 'Token inválido o expirado' });
    }
};
