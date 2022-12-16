import sequelize from '../db'
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nickname:{type: DataTypes.STRING, unique:true, allowNull:false},
    email:{type: DataTypes.STRING, unique:true, allowNull:false},
    password:{type: DataTypes.STRING, allowNull:false},
    role:{type: DataTypes.STRING, defaultValue: 'USER'},
})
const News = sequelize.define('news', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title:{type: DataTypes.STRING, allowNull:false},
    description:{type: DataTypes.STRING},
    date:{type: DataTypes.DATE, allowNull:false},
})
const News_Images = sequelize.define('news_images', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    imageUrl:{type: DataTypes.STRING},
})
const Like_News = sequelize.define('like_news', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const Comments = sequelize.define('comments', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    comment:{type: DataTypes.STRING, allowNull:false},
    date:{type: DataTypes.DATE, allowNull:false},
})

User.hasMany(News)
News.belongsTo(User)

News.hasMany(Like_News)
Like_News.belongsTo(News)

User.hasMany(Like_News)
Like_News.belongsTo(User)

User.hasMany(Comments)
Comments.belongsTo(User)

News.hasMany(Comments)
Comments.belongsTo(News)

News.hasMany(News_Images)
News_Images.belongsTo(News)

module.exports = {
    User,
    News,
    News_Images,
    Like_News,
    Comments
}