import {Component, OnInit} from '@angular/core';
import {ConfiguracionGeneralResponseDto} from '../../servicios/dto/configuracion-general.response-dto';
import {ConfiguracionGeneralFindDto} from '../../servicios/dto/configuracion-general.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpConfiguracionGeneralService} from '../../servicios/http-configuracion-general-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {ConfiguracionGeneralCreateDto} from '../../servicios/dto/configuracion-general.create-dto';
import {ConfiguracionGeneralUpdateDto} from '../../servicios/dto/configuracion-general.update-dto';
import {FormConfiguracionGeneralEnum} from '../../form/form-configuracion-general.enum';
import {FORM_CONFIGURACION_GENERAL, FORM_EDITAR_IVA} from '../../form/form-configuracion-general';
import {AbstractTable} from '../../../../abstract/table/abstract-table';
import {TAKE} from '../../../../constantes/tabla/take';
import {
  CreateUpdateModalComponent
} from '../../../../componentes/dialog/create-update-modal/create-update-modal.component';
import {MENSAGE_TOAST} from '../../../../constantes/toaster/mensaje-toast';
import {FormField, SearchAutoCompleteInterface} from '../../../../componentes/forms/interfaces/form-field';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {TableAbstractClass} from '../../../../abstract/table/interfaces/table-abstract-class';
import {ModalComponent} from '../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import {AutocompleteFormInterface} from '../../../../abstract/table/interfaces/autocomplete-form.interface';
import {
  CreateUpdateModalParameters
} from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import {MatStepperArray} from '../../../../componentes/forms/form-container/interfaces/mat-stepper-array';
import {FormUsuarioEnum} from '../../../usuario/form/form-usuario.enum';
import {ToasterTipo} from "../../../../servicios/logs-mensajes/enums/toaster-tipo";

@Component({
  selector: 'app-configuracion-general-tabla',
  templateUrl: './configuracion-general-tabla.component.html',
  styleUrls: ['./configuracion-general-tabla.component.scss']
})
export class ConfiguracionGeneralTablaComponent extends AbstractTable<ConfiguracionGeneralResponseDto, ConfiguracionGeneralFindDto>
  implements OnInit, TableAbstractClass<ConfiguracionGeneralResponseDto>, AutocompleteFormInterface {
  editarIva = false;
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
    public httpConfiguracionGeneralService: HttpConfiguracionGeneralService,
    public confirmationService: ConfirmationService,
  ) {
    super(
      httpConfiguracionGeneralService,
      {
        nombreRegistro: 'Configuración General',
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
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    if (this.editarIva) {
      console.log(values);
      this.blockuiService.habilitarBlockUI();
      this.httpConfiguracionGeneralService.actualizarIva({
        idConfiguracion: this.recordUpdated.id,
        ivaPorcentaje: values.ivaPorcentaje,
        asumeIva: values.asumeIva
      })
        .subscribe(
          {
            next: res => {
              this.blockuiService.deshabilitarBlockUI();
              this.parameters.messageService.toaster(
                {
                  titulo: 'Exito',
                  mensaje: `IVA actualizado exitosamente`,
                  tipo: ToasterTipo.success
                }
              );
              closeModal.closeModal();
              this.searchData();
            },
            error: err => {
              this.blockuiService.deshabilitarBlockUI();
              this.parameters.messageService.toaster(MENSAGE_TOAST.error());
              console.error({error: err, message: "Error actualizando IVA", data: values});
            }
          }
        )
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpConfiguracionGeneralService
        .updateById(values as ConfiguracionGeneralUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Configuracion General", data: values});
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
    // switch (event.field.formControlName) {
    //   case FormConfiguracionGeneralEnum.generoLibro:
    //     this.buscarAutocomplete(event);
    // }
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


  createOrEdit(editarIva: boolean, record?: ConfiguracionGeneralResponseDto) {
    this.editarIva = editarIva;
    if (editarIva) {
      let formArray = [
        ...FORM_EDITAR_IVA(),
      ];
      this.createEditFormArray = [...formArray];
      if (record) {
        this.recordUpdated = {...record};
        this.fillForm(this.recordUpdated, this.createEditFormArray);
      }
      this.create = false;
    } else {
      let formArray = [
        ...FORM_CONFIGURACION_GENERAL(),
      ];
      this.createEditFormArray = [...formArray];
      if (record) {
        formArray = [...this.eliminarCampoDeFormulario(formArray, FormConfiguracionGeneralEnum.ivaPorcentaje)];
        this.createEditFormArray = [...formArray];
        this.recordUpdated = {...record};
        this.fillForm(this.recordUpdated, this.createEditFormArray);
        this.create = false;
      } else {
        this.create = true;
        this.recordUpdated = undefined;
      }
    }

    this.openDialog(this.createEditFormArray);
  }

  eliminarCampoDeFormulario(formArray: FormField[], formcontrolName: string) {
    const foundFieldIndex = formArray.findIndex((field) => {
      return field.formControlName === formcontrolName;
    })
    if (foundFieldIndex >= 0) {
      formArray.splice(foundFieldIndex, 1);
    }
    return formArray;
  }

}
