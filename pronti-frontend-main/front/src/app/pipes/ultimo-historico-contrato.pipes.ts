import {Pipe, PipeTransform} from '@angular/core';
import {ContratoResponseDto} from '../modulos/contrato/servicios/dto/contrato.response-dto';
import {HistoricoPlanContratoResponseDto} from '../modulos/historico-plan-contrato/servicios/dto/historico-plan-contrato.response-dto';

@Pipe({
  name: 'ultimoHistoricoContrato'
})
export class UltimoHistoricoContratoPipe implements PipeTransform {

  transform(contrato: ContratoResponseDto): HistoricoPlanContratoResponseDto {


    if (contrato.historicoPlanContratoCollection) {
      if (contrato.historicoPlanContratoCollection.length > 0) {
        // @ts-ignore
        return contrato.historicoPlanContratoCollection.at(-1);
      } else {
        const historico: HistoricoPlanContratoResponseDto = {};
        return historico;
      }
    }else{
      const historico: HistoricoPlanContratoResponseDto = {};
      return historico;
    }


  }

}
