'use strict'

var Cerveza = require('../models/cerveza')
const bcrypt = require('bcrypt-nodejs')
var jwt = require('../services/jwt')
const fs = require('fs')
const path = require('path')

function obtenerCervezas(req, res) {
    var find = Cerveza.find({})

    find.populate({path: 'cerveza'}).exec((err, cervezas) => {
        if (err) {
            res.status(500).send({message: 'Error obteniendo los vehículos.'})
        } else {
            if(!cervezas) {
                res.status(404).send({message: 'No hay vehículos aún.'})
            } else {
                res.status(200).send({cervezas})
            }
        }
    })
}

function obtenerCerveza(req, res){
    var cocheId = req.params.id;

    Cerveza.find({_id: cocheId}).populate({path: 'cervezas'}).exec((err, cerveza)=> {
        if(err) {
            res.status(500).send({message: 'Error trying to get the page.'})
        } else {
            if(!cerveza) {
                res.status(404).send({message: 'The page doesnt exist.'})
            } else {
                res.status(200).send({cerveza: cerveza})
            }
        }
    })
}

function actualizarCerveza(id, update, res) {
    Cerveza.findByIdAndUpdate(id, update, (err, cervezaUpdated) => {
        if (err){
            res.status(500).send({message: 'Error actualizando la cerveza.'})
        } else {
            if(!cervezaUpdated) {
                res.status(404).send({message: 'Internal error updating the cerveza.'})
            } else {
                console.log('Actualiza');
                res.status(200).send({cerveza: cervezaUpdated})
            }
        }
    })
}

function actualizar(req, res) {
    var cervezaId = req.params.id 
    var update = req.body

    Cerveza.findByIdAndUpdate(cervezaId, update, (err, cervezaUpdated) => {
        if (err){
            res.status(500).send({message: 'Error actualizando la cerveza'})
        } else {
            if(!cervezaUpdated) {
                res.status(404).send({message: 'Internal error updating the beer.'})
            } else {
                res.status(200).send({cerveza: cervezaUpdated})
            }
        }
    })
}

function agregar(req, res){
    var cerveza = new Cerveza()
    var params = req.body
    var file_name 

    console.log('Req file:');
    console.log(req.file);

    if(req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        file_name = file_split[2];

        console.log(file_name);
    } else {
        console.log('Error subiendo la imagen');
        //res.status(404).send({message: 'No se ha subido imagen.'})
    }

    console.log('Construye el objeto');

    cerveza.nombre = params.nombre
    cerveza.origen = params.origen
    cerveza.tipo = params.tipo
    cerveza.descripcion_corta = params.descripcion_corta
    cerveza.descripcion_larga = params.descripcion_larga
    cerveza.diabeticos = params.diabeticos
    cerveza.graduacion = params.graduacion
    cerveza.imagen = params.imagen
    cerveza.link_compra = params.link_compra

    if (cerveza.nombre != null) {
        cerveza.save((err, cervezaStored) => {
            if (err) {
                console.log(err)
                res.status(500).send({message: 'Error añadiendo el cerveza'})
            } else {
                if (!cervezaStored) {
                    res.status(404).send({message: 'El cerveza no ha sido añadido'})
                } else {
                    res.status(200).send({cerveza: cervezaStored})
                }
            }
        })
    } else {
        res.status(500).send({message: 'Missing params'})
    }
}

function borrar(req, res) {
    var cervezaId = req.params.id;

    Cerveza.find({_id: cervezaId}).remove((err, cervezaRemoved) => {
        if(err) {
            res.status(500).send({message: 'Error borrando el cerveza.'})
        } else {
            if (!cervezaRemoved) {
                res.status(404).send({message: 'El cerveza no ha sido borrado.'})
            } else {
                res.status(200).send({cerveza: cervezaRemoved})
            }
        }
    })
}

module.exports = {
  agregar,
  obtenerCervezas,
  obtenerCerveza,
  actualizarCerveza,
  actualizar,
  borrar,
}