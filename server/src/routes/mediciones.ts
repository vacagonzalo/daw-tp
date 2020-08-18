import pool from '../services/mysql.service'
import express from 'express';

const mediciones: express.Router = express.Router();

mediciones.get('/mediciones/:sensor', (req: express.Request, res: express.Response) => {
  pool.query("SELECT * FROM Mediciones WHERE Mediciones.dispositivoId=?",
    [req.params.sensor], (err, result, fields) => {
      if (err) {
        res.send(err).status(400);
        return;
      }
      res.send(result);
    })
});

// espera data del tipo {"valor": "50", "dispositivoId": 2 }
mediciones.post('/mediciones', (req, res) => {
  console.log(req.body);
  console.log(req.body.valor + ' ' + req.body.dispositivoId);
  pool.query("INSERT INTO Mediciones (fecha, valor, dispositivoId) VALUES (?,?,?);",
    [new Date(), req.body.valor, req.body.dispositivoId], (err, result, field) => {
      if (err) {
        res.send(err).status(400);
        return;
      }
      res.send(result);
    })
});

export default mediciones;