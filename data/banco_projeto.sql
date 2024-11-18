REATE DATABASE achadosperdidos;
use achadosperdidos;

create table usuario (
	id_usuario int not null primary key auto_increment,
    cpf_usuario varchar(11) not null,
    nome_usuario varchar(70) not null,
    senha_usuario varchar(15) not null,
    tipo_usuario enum('administrador', 'gerente', 'funcionario'));

drop table objeto;
create table objeto (
	id_objeto int primary key auto_increment not null,
    nome_objeto varchar(30) not null,
    hora_entrada time,
    foto varchar(100),
    descricao varchar(100) not null,
	status enum('achado', 'perdido') DEFAULT('perdido'));