// /menu

// import library
const express = require('express')
const _ = require('lodash')

// init router
const router = express.Router()

// import menu
let menu_data = require('../data/menu')

router.get('/', function (req, res){
    let menu = menu_data

    let category = req.query['category']
    if (category !== undefined && category !== 'all') {
        menu = _.filter(menu_data, (m) => {
           return m.category === category
        })
    }

    let res_data = {
        "status": "ok",
        "message": "success",
        "data": menu
    }
    res.json(res_data)
})

router.get('/detail/:id', function (req, res) {
    let id = parseInt(req.params['id'])
    let res_data = {
        "status": "ok",
        "message": "success",
        "data": null
    }
    let menu = _.find(menu_data, (m) => {
       return m.id === id
    })
    if (menu === undefined) {
        res_data.status = "failed"
        res_data.message = "menu not found"
        return res.json(res_data)
    }

    res_data.data = menu
    res.json(res_data)
})

module.exports = router