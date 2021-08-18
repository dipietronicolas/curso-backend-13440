/* 1) Crear base de datos */

CREATE DATABASE prueba


/* 2) Crear tabla */

CREATE TABLE items (
    id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    categoria VARCHAR(30) NOT NULL,
    stock INT UNSIGNED NOT NULL
);


/* 3) Consultas INSERT */ 

INSERT INTO items (nombre, categoria, stock) 
VALUES ('Fideos', 'Harina', 20)

INSERT INTO items (nombre, categoria, stock) 
VALUES ('Leche', 'Lacteos', 30)

INSERT INTO items (nombre, categoria, stock) 
VALUES ('Crema', 'Lacteos', 15)


/* 4) SELECT all */ 

SELECT * FROM items


/* 5) DELETE Statement */ 

DELETE FROM items WHERE id = 1


/* 6) UPDATE Record */ 

UPDATE items SET stock = 45 WHERE id = 2