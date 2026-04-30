// Importar las dependencias necesarias
import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import mysql from 'mysql2';
import cors from 'cors';

const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());

// Establecer los parámetros de la conexión a la BD (GimnasioBD)
const bd = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Nolose123',
    database: 'GimnasioBD'
});

// Establecer la conexión
bd.connect((error) => {
    if (error) {
        console.log("Error al conectarse a la BD: " + error.stack);
        return;
    }
    console.log("Conectado a GimnasioBD :)");
});


app.get('/usuarios', (req, res) => {
    const query = 'SELECT IDUsuario, Nombre, ApellidoPaterno, Correo, Estatus FROM Usuario';

    bd.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error al consultar la tabla" });
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});