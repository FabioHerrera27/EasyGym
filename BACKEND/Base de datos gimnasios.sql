
DROP DATABASE IF EXISTS GimnasioBD;
CREATE DATABASE GimnasioBD;
USE GimnasioBD;

drop table if exists Rol; 
CREATE TABLE Rol (
    IDRol       INT AUTO_INCREMENT PRIMARY KEY,
    NombreRol   VARCHAR(40)  NOT NULL UNIQUE
);
 
INSERT INTO Rol (NombreRol) VALUES
('Administrador'),
('Miembro');
 
 
drop table if exists Usuario; 
CREATE TABLE Usuario (
    IDUsuario       INT AUTO_INCREMENT PRIMARY KEY,
    IDRol           INT          NOT NULL,
    Nombre          VARCHAR(40)  NOT NULL,
    ApellidoPaterno VARCHAR(40)  NOT NULL,
    ApellidoMaterno VARCHAR(40),
    Telefono        VARCHAR(15),
    Correo          VARCHAR(80)  NOT NULL UNIQUE,
    Contrasena      VARCHAR(255) NOT NULL,
    Foto            LONGBLOB,
    Estatus         ENUM('Activo','Inactivo') NOT NULL DEFAULT 'Activo',
    FechaRegistro   DATETIME DEFAULT CURRENT_TIMESTAMP,
 
    FOREIGN KEY (IDRol) REFERENCES Rol(IDRol)
);
 
INSERT INTO Usuario (IDRol, Nombre, ApellidoPaterno, ApellidoMaterno, Telefono, Correo, Contrasena, Estatus) VALUES
(1, 'Santiago',  'Garcia', 'herrera',     '9981111111', 'admin1@gym.com', 'hash_admin1', 'Activo'),
(2, 'Luis',     'Martinez',  'Perez',  '9983456789', 'luis@gym.com',   'hash_luis',   'Activo'),
(2, 'Romina',      'Lopez',   'Camara',   '9984567890', 'ana@gym.com',    'hash_ana',    'Inactivo'),
(2, 'Diego',    'Villa',   'Vera', '9985678901', 'diego@gym.com',  'hash_diego',  'Activo');
 
drop table if exists Miembro; 
CREATE TABLE Miembro (
    IDMiembro  INT AUTO_INCREMENT PRIMARY KEY,
    IDUsuario       INT NOT NULL UNIQUE,
    FechaNacimiento DATE,
    CondicionMedica VARCHAR(150),
 
    FOREIGN KEY (IDUsuario) REFERENCES Usuario(IDUsuario)
        ON DELETE CASCADE
);
 
INSERT INTO Miembro (IDUsuario, FechaNacimiento, CondicionMedica) VALUES
(2, '1998-05-12', 'Ninguna'),
(3, '2000-03-22', 'Asma leve'),
(4, '1995-11-10', 'Lesion rodilla');
 
drop table if exists Membresia; 
CREATE TABLE Membresia (
    IDMembresia   INT AUTO_INCREMENT PRIMARY KEY,
    TipoMembresia ENUM('Basica','Estandar','Premium') NOT NULL
);
 
INSERT INTO Membresia (TipoMembresia) VALUES
('Basica'),
('Estandar'),
('Premium');
 



CREATE TABLE HistorialPrecio (
    IDHistorial   INT           AUTO_INCREMENT PRIMARY KEY,
    IDMembresia   INT           NOT NULL,
    Precio        DECIMAL(10,2) NOT NULL,
    DuracionMeses INT           NOT NULL,
    FechaVigencia DATE          NOT NULL,
 
    FOREIGN KEY (IDMembresia) REFERENCES Membresia(IDMembresia)
);
 
INSERT INTO HistorialPrecio (IDMembresia, Precio, DuracionMeses, FechaVigencia) VALUES
(1,  500.00,  1, '2025-01-01'),
(2,  800.00,  1, '2025-01-01'),
(3,12000.00, 12, '2025-01-01');
 
 

CREATE TABLE ContratoMembresia (
    IDContrato        INT  AUTO_INCREMENT PRIMARY KEY,
    IDUsuario         INT  NOT NULL,
    IDMembresia       INT  NOT NULL,
    IDHistorialPrecio INT  NOT NULL,
    NumeroPagos       INT  NOT NULL DEFAULT 1,
    FechaInicio       DATE NOT NULL,
    FechaFin          DATE NOT NULL,
    Estatus           ENUM('Activo','Vencido','Cancelado') DEFAULT 'Activo',

    FOREIGN KEY (IDUsuario)         REFERENCES Usuario(IDUsuario),
    FOREIGN KEY (IDMembresia)       REFERENCES Membresia(IDMembresia),
    FOREIGN KEY (IDHistorialPrecio) REFERENCES HistorialPrecio(IDHistorial)
);
 
INSERT INTO ContratoMembresia
    (IDUsuario, IDMembresia, IDHistorialPrecio, NumeroPagos, FechaInicio, FechaFin, Estatus)
VALUES
-- Carlos: Basica 1 mes, 1 pago
(2, 1, 1, 1, '2026-03-01', '2026-04-01', 'Activo'),

-- Fernanda: Estandar 6 meses, 1 sola exhibicion
(3, 2, 2, 1, '2026-03-01', '2026-09-01', 'Activo'),

-- Luis: Premium 6 meses, 6 cuotas
(4, 3, 3, 6, '2026-03-01', '2026-09-01', 'Activo');
 
 
CREATE TABLE Pago (
    IDPago          INT           AUTO_INCREMENT PRIMARY KEY,
    IDContrato      INT           NOT NULL,
    FechaProgramada DATE          NOT NULL,
    FechaPago       DATETIME,
    Monto           DECIMAL(10,2) NOT NULL,
    NumeroPago      INT           NOT NULL DEFAULT 1,
    MetodoPago      VARCHAR(30),
    Estatus         ENUM('Pendiente','Pagado','Rechazado') DEFAULT 'Pendiente',
    Referencia      VARCHAR(100),
    Comprobante     VARCHAR(255),
 
    FOREIGN KEY (IDContrato) REFERENCES ContratoMembresia(IDContrato)
);
 



CREATE TABLE AccesoGym (
    IDAcceso         INT      AUTO_INCREMENT PRIMARY KEY,
    IDUsuario        INT      NOT NULL,
    FechaHoraEntrada DATETIME NOT NULL,
    FechaHoraSalida  DATETIME,
    Estatus          ENUM('Dentro','Fuera') DEFAULT 'Dentro',
 
    FOREIGN KEY (IDUsuario) REFERENCES Usuario(IDUsuario)
);
 
INSERT INTO AccesoGym (IDUsuario, FechaHoraEntrada, FechaHoraSalida, Estatus) VALUES
(2, '2026-03-10 07:00:00', '2026-03-10 08:30:00', 'Fuera'),
(3, '2026-03-10 09:00:00', '2026-03-10 10:15:00', 'Fuera'),
(4, '2026-03-10 18:00:00', NULL,                  'Dentro');
