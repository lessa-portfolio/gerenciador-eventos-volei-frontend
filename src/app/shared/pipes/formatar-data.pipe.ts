import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatarData',
  standalone: true,
})
export class FormatarDataPipe implements PipeTransform {
  private diasSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

  private meses = [
    'JANEIRO',
    'FEVEREIRO',
    'MARÇO',
    'ABRIL',
    'MAIO',
    'JUNHO',
    'JULHO',
    'AGOSTO',
    'SETEMBRO',
    'OUTUBRO',
    'NOVEMBRO',
    'DEZEMBRO',
  ];

  transform(value: string | Date): string {
    const data = new Date(value);
    const diaSemana = this.diasSemana[data.getDay()];
    const dia = data.getDate();
    const mes = this.meses[data.getMonth()];

    return `${diaSemana}, ${dia} ${mes}`;
  }
}
