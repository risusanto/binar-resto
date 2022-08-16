const order_constants = require('../internal/constants/order')
const menu_uc = require('../usecase/menu')
const {Order,OrderDetail} = require('../models')

let  getPendingOrderByUserID = async (user_id) => {
    let order = null
    try {
        order = await Order.findOne({
            where: {
                user_id: user_id,
                status: order_constants.ORDER_PENDING
            }
        })
    } catch (e) {
        console.log(e)
    }
    if(order === null) {
        return order
    }
    return {
        ...order.dataValues,
        details: await getDetailOrder(order.id)
    }
}
let getDetailOrder = async (order_id) => {
    let details = []
    try {
        details = await OrderDetail.findAll({
            where: {order_id: order_id}
        })
    } catch (e) {
        console.log(e)
    }

    return details
}

let createOrder = async (user_id, items) => {
    let is_success = false
    let order = {
        user_id: user_id,
        status: order_constants.ORDER_PENDING
    }
    let res_order = null
    try {
        res_order = await Order.create(order)
        is_success = true
    } catch (e) {
        console.log(e)
    }
    order = await getPendingOrderByUserID(user_id)
    await addOrderDetails(order.id, items)
    return {
        is_success: is_success,
        order: order
    }
}

let addOrderDetails =  async (order_id, items) => {
    for (let i = 0; i < items.length; i++) {
        if (items[i].qty <= 0) {
            continue
        }
        let menu = null
        menu = await menu_uc.getMenuByID(items[i].id)
        if (menu !== null) {
            let detail = {
                order_id: order_id,
                menu_id: menu.id,
                qty: items[i].qty
            }
            try{
                await OrderDetail.create(detail)
            } catch (e) {
                console.log(e)
            }
        }
    }
}

module.exports = {
    getPendingOrderByUserID: getPendingOrderByUserID,
    getDetailOrder: getDetailOrder,
    createOrder: createOrder,
    addOrderDetails: addOrderDetails
}