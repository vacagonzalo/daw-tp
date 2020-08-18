import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medicion } from '../models/medicion.model';
import { FilaMedicion } from '../models/filaMedicion.interface';
import { newMedicion } from '../models/newMedicion.interface'

@Injectable({
  providedIn: 'root'
})
export class MedicionesService {

  constructor(private _http: HttpClient) { }

  public getMediciones(dispId: number): Promise<Array<Medicion>> {
    return this._http.get("http://localhost:5000/mediciones/" + dispId)
      .toPromise()
      .then((m: Array<FilaMedicion>) => {
        let measurements: Array<Medicion> = new Array<Medicion>();
        m.forEach(e => measurements.push(new Medicion(
          e.medicionId,
          e.fecha,
          parseInt(e.valor)
        )))
        return measurements;
      })
      .catch((err) => {
        console.log("error en la consulta");
        return new Array<Medicion>(new Medicion());
      })
  }

  public newMedicion(data: newMedicion) {
    return this._http.post('http://localhost:5000/mediciones', data)
      .toPromise()
      .then((result) => {
        return result;
      });
  }
}
