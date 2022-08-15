// /menu

// import library
const express = require('express')
const _ = require('lodash')

// import models
const {Menu} = require("../models")

// init router
const router = express.Router()

// import menu
let menu_data = require('../data/menu')

router.get('/', function (req, res){
    Menu.findAll().then(menus => {
        let res_data = {
            "status": "ok",
            "message": "success",
            "data": menus
        }
        res_data.data =
        res.json(res_data)
    }).catch(err => {
        res.json({
            msg: "something went wrong"
        })
    })
})

router.get('/detail/:id', function (req, res) {
    let id = parseInt(req.params['id'])
    Menu.findOne({
        where: {id: id}
    }).then(menu => {
        let res_data = {
            "status": "ok",
            "message": "success",
            "data": menu
        }
        if (menu === null) {
            res.status(400)
            res_data.status = 'failed';
            res_data.message = "menu not found"
        }
        res_data.data =
            res.json(res_data)
    }).catch(err => {
        res.json({
            msg: "something went wrong"
        })
    })
})

module.exports = router