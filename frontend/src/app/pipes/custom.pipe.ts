import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFecha'
})
export class CustomPipe implements PipeTransform {

  transform(value: string): string {
    let fecha = new Date(value);
    let dia: string = ('0' + fecha.getDate()).slice(-2);
    let mes: string = ('0' + (fecha.getMonth() + 1)).slice(-2);
    let anno: string = fecha.getFullYear().toString();
    let hora: string = fecha.getHours().toString();
    let minuto: string = fecha.getMinutes().toString();
    return dia + '/' + mes + '/' + anno + ' | ' + hora + ':' + minuto;
  }

}
