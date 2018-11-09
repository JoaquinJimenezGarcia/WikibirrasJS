'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema

var CervezaSchema = Schema({
    nombre: String,
    origen: String,
    tipo: String,
    descripcion_corta: String,
    descripcion_larga: String,
    diabeticos: Boolean,
    graduacion: Number,
    imagen: String,
    link_compra: String
})

module.exports = mongoose.model('Cerveza', CervezaSchema)