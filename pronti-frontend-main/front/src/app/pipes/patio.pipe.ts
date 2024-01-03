import {Pipe, PipeTransform} from "@angular/core";
import {ContratoResponseDto} from "../modulos/contrato/servicios/dto/contrato.response-dto";

@Pipe({
  name: 'patioContrato'
})
export class PatioPipe implements PipeTransform {

  transform(contrato: ContratoResponseDto): string {
    let strRes = '';
    if (contrato.idOrdenDeCompra) {
      if (contrato.idOrdenDeCompra.idArticulo) {
        if (contrato.idOrdenDeCompra.idArticulo.ubicacionFisica) {
          strRes = contrato.idOrdenDeCompra.idArticulo.ubicacionFisica;
        }
      }
    }
    return strRes;
  }

}
