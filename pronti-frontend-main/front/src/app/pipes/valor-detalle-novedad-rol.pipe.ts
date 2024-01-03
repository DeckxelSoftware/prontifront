import {Pipe, PipeTransform} from "@angular/core";
import {
  DetalleNovedadRolPagoResponseDto
} from "../modulos/detalle-novedad-rol-pago/servicios/dto/detalle-novedad-rol-pago.response-dto";

@Pipe({
  name: 'valorDetalleNovedadRol'
})
export class ValorDetalleNovedadRolPipe implements PipeTransform {

  transform(detalleNovedadRolPagoCollection: DetalleNovedadRolPagoResponseDto[], codigoNovedad: string, tipoNovedad: string): number {
    const indiceEncontrado = detalleNovedadRolPagoCollection?.findIndex(
      (detalle) => {
        detalle.codigoNovedad?.toLowerCase() === codigoNovedad.toLowerCase() && detalle.tipoNovedad?.toLowerCase() === tipoNovedad.toLowerCase();
      }
    )
    // @ts-ignore
    if (indiceEncontrado >= 0) {
      return detalleNovedadRolPagoCollection[indiceEncontrado].valor ? detalleNovedadRolPagoCollection[indiceEncontrado].valor as number : 0;
    } else {
      return 0
    }
  }

}
