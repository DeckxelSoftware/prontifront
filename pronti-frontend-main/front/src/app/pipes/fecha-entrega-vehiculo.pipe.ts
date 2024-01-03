import {Pipe, PipeTransform} from "@angular/core";
import {ContratoResponseDto} from "../modulos/contrato/servicios/dto/contrato.response-dto";

@Pipe({
  name: 'fechaEntregaVehiculo'
})
export class FechaEntregaVehiculoPipe implements PipeTransform {

  transform(contrato: ContratoResponseDto): string {
    let strRes = '';
    if (contrato.idOrdenDeCompra) {
      if (contrato.idOrdenDeCompra.idArticulo) {
        if (contrato.idOrdenDeCompra.idArticulo.fechaAdjudicado) {
          strRes = contrato.idOrdenDeCompra.idArticulo.fechaAdjudicado;
        }
      }
    }
    return strRes;
  }

}
