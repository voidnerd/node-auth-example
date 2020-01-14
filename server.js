const express = require('express')
const app = express()
const path = require('path') //native module, no need to install
require('dotenv').config()
const logger = require('morgan')
const mongoose = require('mongoose')
const pe = require('parse-error')
const routes = require('./routes')

const port = 3000

//mongoose options
const mongooseOptions =  {
    useUnifiedTopology: true,
    useNewUrlParser: true, 
    useCreateIndex: true
}
//connect to database
mongoose.connect(process.env.MONGO_URL, mongooseOptions)
    .then(
        () => console.log('Database Connection established!'),
        err => console.log(err)
    )


app.use(logger('dev')) // For logging out errors to the console
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public'))) // For serving static files 

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

