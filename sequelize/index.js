const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const basename = path.basename(__filename)
const db = {}
const sequelize = new Sequelize('postgres://stockup:pass1234@192.168.1.136:5432/bytecode_stockup_ca', {
    logging: query => {
        if (true) {
            console.debug(`-------------------`)
            console.debug(`[pg.query] ${query}`)
            console.debug(`-------------------`)
        }
    }
})

sequelize
    .authenticate()
    .then(() =>
        console.info('Postgres connection has been established successfully.')
    )
    .catch(err =>
        console.error(
            `Unable to connect to the Postgres database: ${err.message}`
        )
    )

fs.readdirSync(__dirname)
    .filter(
        file =>
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
    )
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file))
        db[model.name] = model
    })

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
module.exports = db
