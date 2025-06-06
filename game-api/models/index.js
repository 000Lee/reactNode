// C:\lkh\project\reactNode\game-api\models\index.js

const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]

const User = require('./user')
const Review = require('./review')

const db = {}
const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize
db.User = User
db.Review = Review

User.init(sequelize)
Review.init(sequelize)

User.associate(db)
Review.associate(db)

module.exports = db
