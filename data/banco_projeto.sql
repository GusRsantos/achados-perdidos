CREATE DATABASE achadosperdidos;
use achadosperdidos;
CREATE DATABASE achadosperdidos;
use achadosperdidos;

create table usuario (
	id_usuario int primary key auto_increment,
    cpf_usuario varchar(11) not null,
    nome_usuario varchar(70) not null,
    senha_usuario varchar(15) not null,
    tipo_usuario enum('administrador', 'gerente', 'funcionario'));


create table objeto (
	id_objeto int primary key auto_increment not null,
    nome_objeto varchar(30) not null,
    hora_entrada time,
    descricao varchar(100) not null,
    foto varchar(100),
	status enum('achado', 'perdido') DEFAULT('perdido')
);


INSERT INTO objeto (nome_objeto, hora_entrada, descricao, status)
VALUES
('Garrafa Stanley', '10:00', 'Garrafa de metal grande', DEFAULT),
('Garrafa Farm', '12:30', 'Garrafa rosa decorada', DEFAULT);

INSERT INTO objeto (nome_objeto, hora_entrada, descricao, status)
VALUES ('Garrafa Pacco', '13:30', 'Garrafa azul marinho', DEFAULT),
  ('Garrafa Tupperware','17:15', 'Garrafa vermelho vinho', DEFAULT);

select * from adm;
select * from objeto;
