import {Component, OnInit} from '@angular/core';
import {FiniquitoResponseDto} from '../../servicios/dto/finiquito.response-dto';
import {FiniquitoFindDto} from '../../servicios/dto/finiquito.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpFiniquitoService} from '../../servicios/http-finiquito-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {FiniquitoCreateDto} from '../../servicios/dto/finiquito.create-dto';
import {FiniquitoUpdateDto} from '../../servicios/dto/finiquito.update-dto';
import {FormFiniquitoEnum} from '../../form/form-finiquito.enum';
import {FORM_FINIQUITO} from '../../form/form-finiquito';
import {TAKE} from "../../../../constantes/tabla/take";
import {
  CreateUpdateModalComponent
} from "../../../../componentes/dialog/create-update-modal/create-update-modal.component";
import {MENSAGE_TOAST} from "../../../../constantes/toaster/mensaje-toast";
import {BlockuiService} from "../../../../servicios/block-ui/blockui.service";
import {LogsMlabsService} from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import {AutocompleteFormInterface} from "../../../../abstract/table/interfaces/autocomplete-form.interface";
import {
  CreateUpdateModalParameters
} from "../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters";
import {AbstractTable} from "../../../../abstract/table/abstract-table";
import {FormField, SearchAutoCompleteInterface} from "../../../../componentes/forms/interfaces/form-field";
import {TableAbstractClass} from "../../../../abstract/table/interfaces/table-abstract-class";
import {ModalComponent} from "../../../../componentes/dialog/create-update-modal/interfaces/modal-component";
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";
import {TrabajadorFindDto} from "../../../trabajador/servicios/dto/trabajador.find-dto";
import {TrabajadorResponseDto} from "../../../trabajador/servicios/dto/trabajador.response-dto";
import {HttpTrabajadorService} from "../../../trabajador/servicios/http-trabajador-service";
import {ActivoInactivo} from "../../../../enums/activo-inactivo";
import {ListaValoresDetalleFindDto} from "../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.find-dto";
import {
  ListaValoresDetalleResponseDto
} from "../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.response-dto";
import {ListaValoresEnum} from "../../../../constantes/lista-valores/lista-valores.enum";
import {
  HttpListaValoresDetalleService
} from "../../../lista-valores-detalle/servicios/http-lista-valores-detalle-service";
import {ToasterTipo} from "../../../../servicios/logs-mensajes/enums/toaster-tipo";
import * as dayjs from "dayjs";

@Component({
  selector: 'app-finiquito-tabla',
  templateUrl: './finiquito-tabla.component.html',
  styleUrls: ['./finiquito-tabla.component.scss']
})
export class FiniquitoTablaComponent extends AbstractTable<FiniquitoResponseDto, FiniquitoFindDto>
  implements OnInit, TableAbstractClass<FiniquitoResponseDto>, AutocompleteFormInterface {
  searchBarFormFields: FormField[] = [
    // {
    //   help: 'Puede buscar por nombre',
    //   formControlName: 'busqueda',
    //   initialValue: "",
    //   validators: [],
    //   type: fieldType.text,
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   label: 'Busqueda',
    //   placeholder: 'Ej: ...',
    //   column: '12',
    //   actualValue: '',
    // },
    // {
    //   label: 'Habilitado',
    //   formControlName: 'sisHabilitado',
    //   type: fieldType.select,
    //   help: 'Seleccione si esta habilitado o no',
    //   select:{
    //     filterBy:'sisHabilitado',
    //     dataKey:'sisHabilitado',
    //     filterPlaceholder:'0 = Inactivo, 1 = Activo',
    //     optionLabel: 'nombre',
    //     options:[
    //       {
    //         sisHabilitado:ActivoInactivo.Activo,
    //         nombre: 'Activo',
    //       },
    //       {
    //         sisHabilitado:ActivoInactivo.Inactivo,
    //         nombre: 'Inactivo',
    //       }
    //     ]
    //   },
    //   initialValue: "",
    //   validators: [],
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   placeholder: 'Ej: Activo / Inactivo',
    //   column: '6',
    //   actualValue: '',
    // },
  ];

  constructor(
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
    public dialog: MatDialog,
    public httpFiniquitoService: HttpFiniquitoService,
    public httpTrabajadorService: HttpTrabajadorService,
    public confirmationService: ConfirmationService,
    public httpListavaloresDetalle: HttpListaValoresDetalleService,
  ) {
    super(
      httpFiniquitoService,
      {
        nombreRegistro: 'Finiquito',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    this.stablishSkipAndTake(0, TAKE);
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    // se debe calcular los datos del finiquito
    // despues mostrar otro modal de confirmacion con la descarga del pdf
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    if (this.create) {
      this.blockuiService.habilitarBlockUI();
      this.httpFiniquitoService
        .createOne(values as FiniquitoCreateDto)
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
            console.error({error: error, message: "Error creando Finiquito", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpFiniquitoService
        .updateById(values as FiniquitoUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Finiquito", data: values});
          },
        });
    }
  }

  fieldModalChanged(event: FormField, enableButton: ModalComponent): void {

    if (event.formControlName === FormFiniquitoEnum.idTrabajador) {
      console.log('campo:', event);
      const objetotrabajador = event.actualValue;
      event.formGroup.get('documentoIdentidad')?.setValue(objetotrabajador.idUsuario.documentoIdentidad);
      const fechaIngreso = dayjs(objetotrabajador.fechaIngreso).format('DD-MM-YYYY');
      event.formGroup.get('fechaIngreso')?.setValue(fechaIngreso);
      event.formGroup.get('profesion')?.setValue(objetotrabajador.profesion);
      event.formGroup.get('sueldo')?.setValue(objetotrabajador.sueldo);
      // forma de pago
      console.log(objetotrabajador.collectionInformacionFinanciera);
      if (objetotrabajador.collectionInformacionFinanciera) {
        if (objetotrabajador.collectionInformacionFinanciera.length > 0) {
          const informacionFinanciera = objetotrabajador.collectionInformacionFinanciera[0];
          event.formGroup.get('formaPago')?.setValue({formaPago: informacionFinanciera.formaPago});
        } else {
          event.formGroup.get('formaPago')?.reset();
          this.logsMlabsService.toaster(
            {
              titulo: 'Error',
              mensaje: 'No se pudo establecer la forma de pago',
              tipo: ToasterTipo.error
            }
          );
        }
      } else {
        event.formGroup.get('formaPago')?.reset();
        this.logsMlabsService.toaster(
          {
            titulo: 'Error',
            mensaje: 'No se pudo establecer la forma de pago',
            tipo: ToasterTipo.error
          }
        );
      }
      if (objetotrabajador.fondoReservaIess) {
        event.formGroup.get('fondoReservaIess')?.setValue({fondoReservaIess: objetotrabajador.fondoReservaIess});
      } else {
        event.formGroup.get('fondoReservaIess')?.reset();
      }


    }
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
      description: "Por favor llene la informacion pertinente.",
      accordeons: arrayAccordeon,
      formsFields: formFields,
      button: `${this.create ? 'Calcular ' : 'Actualizar'} `,
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
      case FormFiniquitoEnum.idTrabajador:
        this.buscarAutocompleteTrabajador(event);
        break;
      case FormFiniquitoEnum.motivoSalida:
        this.buscarAutocompleteListaValorDetalle(event);
        break;
    }
  }

  buscarAutocompleteTrabajador(evento: SearchAutoCompleteInterface) {
    const busqueda: TrabajadorFindDto = {
      sisHabilitado: ActivoInactivo.Activo
    };
    if (evento.query) {
      busqueda.busqueda = evento.query
    }
    this.httpTrabajadorService
      .findCustome(busqueda)
      .toPromise()
      .then(res => res as [TrabajadorResponseDto[], number])
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

  findCodListaValorTipo(field: string) {
    const codListaValorTipo = {
      motivoSalida: ListaValoresEnum.motivoSalida,
      default: ''
    }
    // @ts-ignore
    return (codListaValorTipo[field] || codListaValorTipo.default)
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


  createOrEdit(record?: FiniquitoResponseDto) {
    const formArray = [
      ...FORM_FINIQUITO(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      this.recordUpdated = {...record};
      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;
    } else {
      this.create = true;
      this.recordUpdated = undefined;
    }
    this.openDialog(this.createEditFormArray);
  }

}
