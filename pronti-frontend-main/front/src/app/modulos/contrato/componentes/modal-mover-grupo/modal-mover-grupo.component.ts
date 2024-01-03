import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContratoResponseDto } from '../../servicios/dto/contrato.response-dto';
import { HttpClienteEnGrupoService } from '../../../cliente-en-grupo/servicios/http-cliente-en-grupo-service';
import { ClienteEnGrupoFindDto } from '../../../cliente-en-grupo/servicios/dto/cliente-en-grupo.find-dto';
import { ClienteEnGrupoResponseDto } from '../../../cliente-en-grupo/servicios/dto/cliente-en-grupo.response-dto';

@Component({
  selector: 'app-modal-mover-grupo',
  templateUrl: './modal-mover-grupo.component.html',
  styleUrls: ['./modal-mover-grupo.component.scss']
})
export class ModalMoverGrupoComponent  {

  text = 'asdf';
  results: any[] = [];
  clienteGrupo: ClienteEnGrupoResponseDto = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: ContratoResponseDto,
    private httpClienteEnGrupoService: HttpClienteEnGrupoService,
    public dialogRef: MatDialogRef<ModalMoverGrupoComponent>
  ) { }

  
  search(event: any) {
    const busqueda: ClienteEnGrupoFindDto = {
      idCliente: this.data.idClienteEnGrupo.idCliente.id
    }
    this.httpClienteEnGrupoService.find(busqueda).toPromise().then(res => res as [ClienteEnGrupoResponseDto[], number])
      .then(data => {
        // const arregloDatos = data[0];
        const arregloDatos = data[0].map((a: any) => {
          a.detalleGrupo = 'Grupo: ' + a.idGrupo.nombreGrupo +
            '   Abonos: ' + a.idGrupo.sumatoriaMontoMeta + '  Contratos: '
            + a.idGrupo.totalContratosUsados + '/' + a.idGrupo.totalContratosPermitidos;
          return a;
        })
        .filter((clienteGrupo: any) => clienteGrupo.id !== this.data.idClienteEnGrupo.id);

        this.results = arregloDatos;
        return arregloDatos;
      })
  }


  // buscarAutocomplete(evento: SearchAutoCompleteInterface) {
  //   const busqueda: NombreCampoBusquedaDto = {
  //     nombreCampo: evento.query,
  //   };
  //   this._nombrCampoService
  //       .buscar(busqueda)
  //       .toPromise()
  //       .then(res => res as [NombreCampoInterface[], number])
  //       .then(data => {
  //         const arregloDatos = data[0];
  //         // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
  //         const arregloDatos = data[0].map((a:any)=>{ a.nombreCompeto = a.nombre + ' ' + a.apellido; return a;});
  //         if (evento.campoFormulario.autocomplete) {
  //           if (Array.isArray(arregloDatos)) {
  //             evento.campoFormulario.autocomplete.suggestions = [...arregloDatos];
  //           } else {
  //             evento.campoFormulario.autocomplete.suggestions = [arregloDatos];
  //           }
  //         }
  //         return data;
  //       });
  // }

  moverDeGrupo() {
    // console.log(this.clienteGrupo);
    this.dialogRef.close(this.clienteGrupo);

  }


}
