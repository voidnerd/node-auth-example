var express = require('express')
var router = express.Router()

const controllers = require('./controllers');


router.post('/register', controllers.auth.register)

router.post('/login', controllers.auth.login)

module.exports = router;