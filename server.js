const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()
const logger = require('morgan')
const mongoose = require('mongoose')
const pe = require('parse-error')
const routes = require('./routes')

const port = 3000

const mongoOptions =  {
    useUnifiedTopology: true,
    useNewUrlParser: true, 
    useCreateIndex: true
}
//connect to database
mongoose.connect(process.env.MONGO_URL, mongoOptions)
    .then(
        () => console.log('Database Connection established!'),
        err => console.log(err)
    )


app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

//use routes 
app.use('/api', routes)

//handle unhandled error
process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error))
    return
})

app.listen(port, () => {
    console.log(`Server Stated on http://localhost:${port}`)
})

