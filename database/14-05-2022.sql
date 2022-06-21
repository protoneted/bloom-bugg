-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 14, 2022 at 10:25 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bloom`
--

-- --------------------------------------------------------

--
-- Table structure for table `bloom_results`
--

DROP TABLE IF EXISTS `bloom_results`;
CREATE TABLE IF NOT EXISTS `bloom_results` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(256) DEFAULT NULL,
  `user_ans` varchar(256) DEFAULT NULL,
  `bloom_id` varchar(100) DEFAULT NULL,
  `kwh` varchar(255) DEFAULT NULL,
  `co2` varchar(255) DEFAULT NULL,
  `water` varchar(255) DEFAULT NULL,
  `waste_recycle` varchar(255) DEFAULT NULL,
  `no_of_tree` varchar(255) DEFAULT NULL,
  `bedge_green` varchar(255) DEFAULT NULL,
  `bedge_ev` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bloom_results`
--

INSERT INTO `bloom_results` (`id`, `user_id`, `user_ans`, `bloom_id`, `kwh`, `co2`, `water`, `waste_recycle`, `no_of_tree`, `bedge_green`, `bedge_ev`, `created_at`, `updated_at`) VALUES
(1, '1', NULL, '1', '2.0999999999999996', '1.7849999999999997', NULL, NULL, NULL, NULL, NULL, '2022-05-12 15:53:40', '2022-05-12 15:53:40'),
(2, '1', NULL, '2', '1.4', '1.19', NULL, NULL, NULL, NULL, NULL, '2022-05-12 15:55:11', '2022-05-12 15:55:11'),
(3, '1', NULL, '3', NULL, NULL, NULL, NULL, NULL, '1', NULL, '2022-05-12 15:55:15', '2022-05-12 15:55:15'),
(4, '1', NULL, '4', NULL, '2', '1.7', NULL, NULL, NULL, NULL, '2022-05-12 15:55:19', '2022-05-12 15:55:19'),
(5, '1', NULL, '5', NULL, NULL, NULL, NULL, NULL, '1', NULL, '2022-05-12 15:55:22', '2022-05-12 15:55:22'),
(6, '1', NULL, '6', NULL, NULL, NULL, NULL, NULL, '1', NULL, '2022-05-12 15:55:26', '2022-05-12 15:55:26'),
(7, '1', NULL, '3', NULL, NULL, NULL, NULL, NULL, '1', NULL, '2022-05-12 15:55:28', '2022-05-12 15:55:28'),
(8, '1', NULL, '1', '2.0999999999999996', '1.7849999999999997', NULL, NULL, NULL, NULL, NULL, '2022-05-12 15:55:33', '2022-05-12 15:55:33'),
(9, '1', NULL, '7', '260.40000000000003', '221.34000000000003', NULL, NULL, NULL, NULL, NULL, '2022-05-12 15:55:37', '2022-05-12 15:55:37'),
(10, '1', NULL, '7', '260.40000000000003', '221.34000000000003', NULL, NULL, NULL, NULL, NULL, '2022-05-12 15:55:39', '2022-05-12 15:55:39'),
(11, '1', NULL, '2', '1.4', '1.19', NULL, NULL, NULL, NULL, NULL, '2022-05-12 15:55:42', '2022-05-12 15:55:42'),
(12, '1', NULL, '2', '1.4', '1.19', NULL, NULL, NULL, NULL, NULL, '2022-05-12 15:55:43', '2022-05-12 15:55:43'),
(13, '1', NULL, '2', '1.4', '1.19', NULL, NULL, NULL, NULL, NULL, '2022-05-12 15:55:44', '2022-05-12 15:55:44'),
(14, '1', '[7,3]', '2', '1.4', '1.19', NULL, NULL, NULL, NULL, NULL, '2022-05-12 16:01:52', '2022-05-12 16:01:52'),
(15, '1', '[7,3]', '3', NULL, NULL, NULL, NULL, NULL, '1', NULL, '2022-05-12 16:45:27', '2022-05-12 16:45:27'),
(16, '1', '[7,3]', '11', NULL, '0.001204', NULL, NULL, NULL, NULL, NULL, '2022-05-12 16:57:45', '2022-05-12 16:57:45'),
(17, '1', '[7,3]', '23', NULL, NULL, NULL, '22', NULL, NULL, NULL, '2022-05-12 16:57:57', '2022-05-12 16:57:57'),
(18, '1', '[7,3]', '54', NULL, NULL, NULL, NULL, NULL, '1', NULL, '2022-05-12 16:58:01', '2022-05-12 16:58:01'),
(19, '1', '[7,3]', '13', NULL, '0.001204', NULL, NULL, NULL, NULL, NULL, '2022-05-12 16:58:04', '2022-05-12 16:58:04'),
(20, '1', '[7,3]', '33', NULL, NULL, NULL, NULL, NULL, '1', NULL, '2022-05-12 16:58:09', '2022-05-12 16:58:09'),
(21, '1', '[7,3]', '33', NULL, NULL, NULL, NULL, NULL, '1', NULL, '2022-05-12 16:58:11', '2022-05-12 16:58:11'),
(22, '1', '[7,3]', '15', NULL, NULL, NULL, NULL, NULL, NULL, '1', '2022-05-12 16:58:15', '2022-05-12 16:58:15'),
(23, '1', '[7,3]', '15', NULL, NULL, NULL, NULL, NULL, NULL, '1', '2022-05-12 16:58:16', '2022-05-12 16:58:16'),
(24, '1', '[7,3]', '15', NULL, NULL, NULL, NULL, NULL, NULL, '1', '2022-05-12 16:58:16', '2022-05-12 16:58:16'),
(25, '1', '[7,3]', '18', NULL, NULL, NULL, NULL, NULL, '1', NULL, '2022-05-12 16:58:21', '2022-05-12 16:58:21'),
(26, '1', '[7,3]', '18', NULL, NULL, NULL, NULL, NULL, '1', NULL, '2022-05-12 16:58:21', '2022-05-12 16:58:21'),
(27, '1', '[7,3]', '18', NULL, NULL, NULL, NULL, NULL, '1', NULL, '2022-05-12 16:58:22', '2022-05-12 16:58:22'),
(28, '1', '[7,3]', '18', NULL, NULL, NULL, NULL, NULL, '1', NULL, '2022-05-12 16:58:22', '2022-05-12 16:58:22'),
(29, '1', '[7,3]', '18', NULL, NULL, NULL, NULL, NULL, '1', NULL, '2022-05-14 09:46:57', '2022-05-14 09:46:57'),
(30, '1', '[7,3]', '1', '2.0999999999999996', '1.7849999999999997', NULL, NULL, NULL, NULL, NULL, '2022-05-14 09:47:25', '2022-05-14 09:47:25'),
(31, '1', '[7,3]', '1', '2.0999999999999996', '1.7849999999999997', NULL, NULL, NULL, NULL, NULL, '2022-05-14 10:03:43', '2022-05-14 10:03:43'),
(32, '1', '[7,3]', '1', '2.0999999999999996', '1.7849999999999997', NULL, NULL, NULL, NULL, NULL, '2022-05-14 10:04:23', '2022-05-14 10:04:23'),
(33, '1', '[7,3]', '1', '2.0999999999999996', '1.7849999999999997', NULL, NULL, NULL, NULL, NULL, '2022-05-14 10:05:25', '2022-05-14 10:05:25'),
(34, '1', '[7,3]', '1', '2.0999999999999996', '1.7849999999999997', NULL, NULL, NULL, NULL, NULL, '2022-05-14 10:05:56', '2022-05-14 10:05:56'),
(35, '1', '[7,3]', '1', '2.0999999999999996', '1.7849999999999997', NULL, NULL, NULL, NULL, NULL, '2022-05-14 10:08:44', '2022-05-14 10:08:44'),
(36, '1', '[7,3]', '1', '2.0999999999999996', '1.7849999999999997', NULL, NULL, NULL, NULL, NULL, '2022-05-14 10:09:29', '2022-05-14 10:09:29'),
(37, '1', '[7,3]', '1', '2.0999999999999996', '1.7849999999999997', NULL, NULL, NULL, NULL, NULL, '2022-05-14 10:09:56', '2022-05-14 10:09:56'),
(38, '1', '[7,3]', '1', '2.0999999999999996', '1.7849999999999997', NULL, NULL, NULL, NULL, NULL, '2022-05-14 10:10:16', '2022-05-14 10:10:16'),
(39, '1', '[7,3]', '1', '2.0999999999999996', '1.7849999999999997', NULL, NULL, NULL, NULL, NULL, '2022-05-14 10:10:25', '2022-05-14 10:10:25'),
(40, '1', '[7,3]', '1', '2.0999999999999996', '1.7849999999999997', NULL, NULL, NULL, NULL, NULL, '2022-05-14 10:11:53', '2022-05-14 10:11:53'),
(41, '1', '[7,3]', '1', '2.0999999999999996', '1.7849999999999997', NULL, NULL, NULL, NULL, NULL, '2022-05-14 10:12:06', '2022-05-14 10:12:06'),
(42, '1', '[7,3]', '1', '2.0999999999999996', '1.7849999999999997', NULL, NULL, NULL, NULL, NULL, '2022-05-14 10:14:53', '2022-05-14 10:14:53'),
(43, '1', '[7,3]', '1', '2.0999999999999996', '1.7849999999999997', NULL, NULL, NULL, NULL, NULL, '2022-05-14 10:15:14', '2022-05-14 10:15:14'),
(44, '1', '[7,3]', '1', '2.0999999999999996', '1.7849999999999997', NULL, NULL, NULL, NULL, NULL, '2022-05-14 10:15:26', '2022-05-14 10:15:26'),
(45, '1', '[7,3]', '1', '2.0999999999999996', '1.7849999999999997', NULL, NULL, NULL, NULL, NULL, '2022-05-14 10:15:56', '2022-05-14 10:15:56');

-- --------------------------------------------------------

--
-- Table structure for table `bm_account_setting`
--

DROP TABLE IF EXISTS `bm_account_setting`;
CREATE TABLE IF NOT EXISTS `bm_account_setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_profile_search` int(11) NOT NULL,
  `is_private_account` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bm_account_setting`
--

INSERT INTO `bm_account_setting` (`id`, `is_profile_search`, `is_private_account`, `user_id`, `created_at`) VALUES
(1, 0, 1, 1, '2022-04-12 16:27:04'),
(2, 1, 0, 2, '2022-04-12 18:11:49'),
(3, 0, 1, 3, '2022-04-13 11:48:03');

-- --------------------------------------------------------

--
-- Table structure for table `bm_bloom_answer`
--

DROP TABLE IF EXISTS `bm_bloom_answer`;
CREATE TABLE IF NOT EXISTS `bm_bloom_answer` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(20) NOT NULL,
  `bloom_input_id` int(20) NOT NULL,
  `user_answer` int(20) NOT NULL,
  `bloom_category_detail_id` int(20) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bm_bloom_answer`
--

INSERT INTO `bm_bloom_answer` (`id`, `user_id`, `bloom_input_id`, `user_answer`, `bloom_category_detail_id`, `image`, `created_at`) VALUES
(1, 1, 1, 5, 1, NULL, '2022-05-05 14:14:45'),
(2, 1, 2, 3, 1, NULL, '2022-05-05 14:14:45'),
(3, 2, 1, 5, 2, NULL, '2022-05-06 15:25:10'),
(4, 2, 1, 7, 2, NULL, '2022-05-06 15:25:29'),
(5, 3, 1, 4, 2, NULL, '2022-05-06 15:25:32');

-- --------------------------------------------------------

--
-- Table structure for table `bm_bloom_category`
--

DROP TABLE IF EXISTS `bm_bloom_category`;
CREATE TABLE IF NOT EXISTS `bm_bloom_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bm_bloom_category`
--

INSERT INTO `bm_bloom_category` (`id`, `name`, `image`, `is_active`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Energy', 'https://bloombugg.com/image/category/Energy-min.jpg', 1, '2022-04-22 09:46:16', NULL, NULL),
(2, 'Fuel', 'https://bloombugg.com/image/category/fuel-min.jpg', 1, '2022-04-22 09:46:43', NULL, NULL),
(3, 'Home', 'https://bloombugg.com/image/category/Home-Category-min.jpg', 1, '2022-04-22 09:46:50', NULL, NULL),
(4, 'Kids', 'https://bloombugg.com/image/category/Kids-Category-min.jpg', 1, '2022-04-22 09:46:59', NULL, NULL),
(5, 'Recycle', 'https://bloombugg.com/image/category/recycle-min.jpg', 1, '2022-04-22 09:47:09', NULL, NULL),
(6, 'Trees', 'https://bloombugg.com/image/category/Trees-category-min.jpg', 1, '2022-04-22 09:47:24', NULL, NULL),
(7, 'Water conservation', 'https://bloombugg.com/image/category/Water-Main-min.jpg', 1, '2022-04-22 09:47:34', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bm_bloom_category_detail`
--

DROP TABLE IF EXISTS `bm_bloom_category_detail`;
CREATE TABLE IF NOT EXISTS `bm_bloom_category_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bloom_category_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(500) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bm_bloom_category_detail`
--

INSERT INTO `bm_bloom_category_detail` (`id`, `bloom_category_id`, `title`, `description`, `image`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'SOAK IN SUN', 'Its time for your house to soak in sun.Switch off the lights during daytime and enjoy a bright sunny natural light. Bloom it and upload a picture.', 'https://bloombugg.com/image/SOAK-IN-SUN-min.jpg\r\n', '2022-04-22 09:59:43', NULL, NULL),
(2, 1, 'LIGHTS OFF', 'Make sure you switch off the lights whenever you STEP OUT OF the room. Bloom it when you Do it. Don\'t forget to upload a picture.', 'https://bloombugg.com/image/lights-off-min.jpg\r\n', '2022-04-22 10:00:33', NULL, NULL),
(3, 1, 'SET GEYSER TEMPERATURE', 'Lower the thermostats on your water heater. Usually water heaters at set at boiling hot setting temperatures. Set your heater to 60-65 degrees celcius and the hot water will be just perfect for the use.For. every degree you save about 3% reduction in electricity consumed by your appliance', 'https://bloombugg.com/image/set-geyser-temperature-min.jpg\r\n', '2022-04-22 10:06:55', NULL, NULL),
(4, 1, 'UPLUG VAMPIRE', 'Unplug the small appliances such as microwave/dishwashers/kettle/oven/airfryer/alexa/phone chargers etc and unplug your chargers when not in use. All these small apliances consume energy even when they are switched off. If we keep are devices plugged in, they will still draw power which will cause energy loss. By unplugging your appliances for a day you can save around 2 KWh of electricity and 1.8 kg CO2 emissions.Once you do this action upload a picture and click on the bloom button.', 'https://bloombugg.com/image/Upclycling-min.jpg\r\n', '2022-04-22 10:07:31', NULL, NULL),
(5, 1, 'SHUT DOWN LAPTOP', 'make sure you shut down the laptop when you are not using it. It helps save a lot of energy. BLOOM IT when you DO IT', 'https://scwcontent.affino.com/AcuCustom/Sitename/DAM/016/Light_bulb_blockchain_Adobe_rm.jpg', '2022-04-22 10:07:53', NULL, NULL),
(6, 1, 'POWER STRIPS', 'power strips gives you an ability to have control over your devices. When devices are not in use you can switch off the power strip. Using power strip can cut down your electricity bill by 5-10% every month.', 'https://bloombugg.com/image/Power-strips-min.jpg', '2022-04-22 10:08:18', NULL, NULL),
(7, 1, 'GO LED', 'Make sure you change your lights to cost saving LED lights instead of CFL lights or conventional tubelights. Upload a picture and BLOOM the action. It will also reduce your light bill by 90 %.', '', '2022-04-22 10:09:15', NULL, NULL),
(8, 1, 'SOLAR NIGHTS', 'install solar powered lights in your garden or balconies. Use free energy from sun to light up your gardens. It will also reduce your electricity bills. Bloom the action everytime you use Solar and upload your picture.', 'https://bloombugg.com/image/solar-night1-min.jpg', '2022-04-22 10:09:34', NULL, NULL),
(9, 1, 'SOLAR HOUSE', 'Installing rooftop solar panels pose very little pollution risk to the environment and reduces the carbon footprints drastically. You can save a lot of money on your electricity bills. With this One time investment you can reap benefits for as long as 20 years. Bloom it when you do it. An average household in India with AC needs about 5Kw of Solar energy which can vary and increase depending on your electricity consumption. One solar panel produces about 330 watts of electricity.', 'https://bloombugg.com/image/solar-house-min.jpg\r\n', '2022-04-22 10:09:53', NULL, NULL),
(10, 1, 'AC SAVERS', 'Save on your air conditioner electricity bills up to 35% by installing AC savers to your air conditioners. Press Bloom button when you install an Ac saver. ', 'https://bloombugg.com/image/AC_saver-min.jpg\r\n', '2022-04-22 10:10:13', NULL, NULL),
(11, 2, 'CAR POOL', 'Car pool with friends instead of driving yourself. It will make a huge impact on environment by reducing Co2 emissions and you will save a few bucks. Bloom it when you do it.', 'https://www.differencebetween.info/sites/default/files/images/5/green-fuel.jpg', '2022-04-22 10:14:35', NULL, NULL),
(12, 2, 'PUBLIC TRANSPORT', 'We at bloombugg encourage you to use public transport as much as you can. Upload a picture of yourself in your favorite mode of public transport and BLOOM!', 'https://bloombugg.com/image/Public-transport-min.jpg\r\n', '2022-04-22 10:15:13', NULL, NULL),
(13, 2, 'TAKE A WALK', 'Take a walk to your nearest shopping centre or for picking up kids from their school. Bloom once you complete the task. ', 'https://bloombugg.com/image/take-a-walk-min.jpg\r\n', '2022-04-22 10:15:36', NULL, NULL),
(14, 2, 'RIDE A BIKE', 'Pick up your bike/bicycle to go to your office/supermarket/school. Upload a picture with your bike and BLOOM IT', 'https://bloombugg.com/image/Ride-a-bike-min.jpg\r\n', '2022-04-22 10:16:00', NULL, NULL),
(15, 2, 'SWITCH TO ELECTRIC VEHICLE', 'if you are planning to change your car switch to Electric car. Save your planet by doing this task and press Bloom button.', 'https://bloombugg.com/image/Switch-to-EV1-min.jpg\r\n', '2022-04-22 10:16:18', NULL, NULL),
(16, 2, 'TRAIN OVER PLANE', 'A train journey will save much more CO2 emissions as compared to an airplane journey. APPROXIMATELY Co2 emissions from aviation is 115 g per passenger per km whereas Co2 emissions from train is approx 35 g per passenger per km', 'https://bloombugg.com/image/Train-over-plane-min.jpg\r\n', '2022-04-22 10:16:38', NULL, NULL),
(17, 3, 'THROW A BLOOM PARTY', 'oraganize a social gathering which is eco friendly. Dont use any disposable plastics/plates/napkins etc.upload a picture and click on bloom button', 'https://bloombugg.com/image/Toy-sharing-min.jpg\r\n', '2022-04-22 10:18:13', NULL, NULL),
(18, 3, 'DUSTBIN LINERS', 'Ditch the plastic and biodegradable liners for your dustbins. Use your old newspaper as a liner or compostable bio liners. It will lower your plastic usage and help in saving the environment. Once you are done click a picture and upload it. Don’t forget to BLOOM the activity.', 'https://bloombugg.com/image/Dustbin-liners-min.jpg\r\n', '2022-04-22 10:18:39', NULL, NULL),
(19, 3, 'CARRY A WATER BOTTLE', 'Always carry a water bottle when you step out of your house. Avoid buying new water bottles at restaurants or office and reduce plastic waste. Press BLOOM button and upload a photo.', 'https://bloombugg.com/image/Carry-your-bottle-min.jpg\r\n', '2022-04-22 10:19:01', NULL, NULL),
(20, 3, 'NATURE WALK', 'Ditch your coffee shops and decide to go for a nature walk to enjoy the natural beauty of our mother earth.  Upload a cool picture and BLOOM!', 'https://bloombugg.com/image/Nature-walk-min.jpg\r\n', '2022-04-22 10:19:37', NULL, NULL),
(21, 3, 'WATCH A SUSTAINABILITY VIDEO', 'watch any video that is related to environment and sustainability and BLOOM the action once you are done. Don’t forget to share the link. ', 'https://bloombugg.com/image/Watch-a-sustaianable-video-min.jpg\r\n', '2022-04-22 10:20:16', NULL, NULL),
(22, 3, 'COVER FREE DRINK', 'Whenever you buy a cold drink or coffee ditch the plastic covers and reduce wastage going to the landfills. A plastic cover ususal weighs about 5-7 gms depending on the quality.', 'https://i.imgur.com/wvrorBV.jpg', '2022-04-22 10:20:41', NULL, NULL),
(23, 7, 'BRUSH YOUR TEETH', 'Yes we have heard it many a times but do we actually apply it in our lives? Now is the time to practice and save litres of water. Turn off the water while brushing your teeth and shaving. Bloom it whenever you save water while doing this task.', 'https://bloombugg.com/image/brush-your-teeth-min.jpg\r\n', '2022-04-22 10:23:42', NULL, NULL),
(24, 7, 'SMART WASH', 'Save water by cleaning a full load of clothes instead of half load in your washing machine. Be smart and happy blooming! ', 'https://bloombugg.com/image/Smart-wash-min.jpg\r\n', '2022-04-22 10:23:59', NULL, NULL),
(25, 3, 'EDUCATING HOUSE HELPS', 'Educate your househelps about the importance of sustainaibilty. Teach them how simple actions like switching off the lights in an empty room or swtiching off ignition/car engines at the red light create an impact on our environment.', 'https://i.imgur.com/wvrorBV.jpg', '2022-04-22 10:25:19', NULL, NULL),
(26, 3, 'MEATLESS MEALS', 'Did you know eating plant based food options such as whole grains, legumes nuts and seeds can significantly lower your environmental implact. Vegetarian food use less energy,water and land for production. By replacing one non vegetarian meal with a vegetarian meal, you can save about 1.5 kg CO2 emissions and 1000 L of water.', 'https://bloombugg.com/image/Meatless-meals-min.jpg\r\n', '2022-04-22 10:25:36', NULL, NULL),
(27, 3, 'SUSTAINABLE PACKAGING', 'As the number of people ordering food online is on the rise, so are concerns about sustainability and the impact of food delivery on the environment. As a concious choice order food from restaurants using sustainable packagig options.\n', 'https://bloombugg.com/image/sustainable-packaging-min.jpg\r\n', '2022-04-22 10:26:03', NULL, NULL),
(28, 3, 'SENSOR LIGHTS', 'Using sensor lights inside as well as outside your home will save electricity since your lights will turn on/off by utilizing motion sensor. It will also help in reducing carbon emissions. Bloom whenever you install a sensor light.', 'https://i.imgur.com/wvrorBV.jpg', '2022-04-22 10:26:33', NULL, NULL),
(29, 3, 'RECYCLED TOILET ROLL/KITCHEN TOWELS', 'Use a toilet roll or kitchen towel made from recycled paper. It will save cutting trees and help in reducing carbon emissions. Bloom the action whenever you use a recycled  toilet roll or kitchen towels.', 'https://bloombugg.com/image/Recycled-toilet-rolls-min.jpg\r\n', '2022-04-22 10:26:54', NULL, NULL),
(30, 3, 'TYRE PRESSURE', 'Maintain the right tyre pressure to get the best mileage. It will use less petrol/gas and will help you in emitting less CO2 emissions. Bloom whenever you inflate your tyres.', 'https://bloombugg.com/image/Tyre-pressure-min.jpg\r\n', '2022-04-22 10:27:11', NULL, NULL),
(31, 3, 'CREATE A GROUP IN YOUR SCHOOL/OFFICE/COLLEGE', 'Its time to make a difference by leading the change. Create a group of people and promote sustainable lifestyle. Bloom the activity once you create such a group.', 'https://i.imgur.com/wvrorBV.jpg', '2022-04-22 10:27:30', NULL, NULL),
(32, 3, 'REUSE/REPAIR YOUR MOBILE', 'Did you know it takes about 12000 litres of water and 55 kg of CO2 emissions to manufacture one mobile phone. Each time you repair or use a refurbished mobile press bloom button.', 'https://bloombugg.com/image/Reuse-repair your-mobile-min.jpg\r\n', '2022-04-22 10:27:49', NULL, NULL),
(33, 4, 'READ ON ENVIRONMENT', 'All you kids out there read a cool book on environment and how to conserve it or books on sustainable lifestyle.Bloom it once you start reading it.', 'https://bloombugg.com/image/read-book-on-environment-min.jpg\r\n', '2022-04-22 10:30:16', NULL, NULL),
(34, 4, 'INSPIRE A FRIEND', 'Motivate a friend and include him in your sustainability journey. Upload a picture while doing any such activity and bloom your action.', 'https://bloombugg.com/image/inspire-a-friend-min.jpg\r\n', '2022-04-22 10:30:38', NULL, NULL),
(35, 4, 'SAY NO TO VIDEO GAME', 'put your shoes on and call your friends for a day out or a picnic.Lets resolve not to play video game today and save electricity. Bloom your action once you are done.', 'https://i.imgur.com/lx2v3Hy.jpg', '2022-04-22 10:32:03', NULL, NULL),
(36, 4, 'EXCHANGE A TOY', 'Sharing toys instead of buying a new one will save a lot of plastic. Make a habit of exchanging one toy with your best friend at least once a month. Press BLOOM button once you do this task.', 'https://i.imgur.com/18e6rMz.jpg', '2022-04-22 10:32:23', NULL, NULL),
(37, 4, 'WRITING GREEN', 'Instead of using pencils made from wood start using pencils which are made from vegetable seeds or made out of recycled paper. Bloom the action once you buy an ecofriendly pencil.', 'https://bloombugg.com/image/Writing-green-min.jpg\r\n', '2022-04-22 10:32:40', NULL, NULL),
(38, 5, 'DONATE OLD CLOTHES', 'Donate your old clothes to charity. Upload a picture and press the BLOOM button.', 'https://bloombugg.com/image/Donate-clothes-min.jpg\r\n', '2022-04-22 10:34:00', NULL, NULL),
(39, 5, 'SHARE BOOKS', 'Share your books and magazines with your friends /relatives/neighbours or donate it to any library and save the environment BLOOM your action and upload a picture', 'https://bloombugg.com/image/Share-books-min.jpg\r\n', '2022-04-22 10:34:21', NULL, NULL),
(40, 5, 'DITCH PLASTIC STRAWS', 'Don’t use plastic straws when you are out. Carry steel or bamboo straws or even better drink from the glass. Upload a picture and insipre others. Click on bloom button once done.', 'https://bloombugg.com/image/Ditch-plastic-straws-min.jpg\r\n', '2022-04-22 10:34:39', NULL, NULL),
(41, 5, 'WRAP A GIFT', 'Use a recycled paper or newspaper for wrapping a gift. Bloom when you complete this task and share a picture.', 'https://bloombugg.com/image/Wrap-a-gift-min.jpg\r\n', '2022-04-22 10:35:06', NULL, NULL),
(42, 5, 'CARRY YOUR BAG', 'Whenever you step out to visit your nearest supermarket for grocery shopping carry your own jute/cloth bag. Minimize waste and don’t use plastic. Bloom your action whenever you carry a bag along with you.', 'https://bloombugg.com/image/Carry-your-bag-min.jpg\r\n', '2022-04-22 10:35:23', NULL, NULL),
(43, 5, 'SUSTAINABLE FASHION', 'Instead of buying new clothes make a conscious decision of using upcycled, organic and recycled materials/clothes. BLOOM your sustainable Fashion choice and upload a picture.', 'https://bloombugg.com/image/Sustainable-fashion-min.jpg\r\n', '2022-04-22 10:35:38', NULL, NULL),
(44, 5, 'SEGREGATION OF WASTE', 'Segregate your waste as dry(blue) which is any dry waste like paper, wrappers, bags, rubber, metals etc ,wet( green) which is all your kitchen waste like vegetable peels, used tea,fruits, leftover eatables and hazardous (red) which is batteries, pesticides, toilet cleaners,motor oil, mothballs etc. Bloom the action once you start your waste segregation journey.', 'https://bloombugg.com/image/Segregation-of-Waste-min.jpg\r\n', '2022-04-22 10:35:53', NULL, NULL),
(45, 5, 'UPCYCLING', 'Upcyclying will help the environment by reducing whatever goes to the landfill and also helps you reuse the thing which you were about to throw away. Bloom whenever you upcycle an item.', 'https://bloombugg.com/image/unplug-Vampire-min.jpg\r\n', '2022-04-22 10:36:10', NULL, NULL),
(46, 5, 'PLAIN OL\' RECYCLE', 'Pick up your phone and call your scrapdealer/raddiwalla. Bloom whenever you recycle your old newspapers, plastic items, electronic waste and clothes.', 'https://bloombugg.com/image/Plain-Ol-recycle-min.jpg\r\n', '2022-04-22 10:36:25', NULL, NULL),
(47, 5, 'RECYCLED PRITING PAPER', 'It takes 10 liters of water to produce a single A4-sheet of paper. The pulp and paper industry is the single largest industrial consumer of water in Western countries. ach ton of recycled paper can avoid the use of 17 trees; 1,440 liters of oil; 2.3 cubic meters of landfill space; 4,000 kilowatts of energy and 26,500 liters of water.\n\nPaper is quite simple to recycle, yet 55 percent of the global paper supply comes from newly cut trees.', 'https://bloombugg.com/image/recycled-printing-paper-min.jpg\r\n', '2022-04-22 10:36:46', NULL, NULL),
(48, 6, 'PLANT A TREE', 'A very common activity which we all are aware since our childhood. Do you know an average person in India emits about 1.91 tonnnes of CO2.Lets not wait and lets get going. contribute to our environment by planting as many trees as possible. Happy Blooming! ', 'https://bloombugg.com/image/Plant-a-tree-min.jpg\r\n', '2022-04-22 10:39:08', NULL, NULL),
(49, 6, 'DONATE A TREE', 'Donate a tree to create an impact on your environment.This simple task will help offset your carbon emissions in a big way . Bloom when you complete this action.', 'https://bloombugg.com/image/Donate-a-tree-min.jpg\r\n', '2022-04-22 10:39:25', NULL, NULL),
(50, 6, 'TREE PLANTING DRIVES', 'There are many NGO\'s which encourage people to be part of their Tree Planting Initiatives. Join an event like this and upload your picture. BLOOM once you are done.', 'https://bloombugg.com/image/Tree-planting-drive-min.jpg\r\n', '2022-04-22 10:39:44', NULL, NULL),
(51, 6, 'BUY PLANTS FOR YOUR HOME', 'Research shows that much like trees , plants improve air quality. Its relatively simple and inexpensive action to take. Bloom this action when you take a step forward towards a green home.', '', '2022-04-22 10:40:04', NULL, NULL),
(52, 7, 'RAINWATERING PLANTS', 'Collect rainwater in buckets and use that water for watering your plants. You can save litres of water with this simple task. Hit the bloom button once you do this task.', 'https://bloombugg.com/image/Rainwatering-plants-min.jpg\r\n', '2022-04-22 10:41:16', NULL, NULL),
(53, 7, 'RESTRICTING SHOWER TIME', 'Average shower time is said to be 10 minutes and can extend upto even 15 mins. It takes upto 9.4 litres of water for every minute of our shower time. So if we are mindful we can save gallons of water. For every 5 minute shower you will save at least 47 litres of water. Press bloom and save water.', 'https://bloombugg.com/image/Restricting-shower-time-min.jpg\r\n', '2022-04-22 10:41:34', NULL, NULL),
(54, 3, 'BRUSH WITH BAMBOO', 'Replace you plastic toothbrush with bamboo made toothbrish. Every plastic tooth brush that gets thrown away stays on our planet clogging up landfill and our seas. Bamboo being a natural material is completely bio degradable in it\'s raw form. So change your toothbrush and Bloom now! ', 'https://bloombugg.com/image/Brush-with-Bamboo-min.jpg\r\n', '2022-04-22 10:42:28', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bm_bloom_category_input_master`
--

DROP TABLE IF EXISTS `bm_bloom_category_input_master`;
CREATE TABLE IF NOT EXISTS `bm_bloom_category_input_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bm_bloom_category_input_master`
--

INSERT INTO `bm_bloom_category_input_master` (`id`, `title`, `slug`, `deleted_at`) VALUES
(1, 'KM', 'no_of_km', NULL),
(2, 'Hour', 'no_of_hour', NULL),
(3, 'KW', 'kilo_watts', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bm_bloom_inputs`
--

DROP TABLE IF EXISTS `bm_bloom_inputs`;
CREATE TABLE IF NOT EXISTS `bm_bloom_inputs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bloom_category_detail_id` int(11) NOT NULL,
  `bloom_category_input` int(11) DEFAULT NULL,
  `question` text DEFAULT NULL,
  `kwh` varchar(255) DEFAULT NULL,
  `co2` varchar(255) DEFAULT NULL,
  `water` varchar(255) DEFAULT NULL,
  `waste_recycled` varchar(255) DEFAULT NULL,
  `no_of_tree` varchar(255) DEFAULT NULL,
  `badge_greeen` int(11) DEFAULT NULL,
  `badge_ev` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bm_bloom_inputs`
--

INSERT INTO `bm_bloom_inputs` (`id`, `bloom_category_detail_id`, `bloom_category_input`, `question`, `kwh`, `co2`, `water`, `waste_recycled`, `no_of_tree`, `badge_greeen`, `badge_ev`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 1, 'No. of Hours|No. of Rooms', '100*No of hours/1000* No of rooms ', 'kwh*0.85', '', '', '', NULL, NULL, '2022-05-02 23:04:03', NULL, NULL),
(4, 2, 1, 'No. of hours', '200*no of hours/1000', 'kwh*0.85', '', '', '', NULL, NULL, NULL, NULL, NULL),
(5, 7, 1, 'No of lights changed', '37.2', 'No of lights change*kwh*0.85', '', '', '', NULL, NULL, NULL, NULL, NULL),
(6, 11, 1, 'No of KMs', '', 'no of km *0.172/1000', '', '', '', NULL, NULL, NULL, NULL, NULL),
(7, 12, 1, 'No of KMs', '', 'no of km *0.172/1000', '', '', '', NULL, NULL, NULL, NULL, NULL),
(8, 13, 1, 'Per KM', '', 'no of km *0.172/1000', '', '', '', NULL, NULL, NULL, NULL, NULL),
(9, 14, 1, 'Per KM', '', 'no of km *0.172/1000', '', '', '', NULL, NULL, NULL, NULL, NULL),
(10, 16, 1, 'Per KM', '', '(115-35)*per km/1000', '', '', '', NULL, NULL, NULL, NULL, NULL),
(11, 19, 1, 'No of bottle', '', '0.04*68 no bottle', '', '', '', NULL, NULL, NULL, NULL, NULL),
(12, 38, 1, 'No of clothes', '', '7*no of clothes', '2700*no of clothes', '', '', NULL, NULL, NULL, NULL, NULL),
(13, 43, 1, 'No of clothes', '', '7*no of clothes', '2700*no of clothes', '', '', NULL, NULL, NULL, NULL, NULL),
(14, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL),
(15, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL),
(16, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL),
(17, 17, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL),
(18, 18, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL),
(19, 20, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL),
(20, 21, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL),
(21, 25, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL),
(22, 28, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL),
(23, 29, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL),
(24, 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL),
(25, 31, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL),
(26, 33, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL),
(27, 34, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL),
(28, 36, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL),
(29, 37, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL),
(30, 39, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL),
(31, 40, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL),
(32, 41, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL),
(33, 44, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL),
(34, 45, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL),
(35, 51, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL),
(36, 54, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL),
(37, 4, NULL, NULL, NULL, '2', '1.7', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(38, 8, NULL, NULL, NULL, '0.6', '0.051', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(39, 9, NULL, NULL, NULL, '5', '4.25', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(40, 10, NULL, NULL, NULL, '2.5', '2.125', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(41, 15, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL),
(42, 22, NULL, NULL, NULL, NULL, '0.03', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(43, 23, NULL, NULL, NULL, NULL, NULL, '22', NULL, NULL, NULL, NULL, NULL, NULL),
(44, 24, NULL, NULL, NULL, NULL, NULL, '30', NULL, NULL, NULL, NULL, NULL, NULL),
(45, 26, NULL, NULL, NULL, NULL, '1.5', '1000', NULL, NULL, NULL, NULL, NULL, NULL),
(46, 27, NULL, NULL, NULL, NULL, '0.6', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(47, 32, NULL, NULL, NULL, NULL, '55', '12000', NULL, NULL, NULL, NULL, NULL, NULL),
(48, 35, NULL, NULL, NULL, '0.2', '0.17', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(49, 42, NULL, NULL, NULL, NULL, '0.18', '6', NULL, NULL, NULL, NULL, NULL, NULL),
(50, 47, NULL, NULL, NULL, NULL, NULL, '5000', '2.3', NULL, NULL, NULL, NULL, NULL),
(51, 48, NULL, NULL, NULL, NULL, '22', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(52, 49, NULL, NULL, NULL, NULL, '22', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(53, 50, NULL, NULL, NULL, NULL, '22', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(54, 52, NULL, NULL, NULL, NULL, NULL, '25', NULL, NULL, NULL, NULL, NULL, NULL),
(55, 53, NULL, NULL, NULL, NULL, NULL, '47', NULL, NULL, NULL, NULL, NULL, NULL),
(56, 46, 1, 'Kg of waste', NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bm_challenge_category`
--

DROP TABLE IF EXISTS `bm_challenge_category`;
CREATE TABLE IF NOT EXISTS `bm_challenge_category` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bm_challenge_categories_name_index` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bm_challenge_category`
--

INSERT INTO `bm_challenge_category` (`id`, `name`, `deleted_at`, `created_at`, `updated_at`) VALUES
(4, 'Go Green', NULL, NULL, NULL),
(5, 'save tree', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bm_challenge_category_detail`
--

DROP TABLE IF EXISTS `bm_challenge_category_detail`;
CREATE TABLE IF NOT EXISTS `bm_challenge_category_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `challenge_category_id` int(11) NOT NULL,
  `bloom_id` varchar(100) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bm_challenge_category_detail`
--

INSERT INTO `bm_challenge_category_detail` (`id`, `challenge_category_id`, `bloom_id`, `title`, `description`, `image`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 5, '48', 'GREEN JUNE CHALLENGE', 'SAVE A TREE, SAVE A LIFE\r\nPLANT A TREE, PLANT A LIFE\r\nPlant or donate a tree at least once a week for the month of June and BLOOM your action. The person with highest number of BLOOMS will win the challenge. So roll up your sleeves and get ready to make JUNE the greenest month of the year.', 'https://www.wikihow.com/images/thumb/d/db/Get-the-URL-for-Pictures-Step-2-Version-6.jpg/v4-460px-Get-the-URL-for-Pictures-Step-2-Version-6.jpg.webp', NULL, NULL, NULL),
(2, 4, NULL, 'challenge 2', 'description 2', 'https://www.wikihow.com/images/thumb/d/db/Get-the-URL-for-Pictures-Step-2-Version-6.jpg/v4-460px-Get-the-URL-for-Pictures-Step-2-Version-6.jpg.webp', NULL, NULL, NULL),
(3, 4, '1', 'challenge 3', 'description 3', 'https://media.wired.com/photos/5b899992404e112d2df1e94e/master/pass/trash2-01.jpg', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bm_followers`
--

DROP TABLE IF EXISTS `bm_followers`;
CREATE TABLE IF NOT EXISTS `bm_followers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `follow_by` int(11) NOT NULL,
  `follow_to` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0 COMMENT '0 - Pending, 1 - Approve, 2 - Cancel',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bm_followers`
--

INSERT INTO `bm_followers` (`id`, `follow_by`, `follow_to`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 16, 2, 0, '2022-04-10 19:53:28', NULL, NULL),
(2, 1, 16, 1, '2022-04-10 20:00:50', '2022-04-10 20:54:51', NULL),
(3, 16, 1, 0, '2022-04-10 21:13:31', NULL, NULL),
(4, 16, 3, 0, '2022-04-11 21:08:13', NULL, NULL),
(5, 2, 16, 1, '2022-04-11 21:27:17', '2022-04-11 21:39:13', NULL),
(6, 8, 16, 1, '2022-04-11 21:39:40', '2022-04-12 20:59:10', '2022-04-16 13:46:46'),
(11, 11, 16, 0, '2022-04-12 20:55:09', NULL, NULL),
(12, 13, 16, 0, '2022-04-12 20:55:38', NULL, NULL),
(13, 14, 16, 0, '2022-04-12 20:55:54', NULL, NULL),
(14, 8, 16, 0, '2022-04-16 13:47:29', NULL, '2022-04-16 13:48:01');

-- --------------------------------------------------------

--
-- Table structure for table `bm_notifications`
--

DROP TABLE IF EXISTS `bm_notifications`;
CREATE TABLE IF NOT EXISTS `bm_notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `relation_id` tinyint(4) NOT NULL DEFAULT 0,
  `type` tinyint(4) NOT NULL DEFAULT 0 COMMENT '1 - bm_posts, 2 - bm_followers',
  `notification` text NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bm_notifications`
--

INSERT INTO `bm_notifications` (`id`, `user_id`, `relation_id`, `type`, `notification`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 3, 0, 0, 'mehul has requested to follow you.', '2022-04-11 21:08:13', NULL, NULL),
(2, 8, 0, 0, 'mehul has requested to follow you.', '2022-04-11 21:27:17', NULL, NULL),
(3, 5, 0, 0, 'Milanhas rejected your follow request.', '2022-04-11 21:37:17', NULL, NULL),
(4, 2, 0, 0, 'mehulhas approved your follow request.', '2022-04-11 21:39:13', NULL, NULL),
(5, 8, 0, 0, 'mehul has requested to follow you.', '2022-04-11 21:39:40', NULL, NULL),
(6, 16, 0, 0, 'Yuvi has liked your post.', '2022-04-11 21:55:23', NULL, NULL),
(7, 16, 0, 0, 'Yuvi has liked your post.', '2022-04-11 21:56:41', NULL, NULL),
(8, 16, 0, 0, 'Yuvi has liked your post.', '2022-04-11 21:56:53', NULL, NULL),
(9, 16, 0, 0, 'mehul has liked your post.', '2022-04-11 21:57:19', NULL, NULL),
(10, 16, 0, 0, 'mehul has liked your post.', '2022-04-11 22:57:05', NULL, NULL),
(11, 13, 0, 0, 'mehul has requested to follow you.', '2022-04-12 20:51:22', NULL, NULL),
(12, 14, 0, 0, 'mehul has requested to follow you.', '2022-04-12 20:52:31', NULL, NULL),
(13, 11, 10, 0, 'mehul has requested to follow you.', '2022-04-12 20:54:13', NULL, NULL),
(14, 11, 11, 0, 'mehul has requested to follow you.', '2022-04-12 20:55:09', NULL, NULL),
(15, 14, 13, 2, 'mehul has requested to follow you.', '2022-04-12 20:55:54', NULL, NULL),
(16, 8, 6, 2, 'mehul has approved your follow request.', '2022-04-12 20:59:10', NULL, NULL),
(17, 16, 0, 0, 'mehul has liked your post.', '2022-04-12 21:01:11', NULL, NULL),
(18, 16, 2, 1, 'Yuvi has liked your post.', '2022-04-12 21:11:28', NULL, NULL),
(19, 8, 14, 2, 'mehul has requested to follow you.', '2022-04-16 13:47:29', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bm_posts`
--

DROP TABLE IF EXISTS `bm_posts`;
CREATE TABLE IF NOT EXISTS `bm_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `bloom_id` varchar(100) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bm_posts`
--

INSERT INTO `bm_posts` (`id`, `user_id`, `bloom_id`, `title`, `description`, `image`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 16, NULL, 'title 1', 'description 1', 'https://bloombugg.com/image/bamboo-q tips-min.jpg\n', '2022-04-10 18:21:42', NULL, NULL),
(2, 1, NULL, 'title 2', 'description 2', 'https://bloombugg.com/image/bamboo-q%20tips-min.jpg', '2022-04-10 18:31:55', NULL, NULL),
(3, 16, NULL, NULL, NULL, NULL, '2022-04-12 21:54:02', NULL, NULL),
(4, 16, NULL, 'dfggfg', 'dfgdfgdfg', 'https://bloombugg.com/image/bamboo-q tips-min.jpg\n', '2022-04-16 10:51:26', NULL, NULL),
(5, 1, '1', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523707282261.jpg', NULL, NULL, NULL),
(6, 1, '1', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523708206001.jpg', NULL, NULL, NULL),
(7, 1, '2', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523709118281.jpg', NULL, NULL, NULL),
(8, 1, '3', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523709159011.jpg', NULL, NULL, NULL),
(9, 1, '4', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523709194661.jpg', NULL, NULL, NULL),
(10, 1, '5', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523709227801.jpg', NULL, NULL, NULL),
(11, 1, '6', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523709260401.jpg', NULL, NULL, NULL),
(12, 1, '3', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523709288201.jpg', NULL, NULL, NULL),
(13, 1, '1', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523709333201.jpg', NULL, NULL, NULL),
(14, 1, '7', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523709372631.jpg', NULL, NULL, NULL),
(15, 1, '7', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523709390661.jpg', NULL, NULL, NULL),
(16, 1, '2', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523709427591.jpg', NULL, NULL, NULL),
(17, 1, '2', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523709434071.jpg', NULL, NULL, NULL),
(18, 1, '2', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523709440461.jpg', NULL, NULL, NULL),
(19, 1, '2', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523713121671.jpg', NULL, NULL, NULL),
(20, 1, '3', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523739274791.jpg', NULL, NULL, NULL),
(21, 1, '11', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523746654421.jpg', NULL, NULL, NULL),
(22, 1, '23', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523746771991.jpg', NULL, NULL, NULL),
(23, 1, '54', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523746812941.jpg', NULL, NULL, NULL),
(24, 1, '13', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523746847391.jpg', NULL, NULL, NULL),
(25, 1, '33', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523746890211.jpg', NULL, NULL, NULL),
(26, 1, '33', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523746917341.jpg', NULL, NULL, NULL),
(27, 1, '15', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523746957281.jpg', NULL, NULL, NULL),
(28, 1, '15', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523746962861.jpg', NULL, NULL, NULL),
(29, 1, '15', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523746968361.jpg', NULL, NULL, NULL),
(30, 1, '18', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523747013591.jpg', NULL, NULL, NULL),
(31, 1, '18', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523747018941.jpg', NULL, NULL, NULL),
(32, 1, '18', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523747023051.jpg', NULL, NULL, NULL),
(33, 1, '18', NULL, NULL, 'http://65.0.178.216/bloom/uploads16523747027001.jpg', NULL, NULL, NULL),
(34, 1, '18', NULL, NULL, 'http://65.0.178.216/bloom/uploads16525216170051.jpg', NULL, NULL, NULL),
(35, 1, '1', NULL, NULL, 'http://65.0.178.216/bloom/uploads16525216458821.jpg', NULL, NULL, NULL),
(36, 1, '1', NULL, NULL, 'http://65.0.178.216/bloom/uploads16525226238661.jpg', NULL, NULL, NULL),
(37, 1, '1', NULL, NULL, 'http://65.0.178.216/bloom/uploads16525226636991.jpg', NULL, NULL, NULL),
(38, 1, '1', NULL, NULL, 'http://65.0.178.216/bloom/uploads16525227251901.jpg', NULL, NULL, NULL),
(39, 1, '1', NULL, NULL, 'http://65.0.178.216/bloom/uploads16525227562871.jpg', NULL, NULL, NULL),
(40, 1, '1', NULL, NULL, 'http://65.0.178.216/bloom/uploads16525229245621.jpg', NULL, NULL, NULL),
(41, 1, '1', NULL, NULL, 'http://65.0.178.216/bloom/uploads16525229692491.jpg', NULL, NULL, NULL),
(42, 1, '1', NULL, NULL, 'http://65.0.178.216/bloom/uploads16525229965871.jpg', NULL, NULL, NULL),
(43, 1, '1', NULL, NULL, 'http://65.0.178.216/bloom/uploads16525230162731.jpg', NULL, NULL, NULL),
(44, 1, '1', NULL, NULL, 'http://65.0.178.216/bloom/uploads16525230252571.jpg', NULL, NULL, NULL),
(45, 1, '1', NULL, NULL, 'http://65.0.178.216/bloom/uploads16525231138291.jpg', NULL, NULL, NULL),
(46, 1, '1', NULL, NULL, 'http://65.0.178.216/bloom/uploads16525231267601.jpg', NULL, NULL, NULL),
(47, 1, '1', NULL, NULL, 'http://65.0.178.216/bloom/uploads16525232937251.jpg', NULL, NULL, NULL),
(48, 1, '1', NULL, NULL, 'http://65.0.178.216/bloom/uploads16525233145271.jpg', NULL, NULL, NULL),
(49, 1, '1', NULL, NULL, 'http://65.0.178.216/bloom/uploads16525233266511.jpg', NULL, NULL, NULL),
(50, 1, '1', NULL, NULL, 'http://65.0.178.216/bloom/uploads16525233561191.jpg', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bm_post_comments`
--

DROP TABLE IF EXISTS `bm_post_comments`;
CREATE TABLE IF NOT EXISTS `bm_post_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bm_post_comments`
--

INSERT INTO `bm_post_comments` (`id`, `user_id`, `post_id`, `comment`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 16, 2, 'nice', '2022-04-11 20:46:08', NULL, NULL),
(2, 16, 2, 'good', '2022-04-11 20:46:44', NULL, NULL),
(3, 16, 1, 'good', '2022-04-11 20:47:10', NULL, NULL),
(4, 16, 1, 'good', '2022-04-11 21:18:48', NULL, NULL),
(5, 16, 1, 'nice', '2022-04-11 21:25:59', NULL, NULL),
(6, 6, 1, 'Usre', NULL, NULL, NULL),
(7, 6, 1, 'Adding Comment', '2022-05-07 13:14:08', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bm_post_like_unlike`
--

DROP TABLE IF EXISTS `bm_post_like_unlike`;
CREATE TABLE IF NOT EXISTS `bm_post_like_unlike` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL COMMENT '1 - like, 2 - Unlike',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bm_post_like_unlike`
--

INSERT INTO `bm_post_like_unlike` (`id`, `user_id`, `post_id`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(0, 6, 2, 0, '2022-05-03 16:14:57', '2022-05-03 16:15:13', NULL),
(1, 16, 1, 1, '2022-04-12 21:10:41', '2022-04-12 21:11:09', NULL),
(2, 16, 2, 1, '2022-04-12 21:11:28', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bm_rewards`
--

DROP TABLE IF EXISTS `bm_rewards`;
CREATE TABLE IF NOT EXISTS `bm_rewards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reward_category_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `start_date` varchar(255) NOT NULL,
  `end_date` varchar(255) NOT NULL,
  `promo_code` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  `vendor_id` varchar(10) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bm_rewards`
--

INSERT INTO `bm_rewards` (`id`, `reward_category_id`, `title`, `description`, `start_date`, `end_date`, `promo_code`, `image`, `vendor_id`, `is_active`, `created_at`, `deleted_at`) VALUES
(1, 1, 'Tommy Hilfiger', 'RS 1000 free on 2000 shopping', '10-12-2021', '10-01-2022', 'AHGF5SDS55DSDS5SD', 'https://1000logos.net/wp-content/uploads/2017/06/Tommy-Hilfiger-Logo.png', '1', 1, NULL, NULL),
(2, 2, 'Better Luck Next Time', 'Better Luck Next Time', '31-01-2011', '10-01-2012', 'SDS4DS4F5FDFD45', 'https://1.bp.blogspot.com/-9UH0JId3P-M/VzdaJjMqIYI/AAAAAAAAStc/p34EFcGshl0jT926XSL6MMSO4w6wgtdQQCLcB/s1600/sorrowful-emoji.png', '1', 1, NULL, NULL),
(3, 1, 'ZARA', 'RS 2 khokha off on buy RS 10 khokha', '25-10-2021', '25-11-2021', 'ASA1SD14DE1EFD1F', 'https://1000logos.net/wp-content/uploads/2017/05/Zara-log%D0%BE.jpg', '2', 1, NULL, NULL),
(4, 1, 'ZARA1', '$1000 Flat on $10000 buy', '29-05-2020', '30-06-2020', 'BVUHG455SADCS54FD', 'https://www.strategyzer.com/hubfs/zara-large.jpg', '2', 1, '2022-05-02 10:17:51', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bm_reward_category`
--

DROP TABLE IF EXISTS `bm_reward_category`;
CREATE TABLE IF NOT EXISTS `bm_reward_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_active` int(11) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bm_reward_category`
--

INSERT INTO `bm_reward_category` (`id`, `name`, `image`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'appear', NULL, NULL, 1, NULL, NULL),
(2, 'food', NULL, NULL, 1, NULL, NULL),
(3, 'travel', NULL, NULL, 1, NULL, NULL),
(4, 'electronics', NULL, NULL, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bm_saved_post`
--

DROP TABLE IF EXISTS `bm_saved_post`;
CREATE TABLE IF NOT EXISTS `bm_saved_post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bm_saved_post`
--

INSERT INTO `bm_saved_post` (`id`, `user_id`, `post_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 16, 1, '2022-04-12 22:38:38', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bm_story`
--

DROP TABLE IF EXISTS `bm_story`;
CREATE TABLE IF NOT EXISTS `bm_story` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bm_story`
--

INSERT INTO `bm_story` (`id`, `user_id`, `title`, `image`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 16, 'title 1', 'https://bloombugg.com/image/Upclycling-min.jpg\n', '2022-04-10 18:46:45', NULL, NULL),
(2, 1, 'title 2', 'https://bloombugg.com/image/Upclycling-min.jpg\n', '2022-04-10 21:19:37', NULL, NULL),
(3, 16, 'title 3', 'https://bloombugg.com/image/Upclycling-min.jpg\n', '2022-04-11 21:26:40', NULL, NULL),
(4, 16, 'dgdgfg', 'https://bloombugg.com/image/Upclycling-min.jpg\n', '2022-04-16 13:33:40', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bm_users`
--

DROP TABLE IF EXISTS `bm_users`;
CREATE TABLE IF NOT EXISTS `bm_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `dob` varchar(30) DEFAULT NULL,
  `about_you` longtext DEFAULT NULL,
  `city` text DEFAULT NULL,
  `mobile_no` varchar(15) NOT NULL,
  `profile_img` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `type` varchar(20) NOT NULL,
  `is_blocked` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bm_users`
--

INSERT INTO `bm_users` (`id`, `name`, `email`, `dob`, `about_you`, `city`, `mobile_no`, `profile_img`, `password`, `is_active`, `type`, `is_blocked`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Umang', 'umangvariya7@gmail.com', '19/06/2001', '', '', '7878129383', NULL, '$2b$10$HpnM524zBwdQ3Fc2jBE1YuDDMop2l6W4LRXaQFKaE5ZZNbisDxS92', 1, '', 0, '2022-04-12 10:40:57', '2022-04-12 10:46:14', '2022-04-15 12:42:32'),
(2, 'Milan', 'milan@gmail.com', '05/03/2001', '', '', '9726706040', NULL, '$2b$10$3QLLn4vAIjf3m.n.sOSFEu.q9xl8OCHcjrFedJTG9UlSrCY6rBTvm', 1, '', 0, '2022-04-12 10:41:57', '2022-04-12 10:48:35', NULL),
(3, 'Jainin', 'jainin@gmail.com', '05/11/2000', '', '', '7226958803', NULL, '$2b$10$m7p4L70ajgyT9X1tdPxMduye1zFDqF2UQE76RBuKvjIy/T8a/JmZu', 1, '', 0, '2022-04-12 10:42:38', '2022-04-12 10:48:04', NULL),
(4, 'Yash', 'yash@gmail.com', '28/02/2001', '', '', '7802002290', NULL, '$2b$10$SnH1Z2Y8StcTta43HPGDSOI0NTAT/eFzy57aMSYooDlxVlHluGAg.', 1, '', 0, '2022-04-12 10:43:15', '2022-04-12 10:49:20', NULL),
(5, 'Jasmin', 'jasmin@gmail.com', '03/08/2001', '', '', '8849535544', NULL, '$2b$10$q.55nYPGEYy.70DUQ9o4cOUrCji0ac0ZA3/c535TPfmfsqGwoeSWK', 1, '', 0, '2022-04-12 10:43:49', '2022-04-12 10:50:05', NULL),
(6, 'Raj Kumar Rao', 'raj@gmail.com', '05/04/1994', 'happy to help you', 'surat', '9328780020', NULL, '$2b$10$XIE4iHD/oovInGeKZ4jvVuGvaFRb/Psw1Z/cBKR9exzrngRbmFK.C', 1, '', 0, '2022-04-12 10:44:18', '2022-05-08 12:48:59', NULL),
(7, 'Darpan', 'darpan@gmail.com', '12/11/1997', '', '', '7621980121', NULL, '$2b$10$M0pm8Y9koqvPC71xAx8ihu6B7M/jVKHugRafHrBQDqdIBvh1vAQma', 1, '', 0, '2022-04-12 10:44:46', '2022-04-12 10:51:22', NULL),
(8, 'Darpan', 'admin@gmail.com', '12/11/1997', '', '', '7621980122', NULL, '$2b$10$mIyrwr8Is/i0TRNULJP.XeJvpO.0dAEHj59OhqL23x1KyAR/hQ/ly', 1, '', 0, '2022-04-15 12:24:23', '2022-04-15 12:41:21', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bm_user_rewards`
--

DROP TABLE IF EXISTS `bm_user_rewards`;
CREATE TABLE IF NOT EXISTS `bm_user_rewards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `reward_id` int(11) NOT NULL,
  `bloom_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bm_user_rewards`
--

INSERT INTO `bm_user_rewards` (`id`, `user_id`, `reward_id`, `bloom_id`, `created_at`, `deleted_at`) VALUES
(1, 1, 3, 5, '2022-05-15 10:15:22', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bm_vendors`
--

DROP TABLE IF EXISTS `bm_vendors`;
CREATE TABLE IF NOT EXISTS `bm_vendors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_no` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `create_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bm_vendors`
--

INSERT INTO `bm_vendors` (`id`, `first_name`, `last_name`, `email`, `password`, `phone_no`, `address`, `company_name`, `is_active`, `create_at`) VALUES
(1, 'Umang', 'Variya', 'umang@gmail.com', '$2b$10$0tia77hp.YEs6KzfpPvt2OEA7OyEqVUiXOgXHK2mByp3nTR9EZPla', '7878129383', 'Surat', 'Innovate', 0, '2022-04-29 13:27:19'),
(2, 'Umang', 'Variya', 'umang1@gmail.com', '$2b$10$mwx10axmi1A80Yb8Cq3Q..cM2j3xbtFDkUHD9.EtTenUnFUeGfH06', '7878139383', 'Surat', 'Innovate', 1, '2022-04-29 17:18:05'),
(3, 'Yyy', 'Yyyy', 'darpanpatel2018@gmail.com', '$2b$10$4Gals8U/loSMmeABX.xg5ObSeKhmagQvA7iKXwHb/n.hh9M/fTzZy', '6621980121', 'e-501', 'Uus', 0, '2022-05-07 12:37:56'),
(4, 'rahulbhai', 'patel', 'rahul@gmail.com', '$2b$10$BEItVOAVA4IIdfbvyUOCuuZ2EL91tWt2JjpiWfMSECrAjecxLfEFa', '7894561230', 'adajan', 'rajaram', 1, '2022-05-10 08:21:10');

-- --------------------------------------------------------

--
-- Table structure for table `user_bloom_category`
--

DROP TABLE IF EXISTS `user_bloom_category`;
CREATE TABLE IF NOT EXISTS `user_bloom_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bloom_category_id` int(11) NOT NULL,
  `bloom_category_detail_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `is_bloom` int(11) NOT NULL DEFAULT 0,
  `user_answer` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_bloom_category`
--

INSERT INTO `user_bloom_category` (`id`, `bloom_category_id`, `bloom_category_detail_id`, `user_id`, `is_bloom`, `user_answer`, `created_at`) VALUES
(1, 1, 1, 1, 1, '[7,3]', '2022-05-12 15:53:40'),
(2, 1, 2, 1, 1, '[7,3]', '2022-05-12 15:55:11'),
(3, 1, 3, 1, 1, '[7,3]', '2022-05-12 15:55:15'),
(4, 1, 4, 1, 1, '[7,3]', '2022-05-12 15:55:19'),
(5, 1, 1, 3, 1, '[7,3]', '2022-05-12 15:55:22'),
(6, 1, 1, 3, 1, '[7,3]', '2022-05-12 15:55:26'),
(7, 1, 3, 1, 1, '[7,3]', '2022-05-12 15:55:28'),
(8, 1, 1, 2, 1, '[7,3]', '2022-05-12 15:55:33'),
(9, 1, 7, 1, 1, '[7,3]', '2022-05-12 15:55:37'),
(10, 1, 7, 1, 1, '[7,3]', '2022-05-12 15:55:39'),
(11, 1, 1, 1, 1, '[7,3]', '2022-05-12 15:55:42'),
(12, 1, 2, 1, 1, '[7,3]', '2022-05-12 15:55:43'),
(13, 1, 2, 1, 1, '[7,3]', '2022-05-12 15:55:44'),
(14, 1, 2, 1, 1, '[7,3]', '2022-05-12 16:01:04'),
(15, 1, 2, 1, 1, '[7,3]', '2022-05-12 16:01:39'),
(16, 1, 2, 1, 1, '[7,3]', '2022-05-12 16:01:52'),
(17, 1, 3, 1, 1, '[7,3]', '2022-05-12 16:45:27'),
(18, 2, 11, 1, 1, '[7,3]', '2022-05-12 16:57:45'),
(19, 7, 23, 1, 1, '[7,3]', '2022-05-12 16:57:57'),
(20, 3, 54, 1, 1, '[7,3]', '2022-05-12 16:58:01'),
(21, 2, 13, 1, 1, '[7,3]', '2022-05-12 16:58:04'),
(22, 4, 33, 1, 1, '[7,3]', '2022-05-12 16:58:09'),
(23, 4, 33, 1, 1, '[7,3]', '2022-05-12 16:58:11'),
(24, 2, 15, 1, 1, '[7,3]', '2022-05-12 16:58:15'),
(25, 2, 15, 1, 1, '[7,3]', '2022-05-12 16:58:16'),
(26, 2, 15, 1, 1, '[7,3]', '2022-05-12 16:58:16'),
(27, 3, 18, 1, 1, '[7,3]', '2022-05-12 16:58:21'),
(28, 3, 18, 1, 1, '[7,3]', '2022-05-12 16:58:21'),
(29, 3, 18, 1, 1, '[7,3]', '2022-05-12 16:58:22'),
(30, 3, 18, 1, 1, '[7,3]', '2022-05-12 16:58:22'),
(31, 3, 18, 1, 1, '[7,3]', '2022-05-14 09:46:57'),
(32, 1, 1, 1, 1, '[7,3]', '2022-05-14 09:47:25'),
(33, 1, 1, 1, 1, '[7,3]', '2022-05-14 10:03:43'),
(34, 1, 1, 1, 1, '[7,3]', '2022-05-14 10:04:23'),
(35, 1, 1, 1, 1, '[7,3]', '2022-05-14 10:05:25'),
(36, 1, 1, 1, 1, '[7,3]', '2022-05-14 10:05:56'),
(37, 1, 1, 1, 1, '[7,3]', '2022-05-14 10:08:44'),
(38, 1, 1, 1, 1, '[7,3]', '2022-05-14 10:09:29'),
(39, 1, 1, 1, 1, '[7,3]', '2022-05-14 10:09:56'),
(40, 1, 1, 1, 1, '[7,3]', '2022-05-14 10:10:16'),
(41, 1, 1, 1, 1, '[7,3]', '2022-05-14 10:10:25'),
(42, 1, 1, 1, 1, '[7,3]', '2022-05-14 10:11:53'),
(43, 1, 1, 1, 1, '[7,3]', '2022-05-14 10:12:06'),
(44, 1, 1, 1, 1, '[7,3]', '2022-05-14 10:14:53'),
(45, 1, 1, 1, 1, '[7,3]', '2022-05-14 10:15:14'),
(46, 1, 1, 1, 1, '[7,3]', '2022-05-14 10:15:26'),
(47, 1, 1, 1, 1, '[7,3]', '2022-05-14 10:15:56');

-- --------------------------------------------------------

--
-- Table structure for table `user_challenge_category`
--

DROP TABLE IF EXISTS `user_challenge_category`;
CREATE TABLE IF NOT EXISTS `user_challenge_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `challenge_category_detail_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `is_join` varchar(100) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_challenge_category`
--

INSERT INTO `user_challenge_category` (`id`, `challenge_category_detail_id`, `user_id`, `is_join`, `created_at`) VALUES
(1, 3, 1, '1', '2022-05-12 19:51:14'),
(4, 3, 3, '1', '2022-05-12 21:24:52'),
(3, 3, 2, '1', '2022-05-12 21:24:46');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
