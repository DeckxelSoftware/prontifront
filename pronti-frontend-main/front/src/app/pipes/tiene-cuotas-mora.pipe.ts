import {Pipe, PipeTransform} from '@angular/core';
import {ContratoResponseDto} from '../modulos/contrato/servicios/dto/contrato.response-dto';

@Pipe({
  name: 'tieneCuotasMora'
})
export class TieneCuotasMoraPipe implements PipeTransform {

  transform(contrato: ContratoResponseDto, numeroCuotasMora: number): boolean {

    if (contrato.historicoPlanContratoCollection) {
      if (contrato.historicoPlanContratoCollection.length >= 1) {
        // @ts-ignore
        const ultimoHistorico = contrato.historicoPlanContratoCollection.at(-1);
        if (ultimoHistorico.totalCuotasMoraActual >= numeroCuotasMora) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }

    } else {
      return false;
    }

  }

}
