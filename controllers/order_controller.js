// import library
const express = require('express')

// import use case
const order_uc = require('../usecase/order')
const {or} = require("sequelize");

const order_const = require('../internal/constants/order')

// init router
const router = express.Router()

router.get('/', async (req, res) => {
    // TODO: get id by header
    let id = 1
    let res_data = {
        status: 'ok',
        message: 'success',
        data: null
    }
    res_data.data  = await order_uc.getPendingOrderByUserID(id)
    res.json(res_data)
})

router.post('/add', async (req, res) => {
    // TODO: get id by header
    let id = 1
    let items = req.body.items
    let order = await order_uc.getPendingOrderByUserID(id)

    let res_data = {
        status: 'failed',
        message: 'something went wrong',
        data: null
    }

    if(order === null) {
        let create_res = await order_uc.createOrder(id, items)
        if (create_res.is_success !== true) {
           return res.status(400).json(res_data)
        }
    } else {
        await order_uc.addOrderDetails(order.id, items)
    }
    order = await order_uc.getPendingOrderByUserID(id)

    res_data.status = 'ok'
    res_data.message = 'success'
    res_data.data = order

    res.json(res_data)
})

router.patch('/submit', async (req, res) => {
    // TODO: get id by header
    let id = 1

    let res_data = {
        status: 'failed',
        message: '',
        data: null
    }

    let order_data = await order_uc.getPendingOrderByUserID(id)
    if (order_data === null) {
        res_data.message = 'order is empty'
        return res.status(400).json(res_data)
    }

    // update status
    await order_uc.changeOrderStatus(order_data.id, order_const.ORDER_SUBMITTED)

    res_data.status = 'ok';
    res_data.message = 'success'
    res.json(res_data)
})

module.exports = router