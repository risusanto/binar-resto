// /menu

// import library
const express = require('express')
const _ = require('lodash')

// import use case
const menu_uc = require("../usecase/menu")

// init router
const router = express.Router()

router.get('/', async function (req, res){
    let category = req.query['category']
    let option = null
    if (typeof category !== "undefined") {
        option = {
            category: category
        }
    }

    let menu = await menu_uc.getListMenu(option)
    let res_data = {
        "status": "ok",
        "message": "success",
        "data": menu
    }
    res.json(res_data)
})

router.get('/detail/:id', async function (req, res) {
    let id = parseInt(req.params['id'])
    let res_data = {
        "status": "ok",
        "message": "success",
        "data": null
    }
    let menu = await menu_uc.getMenuByID(id)
    if (menu === null) {
        res_data.status = 'failed'
        res_data.message = 'menu not found'
        res.status(400)
    }
    res_data.data = menu
    res.json(res_data)
})

module.exports = router