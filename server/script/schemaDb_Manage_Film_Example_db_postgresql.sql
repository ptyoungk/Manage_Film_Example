--
-- Database: manage_film_example_db
--

CREATE DATABASE manage_film_example_db;

-- ENTITIES

--
-- Schema entity actor
--

CREATE TABLE IF NOT EXISTS "actor" (
	birthDate date ,
	name varchar(130)  NOT NULL,
	surname varchar(130) ,
	
	_id SERIAL PRIMARY KEY

);

--
-- Schema entity film
--

CREATE TABLE IF NOT EXISTS "film" (
	genre varchar(130) ,
	title varchar(130)  NOT NULL,
	year numeric ,
	
	_id SERIAL PRIMARY KEY

);

--
-- Schema entity filmmaker
--

CREATE TABLE IF NOT EXISTS "filmmaker" (
	name varchar(130)  NOT NULL,
	surname varchar(130) ,
	
	_id SERIAL PRIMARY KEY

);

--
-- Schema entity user
--

CREATE TABLE IF NOT EXISTS "user" (
	mail varchar(130) ,
	name varchar(130) ,
	password varchar(130)  NOT NULL,
	roles varchar(130) ,
	surname varchar(130) ,
	username varchar(130)  NOT NULL,
	
	_id SERIAL PRIMARY KEY

);


-- Security

ALTER TABLE "user" ALTER COLUMN "password" TYPE varchar(128);

INSERT INTO "user" (username, password, _id) VALUES ('admin', '62f264d7ad826f02a8af714c0a54b197935b717656b80461686d450f7b3abde4c553541515de2052b9af70f710f0cd8a1a2d3f4d60aa72608d71a63a9a93c0f5', 1);

CREATE TABLE IF NOT EXISTS "roles" (
	role varchar(30) ,
	
	-- RELAZIONI

	_user INTEGER  NOT NULL REFERENCES "user"(_id),
	_id SERIAL PRIMARY KEY 

);
INSERT INTO "roles" (role, _user, _id) VALUES ('ADMIN', '1', 1);




-- relation 1:m filmMaker Film - FilmMaker
ALTER TABLE film ADD COLUMN filmMaker INTEGER  NOT NULL REFERENCES "filmmaker"(_id);

-- relation m:m cast Film - Actor
CREATE TABLE IF NOT EXISTS "Film_cast" (
    _id SERIAL PRIMARY KEY,
    id_Film INTEGER  NOT NULL REFERENCES "film"(_id),
    id_Actor INTEGER  NOT NULL REFERENCES "actor"(_id)
);
