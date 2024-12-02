CREATE DATABASE achadosperdidos;
use achadosperdidos;

drop database achadosperdidos;
drop table usuario;
drop table objeto;

create table usuario (
	id_usuario int primary key auto_increment,
      nome_usuario varchar(70) not null,
    cpf_usuario varchar(11) not null,
    senha_usuario varchar(15) not null,
    tipo_usuario enum('administrador', 'funcionario'));

create table objeto (
	id_objeto int primary key auto_increment not null,
    nome_objeto varchar(30) not null,
    hora_entrada time,
    data_entrada date,
    descricao varchar(100) not null,
    foto varchar(100),
	status enum('achado', 'perdido') DEFAULT('perdido')
);

INSERT INTO objeto (nome_objeto, hora_entrada, data_entrada, descricao, foto, status)
VALUES
('Garrafa Stanley', '10:00', '2024-11-12', 'Garrafa de metal grande', '1732543560489_garrafa-tupperware.jpg', DEFAULT),
('Garrafa Farm', '12:30', '2024-11-13', 'Garrafa rosa decorada', 'garrafa-farm.jpg', DEFAULT);

INSERT INTO objeto (nome_objeto, hora_entrada, data_entrada, descricao, foto, status)
VALUES ('Garrafa Pacco', '13:30', '2024-11-14', 'Garrafa azul marinho', '1732543506875_214795-800-450.jpg', DEFAULT),
  ('Garrafa Tupperware','17:15', '2024-11-15', 'Garrafa vermelho vinho', '1732543560489_garrafa-tupperware.jpg', DEFAULT);
  
INSERT INTO usuario (nome_usuario, cpf_usuario, senha_usuario, tipo_usuario) 
VALUES ('GUSTAVO RESERVA', '12345678901', '54321', 'administrador'),
('GREGORY MELOSO', '40582493857', '67890', 'funcionario'),
('CREUSA SOUZA', '7534283714', '12134', 'funcionario');
 
UPDATE objeto SET status = 'achado' WHERE id_objeto = 1;
UPDATE objeto SET status = 'achado' WHERE id_objeto = 3;
UPDATE objeto SET status = 'achado' WHERE id_objeto = 5;
SELECT foto FROM objeto WHERE id_objeto = 3;

SELECT data_entrada FROM objeto WHERE id_objeto = 5;


  SELECT * FROM objeto WHERE id_objeto = 1;
select * from usuario;
select * from objeto;
