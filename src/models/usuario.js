'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Usuario.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha_hash: DataTypes.VIRTUAL,
    senhal: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  Usuario.addHook('beforeSave', async cryptSenha => {
    if(cryptSenha.senha_hash)  {
      cryptSenha.senhal = await bcrypt.hash(cryptSenha.senha_hash,8);
    }

  });
  
  return Usuario;
};