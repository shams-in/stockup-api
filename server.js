const express = require('express')
const bodyParser = require('body-parser')
const db = require('./sequelize')
const app = express()

const port = 8081

// configure body parse
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/api/category', async (req, res) => {
    const { name } = req.body
    console.log('name: ', req.body)
    try {
        if(!name || name.trim() === '') throw Error('name is invalid')
        const categoryEntity = await db.Category.create({ name: name.trim().toLowerCase() })
        res.json({
            success: true,
            data: categoryEntity.get({ plain: true })
        })
    } catch (err) {
        console.log(err.message)
        res.json({
            success: false,
            message: err.message
        })
    }
})

app.get('/api/category', async (req, res) => {
    try {
        const result = await db.Category.findAll()
        res.json({
            success: true,
            data: result.map(el => el.get({ plain: true }))
        })
    } catch (err) {
        console.log(err.message)
        res.json({
            success: false,
            message: err.message
        })
    }
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))