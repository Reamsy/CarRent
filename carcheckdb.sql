-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Feb 22. 23:41
-- Kiszolgáló verziója: 10.4.22-MariaDB
-- PHP verzió: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `carcheckdb`
--
CREATE DATABASE IF NOT EXISTS `carcheckdb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `carcheckdb`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `identifier` int(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password_hash` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `admin`
--

INSERT INTO `admin` (`id`, `identifier`, `email`, `password_hash`) VALUES
(1, 123456789, 'admin@gmail.com', 'qwert');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `carpictures`
--

CREATE TABLE `carpictures` (
  `id` int(11) NOT NULL,
  `car_picture_name` varchar(300) DEFAULT NULL,
  `car_name` varchar(200) DEFAULT NULL,
  `Vehicle_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `carpictures`
--

INSERT INTO `carpictures` (`id`, `car_picture_name`, `car_name`, `Vehicle_id`) VALUES
(1, 'car_picture_1', 'BMW', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `pesonal_id` varchar(50) DEFAULT NULL,
  `name` varchar(150) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `license_category` varchar(5) DEFAULT NULL,
  `telnumber` int(11) DEFAULT NULL,
  `license_expiration` datetime DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `password_hash` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `customer`
--

INSERT INTO `customer` (`id`, `pesonal_id`, `name`, `email`, `license_category`, `telnumber`, `license_expiration`, `address`, `password_hash`) VALUES
(1, '3', 'Szalanics Szabolcs', 'szalanics.szabolcs@gmail.com', 'C', 630000000, '2022-02-22 23:32:16', '4937 Valami Valami utca 99', 'qwert');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `customerpicture`
--

CREATE TABLE `customerpicture` (
  `license_picture` varchar(100) DEFAULT NULL,
  `customer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `customerpicture`
--

INSERT INTO `customerpicture` (`license_picture`, `customer_id`) VALUES
('szalanics_szabolcs_license', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `driver`
--

CREATE TABLE `driver` (
  `id` int(11) NOT NULL,
  `driver_name` varchar(150) DEFAULT NULL,
  `password_hash` varchar(150) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `kmdriver` int(11) DEFAULT NULL,
  `license_category` varchar(5) DEFAULT NULL,
  `number_of_drives` int(11) DEFAULT 0,
  `rating` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `driver`
--

INSERT INTO `driver` (`id`, `driver_name`, `password_hash`, `email`, `kmdriver`, `license_category`, `number_of_drives`, `rating`) VALUES
(1, 'Kovács Elemér', 'qwert', 'kovacselemer@gmail.com', 12345, 'C', 10, 4);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rating`
--

CREATE TABLE `rating` (
  `id` int(11) NOT NULL,
  `rating` int(11) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `driver_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `rating`
--

INSERT INTO `rating` (`id`, `rating`, `description`, `driver_id`) VALUES
(1, 5, 'Nagyo jó volt', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_type` int(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password_hash` varchar(150) DEFAULT NULL,
  `admin_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `Driver_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `user_type`, `email`, `password_hash`, `admin_id`, `customer_id`, `Driver_id`) VALUES
(1, 1, 'valami@valami.com', 'qwert', 1, 1, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `vehicle`
--

CREATE TABLE `vehicle` (
  `id` int(11) NOT NULL,
  `platenumber` varchar(10) DEFAULT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `km` int(11) DEFAULT NULL,
  `number_of_persons` int(11) DEFAULT NULL,
  `rentprice` int(11) DEFAULT NULL,
  `technical_expiration` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `vehicle`
--

INSERT INTO `vehicle` (`id`, `platenumber`, `brand`, `year`, `km`, `number_of_persons`, `rentprice`, `technical_expiration`) VALUES
(1, 'BMSJ1231', 'BMW', 2002, 1234, 4, 50000, '2023-02-01 23:30:47');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `vehiclerent`
--

CREATE TABLE `vehiclerent` (
  `id` int(11) NOT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `paid_amount` int(11) DEFAULT 0,
  `customer_id` int(11) NOT NULL,
  `driver_id` int(11) NOT NULL,
  `rating_id` int(11) NOT NULL,
  `Vehicle_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `vehiclerent`
--

INSERT INTO `vehiclerent` (`id`, `start_time`, `end_time`, `paid_amount`, `customer_id`, `driver_id`, `rating_id`, `Vehicle_id`) VALUES
(1, '2022-02-22 23:40:21', '2022-02-22 23:40:21', 0, 1, 1, 1, 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `identifier_UNIQUE` (`identifier`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD UNIQUE KEY `password_hash_UNIQUE` (`password_hash`);

--
-- A tábla indexei `carpictures`
--
ALTER TABLE `carpictures`
  ADD PRIMARY KEY (`id`,`Vehicle_id`),
  ADD UNIQUE KEY `car_picture_name_UNIQUE` (`car_picture_name`),
  ADD KEY `fk_CarPictures_Vehicle1_idx` (`Vehicle_id`);

--
-- A tábla indexei `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD UNIQUE KEY `telnumber_UNIQUE` (`telnumber`),
  ADD UNIQUE KEY `password_hash_UNIQUE` (`password_hash`);

--
-- A tábla indexei `customerpicture`
--
ALTER TABLE `customerpicture`
  ADD PRIMARY KEY (`customer_id`);

--
-- A tábla indexei `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `password_hash_UNIQUE` (`password_hash`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`);

--
-- A tábla indexei `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`,`driver_id`),
  ADD KEY `fk_Rating_Driver1_idx` (`driver_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`,`admin_id`,`customer_id`,`Driver_id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD UNIQUE KEY `password_hash_UNIQUE` (`password_hash`),
  ADD KEY `fk_Users_Admin1_idx` (`admin_id`),
  ADD KEY `fk_Users_Customer1_idx` (`customer_id`),
  ADD KEY `fk_Users_Driver1_idx` (`Driver_id`);

--
-- A tábla indexei `vehicle`
--
ALTER TABLE `vehicle`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `platenumber_UNIQUE` (`platenumber`);

--
-- A tábla indexei `vehiclerent`
--
ALTER TABLE `vehiclerent`
  ADD PRIMARY KEY (`id`,`customer_id`,`driver_id`,`rating_id`,`Vehicle_id`),
  ADD KEY `fk_VehicleRent_Customer1_idx` (`customer_id`),
  ADD KEY `fk_VehicleRent_Driver1_idx` (`driver_id`),
  ADD KEY `fk_VehicleRent_Rating1_idx` (`rating_id`),
  ADD KEY `fk_VehicleRent_Vehicle1_idx` (`Vehicle_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `carpictures`
--
ALTER TABLE `carpictures`
  ADD CONSTRAINT `fk_CarPictures_Vehicle1` FOREIGN KEY (`Vehicle_id`) REFERENCES `vehicle` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `customerpicture`
--
ALTER TABLE `customerpicture`
  ADD CONSTRAINT `fk_CustomerPicture_Customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `fk_Rating_Driver1` FOREIGN KEY (`driver_id`) REFERENCES `driver` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_Users_Admin1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Users_Customer1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Users_Driver1` FOREIGN KEY (`Driver_id`) REFERENCES `driver` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `vehiclerent`
--
ALTER TABLE `vehiclerent`
  ADD CONSTRAINT `fk_VehicleRent_Customer1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_VehicleRent_Driver1` FOREIGN KEY (`driver_id`) REFERENCES `driver` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_VehicleRent_Rating1` FOREIGN KEY (`rating_id`) REFERENCES `rating` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_VehicleRent_Vehicle1` FOREIGN KEY (`Vehicle_id`) REFERENCES `vehicle` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
