require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT || 5000
const Sequelize = require('./db')
const app = express()

const start = async () => {
    try{
        await Sequelize.authenticate()
        await Sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

    }catch (e){
        console.log(e)
    }
}
