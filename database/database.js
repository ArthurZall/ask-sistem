const Sequelize = require('sequelize'); //importando o módulo 

const connection = new Sequelize('projetoperguntas', 'root', 'Arthzall32!', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;