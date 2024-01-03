import {Component, OnInit} from '@angular/core';
import {AbstractTable} from "../../../../abstract/table/abstract-table";
import {PrestamoResponseDto} from "../../servicios/dto/prestamo.response-dto";
import {PrestamoFindDto} from "../../servicios/dto/prestamo.find-dto";
import {TableAbstractClass} from "../../../../abstract/table/interfaces/table-abstract-class";
import {AutocompleteFormInterface} from "../../../../abstract/table/interfaces/autocomplete-form.interface";
import {fieldType, FormField, SearchAutoCompleteInterface} from "../../../../componentes/forms/interfaces/form-field";
import {FormGroup} from "@angular/forms";
import {ActivoInactivo} from "../../../../enums/activo-inactivo";
import {BlockuiService} from "../../../../servicios/block-ui/blockui.service";
import {LogsMlabsService} from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import {MatDialog} from "@angular/material/dialog";
import {HttpPrestamoService} from "../../servicios/http-prestamo-service";
import {ConfirmationService} from "primeng/api";
import {Router} from "@angular/router";
import {
  HttpListaValoresDetalleService
} from "../../../lista-valores-detalle/servicios/http-lista-valores-detalle-service";
import {HttpTrabajadorService} from "../../../trabajador/servicios/http-trabajador-service";
import {TAKE} from "../../../../constantes/tabla/take";
import {ModalComponent} from "../../../../componentes/dialog/create-update-modal/interfaces/modal-component";
import {PrestamoCreateDto} from "../../servicios/dto/prestamo.create-dto";
import {MENSAGE_TOAST} from "../../../../constantes/toaster/mensaje-toast";
import {PrestamoUpdateDto} from "../../servicios/dto/prestamo.update-dto";
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";
import {
  CreateUpdateModalParameters
} from "../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters";
import {
  CreateUpdateModalComponent
} from "../../../../componentes/dialog/create-update-modal/create-update-modal.component";
import {FormPrestamoEnum} from "../../form/form-prestamo.enum";
import {ListaValoresEnum} from "../../../../constantes/lista-valores/lista-valores.enum";
import {ListaValoresDetalleFindDto} from "../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.find-dto";
import {
  ListaValoresDetalleResponseDto
} from "../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.response-dto";
import {TrabajadorFindDto} from "../../../trabajador/servicios/dto/trabajador.find-dto";
import {FORM_SOLICITUD_PRESTAMO} from "../../form/form-solicitud-prestamo";
import {EstadoSolicitudPrestamo} from "../../../../enums/estado-solicitud-prestamo";
import * as uuid from 'uuid';
import {ToasterTipo} from "../../../../servicios/logs-mensajes/enums/toaster-tipo";

@Component({
  selector: 'app-solicitud-prestamo-tabla',
  templateUrl: './solicitud-prestamo-tabla.component.html',
  styleUrls: ['./solicitud-prestamo-tabla.component.scss']
})
export class SolicitudPrestamoTablaComponent extends AbstractTable<PrestamoResponseDto, PrestamoFindDto>
  implements OnInit, TableAbstractClass<PrestamoResponseDto>, AutocompleteFormInterface {
  usuarioLogeado: any = {};
  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por nombre del trabajador',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Busqueda',
      placeholder: 'Ej: ...',
      column: '6',
      actualValue: '',
    },
    {
      label: 'Habilitado',
      formControlName: 'sisHabilitado',
      type: fieldType.select,
      help: 'Seleccione si esta habilitado o no',
      select: {
        filterBy: 'sisHabilitado',
        dataKey: 'sisHabilitado',
        filterPlaceholder: '0 = Inactivo, 1 = Activo',
        optionLabel: 'nombre',
        options: [
          {
            sisHabilitado: ActivoInactivo.Activo,
            nombre: 'Activo',
          },
          {
            sisHabilitado: ActivoInactivo.Inactivo,
            nombre: 'Inactivo',
          }
        ]
      },
      initialValue: "",
      validators: [],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Activo / Inactivo',
      column: '6',
      actualValue: '',
    },
  ];

  constructor(
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
    public dialog: MatDialog,
    public httpPrestamoService: HttpPrestamoService,
    public confirmationService: ConfirmationService,
    public router: Router,
    public httpListavaloresDetalle: HttpListaValoresDetalleService,
    public httpTrabajadorService: HttpTrabajadorService
  ) {
    super(
      httpPrestamoService,
      {
        nombreRegistro: 'Solicitud de Préstamo',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    this.findDto.estadoSolicitud = EstadoSolicitudPrestamo.vigente;
    this.obtenerDatosUsuarioLogeado();
    this.stablishSkipAndTake(0, TAKE);
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
  }

  obtenerDatosUsuarioLogeado() {
    const usuarioLogeado = JSON.parse(localStorage.getItem('usuario') as string);
    if (usuarioLogeado) {
      this.usuarioLogeado = usuarioLogeado;
    }
  }

  obtenerArregloPrestamosRegistradosLocalStorage() {
    const prestamosRegistrados = localStorage.getItem('prestamosRegistrados');
    return prestamosRegistrados ? JSON.parse(prestamosRegistrados) : prestamosRegistrados;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    // console.log(this.createEditFormGroup);
    if (this.create) {
      this.blockuiService.habilitarBlockUI();
      values.idAux = uuid.v1();
      values.idTrabajador = this.createEditFormGroup.value.idTrabajador;
      values.sisHabilitado = ActivoInactivo.Activo;
      if (this.usuarioLogeado?.nombres && this.usuarioLogeado?.apellidos) {
        values.nombreApellidoResponsable = this.usuarioLogeado.nombres + ' ' + this.usuarioLogeado.apellidos;
      }
      let arregloPrestamos: any = this.obtenerArregloPrestamosRegistradosLocalStorage();
      if (arregloPrestamos) {
        console.log(arregloPrestamos);
        arregloPrestamos.push({...values});
        localStorage.setItem('prestamosRegistrados', JSON.stringify(arregloPrestamos));
        this.parameters.messageService.toaster(
          {
            titulo: 'Exito',
            mensaje: `Solicitud de préstamo registrada`,
            tipo: ToasterTipo.success
          }
        );
      } else {
        arregloPrestamos = JSON.stringify([{...values}]);
        localStorage.setItem('prestamosRegistrados', arregloPrestamos);
        this.parameters.messageService.toaster(
          {
            titulo: 'Exito',
            mensaje: `Solicitud de préstamo registrada`,
            tipo: ToasterTipo.success
          }
        );
      }

      this.blockuiService.deshabilitarBlockUI();
      closeModal.closeModal();
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpPrestamoService
        .updateById(values as PrestamoUpdateDto, this.recordUpdated.id as number)
        .subscribe({
          next: () => {
            this.blockuiService.deshabilitarBlockUI();
            this.parameters.messageService.toaster(
              MENSAGE_TOAST.creacionExitosa(
                this.parameters.nombreRegistro ? this.parameters.nombreRegistro : 'Registro'
              )
            );
            closeModal.closeModal();
            this.searchData();
          },
          error: (error) => {
            this.blockuiService.deshabilitarBlockUI();
            this.parameters.messageService.toaster(MENSAGE_TOAST.error());
            console.error({error: error, message: "Error actualizando Prestamo", data: values});
          },
        });
    }
  }

  fieldModalChanged(event: FormField, enableButton: ModalComponent): void {
    if (event.formGroup.valid) {
      this.createEditFormGroup = event.formGroup;
      enableButton.enableButton(true);
    } else {
      this.createEditFormGroup = new FormGroup({});
      enableButton.enableButton(false);
    }
  }

  openDialog(formFields: FormField[], arrayAccordeon: MatStepperArray[] = []): void {
    const createUpdateModalParameters: CreateUpdateModalParameters = {
      title: `${this.create ? 'Crear ' : 'Actualizar'} ${this.parameters.nombreRegistro}`,
      description: "Por favor llene la información pertinente.",
      accordeons: arrayAccordeon,
      formsFields: formFields,
      button: `${this.create ? 'Crear ' : 'Actualizar'} `,
      route: this,
    };
    const dialogRef = this.dialog.open(CreateUpdateModalComponent, {
      data: createUpdateModalParameters,
    });
  }

  searchFieldChanged(event: FormField): void {
    if (event.valid) {
      // setear formgroup
      this.findForm = event.formGroup;
      if (event.formControlName === 'busqueda') {
        this.findDto.busqueda = event.actualValue
      }
      if (event.formControlName === 'sisHabilitado') {
        this.findDto.sisHabilitado = event.actualValue?.sisHabilitado
      }
      // Habilitar boton
      this.searchButtonDisabled = false;
    } else {
      // limpiar dto
      this.clearFindDto();
      // Deshabilitar boton
      this.searchButtonDisabled = false;
    }
  }

  searchAutoComplete(event: SearchAutoCompleteInterface): void {
    switch (event.field.formControlName) {
      case FormPrestamoEnum.tipoPrestamo:
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case FormPrestamoEnum.idTrabajador:
        this.buscarAutocompleteTrabajador(event);
        break;
    }
  }

  findCodListaValorTipo(field: string) {
    const codListaValorTipo = {
      tipoPrestamo: ListaValoresEnum.tipoPrestamoE,
      default: ''
    }
    // @ts-ignore
    return (codListaValorTipo[field] || codListaValorTipo.default)
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

  buscarAutocompleteTrabajador(evento: SearchAutoCompleteInterface) {
    const busqueda: TrabajadorFindDto = {
      busqueda: evento.query,
      sisHabilitado: ActivoInactivo.Activo
    };
    this.httpTrabajadorService
      .find(busqueda)
      .toPromise()
      .then(res => res as [ListaValoresDetalleResponseDto[], number])
      .then(data => {
        // const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        const arregloDatos = data[0].map((a: any) => {
          a.nombreCompleto = a.idUsuario.nombres + ' ' + a.idUsuario.apellidos;
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


  createOrEdit(record?: PrestamoResponseDto) {
    const formArray = [
      ...FORM_SOLICITUD_PRESTAMO(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      this.recordUpdated = {...record};
      if (this.recordUpdated.idTrabajador?.idUsuario?.nombres && this.recordUpdated.idTrabajador?.idUsuario?.apellidos) {
        this.recordUpdated.idTrabajador.nombreCompleto = this.recordUpdated.idTrabajador.idUsuario.nombres + ' ' + this.recordUpdated.idTrabajador.idUsuario.apellidos;
      }
      this.recordUpdated.tipoPrestamo = {nombre: this.recordUpdated.tipoPrestamo};
      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;
    } else {
      this.create = true;
      this.recordUpdated = undefined;
    }
    this.openDialog(this.createEditFormArray);
  }

  navegar(path: string) {
    this.router.navigate(['prestamo', 'prestamo-modulo', path])
  }

}
