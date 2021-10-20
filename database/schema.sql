DROP DATABASE IF EXISTS groceries;

CREATE DATABASE groceries;

USE groceries;

create table groceries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  item VARCHAR (200),
  quantity INT,
);


