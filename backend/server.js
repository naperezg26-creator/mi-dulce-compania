const app = require('./app');
const { config, connectDB } = require('./config');

const PORT = config.PORT;

connectDB();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});