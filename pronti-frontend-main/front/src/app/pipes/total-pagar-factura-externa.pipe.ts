import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'totalRetencionesFacturaExterna'
})
export class TotalPagarFacturaExternaPipe implements PipeTransform {

  transform(infoFactura: any): number {
    let res = 0;
    if (infoFactura.valorRetIva) {
      res += Number(infoFactura.valorRetIva._text);
    }
    if (infoFactura.valorRetRenta) {
      res += Number(infoFactura.valorRetRenta._text);
    }

    return res;


  }

}
