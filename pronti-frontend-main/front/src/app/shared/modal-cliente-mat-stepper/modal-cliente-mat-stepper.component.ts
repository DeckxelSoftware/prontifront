import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatStepperConfig} from '../../componentes/forms/form-container/interfaces/mat-stepper-config';
import {MatStepperArray} from '../../componentes/forms/form-container/interfaces/mat-stepper-array';
import {ProveedorTablaComponent} from '../../modulos/proveedor/componentes/proveedor-tabla/proveedor-tabla.component';
import {ClienteTablaComponent} from '../../modulos/cliente/componentes/cliente-tabla/cliente-tabla.component';
import {FormContainerComponent} from '../../componentes/forms/form-container/form-container.component';
import {FormField, SearchAutoCompleteInterface} from '../../componentes/forms/interfaces/form-field';
import {FormClienteEnum} from '../../modulos/cliente/form/form-cliente.enum';
import {EmpresaFindDto} from '../../modulos/empresa/servicios/dto/empresa.find-dto';
import {EmpresaResponseDto} from '../../modulos/empresa/servicios/dto/empresa.response-dto';
import {UsuarioFindDto} from '../../modulos/usuario/servicios/dto/usuario.find-dto';
import {UsuarioResponseDto} from '../../modulos/usuario/servicios/dto/usuario.response-dto';
import {HttpEmpresaService} from '../../modulos/empresa/servicios/http-empresa-service';
import {HttpUsuarioService} from '../../modulos/usuario/servicios/http-usuario-service';

@Component({
  selector: 'app-modal-cliente-mat-stepper',
  templateUrl: './modal-cliente-mat-stepper.component.html',
  styleUrls: ['./modal-cliente-mat-stepper.component.scss']
})
export class ModalClienteMatStepperComponent {

  constructor(
    private _httpEmpresaService: HttpEmpresaService,
    private _httpUsuarioService: HttpUsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: {
      estaEditando: boolean,
      registro: any;
      matStepperConfig: MatStepperConfig,
      arregloFormulario: MatStepperArray[],
      componente: ClienteTablaComponent,
    }
  ) { }


  async confirmFormEmitter(evento: FormContainerComponent) {
    await this.data.componente.crearOEditarModal(this)
  }
  searchAutoComplete(event: SearchAutoCompleteInterface): void {
    console.log('event', event);
    switch (event.field.formControlName) {
      case FormClienteEnum.Empresa:
        this.buscarAutocompleteEmpresa(event);
        break;
      case FormClienteEnum.Usuario:
        this.buscarAutocompleteUsuario(event);
        break;
    }
  }
  buscarAutocompleteEmpresa(evento: SearchAutoCompleteInterface) {
    const busqueda: EmpresaFindDto = {
      busqueda: evento.query,
    };
    this._httpEmpresaService
      .find(busqueda)
      .toPromise()
      .then(res => res as [EmpresaResponseDto[], number])
      .then(data => {
        console.log('empresas autocomplete', data);
        const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        // const arregloDatos = data[0].map((a:any)=>{ a.nombreCompeto = a.nombre + ' ' + a.apellido; return a;});
        if (evento.field.autoComplete) {
          if (Array.isArray(arregloDatos)) {
            evento.field.autoComplete.suggestions = [...arregloDatos];
          } else {
            evento.field.autoComplete.suggestions = [arregloDatos];
          }
        }
        return data;
      });
  }
  searchFieldChanged(event: FormField) {
    console.info({event});

  }


  buscarAutocompleteUsuario(evento: SearchAutoCompleteInterface) {
    const busqueda: UsuarioFindDto = {
      busqueda: evento.query,
    };
    this._httpUsuarioService
      .find(busqueda)
      .toPromise()
      .then(res => res as [UsuarioResponseDto[], number])
      .then(data => {
        console.log('usuarios autocomplete', data);
        const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        // const arregloDatos = data[0].map((a:any)=>{ a.nombreCompeto = a.nombre + ' ' + a.apellido; return a;});
        if (evento.field.autoComplete) {
          if (Array.isArray(arregloDatos)) {
            evento.field.autoComplete.suggestions = [...arregloDatos];
          } else {
            evento.field.autoComplete.suggestions = [arregloDatos];
          }
        }
        return data;
      });
  }


}
