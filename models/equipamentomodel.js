//-------------------------------------------------------------------------------------------------
const db = require("./db")
//-------------------------------------------------------------------------------------------------
const Equipamento = db.sequelize.define('equipamento',{
  nome:{
    type:db.Sequelize.STRING,
    require:true
  },
  descricao:{
    type:db.Sequelize.STRING,
    require:true
  },
  codigo:{
    type:db.Sequelize.INTEGER,
    require:true
  },
  numeroserie:{
    type:db.Sequelize.INTEGER,
    require:true
  },
  imagem:{
    type:db.Sequelize.STRING,
    require:true
  }
})
//-------------------------------------------------------------------------------------------------
Equipamento.sync().then(() => {
  console.log('Tabela equipamento criada com sucesso no MySql!');
}).catch((error) => {
  console.log('Erro: ',error);
});
//-------------------------------------------------------------------------------------------------
module.exports = Equipamento
//-------------------------------------------------------------------------------------------------