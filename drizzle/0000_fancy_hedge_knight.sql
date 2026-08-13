CREATE TABLE `ai_services` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`description` text,
	`features` text,
	`industries` text,
	`pricingType` varchar(100),
	`images` text,
	`caseStudy` text,
	`featured` int DEFAULT 0,
	`status` enum('draft','published') DEFAULT 'draft',
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ai_services_id` PRIMARY KEY(`id`),
	CONSTRAINT `ai_services_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `fashion_products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`description` text,
	`price` int,
	`discount` int,
	`category` varchar(100),
	`fabric` varchar(100),
	`sizes` text,
	`colors` text,
	`stock` int,
	`sku` varchar(100),
	`mainImage` varchar(500),
	`galleryImages` text,
	`featured` int DEFAULT 0,
	`status` enum('draft','published','out_of_stock','archived') DEFAULT 'draft',
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `fashion_products_id` PRIMARY KEY(`id`),
	CONSTRAINT `fashion_products_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `inspection_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`customerName` varchar(255) NOT NULL,
	`phone` varchar(20),
	`email` varchar(255),
	`propertyId` int,
	`date` timestamp,
	`time` varchar(50),
	`status` enum('pending','confirmed','completed','cancelled','rescheduled') DEFAULT 'pending',
	`message` text,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `inspection_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`phone` varchar(20),
	`email` varchar(255),
	`branch` varchar(100),
	`service` varchar(255),
	`source` varchar(100),
	`status` enum('new','contacted','qualified','proposal','converted','lost','archived') DEFAULT 'new',
	`date` timestamp DEFAULT (now()),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media_library` (
	`id` int AUTO_INCREMENT NOT NULL,
	`filename` varchar(255) NOT NULL,
	`url` varchar(500) NOT NULL,
	`key` varchar(255) NOT NULL,
	`mimeType` varchar(100),
	`size` int,
	`altText` varchar(255),
	`description` text,
	`uploadedBy` int,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `media_library_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255),
	`phone` varchar(20),
	`branch` varchar(100),
	`service` varchar(255),
	`message` text,
	`read` int DEFAULT 0,
	`date` timestamp DEFAULT (now()),
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`description` text,
	`category` enum('fashion','ai','realestate'),
	`clientName` varchar(255),
	`images` text,
	`date` timestamp,
	`featured` int DEFAULT 0,
	`status` enum('draft','published') DEFAULT 'draft',
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`),
	CONSTRAINT `projects_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `properties` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`description` text,
	`price` int,
	`location` varchar(255),
	`state` varchar(100),
	`city` varchar(100),
	`area` varchar(100),
	`type` varchar(100),
	`transactionType` enum('for_sale','for_rent','lease','investment'),
	`bedrooms` int,
	`bathrooms` int,
	`landSize` varchar(100),
	`features` text,
	`images` text,
	`floorPlan` varchar(500),
	`video` varchar(500),
	`latitude` varchar(50),
	`longitude` varchar(50),
	`documentation` varchar(100),
	`agentPhone` varchar(20),
	`status` enum('available','reserved','sold','rented','unavailable') DEFAULT 'available',
	`featured` int DEFAULT 0,
	`published` int DEFAULT 0,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `properties_id` PRIMARY KEY(`id`),
	CONSTRAINT `properties_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
