import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatStepperConfig} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-config";
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";
import {TrabajadorResponseDto} from "../../servicios/dto/trabajador.response-dto";
import {TrabajadorTablaComponent} from "../trabajador-tabla/trabajador-tabla.component";
import {Form, FormGroup, Validators} from "@angular/forms";
import {REGEX_LETRAS_ESPACIOS} from "../../../../constantes/form/regex/letras-espacios";
import {FormField, SearchAutoCompleteInterface} from "../../../../componentes/forms/interfaces/form-field";
import {FormTrabajadorEnum} from "../../form/form-trabajador.enum";
import {UsuarioFindDto} from "../../../usuario/servicios/dto/usuario.find-dto";
import {UsuarioResponseDto} from "../../../usuario/servicios/dto/usuario.response-dto";
import {ListaValoresDetalleFindDto} from "../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.find-dto";
import {
  ListaValoresDetalleResponseDto
} from "../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.response-dto";
import {CuentaContableFindDto} from "../../../cuenta-contable/servicios/dto/cuenta-contable.find-dto";
import {BlockuiService} from "../../../../servicios/block-ui/blockui.service";
import {LogsMlabsService} from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import {HttpTrabajadorService} from "../../servicios/http-trabajador-service";
import {ConfirmationService} from "primeng/api";
import {HttpUsuarioService} from "../../../usuario/servicios/http-usuario-service";
import {
  HttpListaValoresDetalleService
} from "../../../lista-valores-detalle/servicios/http-lista-valores-detalle-service";
import {Router} from "@angular/router";
import {HttpCuentaContableService} from "../../../cuenta-contable/servicios/http-cuenta-contable-service";
import {
  HttpConfiguracionGeneralService
} from "../../../configuracion-general/servicios/http-configuracion-general-service";
import {ListaValoresEnum} from "../../../../constantes/lista-valores/lista-valores.enum";
import {FormContainerComponent} from "../../../../componentes/forms/form-container/form-container.component";
import {FormUsuarioEnum} from "../../../usuario/form/form-usuario.enum";
import {AgenciaFindDto} from "../../../agencia/servicios/dto/agencia.find-dto";
import {AgenciaResponseDto} from "../../../agencia/servicios/dto/agencia.response-dto";
import {HttpAgenciaService} from "../../../agencia/servicios/http-agencia-service";

@Component({
  selector: 'app-modal-crear-trabajador',
  templateUrl: './modal-crear-trabajador.component.html',
  styleUrls: ['./modal-crear-trabajador.component.scss']
})
export class ModalCrearTrabajadorComponent {
  configStepper: MatStepperConfig = {
    orientation: 'horizontal',
    linear: false,
    editable: true
  }

  constructor(
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalCrearTrabajadorComponent>,
    public httpTrabajadorService: HttpTrabajadorService,
    public confirmationService: ConfirmationService,
    public httpUsuarioService: HttpUsuarioService,
    public httpListavaloresDetalle: HttpListaValoresDetalleService,
    public router: Router,
    public httpCuentaContable: HttpCuentaContableService,
    private _httpConfiguracionGeneralService: HttpConfiguracionGeneralService,
    public httpAgenciaService: HttpAgenciaService,
    @Inject(MAT_DIALOG_DATA) public data: {
      estaEditando: boolean,
      registro: TrabajadorResponseDto;
      matStepperConfig: MatStepperConfig,
      arregloFormulario: MatStepperArray[],
      componente: TrabajadorTablaComponent,
    }
  ) {
  }

  close() {
    this.dialogRef.close();
  }

  searchAutoComplete(event: SearchAutoCompleteInterface): void {
    console.log(event.field);
    switch (event.field.formControlName) {
      case FormTrabajadorEnum.idAgencia:
        this.buscarAutocompleteAgencia(event);
        break;
      case FormTrabajadorEnum.usuario:
        this.buscarAutocompleteUsuario(event);
        break;
      case FormTrabajadorEnum.estadoCivil:
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case FormTrabajadorEnum.grupoSanguineo:
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case FormTrabajadorEnum.nivelEstudios:
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case FormTrabajadorEnum.profesion:
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case FormTrabajadorEnum.tipoDiscapacidad:
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case 'provincia':
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case 'pais':
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case 'ciudad':
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case FormTrabajadorEnum.cuentaContableNombre:
        this.buscarAutocompleteCuentaContable(event);
        break;
      case FormUsuarioEnum.tipoMedioContacto:
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case FormUsuarioEnum.tipoDocumentoIdentidad:
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case FormUsuarioEnum.pais:
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case FormUsuarioEnum.provincia:
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case FormUsuarioEnum.ciudad:
        this.buscarAutocompleteListaValorDetalle(event);
        break;
    }
  }


  buscarAutocompleteAgencia(evento: SearchAutoCompleteInterface) {
    const busqueda: AgenciaFindDto = {
      busqueda: evento.query,
    };
    this.httpAgenciaService
      .find(busqueda)
      .toPromise()
      .then(res => res as [AgenciaResponseDto[], number])
      .then(data => {
        const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        // const arregloDatos = data[0].map((a: any) => {
        //   a.nombreCompeto = a.nombre + ' ' + a.apellido;
        //   return a;
        // });
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

  buscarAutocompleteUsuario(evento: SearchAutoCompleteInterface) {
    const busqueda: UsuarioFindDto = {
      busqueda: evento.query,
    };
    this.httpUsuarioService
      .find(busqueda)
      .toPromise()
      .then(res => res as [UsuarioResponseDto[], number])
      .then(data => {
        // const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        const arregloDatos = data[0].map((a: any) => {
          a.nombresCompletos = a.nombres + ' ' + a.apellidos;
          return a;
        });
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

  buscarAutocompleteListaValorDetalle(evento: SearchAutoCompleteInterface) {
    let codigoListaValorTipo = this.findCodListaValorTipo(evento.field.formControlName);
    const busqueda: ListaValoresDetalleFindDto = {
      idListaValoresTipoCodigoPrimario: codigoListaValorTipo,
      busqueda: evento.query,
    };
    this.httpListavaloresDetalle
      .find(busqueda)
      .toPromise()
      .then(res => res as [ListaValoresDetalleResponseDto[], number])
      .then(data => {
        const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        // const arregloDatos = data[0].map((a: any) => {
        //   a.nombreCompeto = a.nombre + ' ' + a.apellido;
        //   return a;
        // });
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

  buscarAutocompleteCuentaContable(evento: SearchAutoCompleteInterface) {

    const busqueda: CuentaContableFindDto = {
      busqueda: evento.query,
    };
    this.httpCuentaContable
      .find(busqueda)
      .toPromise()
      .then(res => res as [ListaValoresDetalleResponseDto[], number])
      .then(data => {
        const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        // const arregloDatos = data[0].map((a: any) => {
        //   a.nombreCompeto = a.nombre + ' ' + a.apellido;
        //   return a;
        // });
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


  findCodListaValorTipo(field: string) {
    const codListaValorTipo = {
      pais: ListaValoresEnum.paisUsuario,
      provincia: ListaValoresEnum.provinciaUsuario,
      ciudad: ListaValoresEnum.ciudadUsuario,
      estadoCivil: ListaValoresEnum.estadoCivil,
      grupoSanguineo: ListaValoresEnum.grupoSanguineo,
      nivelEstudios: ListaValoresEnum.nivelEstudios,
      profesion: ListaValoresEnum.profesion,
      tipoDiscapacidad: ListaValoresEnum.tipoDiscapacidad,
      tipoMedioContacto1: ListaValoresEnum.tipoMedioContacto,
      tipoDocumentoIdentidad: ListaValoresEnum.tipoDocumentoIdentidad,
      default: ''
    }
    // @ts-ignore
    return (codListaValorTipo[field] || codListaValorTipo.default)
  }

  fieldChanged(event: any) {
    console.log(this.data.arregloFormulario);
    this.data.componente.stepperFieldModalChanged(event, this.data.arregloFormulario);
  }

  async confirmFormEmitter(evento: FormContainerComponent) {
    await this.data.componente.crearOEditarModal(this)
  }

}
