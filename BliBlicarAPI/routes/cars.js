var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const utils = require('../utils');
let config = {
  host: 'localhost',
  user: 'bliblicar',
  password: 'bliblicar123',
  database: 'bliblicar'
}

router.get('/list', async function(req, res, next) {
  try {
    const conn = mysql.createConnection(config);
    let sql = "SELECT * FROM car"
    await conn.query(sql,function(err, result){
      if (!err){
        res.send({success: true, payload: result})
      } else{
        res.send({success: false, message: 'SQL Error: '+err})
      }
    })
    await conn.end()
  } catch (e) {
    res.send({success: false, message: 'Error in try'})
  }
})

router.post('/create', async function(req, res, next) {
  try {
    if (req.body.marca && req.body.modelo && req.body.ano && req.body.placa && req.body.placa && req.body.motorist) {
      let sql = "INSERT INTO car (idcar, marca, modelo, ano, placa, motorist) " +
          "VALUES ('"+utils.generateId()+"', '"+req.body.marca+"', '"+req.body.modelo+"', '"+req.body.ano+"', '"+req.body.placa+"', '"+req.body.motorist+"')"
      const conn = mysql.createConnection(config);
      await conn.query(sql,function(err, result){
        if (!err){
          res.send({success: true, payload: result})
        } else{
          res.send({success: false, message: 'SQL Error: '+err})
        }
      })
      await conn.end()
    } else {
      res.send({success: false, message: 'Missing information'})
    }
  } catch (e) {
    res.send({success: false, message: 'Error in try'})
  }
})

router.post('/delete', async function(req, res, next) {
  try {
    if (req.body.idcar) {
      let sql = "DELETE FROM car WHERE idcar = "+req.body.idcar
      const conn = mysql.createConnection(config);
      await conn.query(sql,function(err, result){
        if (!err){
          res.send({success: true, payload: result})
        } else{
          res.send({success: false, message: 'SQL Error: '+err})
        }
      })
      await conn.end()
    } else {
      res.send({success: false, message: 'Missing information'})
    }
  } catch (e) {
    res.send({success: false, message: 'Error in try'})
  }
})

router.post('/update', async function(req, res, next) {
  try {
    if (req.body.idcar && req.body.marca && req.body.modelo && req.body.ano && req.body.placa && req.body.motorist) {
      const conn = mysql.createConnection(config);
      let sql = "UPDATE car SET marca = '"+req.body.marca+"', " +
          "marca = '"+req.body.marca+"', " +
          "modelo = '"+req.body.modelo+"', " +
          "ano = '"+req.body.ano+"', " +
          "placa = '"+req.body.placa+"', " +
          "motorist = '"+req.body.motorist+"' " +
          "WHERE idcar = "+req.body.idcar
      await conn.query(sql,function(err, result){
        if (!err){
          res.send({success: true, payload: result})
        } else{
          res.send({success: false, message: 'SQL Error: '+err})
        }
      })
      await conn.end()
    } else {
      res.send({success: false, message: 'Missing information'})
    }
  } catch (e) {
    res.send({success: false, message: 'Error in try'})
  }
})
 
module.exports = router;
