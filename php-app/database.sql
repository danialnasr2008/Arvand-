-- Database Schema for Arvand Financial Academy PHP MVC
-- UTF-8 General CI

CREATE DATABASE IF NOT EXISTS `arvand_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci;
USE `arvand_db`;

-- 1. Users Table (Admin Panel)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- 3. Posts Table (Articles / News)
CREATE TABLE IF NOT EXISTS `posts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `summary` TEXT NOT NULL,
  `content` LONGTEXT NOT NULL,
  `category_id` INT,
  `image_url` VARCHAR(255) DEFAULT 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200',
  `views` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- 4. Comments Table
CREATE TABLE IF NOT EXISTS `comments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `post_id` INT NOT NULL,
  `author_name` VARCHAR(100) NOT NULL,
  `content` TEXT NOT NULL,
  `is_approved` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- 5. Service Requests Table
CREATE TABLE IF NOT EXISTS `service_requests` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(150) NOT NULL,
  `company_name` VARCHAR(150) NULL,
  `position` VARCHAR(100) NULL,
  `phone` VARCHAR(20) NOT NULL,
  `email` VARCHAR(100) NULL,
  `city` VARCHAR(100) NULL,
  `business_type` VARCHAR(100) NULL,
  `business_status` VARCHAR(100) NULL,
  `request_subject` VARCHAR(100) NULL,
  `priority` VARCHAR(50) NOT NULL DEFAULT 'immediate',
  `annual_turnover` VARCHAR(100) NULL,
  `complexity` VARCHAR(50) NOT NULL DEFAULT 'simple',
  `description` TEXT NOT NULL,
  `contact_method` VARCHAR(50) NOT NULL DEFAULT 'phone',
  `status` VARCHAR(50) NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- Seed Categories
INSERT INTO `categories` (`id`, `name`, `slug`) VALUES
(1, 'عمومی', 'general'),
(2, 'مالیات و مودیان', 'tax-laws'),
(3, 'حسابداری و مالی', 'accounting'),
(4, 'قوانین کار و بیمه', 'labor-laws'),
(5, 'سرمایه‌گذاری و بودجه', 'investment')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);
