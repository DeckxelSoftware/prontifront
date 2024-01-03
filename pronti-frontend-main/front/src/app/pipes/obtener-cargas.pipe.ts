import { Pipe, PipeTransform } from '@angular/core';
import { Pagos2ResponseDto } from '../modulos/pagos2/servicios/dto/pagos2.response-dto';

@Pipe({
  name: 'obtenerCargas'
})
export class ObtenerCargasPipe implements PipeTransform {

  transform(registro: Pagos2ResponseDto): number {
    if (registro.idTrabajador?.cargaFamiliarCollection) {
      return registro.idTrabajador?.cargaFamiliarCollection.length;
    } else {
      return 0
    }
  }
}
