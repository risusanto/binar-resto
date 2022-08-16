// import library
const express = require('express')
const bcrypt = require("bcrypt")

// import use case
const user_uc = require('../usecase/user')

const router = express.Router()

router.post('/login', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let res_data = {
        status: 'failed',
        message: 'incorrect username or password',
        data: null
    }

    // get user
    let user = await user_uc.getUserByUsername(username)
    if(user === null) {
        return res.status(400).json(res_data)
    }
    if(bcrypt.compareSync(password, user.password) !== true) {
        return res.status(400).json(res_data)
    }

    res_data.status = 'ok'
    res_data.message = 'success'
    res_data.data = user

    return res.json(res_data)
})

router.post('/register', async (req, res) => {
    let user = {
        name: req.body.name,
        username: req.body.username,
        is_admin: false
    }
    let password = bcrypt.hashSync(req.body.password, 10)
    let res_data = {
        status: 'failed',
        message: '',
        data: null
    }

    // check if username not exist
    let user_res = await user_uc.getUserByUsername(user.username)
    if (user_res !== null) {
        res_data.message = 'username already exist'
        return res.status(400).json(res_data)
    }
    // insert user data
    user.password = password
    let create_res = await user_uc.createUser(user)
    if(create_res.is_success !== true) {
        res_data.message = 'something went wrong'
        return res.status(400).json(res_data)
    }

    res_data.status = 'ok'
    res_data.message = 'success'
    res_data.data = create_res.user

    res.json(res_data)
})

module.exports = router
