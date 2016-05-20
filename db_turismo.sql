CREATE DATABASE `db_turismo`;

USE `db_turismo`;

/*Crear table usuario*/
DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `idUsuario` INT(10) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(128) DEFAULT NULL,
  `telefono` VARCHAR(128) DEFAULT NULL,
  `correo` VARCHAR(128) DEFAULT NULL,
  `nick` VARCHAR(128) DEFAULT NULL,
  `password` VARCHAR(128) DEFAULT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=INNODB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*datos para la tabla usuario*/
INSERT  INTO `usuario`(`idUsuario`,`nombre`,`telefono`,`correo`,`nick`,`password`) VALUES 

(1,'usuario1','12133434','u1@gmail.com','u1','202cb962ac59075b964b07152d234b70'),

(2,'usuario2','12123232','u2@gmail.com','u2','202cb962ac59075b964b07152d234b70');



/*Crear tabla departamento*/
DROP TABLE IF EXISTS `departamento`;

CREATE TABLE `departamento` (
  `idDepartamento` INT(10) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(128) DEFAULT NULL,
  PRIMARY KEY (`idDepartamento`)
) ENGINE=INNODB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

/*Datos para la tabla departamento */
INSERT  INTO `departamento`(`idDepartamento`,`nombre`) VALUES 

(1,'Quiché'),
(2,'Guatemala'),
(3,'Quetzaltenango'),
(4,'El Progreso'),
(5,'Totonicapán'),
(6,'Izabal'),
(7,'Sacatepéquez');



/*Crear tabla municipio */
DROP TABLE IF EXISTS `municipio`;

CREATE TABLE `municipio` (
  `idMunicipio` INT(10) NOT NULL AUTO_INCREMENT,
  `idDepartamento` INT(10) DEFAULT NULL,
  `nombre` VARCHAR(128) DEFAULT NULL,
  PRIMARY KEY (`idMunicipio`),
  KEY `idDepartamento` (`idDepartamento`),
  CONSTRAINT `municipio_ibfk_1` FOREIGN KEY (`idDepartamento`) REFERENCES `departamento` (`idDepartamento`)
) ENGINE=INNODB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Datos para la tabla municipio*/
INSERT  INTO `municipio`(`idMunicipio`,`nombre`,`idDepartamento`) VALUES 

(1,'municipio1',3),

(2,'municipio2',1);



/*Crear tabla hotel*/
DROP TABLE IF EXISTS `hotel`;

CREATE TABLE `hotel` (
  `idHotel` INT(10) NOT NULL AUTO_INCREMENT,
  `idMunicipio` INT(10) DEFAULT NULL,
  `nombre` VARCHAR(128) DEFAULT NULL,
  `descripcion` VARCHAR(128) DEFAULT NULL,
  `precioNoche` VARCHAR(128) DEFAULT NULL,
  PRIMARY KEY (`idHotel`),
  KEY `idMunicipio` (`idMunicipio`),
  CONSTRAINT `hotel_ibfk_1` FOREIGN KEY (`idMunicipio`) REFERENCES `municipio` (`idMunicipio`)
) ENGINE=INNODB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Datos para la tabla hotel */
INSERT  INTO `hotel`(`idHotel`,`idMunicipio`,`nombre`,`descripcion`,`precioNoche`) VALUES 

(1,1,'La Riviera','Con vista al lago','Q400');



/*Crear table sitioturistico*/
DROP TABLE IF EXISTS `sitioturistico`;

CREATE TABLE `sitioturistico` (
  `idSitioTuristico` INT(10) NOT NULL AUTO_INCREMENT,
  `idMunicipio` INT(10) DEFAULT NULL,
  `nombre` VARCHAR(128) DEFAULT NULL,
  `descripcion` VARCHAR(128) DEFAULT NULL,
  PRIMARY KEY (`idSitioTuristico`),
  KEY `idMunicipio` (`idMunicipio`),
  CONSTRAINT `sitioturistico_ibfk_1` FOREIGN KEY (`idMunicipio`) REFERENCES `municipio` (`idMunicipio`)
) ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*datos para la tabla sitioturistico */
INSERT  INTO `sitioturistico`(`idSitioTuristico`,`idMunicipio`,`nombre`,`descripcion`) VALUES 

(1,2,'Amatitlan','Lago con volcanes a su alrededor');



/*Crear tabla comentario*/=
DROP TABLE IF EXISTS `comentario`;

CREATE TABLE `comentario` (
  `idComentario` INT(10) NOT NULL AUTO_INCREMENT,
  `idUsuario` INT(10) NOT NULL,
  `idSitioTuristico` INT(10) NOT NULL,
  `comentario` VARCHAR(128) DEFAULT NULL,
  PRIMARY KEY (`idComentario`),
  KEY `idUsuario` (`idUsuario`),
  KEY `idSitioTuristico` (`idSitioTuristico`),
  CONSTRAINT `comentario_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`),
  CONSTRAINT `comentario_ibfk_2` FOREIGN KEY (`idSitioTuristico`) REFERENCES `sitioturistico` (`idSitioTuristico`)
) ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Datos para la tabla comentario */
INSERT  INTO `comentario`(`idComentario`,`idUsuario`,`idSitioTuristico`,`comentario`) VALUES 

(1,1,1,'Amatitlan es un gran lago, con hermosas vistas.');




/*Procedimiento almacenado registroUsuario*/
DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_registroUsuario`(IN _nombre VARCHAR(128), IN _telefono VARCHAR(128), IN _correo VARCHAR(128), IN _nick VARCHAR(128), IN _password VARCHAR(128))
    BEGIN
	INSERT INTO usuario VALUES(NULL, _nombre, _telefono, _correo, _nick, MD5(_password));
    END$$

DELIMITER ;




/*Procedimiento almacenado autenticarUsuario */
DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_autenticarUsuario`(IN _nick VARCHAR(128), IN _contrasena VARCHAR(128))
    BEGIN
	SELECT nombre, telefono, correo, nick FROM usuario WHERE usuario.`nick`=_nick AND usuario.`password`=MD5(_contrasena);
    END$$

DELIMITER ;




/*Procedimiento almacenado listarUsuario*/
DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_listarUsuarios`()
    
    BEGIN
	SELECT usua.nombre AS nombre, usua.telefono AS telefono, usua.correo AS correo, usua.nick AS nick
	FROM usuario AS usua;
    END$$

DELIMITER ;



/*Procedimiento almacenadolistarComentarios  */
DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_listarComentarios`()
BEGIN
	SELECT com.comentario AS Comentario, usua.nombre AS Usuario,  sit.nombre AS SitioTuristico
	FROM comentario AS com 
	INNER JOIN usuario AS usua
	ON com.idUsuario = usua.idUsuario
	INNER JOIN sitioturistico AS sit
	ON com.idSitioTuristico = sit.idSitioTuristico;
    END $$
DELIMITER ;



/*Procedimiento almacenado listarHoteles*/
DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_listarHoteles`()

BEGIN
	SELECT  mun.nombre AS municipio, hot.nombre AS nombre, hot.descripcion AS descripcion, hot.precioNoche AS precioNoche
	FROM hotel AS hot
	INNER JOIN municipio AS mun
	ON mun.idMunicipio = hot.idMunicipio
	INNER JOIN departamento AS dep
	ON mun.idDepartamento = dep.idDepartamento;
    END $$
DELIMITER ;



/*Procedimiento almacenado listarMunicipio*/
DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_listarMunicipio`()
BEGIN
	SELECT mun.nombre AS Municipio, dep.nombre AS Departamento 
	FROM municipio AS mun
	INNER JOIN departamento AS dep
	ON mun.idDepartamento = dep.idDepartamento;
    END $$
DELIMITER ;




/*Procedimiento almacenado listarSitiosTuristico  */
DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_listarSitioTuristico`()
BEGIN
	SELECT s.nombre AS Nombre, s.descripcion AS Descripción, m.nombre AS Municipio, d.nombre AS Departamento
	FROM sitioturistico AS s 
	INNER JOIN municipio AS m
	ON s.idMunicipio = m.idMunicipio
	INNER JOIN departamento AS d
	ON m.idDepartamento = d.idDepartamento;
    END $$
DELIMITER ;





/*CALL sp_autenticarUsuario('u1','123');
CALL sp_registroUsuario('eduardo','12321123','ed@gmail.com','ed1','123');
CALL sp_listarUsuarios();
CALL sp_listarComentarios();
CALL sp_listarHoteles();
CALL sp_listarMunicipio();
CALL sp_listarSitioTuristico();*/