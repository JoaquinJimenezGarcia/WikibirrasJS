'use strict'

const express = require('express')
var CervezaController = require ('../controllers/cerveza')
var api = express.Router()
var md_auth = require('../middlewares/authenticated')
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/coches'});

api.post('/agregar-cerveza', [md_auth.ensureAuth, md_upload], CervezaController.agregar)
api.put('/actualizar-cerveza/:id', md_auth.ensureAuth, CervezaController.actualizar)
api.get('/cervezas', CervezaController.obtenerCervezas)
api.get('/cerveza/:id', CervezaController.obtenerCerveza)
api.delete('/eliminar-cerveza/:id', md_auth.ensureAuth, CervezaController.borrar)

module.exports = api