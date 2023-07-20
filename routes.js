const express = require ('express')
const controller= require('./controller')
const routes= express.Router();
const validate = require('./validation')


routes.get('/', controller.index)
routes.get('/add', controller.add)
routes.get('/search', controller.search)
routes.get('/update', controller.update)
routes.get('/delete', controller.delete)
routes.post('/addstudent',validate.addstudent, controller.addstudent)
routes.post('/searchstudent', controller.searchstudent)
routes.post('/updatestudent',controller.updatestudent)
routes.post('/deletestudent', controller.deletestudent)

module.exports = routes;