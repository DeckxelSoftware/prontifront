import {Component, OnInit} from '@angular/core';
import {AbstractTable} from '../../../../abstract/table/abstract-table';
import {TrabajadorResponseDto} from '../../servicios/dto/trabajador.response-dto';
import {TrabajadorFindDto} from '../../servicios/dto/trabajador.find-dto';
import {TableAbstractClass} from '../../../../abstract/table/interfaces/table-abstract-class';
import {AutocompleteFormInterface} from '../../../../abstract/table/interfaces/autocomplete-form.interface';
import {fieldType, FormField, SearchAutoCompleteInterface} from '../../../../componentes/forms/interfaces/form-field';
import {FormGroup} from '@angular/forms';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {MatDialog} from '@angular/material/dialog';
import {HttpTrabajadorService} from '../../servicios/http-trabajador-service';
import {ConfirmationService} from 'primeng/api';
import {HttpUsuarioService} from '../../../usuario/servicios/http-usuario-service';
import {HttpListaValoresDetalleService} from '../../../lista-valores-detalle/servicios/http-lista-valores-detalle-service';
import {Router} from '@angular/router';
import {TAKE} from '../../../../constantes/tabla/take';
import {ModalComponent} from '../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import {TrabajadorCreateDto} from '../../servicios/dto/trabajador.create-dto';
import {MENSAGE_TOAST} from '../../../../constantes/toaster/mensaje-toast';
import {TrabajadorUpdateDto} from '../../servicios/dto/trabajador.update-dto';
import {MatStepperArray} from '../../../../componentes/forms/form-container/interfaces/mat-stepper-array';
import {CreateUpdateModalParameters} from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import {CreateUpdateModalComponent} from '../../../../componentes/dialog/create-update-modal/create-update-modal.component';
import {FormTrabajadorEnum} from '../../form/form-trabajador.enum';
import {UsuarioFindDto} from '../../../usuario/servicios/dto/usuario.find-dto';
import {UsuarioResponseDto} from '../../../usuario/servicios/dto/usuario.response-dto';
import {FORM_DESCUENTO} from '../../form/form-descueto';
import {FORM_BENEFICIO} from '../../form/form-beneficio';

@Component({
  selector: 'app-beneficio-tabla',
  templateUrl: './beneficio-tabla.component.html',
  styleUrls: ['./beneficio-tabla.component.scss']
})
export class BeneficioTablaComponent extends AbstractTable<TrabajadorResponseDto, TrabajadorFindDto>
  implements OnInit, TableAbstractClass<TrabajadorResponseDto>, AutocompleteFormInterface {
  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por nombres o documento de identidad',
      formControlName: 'busquedaUsuario',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Búsqueda',
      placeholder: 'Ej: Cristian/Lara/1717...',
      column: '12',
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
    public httpTrabajadorService: HttpTrabajadorService,
    public confirmationService: ConfirmationService,
    public httpUsuarioService: HttpUsuarioService,
    public httpListavaloresDetalle: HttpListaValoresDetalleService,
    public router: Router,
  ) {
    super(
      httpTrabajadorService,
      {
        nombreRegistro: 'Beneficio',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    this.stablishSkipAndTake(0, TAKE);
    // this.tableData = [{
    //   modalidadContrato: ModalidadContratoEnum.N,
    //   sisHabilitado: ActivoInactivo.Activo,
    //   idUsuario: {
    //     sisHabilitado: ActivoInactivo.Activo,
    //     id: 1,
    //     username: "usario",
    //     nombres: "nombre 131",
    //     apellidos: "apellido 125",
    //     fechaNacimiento: "2022-04-09T01:54:23.000+0000",
    //     correo: "usuario@gmail.com",
    //     tipoMedioContacto1: "telefono",
    //     medioContacto1: "telefono",
    //     tipoDocumentoIdentidad: "cedula",
    //     documentoIdentidad: "1724892129",
    //     pais: "pais 143",
    //     provincia: "guayas",
    //     ciudad: "quito",
    //   }
    // }]
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    // la funcion getFormDate no funciona, llena el dato de select
    if (this.create) {
      values.sisHabilitado = ActivoInactivo.Activo;
      this.blockuiService.habilitarBlockUI();
      this.httpTrabajadorService
        .createOne(values as TrabajadorCreateDto)
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
            console.error({error: error, message: "Error creando Trabajador", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpTrabajadorService
        .updateById(values as TrabajadorUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Trabajador", data: values});
          },
        });
    }
  }

  fieldModalChanged(event: FormField, enableButton: ModalComponent): void {
    console.log('el form group:', event.formGroup);
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
      if (event.formControlName === 'busquedaUsuario') {
        this.findDto.busqueda = event.actualValue
      }
      if (event.formControlName === 'sisHabilitado') {
        this.findDto.sisHabilitado = event.actualValue?.sisHabilitado
      }
      if (event.formControlName === 'modalidadContrato') {
        this.findDto.modalidadContrato = event.actualValue?.modalidadContrato
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
    console.log(event.field);
    switch (event.field.formControlName) {
      case FormTrabajadorEnum.usuario:
        this.buscarAutocompleteUsuario(event);
        break;
    }
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

  // buscarAutocompleteListaValorDetalle(evento: SearchAutoCompleteInterface) {
  //
  //   const busqueda: ListaValoresDetalleFindDto = {
  //     idListaValoresTipoCodigoPrimario: codigoListaValorTipo,
  //     busqueda: evento.query,
  //   };
  //   this.httpListavaloresDetalle
  //     .find(busqueda)
  //     .toPromise()
  //     .then(res => res as [ListaValoresDetalleResponseDto[], number])
  //     .then(data => {
  //       const arregloDatos = data[0];
  //       // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
  //       // const arregloDatos = data[0].map((a: any) => {
  //       //   a.nombreCompeto = a.nombre + ' ' + a.apellido;
  //       //   return a;
  //       // });
  //       if (evento.field.autoComplete) {
  //         if (Array.isArray(arregloDatos)) {
  //           evento.field.autoComplete.suggestions = [...arregloDatos];
  //         } else {
  //           evento.field.autoComplete.suggestions = [arregloDatos];
  //         }
  //       }
  //       return data;
  //     });
  // }

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


  createOrEdit(record?: TrabajadorResponseDto) {
    const formArray = [
      ...FORM_BENEFICIO(),
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
    this.openDialog(this.createEditFormArray)
  }

}
