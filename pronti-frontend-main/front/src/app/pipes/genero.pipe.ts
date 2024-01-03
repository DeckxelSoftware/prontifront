import {Pipe, PipeTransform} from '@angular/core';
import {GeneroEnum} from '../enums/genero.enum';

@Pipe({
  name: 'genero'
})
export class GeneroPipe implements PipeTransform {

  transform(genero?: GeneroEnum): string {
    let strGenero = 'Sin definir';
    switch (genero) {
      case GeneroEnum.femenino:
        strGenero = 'Femenino'
        break;
      case GeneroEnum.masculino:
        strGenero = 'Masculino'
        break;
      default:
        break;

    }
    return strGenero;
  }

}
