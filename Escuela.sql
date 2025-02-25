-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 25-02-2025 a las 13:51:08
-- Versión del servidor: 8.0.41-0ubuntu0.20.04.1
-- Versión de PHP: 7.4.3-4ubuntu2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Escuela`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `alumnoID` int NOT NULL,
  `profesorID` int NOT NULL,
  `nombre` text NOT NULL,
  `correo` text NOT NULL,
  `calificacion` double NOT NULL,
  `materia` text NOT NULL,
  `estatus` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`alumnoID`, `profesorID`, `nombre`, `correo`, `calificacion`, `materia`, `estatus`) VALUES
(2, 2, 'alumno02Prueba', 'alumno02Prueba@e-mail.com', 10, 'pruebaMateria01', 'Aprobado'),
(4, 3, 'alumno03Prueba', 'alumno03Prueba@e-mail.com', 4, 'pruebaMateria02', 'Reprobado'),
(6, 1, 'alumno04Prueba', 'alumno04Prueba@e-mail.com', 3, 'pruebaMateria01', 'Reprobado'),
(7, 2, 'alumno05Prueba', 'alumno0yPrueba@e-mail.com', 8, 'materia03Prueba', 'Aprobado'),
(8, 3, 'alumno06Prueba', 'alumno0zPrueba@e-mail.com', 3, 'pruebaMateria02', 'Reprobado'),
(9, 1, 'Alumno10', 'alumno10@email.com', 9, 'pruebaMateria', 'Aprobado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores`
--

CREATE TABLE `profesores` (
  `profesorID` int NOT NULL,
  `nombre` text NOT NULL,
  `telefono` text NOT NULL,
  `correo` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `profesores`
--

INSERT INTO `profesores` (`profesorID`, `nombre`, `telefono`, `correo`, `password`) VALUES
(1, 'profesor01Prueba', '321-432-1234', 'profesor01Prueba@e-mail.com', '123'),
(2, 'profesor02Prueba', '123-456-7890', 'profesor02Prueba@e-mail.com', '123'),
(3, 'alumno02Prueba', '321-432-1234', 'baruc.cisneros99@gmail.com', '1234556'),
(4, 'profesor0100Pruebita', '321-432-1234', 'profesor0100Prueba@e-mail.com', '123456');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`alumnoID`),
  ADD KEY `profesorID` (`profesorID`);

--
-- Indices de la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD PRIMARY KEY (`profesorID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `alumnoID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `profesores`
--
ALTER TABLE `profesores`
  MODIFY `profesorID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD CONSTRAINT `alumnos_ibfk_1` FOREIGN KEY (`profesorID`) REFERENCES `profesores` (`profesorID`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
