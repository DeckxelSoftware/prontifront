import {Pipe, PipeTransform} from "@angular/core";
import {ContratoResponseDto} from "../modulos/contrato/servicios/dto/contrato.response-dto";

@Pipe({
  name: 'campoOrdenCompra'
})
export class CampoOrdenCompraPipe implements PipeTransform {

  transform(contrato: ContratoResponseDto, campo: string): string {
    let strRes = '';
    if (contrato.idOrdenDeCompra) {
      // @ts-ignore
      if (contrato.idOrdenDeCompra[campo]) {
        // @ts-ignore
        strRes = contrato.idOrdenDeCompra[campo];
      }
    }
    return strRes;
  }

}
