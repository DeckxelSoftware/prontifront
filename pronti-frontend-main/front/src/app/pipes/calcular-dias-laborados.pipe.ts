import { Pipe, PipeTransform } from '@angular/core';
import { Pagos2ResponseDto } from '../modulos/pagos2/servicios/dto/pagos2.response-dto';

@Pipe({
  name: 'calcularDiasLaborados'
})
export class CalcularDiasLaboradosPipe implements PipeTransform {

  transform(registro: Pagos2ResponseDto): number {
    if (registro.idTrabajador?.cargaFamiliarCollection && registro.diasLaboradosAlAnio) {
      return registro.idTrabajador?.cargaFamiliarCollection.length * +registro.diasLaboradosAlAnio;
    } else {
      return 0
    }
  }

}
