-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2023 at 08:49 AM
-- Server version: 8.0.35
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node_st_mgmt`
--

-- --------------------------------------------------------

--
-- Table structure for table `program`
--

CREATE TABLE `program` (
  `program_id` int NOT NULL,
  `program_name` varchar(225) COLLATE utf8mb3_bin NOT NULL,
  `start_date` varchar(45) COLLATE utf8mb3_bin DEFAULT NULL,
  `duration` varchar(45) COLLATE utf8mb3_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

--
-- Dumping data for table `program`
--

INSERT INTO `program` (`program_id`, `program_name`, `start_date`, `duration`) VALUES
(2000, 'Certificate in Java Development', '2023-12-01', '1 year'),
(2001, 'MERN developer', '2023-11-30', '3 months');

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `registration_id` int NOT NULL,
  `date` varchar(45) COLLATE utf8mb3_bin DEFAULT NULL,
  `payment` double DEFAULT NULL,
  `st_id` int DEFAULT NULL,
  `p_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`registration_id`, `date`, `payment`, `st_id`, `p_id`) VALUES
(1, '2023-11-26', 2000.99, 1001, 2000),
(4, '2023-11-26', 2000, 1003, 2000),
(5, '2023-11-26', 5000, 1002, 2001),
(7, '2023-11-27', 0, 1003, 2001),
(9, '2023-11-27', 1, 1004, 2000);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` int NOT NULL,
  `full_name` varchar(45) COLLATE utf8mb3_bin NOT NULL,
  `nic` varchar(45) COLLATE utf8mb3_bin DEFAULT NULL,
  `birthday` varchar(45) COLLATE utf8mb3_bin DEFAULT NULL,
  `gender` enum('Male','Female','Other') COLLATE utf8mb3_bin DEFAULT NULL,
  `contact` varchar(45) COLLATE utf8mb3_bin DEFAULT NULL,
  `email` varchar(45) COLLATE utf8mb3_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `full_name`, `nic`, `birthday`, `gender`, `contact`, `email`) VALUES
(1001, 'john dolittle', '987392037V', '1999-02-11', 'Male', '7218291833', 'john@123.co'),
(1002, 'jane smithsonian', '6571930178V', '1965-07-14', 'Other', '9230374822', 'jane@mail.com'),
(1003, 'Amaya Perera', '49038401384', '2023-11-16', 'Female', '0775628329', 'amaya@gmail.com'),
(1004, 'Tiara Caara', '98289838234', '1990-07-11', 'Female', '9843723095', 'tia@qw');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `program`
--
ALTER TABLE `program`
  ADD PRIMARY KEY (`program_id`);

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`registration_id`),
  ADD UNIQUE KEY `unique_registration` (`st_id`,`p_id`),
  ADD KEY `p_id` (`p_id`),
  ADD KEY `st_p_index` (`st_id`,`p_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`),
  ADD UNIQUE KEY `nic_UNIQUE` (`nic`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `registration`
--
ALTER TABLE `registration`
  MODIFY `registration_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `registration`
--
ALTER TABLE `registration`
  ADD CONSTRAINT `registration_ibfk_1` FOREIGN KEY (`st_id`) REFERENCES `student` (`student_id`),
  ADD CONSTRAINT `registration_ibfk_2` FOREIGN KEY (`p_id`) REFERENCES `program` (`program_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
