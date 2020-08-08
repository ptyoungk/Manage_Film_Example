--
-- Database: `manage_film_example_db`
--

CREATE DATABASE IF NOT EXISTS `manage_film_example_db`;
USE `manage_film_example_db`;


-- ENTITIES

--
-- Struttura della tabella `actor`
--

CREATE TABLE IF NOT EXISTS `actor` (
	`birthDate` date ,
	`name` varchar(130)  NOT NULL,
	`surname` varchar(130) ,
	
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);


--
-- Struttura della tabella `film`
--

CREATE TABLE IF NOT EXISTS `film` (
	`genre` varchar(130) ,
	`title` varchar(130)  NOT NULL,
	`year` numeric ,
	
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);


--
-- Struttura della tabella `filmmaker`
--

CREATE TABLE IF NOT EXISTS `filmmaker` (
	`name` varchar(130)  NOT NULL,
	`surname` varchar(130) ,
	
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);


--
-- Struttura della tabella `user`
--

CREATE TABLE IF NOT EXISTS `user` (
	`mail` varchar(130) ,
	`name` varchar(130) ,
	`password` varchar(130)  NOT NULL,
	`roles` varchar(130) ,
	`surname` varchar(130) ,
	`username` varchar(130)  NOT NULL,
	
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);


-- Security

ALTER TABLE `user` MODIFY COLUMN `password` varchar(128)  NOT NULL;

INSERT INTO `manage_film_example_db`.`user` (`username`, `password`, `_id`) VALUES ('admin', '62f264d7ad826f02a8af714c0a54b197935b717656b80461686d450f7b3abde4c553541515de2052b9af70f710f0cd8a1a2d3f4d60aa72608d71a63a9a93c0f5', 1);

CREATE TABLE IF NOT EXISTS `roles` (
	`role` varchar(30) ,
	
	-- RELAZIONI

	`_user` int(11)  NOT NULL REFERENCES user(_id),
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);
INSERT INTO `manage_film_example_db`.`roles` (`role`, `_user`, `_id`) VALUES ('ADMIN', '1', 1);





-- relation 1:m filmMaker Film - FilmMaker
ALTER TABLE `film` ADD COLUMN `filmMaker` int(11)  NOT NULL REFERENCES filmmaker(_id);

-- relation m:m cast Film - Actor
CREATE TABLE IF NOT EXISTS `Film_cast` (
    `_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `id_Film` int(11)  NOT NULL REFERENCES film(_id),
    `id_Actor` int(11)  NOT NULL REFERENCES actor(_id)
);


