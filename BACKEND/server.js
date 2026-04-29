// 1. IMPORTAR DEPENDENCIAS NECESARIAS

import express from 'express'
import mysql from 'mysql2'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const port = 3000
const app = express()

app.use(express.json())

// PERMITE QUE EL FRONTEND PUEDA CONSUMIR EL BACKEND
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204)
  }

  return next()
})

// ESTABLECER LOS PARAMETROS DE CONEXION A LA BD
const bd = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'NuevaClave123!',
  database: 'GimnasioBD',
})

// ESTABLECER CONEXION A LA BD
bd.connect((error) => {
  if (error) {
    console.log('Error al conectarse a la base de datos: ' + error.stack)
    return
  }

  console.log('Conectado a MySQL')
})

/**
 * @swagger
 * tags:
 *   - name: Sistema
 *     description: Rutas generales del backend
 *   - name: Roles
 *     description: Gestion de roles del sistema
 *   - name: Usuarios
 *     description: Gestion de usuarios del gimnasio
 *   - name: Miembros
 *     description: Gestion de miembros del gimnasio
 *   - name: Membresias
 *     description: Gestion de membresias y precios
 *   - name: Contratos
 *     description: Gestion de contratos de membresia
 *   - name: Pagos
 *     description: Gestion de pagos
 *   - name: Accesos
 *     description: Registro de accesos al gimnasio
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - IDRol
 *         - Nombre
 *         - ApellidoPaterno
 *         - Correo
 *         - Contrasena
 *       properties:
 *         IDRol:
 *           type: integer
 *           description: Id del rol del usuario
 *         Nombre:
 *           type: string
 *           description: Nombre del usuario
 *         ApellidoPaterno:
 *           type: string
 *           description: Apellido paterno del usuario
 *         ApellidoMaterno:
 *           type: string
 *           description: Apellido materno del usuario
 *         Telefono:
 *           type: string
 *           description: Telefono del usuario
 *         Correo:
 *           type: string
 *           description: Correo del usuario
 *         Contrasena:
 *           type: string
 *           description: Contrasena o hash de la contrasena
 *         Estatus:
 *           type: string
 *           description: Estatus del usuario
 *       example:
 *         IDRol: 2
 *         Nombre: Luis
 *         ApellidoPaterno: Martinez
 *         ApellidoMaterno: Perez
 *         Telefono: "9983456789"
 *         Correo: luis@gym.com
 *         Contrasena: hash_luis
 *         Estatus: Activo
 *     Pago:
 *       type: object
 *       required:
 *         - IDContrato
 *         - FechaProgramada
 *         - Monto
 *       properties:
 *         IDContrato:
 *           type: integer
 *         FechaProgramada:
 *           type: string
 *           format: date
 *         FechaPago:
 *           type: string
 *           format: date-time
 *         Monto:
 *           type: number
 *         NumeroPago:
 *           type: integer
 *         MetodoPago:
 *           type: string
 *         Estatus:
 *           type: string
 *         Referencia:
 *           type: string
 *         Comprobante:
 *           type: string
 *       example:
 *         IDContrato: 1
 *         FechaProgramada: "2026-04-01"
 *         FechaPago: "2026-04-01 10:00:00"
 *         Monto: 500
 *         NumeroPago: 1
 *         MetodoPago: Tarjeta
 *         Estatus: Pagado
 *         Referencia: REF-001
 *         Comprobante: comprobante.jpg
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Bienvenida del servidor
 *     tags: [Sistema]
 *     responses:
 *       200:
 *         description: Mensaje de bienvenida
 */
app.get('/', (req, res) => {
  res.send('Bienvenido al backend de EasyGym')
})

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Lista de roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Lista de roles correcta
 *       500:
 *         description: Error de base de datos
 */
app.get('/roles', (req, res) => {
  bd.query('SELECT * FROM Rol', (error, results) => {
    if (error) {
      res.status(500).send('Error al consultar roles')
      return
    }

    res.json(results)
  })
})

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista de usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios correcta
 *       500:
 *         description: Error de base de datos
 */
app.get('/usuarios', (req, res) => {
  bd.query(
    `SELECT
      IDUsuario,
      IDRol,
      Nombre,
      ApellidoPaterno,
      ApellidoMaterno,
      Telefono,
      Correo,
      Estatus,
      FechaRegistro
    FROM Usuario`,
    (error, results) => {
      if (error) {
        res.status(500).send('Error al consultar usuarios')
        return
      }

      res.json(results)
    },
  )
})

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Detalle de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Id del usuario a buscar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
app.get('/usuarios/:id', (req, res) => {
  const idUsuario = req.params.id

  bd.query(
    `SELECT
      IDUsuario,
      IDRol,
      Nombre,
      ApellidoPaterno,
      ApellidoMaterno,
      Telefono,
      Correo,
      Estatus,
      FechaRegistro
    FROM Usuario
    WHERE IDUsuario = ?`,
    [idUsuario],
    (error, results) => {
      if (error) {
        res.status(500).send('Error al consultar usuario')
        return
      }

      if (results.length === 0) {
        res.status(404).send('Usuario no encontrado')
        return
      }

      res.json(results[0])
    },
  )
})

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crear usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Datos incompletos
 */
app.post('/usuarios', (req, res) => {
  const {
    IDRol,
    Nombre,
    ApellidoPaterno,
    ApellidoMaterno,
    Telefono,
    Correo,
    Contrasena,
    Estatus,
  } = req.body

  if (!IDRol || !Nombre || !ApellidoPaterno || !Correo || !Contrasena) {
    res.status(400).json({ error: 'Todos los campos obligatorios deben completarse' })
    return
  }

  bd.query(
    `INSERT INTO Usuario
      (IDRol, Nombre, ApellidoPaterno, ApellidoMaterno, Telefono, Correo, Contrasena, Estatus)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [IDRol, Nombre, ApellidoPaterno, ApellidoMaterno, Telefono, Correo, Contrasena, Estatus || 'Activo'],
    (error, result) => {
      if (error) {
        res.status(400).send('Error al crear usuario')
        return
      }

      res.status(201).json({ mensaje: 'Usuario creado correctamente', id: result.insertId })
    },
  )
})

/**
 * @swagger
 * /miembros:
 *   get:
 *     summary: Lista de miembros
 *     tags: [Miembros]
 *     responses:
 *       200:
 *         description: Lista de miembros correcta
 *       500:
 *         description: Error de base de datos
 */
app.get('/miembros', (req, res) => {
  bd.query(
    `SELECT
      m.IDMiembro,
      m.IDUsuario,
      u.Nombre,
      u.ApellidoPaterno,
      u.ApellidoMaterno,
      u.Telefono,
      u.Correo,
      m.FechaNacimiento,
      m.CondicionMedica
    FROM Miembro m
    INNER JOIN Usuario u ON u.IDUsuario = m.IDUsuario`,
    (error, results) => {
      if (error) {
        res.status(500).send('Error al consultar miembros')
        return
      }

      res.json(results)
    },
  )
})

/**
 * @swagger
 * /membresias:
 *   get:
 *     summary: Lista de membresias
 *     tags: [Membresias]
 *     responses:
 *       200:
 *         description: Lista de membresias correcta
 *       500:
 *         description: Error de base de datos
 */
app.get('/membresias', (req, res) => {
  bd.query('SELECT * FROM Membresia', (error, results) => {
    if (error) {
      res.status(500).send('Error al consultar membresias')
      return
    }

    res.json(results)
  })
})

/**
 * @swagger
 * /precios:
 *   get:
 *     summary: Lista de historial de precios
 *     tags: [Membresias]
 *     responses:
 *       200:
 *         description: Lista de precios correcta
 *       500:
 *         description: Error de base de datos
 */
app.get('/precios', (req, res) => {
  bd.query(
    `SELECT
      hp.IDHistorial,
      hp.IDMembresia,
      m.TipoMembresia,
      hp.Precio,
      hp.DuracionMeses,
      hp.FechaVigencia
    FROM HistorialPrecio hp
    INNER JOIN Membresia m ON m.IDMembresia = hp.IDMembresia`,
    (error, results) => {
      if (error) {
        res.status(500).send('Error al consultar precios')
        return
      }

      res.json(results)
    },
  )
})

/**
 * @swagger
 * /contratos:
 *   get:
 *     summary: Lista de contratos de membresia
 *     tags: [Contratos]
 *     responses:
 *       200:
 *         description: Lista de contratos correcta
 *       500:
 *         description: Error de base de datos
 */
app.get('/contratos', (req, res) => {
  bd.query(
    `SELECT
      c.IDContrato,
      c.IDUsuario,
      u.Nombre,
      u.ApellidoPaterno,
      c.IDMembresia,
      m.TipoMembresia,
      c.NumeroPagos,
      c.FechaInicio,
      c.FechaFin,
      c.Estatus
    FROM ContratoMembresia c
    INNER JOIN Usuario u ON u.IDUsuario = c.IDUsuario
    INNER JOIN Membresia m ON m.IDMembresia = c.IDMembresia`,
    (error, results) => {
      if (error) {
        res.status(500).send('Error al consultar contratos')
        return
      }

      res.json(results)
    },
  )
})

/**
 * @swagger
 * /pagos:
 *   get:
 *     summary: Lista de pagos
 *     tags: [Pagos]
 *     responses:
 *       200:
 *         description: Lista de pagos correcta
 *       500:
 *         description: Error de base de datos
 *   post:
 *     summary: Crear pago
 *     tags: [Pagos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pago'
 *     responses:
 *       201:
 *         description: Pago creado correctamente
 *       400:
 *         description: Datos incompletos
 */
app.get('/pagos', (req, res) => {
  bd.query('SELECT * FROM Pago', (error, results) => {
    if (error) {
      res.status(500).send('Error al consultar pagos')
      return
    }

    res.json(results)
  })
})

app.post('/pagos', (req, res) => {
  const {
    IDContrato,
    FechaProgramada,
    FechaPago,
    Monto,
    NumeroPago,
    MetodoPago,
    Estatus,
    Referencia,
    Comprobante,
  } = req.body

  if (!IDContrato || !FechaProgramada || !Monto) {
    res.status(400).json({ error: 'Todos los campos obligatorios deben completarse' })
    return
  }

  bd.query(
    `INSERT INTO Pago
      (IDContrato, FechaProgramada, FechaPago, Monto, NumeroPago, MetodoPago, Estatus, Referencia, Comprobante)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [IDContrato, FechaProgramada, FechaPago, Monto, NumeroPago || 1, MetodoPago, Estatus || 'Pendiente', Referencia, Comprobante],
    (error, result) => {
      if (error) {
        res.status(400).send('Error al crear pago')
        return
      }

      res.status(201).json({ mensaje: 'Pago creado correctamente', id: result.insertId })
    },
  )
})

/**
 * @swagger
 * /accesos:
 *   get:
 *     summary: Lista de accesos al gimnasio
 *     tags: [Accesos]
 *     responses:
 *       200:
 *         description: Lista de accesos correcta
 *       500:
 *         description: Error de base de datos
 */
app.get('/accesos', (req, res) => {
  bd.query(
    `SELECT
      a.IDAcceso,
      a.IDUsuario,
      u.Nombre,
      u.ApellidoPaterno,
      a.FechaHoraEntrada,
      a.FechaHoraSalida,
      a.Estatus
    FROM AccesoGym a
    INNER JOIN Usuario u ON u.IDUsuario = a.IDUsuario`,
    (error, results) => {
      if (error) {
        res.status(500).send('Error al consultar accesos')
        return
      }

      res.json(results)
    },
  )
})

// CONFIGURAR SWAGGER
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.1.0',
    info: {
      title: 'Backend de EasyGym',
      version: '1.0.0',
      description: 'Documentacion basica del backend del proyecto EasyGym',
    },
  },
  apis: ['./BACKEND/server.js'],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.listen(port, () => {
  console.log('Servidor desde el puerto ' + port)
  console.log('Documentacion Swagger en http://localhost:' + port + '/api-docs')
})
