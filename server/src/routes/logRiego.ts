import pool from '../services/mysql.service'
import express from 'express';

const riegolog: express.Router = express.Router();

riegolog.post('/riego', (req: express.Request, res: express.Response) => {
  console.log("req.body: " + req.body);
  console.log(req.body[0]);
  console.log(req.body[1]);
  pool.query('INSERT INTO Log_Riegos (apertura, fecha, electrovalvulaId) VALUES (?,?,?);',
  [req.body[0], new Date(), req.body[1]], (err, result, fields) => {
    if(err) {
      res.send(err).status(400);
      return;
    }
    res.send(result);
  })
});

riegolog.get('/riego/:valvula', (req: express.Request,res: express.Response) => {
  pool.query('SELECT * FROM Log_Riegos WHERE Log_Riegos.electrovalvulaId=?;',
  [req.params.valvula], (err, result,fields) => {
    if(err) {
      res.send(err).status(400);
      return;
    }
    res.send(result);
  })
});

export default riegolog;