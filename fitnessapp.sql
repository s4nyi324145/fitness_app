-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Jan 04. 09:43
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `fitnessapp`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `exercises`
--

CREATE TABLE `exercises` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `category` enum('chest','back','legs','shoulders','arms','core','cardio') DEFAULT NULL,
  `equipment` enum('barbell','dumbbell','machine','bodyweight','cable') DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_custom` tinyint(1) DEFAULT 0,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `exercises`
--

INSERT INTO `exercises` (`id`, `name`, `category`, `equipment`, `description`, `is_custom`, `user_id`) VALUES
(1, 'Bench Press', 'chest', 'barbell', NULL, 0, NULL),
(2, 'Squat', 'legs', 'barbell', NULL, 0, NULL),
(3, 'Deadlift', 'back', 'barbell', NULL, 0, NULL),
(4, 'Overhead Press', 'shoulders', 'barbell', NULL, 0, NULL),
(5, 'Incline Bench Press', 'chest', 'barbell', 'Upper chest focus', 0, NULL),
(6, 'Chest Fly', 'chest', 'dumbbell', 'Isolation chest exercise', 0, NULL),
(7, 'Pull Up', 'back', 'bodyweight', 'Wide grip pull ups', 0, NULL),
(8, 'Lat Pulldown', 'back', 'machine', 'Lat isolation', 0, NULL),
(9, 'Leg Press', 'legs', 'machine', 'Quad dominant', 0, NULL),
(10, 'Romanian Deadlift', 'legs', 'barbell', 'Hamstring focused', 0, NULL),
(11, 'Lateral Raise', 'shoulders', 'dumbbell', 'Side delts', 0, NULL),
(12, 'Bicep Curl', 'arms', 'dumbbell', 'Biceps isolation', 0, NULL),
(13, 'Tricep Pushdown', 'arms', 'cable', 'Triceps isolation', 0, NULL),
(14, 'Plank', 'core', 'bodyweight', 'Core stability', 0, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `personal_records`
--

CREATE TABLE `personal_records` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  `record_type` enum('max_weight','max_reps','max_volume') DEFAULT NULL,
  `value` decimal(10,2) DEFAULT NULL,
  `achieved_date` date DEFAULT NULL,
  `workout_set_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `personal_records`
--

INSERT INTO `personal_records` (`id`, `user_id`, `exercise_id`, `record_type`, `value`, `achieved_date`, `workout_set_id`) VALUES
(1, 17, 1, 'max_weight', 120.00, '2025-12-10', NULL),
(2, 17, 2, 'max_weight', 180.00, '2025-12-03', NULL),
(3, 17, 3, 'max_weight', 200.00, '2025-12-05', NULL),
(4, 18, 1, 'max_weight', 80.00, '2025-12-06', NULL),
(5, 18, 8, 'max_reps', 15.00, '2025-12-11', NULL),
(6, 17, 5, 'max_volume', 5000.00, '2025-12-01', NULL),
(7, 18, 10, 'max_reps', 90.00, '2025-12-09', NULL),
(8, 17, 7, 'max_weight', 60.00, '2025-12-08', NULL),
(9, 18, 9, 'max_weight', 40.00, '2025-12-05', NULL),
(10, 17, 6, 'max_weight', 150.00, '2025-12-03', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `email`, `password_hash`, `name`, `created_at`) VALUES
(17, 'a@a', '$2b$10$9osC4hEg6eVVpEj6KjqkrehVr/fXz7rLPLwjCRoL.8NNX9rUEeh3O', 'a', '2025-12-28 19:05:09'),
(18, 'b@b', '$2b$10$.rILgaoNo04yMNb8A7e7i.aM45rkClJn6lzMXCYsCHF164GB2yNlq', 'b', '2025-12-28 19:12:17'),
(19, 'c@c.com', '$2b$10$6PFzj2ovMb0D7lOMAbt.pu25ut7ycMIydVzFC5NnUvOglIEMSjfd6', 'c', '2025-12-31 17:20:38'),
(20, 'sandorszucsm6@gmail.com', '$2b$10$uFL3d3HvLUGrvU49DcY9.ODYHQKj4YhtkbNUrnpkYHnc6YLHMGzi2', 'asd', '2026-01-01 14:36:01'),
(21, 'asd@asdasd', '$2b$10$DMJou/ZnGyQD0C/Z7EfVS.7yyUntm1amtKauMuDJ1Orvw3WjCHQee', 'sandor', '2026-01-02 17:45:29'),
(22, 'd@d', '$2b$10$cxm7r2vbQLS2LaxbR9p2oOG.fucwDBn8JygvtMzxgt8B4Go.NIKKu', 'd', '2026-01-02 17:46:59');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_profiles`
--

CREATE TABLE `user_profiles` (
  `user_id` int(11) NOT NULL,
  `current_goal` enum('strength','hypertrophy','endurance','weight_loss') DEFAULT NULL,
  `experience_level` enum('beginner','intermediate','advanced') DEFAULT NULL,
  `workout_days_per_week` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `user_profiles`
--

INSERT INTO `user_profiles` (`user_id`, `current_goal`, `experience_level`, `workout_days_per_week`) VALUES
(17, 'strength', 'intermediate', 4),
(18, 'hypertrophy', 'beginner', 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `workouts`
--

CREATE TABLE `workouts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `notes` text DEFAULT NULL,
  `duration_minutes` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `workouts`
--

INSERT INTO `workouts` (`id`, `user_id`, `date`, `notes`, `duration_minutes`, `created_at`, `name`) VALUES
(1, 17, '2025-12-01', 'Chest day', 75, '2025-12-29 11:46:47', 'Push Day A'),
(2, 17, '2025-12-03', 'Heavy legs', 90, '2025-12-29 11:46:47', 'Leg Day'),
(3, 17, '2025-12-05', 'Back & biceps', 80, '2025-12-29 11:46:47', 'Pull Day'),
(4, 18, '2025-12-02', 'Beginner workout', 60, '2025-12-29 11:46:47', 'Full Body'),
(5, 18, '2025-12-04', 'Cardio focus', 45, '2025-12-29 11:46:47', 'Fat Burn'),
(6, 18, '2025-12-06', 'Upper body', 70, '2025-12-29 11:46:47', 'Upper Split'),
(7, 17, '2025-12-08', 'Shoulders', 65, '2025-12-29 11:46:47', 'Shoulder Day'),
(8, 17, '2025-12-10', 'PR attempt', 85, '2025-12-29 11:46:47', 'Strength Day'),
(9, 18, '2025-12-09', 'Light workout', 40, '2025-12-29 11:46:47', 'Recovery'),
(10, 18, '2025-12-11', 'Hypertrophy', 75, '2025-12-29 11:46:47', 'Muscle Day'),
(11, 17, '2025-12-29', 'Chest & Triceps', 80, '2025-12-29 07:15:12', 'Push Day B'),
(12, 17, '2025-12-31', 'Back thickness', 75, '2025-12-31 17:42:09', 'Pull Day B'),
(13, 17, '2026-01-02', 'Heavy squats', 90, '2026-01-02 16:30:44', 'Leg Day Heavy'),
(14, 18, '2025-12-30', 'Full body basics', 60, '2025-12-30 08:05:31', 'Full Body'),
(15, 18, '2026-01-01', 'New year cardio', 45, '2026-01-01 09:22:18', 'Cardio'),
(16, 18, '2026-01-03', 'Upper hypertrophy', 70, '2026-01-03 15:11:55', 'Upper Split');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `workout_exercises`
--

CREATE TABLE `workout_exercises` (
  `id` int(11) NOT NULL,
  `workout_id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `workout_exercises`
--

INSERT INTO `workout_exercises` (`id`, `workout_id`, `exercise_id`, `created_at`) VALUES
(1, 1, 1, '2025-12-29 11:46:56'),
(2, 1, 5, '2025-12-29 11:46:56'),
(3, 2, 2, '2025-12-29 11:46:56'),
(4, 2, 6, '2025-12-29 11:46:56'),
(5, 3, 3, '2025-12-29 11:46:56'),
(6, 3, 4, '2025-12-29 11:46:56'),
(7, 4, 10, '2025-12-29 11:46:56'),
(8, 5, 9, '2025-12-29 11:46:56'),
(9, 6, 8, '2025-12-29 11:46:56'),
(10, 7, 7, '2025-12-29 11:46:56');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `workout_plans`
--

CREATE TABLE `workout_plans` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `goal` enum('strength','hypertrophy','endurance','weight_loss') DEFAULT NULL,
  `plan_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`plan_json`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `workout_plans`
--

INSERT INTO `workout_plans` (`id`, `user_id`, `goal`, `plan_json`, `created_at`, `is_active`) VALUES
(1, 17, 'strength', '{\"days\":4,\"split\":\"upper/lower\"}', '2025-12-29 11:51:49', 1),
(2, 18, 'hypertrophy', '{\"days\":3,\"split\":\"full_body\"}', '2025-12-29 11:51:49', 1),
(3, 17, 'hypertrophy', '{\"days\":5,\"split\":\"push_pull_legs\"}', '2025-12-29 11:51:49', 0),
(4, 18, 'weight_loss', '{\"days\":4,\"cardio\":true}', '2025-12-29 11:51:49', 0),
(5, 17, 'endurance', '{\"days\":6,\"cardio\":true}', '2025-12-29 11:51:49', 0),
(6, 18, 'strength', '{\"days\":5,\"focus\":\"compound\"}', '2025-12-29 11:51:49', 0),
(7, 17, 'strength', '{\"days\":3,\"minimal\":true}', '2025-12-29 11:51:49', 0),
(8, 18, 'hypertrophy', '{\"days\":4,\"volume\":\"high\"}', '2025-12-29 11:51:49', 0),
(9, 17, 'weight_loss', '{\"days\":3,\"diet\":\"deficit\"}', '2025-12-29 11:51:49', 0),
(10, 18, 'endurance', '{\"days\":2,\"light\":true}', '2025-12-29 11:51:49', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `workout_sets`
--

CREATE TABLE `workout_sets` (
  `id` int(11) NOT NULL,
  `workout_exercise_id` int(11) NOT NULL,
  `set_number` int(11) NOT NULL,
  `reps` int(11) NOT NULL,
  `weight_kg` decimal(5,2) DEFAULT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `workout_sets`
--

INSERT INTO `workout_sets` (`id`, `workout_exercise_id`, `set_number`, `reps`, `weight_kg`, `notes`) VALUES
(11, 1, 1, 10, 80.00, 'Warmup'),
(12, 1, 2, 8, 90.00, NULL),
(13, 2, 1, 12, 180.00, NULL),
(14, 3, 1, 5, 120.00, 'Heavy'),
(15, 4, 1, 10, 60.00, NULL),
(16, 5, 1, 8, 140.00, NULL),
(17, 6, 1, 12, 50.00, NULL),
(18, 7, 1, 60, NULL, 'Hold'),
(19, 8, 1, 15, 35.00, NULL),
(20, 9, 1, 12, 30.00, NULL),
(21, 10, 1, 12, 40.00, NULL);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `exercises`
--
ALTER TABLE `exercises`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `personal_records`
--
ALTER TABLE `personal_records`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_pr` (`user_id`,`exercise_id`,`record_type`),
  ADD KEY `exercise_id` (`exercise_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A tábla indexei `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD PRIMARY KEY (`user_id`);

--
-- A tábla indexei `workouts`
--
ALTER TABLE `workouts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `workout_exercises`
--
ALTER TABLE `workout_exercises`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_exercise_in_workout` (`workout_id`,`exercise_id`),
  ADD KEY `exercise_id` (`exercise_id`);

--
-- A tábla indexei `workout_plans`
--
ALTER TABLE `workout_plans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `workout_sets`
--
ALTER TABLE `workout_sets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `workout_exercises_idfk` (`workout_exercise_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `exercises`
--
ALTER TABLE `exercises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT a táblához `personal_records`
--
ALTER TABLE `personal_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT a táblához `workouts`
--
ALTER TABLE `workouts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT a táblához `workout_exercises`
--
ALTER TABLE `workout_exercises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `workout_plans`
--
ALTER TABLE `workout_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `workout_sets`
--
ALTER TABLE `workout_sets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `exercises`
--
ALTER TABLE `exercises`
  ADD CONSTRAINT `exercises_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `personal_records`
--
ALTER TABLE `personal_records`
  ADD CONSTRAINT `personal_records_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `personal_records_ibfk_2` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`id`);

--
-- Megkötések a táblához `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD CONSTRAINT `user_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `workouts`
--
ALTER TABLE `workouts`
  ADD CONSTRAINT `workouts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `workout_exercises`
--
ALTER TABLE `workout_exercises`
  ADD CONSTRAINT `workout_exercises_ibfk_1` FOREIGN KEY (`workout_id`) REFERENCES `workouts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `workout_exercises_ibfk_2` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`id`);

--
-- Megkötések a táblához `workout_plans`
--
ALTER TABLE `workout_plans`
  ADD CONSTRAINT `workout_plans_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
