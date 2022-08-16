/*
endpoint: /admin
description: admin controller/router
 */

// import library
const express = require('express')
const _ = require('lodash')

// init router
const router = express.Router()

// import menu
let menu_data = require('../data/menu')

router.post('/menu/add', function (req, res) {
    let body = req.body
    let res_data = {
        "status": "ok",
        "message": "success",
        "data": body
    }
    let new_id = menu_data.length + 1
    body.id = new_id
    menu_data.push(body)
    res.json(res_data)
})

router.put('/menu/update/:id', function (req, res) {
    let id = parseInt(req.params['id'])
    let updated_data = req.body
    for(let i = 0; i < menu_data.length; i++) {
        if(menu_data[i].id === id) {
            menu_data[i] = updated_data
        }
    }

    let res_data = {
        "status": "ok",
        "message": "success",
        "data": updated_data
    }

    res.json(res_data)
})

router.delete('/menu/delete/:id', function (req, res) {
    let id = parseInt(req.params['id'])

    let new_menu_list = []
    for(let i = 0; i < menu_data.length; i++) {
        if (menu_data[i].id !== id) {
            new_menu_list.push(menu_data[i])
        }
    }
    menu_data = new_menu_list

    let res_data = {
        "status": "ok",
        "message": "success",
        "data": null
    }

    res.json(res_data)
})

router.patch('/order/change-status', async (req, res) => {
    // TODO: update order status (req.body.status, req.body.order_id
    // TODO: canceled, jika dicancel maka undo change ke stock menu
})

module.exports = router
