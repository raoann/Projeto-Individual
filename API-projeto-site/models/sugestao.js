    'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Sugestoes = sequelize.define('Publicacao',{	
		id: {
			field: 'idsugestao',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},	
        descricao: {
            field: 'descricao',
            type: DataTypes.STRING,
            allowNull: false
        },
        fkUsuario: {
            field: 'fkUsuario',
            type: DataTypes.INTEGER,
            allowNull: false
        }
	}, 
	{
		tableName: 'sugestao', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Sugestoes;
};
