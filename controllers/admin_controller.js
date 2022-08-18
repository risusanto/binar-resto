/*
endpoint: /admin
description: admin controller/router
 */

// import library
const express = require('express')
const _ = require('lodash')

// import use case
const order_uc = require('../usecase/order')

const order_constants = require('../internal/constants/order')

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

router.get('/order', async (req, res) => {
    let res_data = {
        status: 'ok',
        message: 'success'
    }
    if (req.query['status'] === 'completed') {
        res_data.data = await order_uc.listCompletedOrder()
    } else {
        res_data.data = await order_uc.listOrderExcludePending()
    }

    res.json(res_data)
})

router.patch('/order/update', async (req, res) => {
    let res_data = {
        status: 'ok',
        message: 'success',
        data: null
    }

    let order_id = req.body.id
    let status = order_constants[req.body.status]
    if (status === undefined) {
        res_data.status = 'failed'
        res_data.message = 'invalid status'
        return res.status(400).json(res_data)
    }
    await order_uc.changeOrderStatus(order_id, status)
    res.json(res_data)
})

module.exports = router
