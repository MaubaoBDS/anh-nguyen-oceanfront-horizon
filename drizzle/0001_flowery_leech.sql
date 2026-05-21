CREATE TABLE `leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`phone` varchar(30) NOT NULL,
	`interest` varchar(100),
	`budget` varchar(100),
	`note` text,
	`source` varchar(50) NOT NULL DEFAULT 'form',
	`status` enum('new','contacted','interested','not_interested','closed') NOT NULL DEFAULT 'new',
	`adminNote` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
