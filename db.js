// Así quedaría tu código con el formato moderno:
import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import mysql from 'mysql2';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(express.json());

const bd = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Nolose123',
    database: 'GimnasioBD'
});



//establecer conexion a la base de datos
bd.connect((error)=>{
    if(error){
        console.log('Error al conectar a la base de datos: '+ error.stack);
        return;
    }
    console.log('Conexión a la base de datos establecida');
});



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'PantallaLogIn.html'));
});



// Configuración de Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de GimnasioBD',
            version: '1.0.0',
            description: 'Documentación para el proyecto de gestión de gimnasio'
        },
        servers: [{ url: `http://localhost:${port}` }]
    },
    apis: ['./server.js'] 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});