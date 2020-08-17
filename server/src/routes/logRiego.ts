import pool from '../services/mysql.service'
import express from 'express';

const riegolog: express.Router = express.Router();

riegolog.post('/riego', (req: express.Request, res: express.Response) => {
  pool.query('INSERT INTO Log_Riegos (apertura, fecha, electrovalvulaId) VALUES (?,?,?);',
  [req.body.aper, new Date(), req.body.elecId], (err, result, fields) => {
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