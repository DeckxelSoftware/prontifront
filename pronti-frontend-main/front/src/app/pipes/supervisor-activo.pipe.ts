import {Pipe, PipeTransform} from '@angular/core';

import {SupervisorResponseDto} from '../modulos/supervisor/servicios/dto/supervisor.response-dto';

@Pipe({
  name: 'supervisorActivo'
})
export class SupervisorActivoPipe implements PipeTransform {
  transform(supervisoresAgencia: SupervisorResponseDto[]): string {
    let strSupervisor = '';
    console.log(typeof supervisoresAgencia);
    if (supervisoresAgencia?.length > 0) {
      const indexSupervisorHabilitado = supervisoresAgencia.findIndex((supervisor) => {
          return supervisor.sisHabilitado === 'A';
        }
      );
      if (indexSupervisorHabilitado >= 0) {
        // @ts-ignore
        if (supervisoresAgencia[indexSupervisorHabilitado].idTrabajador.idUsuario) {
          // @ts-ignore
          strSupervisor = supervisoresAgencia[indexSupervisorHabilitado].idTrabajador.idUsuario.nombres + ' ' + supervisoresAgencia[indexSupervisorHabilitado].idTrabajador.idUsuario.apellidos;
        } else {
          strSupervisor = ''
        }

      } else {
        strSupervisor = '';
      }
      return strSupervisor;
    } else {
      return strSupervisor;
    }

  }
}
