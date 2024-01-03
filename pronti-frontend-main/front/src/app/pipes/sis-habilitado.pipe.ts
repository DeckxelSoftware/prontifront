import {Pipe, PipeTransform} from '@angular/core';
import {ActivoInactivo} from '../enums/activo-inactivo';

@Pipe({
  name: 'sisHabilitadoPipe'
})
export class SisHabilitadoPipe implements PipeTransform {

  transform(habilitado: string): string {
    return habilitado === ActivoInactivo.Activo ? 'Si' : 'No';
  }

}
