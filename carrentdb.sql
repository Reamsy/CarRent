-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Ápr 25. 22:45
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
-- Adatbázis: `carrentdb`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `costumer`
--

CREATE TABLE `costumer` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `Fullname` varchar(255) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `License_category` varchar(5) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `License_expiraton` text COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `Phone_number` varchar(11) COLLATE utf8mb4_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `costumer`
--

INSERT INTO `costumer` (`id`, `user_id`, `Fullname`, `License_category`, `License_expiraton`, `Phone_number`) VALUES
(51, 146, 'valaki', 'B', '2022-11-11', '+3620483612'),
(52, 139, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `drivers`
--

CREATE TABLE `drivers` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `sex` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `licence_category` varchar(10) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `available` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `drivers`
--

INSERT INTO `drivers` (`id`, `user_id`, `name`, `sex`, `licence_category`, `available`) VALUES
(21, 142, 'Vak András', 'Male', 'B', 1),
(22, 143, 'Kiss Pista', 'Male', 'B', 1),
(23, 144, 'Víz Elek', 'Male', 'B', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `brand` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `model` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `chassisNumber` text COLLATE utf8mb4_hungarian_ci NOT NULL,
  `plateNumber` text COLLATE utf8mb4_hungarian_ci NOT NULL,
  `fuel` varchar(30) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `color` varchar(30) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `rentprice` int(255) NOT NULL,
  `year` int(255) NOT NULL,
  `image` longtext COLLATE utf8mb4_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `products`
--

INSERT INTO `products` (`id`, `brand`, `model`, `chassisNumber`, `plateNumber`, `fuel`, `color`, `rentprice`, `year`, `image`) VALUES
(35, 'BMW', 'e36', 'qwe123qweqweqwe12', 'qwe-123', 'gas', 'red', 12000, 2002, NULL),
(36, 'Ford', 'Mustang', 'asd123asdasdasd23', 'asd-123', 'gas', 'blue', 22000, 2016, NULL),
(37, 'Opel', 'Astra G', 'res123resresres12', 'res-123', 'gas', 'green', 16000, 2005, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rate`
--

CREATE TABLE `rate` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `car_id` int(11) DEFAULT NULL,
  `car_rate` int(3) DEFAULT NULL,
  `driver_id` int(11) DEFAULT NULL,
  `driver_rate` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rent`
--

CREATE TABLE `rent` (
  `id` int(11) NOT NULL,
  `user_rent_id` int(11) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `car_id` int(11) DEFAULT NULL,
  `driver_id` text COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `rent`
--

INSERT INTO `rent` (`id`, `user_rent_id`, `start_date`, `end_date`, `car_id`, `driver_id`) VALUES
(107, 146, '2022-04-25', '2022-04-26', 35, '22'),
(108, 146, '2022-04-27', '2022-04-28', 35, '23'),
(112, 146, '2022-04-29', '2022-05-01', 36, 'Nincs sofőr!');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `user_id`, `username`, `password`, `email`) VALUES
(87, 1, 'admin', '$2b$10$R/oBtSj17FIwbncpYJrSR.v1EjAlNOMsH50VsfZZuGQiOsai5VZHG', 'admin@admin.com'),
(142, 2, 'driver1', '$2b$10$PeM9GMVRVpk2vVt69IL4Ku1VTUgsUIELlTvGWH3iCDClVGIkDXk5O', 'driver1@gmail.com'),
(146, 3, 'user', '$2b$10$P7whalBWlxcXTS6uzRimgeyujrj/az.UGD8OocFphwd23kcQ8BF1K', 'user@user.com');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `costumer`
--
ALTER TABLE `costumer`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `rate`
--
ALTER TABLE `rate`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `rent`
--
ALTER TABLE `rent`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `costumer`
--
ALTER TABLE `costumer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT a táblához `drivers`
--
ALTER TABLE `drivers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT a táblához `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT a táblához `rate`
--
ALTER TABLE `rate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `rent`
--
ALTER TABLE `rent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=147;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
