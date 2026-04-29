// 1. IMPORTAR DEPENDENCIAS NECESARIAS 

const express = require('express');

// IMPORTAR SWAGGER
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// IMPORTAR LA DEPENDENCIA DE MYSQL
const mysql = require('mysql2')
const cors = require('cors'); // AGREGAMOS CORS

const port = 3000;
const app = express();
app.use(cors()); // HABILITAMOS CORS
app.use(express.json()); //PERMITE RECIBIR A TRAVES DEL REQUEST OBJETOS JSON
// ESTABLECER LOS PARAMETROS DE CONEXION A LA BD
const bd = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'NuevaClave123!',
    database: 'dreamingFlowers'
})
//ESTABLECER CONEXION A LA BD
bd.connect((error) => {
    if (error) {
        console.log("error al conectarse a la bd" + error.stack)
        return;
    }
    console.log("conectando a mysql")
})
// HTTP: GET, POST, PUT, PATCH, DELETE, SWAGGER dreamingFlowers

app.get('/', (req, res) => {
    res.send("Bienvenido al servidor")
});

app.get("/estudiantes", (req, res) => {
    res.send("lista de estudiantes")
});

app.get("/contacto", (req, res) => {
    res.send("Pagina de Contacto")
})

// CONSULTAR INFORMACION BD
// USANDO RUTAS EN SWAGGER
/**
 * @swagger
 * tags: 
 *      name: Florerias
 *      description: API para de gestion florerias
 */

/**
 * @swagger
 * paths:
 *      /florerias:
 *          get:
 *              summary: Lista de florerias
 *              tags: [Florerias]
 *              responses:
 *                  200:
 *                      description: Lista de florerias correctas
 *                  500: 
 *                      description: Error de base de datos
 */
app.get("/florerias", (req, res) => {
    // UTILIZAMOS LA INSTANCIA DE MYSQL2
    bd.query("SELECT * FROM florerias", (error, results) => {
        if (error) {
            console.log("error al ejecutar la consulta")
            //res.json(error.stack)
            res.status(500).send("Error al ejecutar la consulta")
            return;
        }
        res.json(results)
    })
})

// MOSTRAR EL DETALLE DE UNA FLORERIA EN ESPECIFICO 
/**
 * @swagger
 * /florerias/{id}:
 *  get:
 *      summary: Detalle de una floreria
 *      tags: [Florerias]
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la floreria a buscar
 *            required: true
 *      responses:
 *          200:
 *              description: Muestra el detalle de la floreria
 *          404:
 *              description: Floreria no encontrada en la base de datos
 */
app.get("/florerias/:id", (req, res) => {
    const idfloreria = req.params.id;
    bd.query("SELECT * FROM florerias WHERE idfloreria=?", [idfloreria], (error, results) => {
        if (error) {
            res.status(404).send("Floreria no encontrada");
            return;
        }
        res.json(results)
    })
})

/**
 * @swagger
 * components:
 *   schemas:
 *     Floreria:
 *       type: object
 *       required:
 *         - nombre
 *         - precio
 *         - categoria
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autoincrementable de la floreria
 *         nombre:
 *           type: string
 *           description: Nombre de la floreria
 *         descripcion:
 *           type: string
 *           description: Detalles de la floreria
 *         precio:
 *           type: integer
 *           description: Precio de la floreria
 *         imagen:
 *           type: string
 *           description: Logotipo de la floreria
 *         categoria:
 *           type: integer
 *           description: Categoria de la floreria
 *       example:
 *         nombre: El Girasol
 *         descripcion: Los mejores precios
 *         precio: 123
 *         imagen: foto2.jpg
 *         categoria: 3
 */

/**
 * @swagger
 * /florerias:
 *   post:
 *     summary: Crear floreria
 *     tags: [Florerias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Floreria'
 *     responses:
 *       201:
 *         description: Guarda nueva floreria
 *       400:
 *         description: Datos incompletos
 */
app.post("/forerias", (req, res) => {
    const { nombre, descripcion, precio, imagen, categoria } = req.body;
    if (!nombre || !precio || !categoria) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" })
    }
    bd.query("INSERT INTO florerias(nombre,descripcion,precio,imagen,categoria) VALUES(?,?,?,?,?)",
        [nombre, descripcion, precio, imagen, categoria], (error, result) => {
            if (error) {
                res.status(400).send("error al crear una floreria");
                return;
            }
            res.status(201).send("Floreria creada correctamente")
        });

})
// ELIMINAR FLORERIA
/**
 * @swagger
 * /florerias/{id}:
 *   delete:
 *     summary: Eliminacion de florerias
 *     tags: [Florerias]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Id de la floreria a eliminar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Elimina una floreria
 */
app.delete("/florerias/:id", (req, res) => {
    const idfloreria = parseInt(req.params.id);
    bd.query("DELETE FROM florerias WHERE idfloreria=?", [idfloreria], (error, result) => {
        if (error) {
            res.status(400).send("Error al eliminar la floreria");
            return;
        }
        res.send("Floreria eliminada correctamente")
    })
})

// EDITAR FLORERIA
/**
 * @swagger
 * /florerias/{id}:
 *   put:
 *     summary: Editar floreria
 *     tags: [Florerias]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Id de la floreria
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Floreria'
 *     responses:
 *       200:
 *         description: Floreria actualizada
 *       400:
 *         description: Error al editar una floreria
 */
app.put("/florerias/:id", (req, res) => {
    const idfloreria = parseInt(req.params.id);
    const {nombre, descripcion, precio, imagen, categoria} = req.body;
    bd.query("UPDATE florerias SET nombre=?, descripcion=?, precio=?, imagen=?, categoria=? WHERE idfloreria = ?",
        [nombre, descripcion, precio, imagen, categoria, idfloreria],
        (error, result) => {
            if(error) {
                res.status(400).send("error al editar la floreria");
                return;
            }
            res.send("Floreria editada correctamente")
        }
    )
})

// CONFIGURAR SWAGGER

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.1.0',
        info: {
            title: 'Backend de Dreaming Flowers',
            version: '1.0.0',
            description: 'Backend de la app de dreaming flowers Web'
        },
    },
    apis: ['./*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.listen(port, () => {
    console.log("Servidor desde el puerto " + port)
});
