import {Pipe, PipeTransform} from '@angular/core';
import {EstadoContratoEnum} from '../enums/estado-contrato.enum';

@Pipe({
  name: 'estadoContrato'
})
export class EstadoContratoPipe implements PipeTransform {


  transform(value?: string): string {
    let salida = ''
    switch (value) {
      case EstadoContratoEnum.Registrado:
        salida = 'Registrado';
        break;
      case EstadoContratoEnum.EnProceso:
        salida = 'En proceso';
        break;
      case EstadoContratoEnum.Preadjudicado:
        salida = 'Preadjudicado';
        break;
      case EstadoContratoEnum.Adjudicado:
        salida = 'Adjudicado';
        break;
      case EstadoContratoEnum.CambioDePlan:
        salida = 'Cambio de plan';
        break;
      case EstadoContratoEnum.CambioMonto:
        salida = 'Cambio de monto';
        break;
      case EstadoContratoEnum.CambioPlazo:
        salida = 'Cambio de plazo';
        break;
      case EstadoContratoEnum.Desistimiento:
        salida = 'Desistimiento';
        break;
      case EstadoContratoEnum.CesionDerechos:
        salida = 'Cesión de derechos';
        break;
      case EstadoContratoEnum.Refinamiento:
        salida = 'Refinamiento';
        break;
      case EstadoContratoEnum.Reactivacion:
        salida = 'Reactivación';
        break;
      case EstadoContratoEnum.Unificacion:
        salida = 'Unificación';
        break;
      case EstadoContratoEnum.Devolucion:
        salida = 'Devolución';
        break;
      default:
        salida = '';
        break;
    }

    return salida;
  }

}
