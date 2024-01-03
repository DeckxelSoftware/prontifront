import {Pipe, PipeTransform} from "@angular/core";
import {ContratoResponseDto} from "../modulos/contrato/servicios/dto/contrato.response-dto";
import {LicitacionResponseDto} from "../modulos/licitacion/servicios/dto/licitacion.response-dto";
import {EstadoLicitacionEnum} from "../enums/estado-licitacion.enum";

@Pipe({
  name: 'fechaAdjudicacion'
})
export class FechaAdjudicacionPipe implements PipeTransform {

  transform(contrato: ContratoResponseDto): string {
    let strRes = '';
    if (contrato.licitacionCollection) {
      if (contrato.licitacionCollection.length > 0) {
        const licitacion = tieneLicitacionArpobada(contrato.licitacionCollection);
        if (Object.keys(licitacion).length > 0) {
          if (licitacion.idPreasamblea) {
            if (licitacion.idPreasamblea.estado === 'APR' || licitacion.idPreasamblea.estado === 'APG') {
              if (licitacion.idPreasamblea.fechaPreasamblea) {
                strRes = licitacion.idPreasamblea.fechaPreasamblea;
              }
            }
          }
        }
      }
    }
    return strRes;
  }

}

export function tieneLicitacionArpobada(licitaciones: LicitacionResponseDto[]) {
  const indice = licitaciones.findIndex(licitacion => {
    return licitacion.estado === EstadoLicitacionEnum.siAplica || licitacion.estado === EstadoLicitacionEnum.aprobadoPorGerencia
  })
  if (indice >= 0) {
    return licitaciones[indice];
  } else {
    return {};
  }
}
