import {Pipe, PipeTransform} from '@angular/core';
import {CodigoAuxiliarRubrosRolEnum} from '../enums/codigo-auxiliar-rubros-rol.enum';

@Pipe({
  name: 'codigoAuxiliarRubrosRol'
})
export class CodigoAuxiliarRubrosRolPipe implements PipeTransform {

  transform(codigo?: CodigoAuxiliarRubrosRolEnum): string {
    let strCodigoAuxiliar = 'No registrado';
    switch (codigo) {
      case CodigoAuxiliarRubrosRolEnum.argumentoDeEgreso:
        strCodigoAuxiliar = 'Argumento de egreso'
        break;
      case CodigoAuxiliarRubrosRolEnum.argumentoDeIngreso:
        strCodigoAuxiliar = 'Argumento de ingreso'
        break;
      case CodigoAuxiliarRubrosRolEnum.egresosFijos:
        strCodigoAuxiliar = 'Egresos fijos'
        break;
      case CodigoAuxiliarRubrosRolEnum.egresosLegales:
        strCodigoAuxiliar = 'Egresos legales'
        break;
      case CodigoAuxiliarRubrosRolEnum.otrosEgresos:
        strCodigoAuxiliar = 'Otros egresos'
        break;
      case CodigoAuxiliarRubrosRolEnum.egresosPrestamos:
        strCodigoAuxiliar = 'Egresos prestamos'
        break;
      case CodigoAuxiliarRubrosRolEnum.ingresosFijos:
        strCodigoAuxiliar = 'Ingresos fijos'
        break;
      case CodigoAuxiliarRubrosRolEnum.ingresosLegales:
        strCodigoAuxiliar = 'Ingresos legales'
        break;
      case CodigoAuxiliarRubrosRolEnum.otrosIngresos:
        strCodigoAuxiliar = 'Otros ingresos'
        break;
      case CodigoAuxiliarRubrosRolEnum.totalesAcumulados:
        strCodigoAuxiliar = 'Totales acumulados'
        break;
      case CodigoAuxiliarRubrosRolEnum.totalesIndividuales:
        strCodigoAuxiliar = 'Totales individuales'
        break;
      case CodigoAuxiliarRubrosRolEnum.provisiones:
        strCodigoAuxiliar = 'Provisiones'
        break;

      default:
        break;

    }
    return strCodigoAuxiliar;
  }

}
