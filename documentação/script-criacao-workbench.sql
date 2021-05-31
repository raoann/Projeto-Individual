create database gameswiki;
use gameswiki;

create table usuario_gameswiki (
idUsuario int primary key auto_increment,
nome varchar(45),
usuario varchar(45),
senha varchar(45),
data_nasc date 
);

create table publicacao (
idcomentario int primary key,
descricao varchar(150),
fkusuario int
);

create table sugestao (
idsugestao int primary key,
sugestao varchar(100),
fkusuario int
);

select * from usuario_gameswiki;
