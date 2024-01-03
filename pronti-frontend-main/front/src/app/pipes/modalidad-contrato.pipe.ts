import {Pipe, PipeTransform} from '@angular/core';
import {ModalidadContrato, ModalidadContratoEnum} from '../enums/modalidad-contrato';

@Pipe({
  name: 'modalidadContratoPipe'
})
export class ModalidadContratoPipe implements PipeTransform {

  transform(modalidadContrato: ModalidadContratoEnum): string {
    return ModalidadContrato[modalidadContrato] ? ModalidadContrato[modalidadContrato].modalidadContrato : '';
  }

}
