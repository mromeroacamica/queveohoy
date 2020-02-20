create database queveohoy;
use queveohoy;
create table pelicula(
id int NOT NULL AUTO_INCREMENT,
titulo VARCHAR(100),
duracion INT(5),
director VARCHAR(400),
anio INT(5),
fecha_lanzamiento DATE,
puntuacion INT(2),
poster VARCHAR(300),
trama VARCHAR(700),
PRIMARY KEY (id)
);

create table genero(
id INT NOT NULL auto_increment,
nombre VARCHAR (30),
PRIMARY KEY (id));
ALTER TABLE pelicula ADD column genero_id int;
ALTER TABLE pelicula
ADD FOREIGN KEY (genero_id) REFERENCES genero(id);

create table actor(
id INT NOT NULL auto_increment,
nombre VARCHAR (70),
PRIMARY KEY (id)
);

create table actor_pelicula(
id INT NOT NULL auto_increment,
actor_id INT,
pelicula_id INT,
PRIMARY KEY (id)
);
ALTER TABLE actor_pelicula
ADD FOREIGN KEY (actor_id) REFERENCES actor(id);
ALTER TABLE actor_pelicula
ADD FOREIGN KEY (pelicula_id) REFERENCES pelicula(id);


