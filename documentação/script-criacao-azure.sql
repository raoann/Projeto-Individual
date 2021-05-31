create table usuario_gameswiki (
idUsuario int primary key identity(1,1),
nome varchar(45),
usuario varchar(45),
senha varchar(45),
data_nasc date 
);

create table Publicacao (
idcomentario int primary key identity(1,1),
descricao varchar(150),
fkusuario int
);

create table sugestao (
idsugestao int primary key identity(1,1),
sugestao varchar(100),
fkusuario int
);