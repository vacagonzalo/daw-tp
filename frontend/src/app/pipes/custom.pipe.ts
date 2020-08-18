import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFecha'
})
export class CustomPipe implements PipeTransform {

  transform(value: Date): unknown {
    let dia:    string = ('0' + value.getDate()).slice(-2);
    let mes:    string = ('0' + (value.getMonth() + 1)).slice(-2);
    let anno:   string = value.getFullYear().toString();
    let hora:   string = value.getHours.toString();
    let minuto: string = value.getMinutes.toString();
    return dia + '/' + mes + '/' + anno + ' | ' + hora + ':' + minuto;
  }

}
