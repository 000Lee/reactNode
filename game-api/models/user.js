// C:\lkh\project\reactNode\game-api\models\user.js

const Sequelize = require('sequelize')

module.exports = class User extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            userId: {
               type: Sequelize.STRING(40),
               allowNull: false,
               unique: true,
            },
            userPassword: {
               type: Sequelize.STRING(300),
               allowNull: false,
               unique: true,
            },
            nick: {
               type: Sequelize.STRING(15),
               allowNull: false,
               unique: true,
            },
            heart: {
               type: Sequelize.INTEGER,
               allowNull: true,
               defaultValue: 0,
            },
            star: {
               type: Sequelize.INTEGER,
               allowNull: true,
               defaultValue: 0,
            },
         },
         {
            sequelize,
            timestamps: true, //createAt, updateAt ..등 자동 생성
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {
      db.User.hasMany(db.Review)
   }
}
