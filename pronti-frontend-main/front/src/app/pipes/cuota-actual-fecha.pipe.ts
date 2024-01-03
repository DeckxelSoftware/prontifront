import {Pipe, PipeTransform} from "@angular/core";
import {
  HistoricoPlanContratoResponseDto
} from "../modulos/historico-plan-contrato/servicios/dto/historico-plan-contrato.response-dto";
import {ContratoResponseDto} from "../modulos/contrato/servicios/dto/contrato.response-dto";
import * as dayjs from "dayjs";

@Pipe({
  name: 'cuotaActualFecha'
})

export class CuotaActualFechaPipe implements PipeTransform {

  transform(historico: HistoricoPlanContratoResponseDto, contrato: ContratoResponseDto): string {
    if (historico.cuotaCollection) {
      if (historico.cuotaCollection.length > 0) {
        if (contrato.cuotaACobrar) {
          if (historico.cuotaCollection[contrato.cuotaACobrar - 1]) {
            return dayjs(historico.cuotaCollection[contrato.cuotaACobrar - 1].fechaCobro).format('YYYY-MM-DD');
          }
        }
      }
    }
    return '';

  }

}
