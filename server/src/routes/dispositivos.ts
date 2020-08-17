import pool from '../services/mysql.service'
import express from 'express';
import { MysqlError } from 'mysql';
import { Dispositivo } from '../models/dispositivo.model';
import { Medicion } from '../models/medicion.model';
import { Electrovalvula } from '../models/electrovalvula.model';
const dispositivos: express.Router = express.Router();

dispositivos.get('/dispositivos', (req: express.Request, res: express.Response) => {
    pool.query('SELECT * FROM Listado', (err: MysqlError, result, fields) => {
        if (err) {
            res.send(err).status(400);
            return;
        }
        let dispositivos: Array<Dispositivo> = new Array<Dispositivo>();
        for(var i = 0; i < 9; i++) {
            var r = result[i];
            console.log(r);
            dispositivos.push(new Dispositivo(
                r.dispId,
                r.dispNom,
                r.dispUbi,
                new Medicion(r.medId,new Date(r.medFecha),r.medVal),
                new Electrovalvula(r.elecId,r.elecNom,r.elecApe)
            ));
        }
        res.send(result);
    });
});

dispositivos.get('/dispositivos/:id', (req: express.Request, res: express.Response) => {
    pool.query('SELECT * FROM Listado WHERE dispId=?', [req.params.id], (err, result, fields) => {
        if (err) {
            res.send(err).status(400);
            return;
        }
        let r = result[0];
        let dispositivo:Dispositivo = new Dispositivo(
            r.dispId,
            r.dispNom,
            r.dispUbi,
            new Medicion(r.medId,new Date(r.medFecha),r.medVal),
            new Electrovalvula(r.elecId,r.elecNom,r.elecApe)
        );
        res.send(result);
    });
});

export default dispositivos;