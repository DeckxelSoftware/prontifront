import {Component, OnInit} from '@angular/core';
import {PrecioResponseDto} from '../../servicios/dto/precio.response-dto';
import {PrecioFindDto} from '../../servicios/dto/precio.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpPrecioService} from '../../servicios/http-precio-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {PrecioCreateDto} from '../../servicios/dto/precio.create-dto';
import {PrecioUpdateDto} from '../../servicios/dto/precio.update-dto';
import {FORM_PRECIO} from '../../form/form-precio';
import {TAKE} from '../../../../constantes/tabla/take';
import {CreateUpdateModalComponent} from '../../../../componentes/dialog/create-update-modal/create-update-modal.component';
import {MENSAGE_TOAST} from '../../../../constantes/toaster/mensaje-toast';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {AutocompleteFormInterface} from '../../../../abstract/table/interfaces/autocomplete-form.interface';
import {CreateUpdateModalParameters} from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import {AbstractTable} from '../../../../abstract/table/abstract-table';
import {FormField, SearchAutoCompleteInterface} from '../../../../componentes/forms/interfaces/form-field';
import {TableAbstractClass} from '../../../../abstract/table/interfaces/table-abstract-class';
import {ModalComponent} from '../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import {MatStepperArray} from '../../../../componentes/forms/form-container/interfaces/mat-stepper-array';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {ActivatedRoute} from '@angular/router';
import {HttpConfiguracionGeneralService} from '../../../configuracion-general/servicios/http-configuracion-general-service';
import {ConfiguracionGeneralResponseDto} from '../../../configuracion-general/servicios/dto/configuracion-general.response-dto';
import {forkJoin, tap} from 'rxjs';
import {HttpPlanService} from '../../../plan/servicios/http-plan-service';
import {PlanResponseDto} from '../../../plan/servicios/dto/plan.response-dto';

@Component({
  selector: 'app-precio-tabla',
  templateUrl: './precio-tabla.component.html',
  styleUrls: ['./precio-tabla.component.scss']
})
export class PrecioTablaComponent extends AbstractTable<PrecioResponseDto, PrecioFindDto>
  implements OnInit, TableAbstractClass<PrecioResponseDto>, AutocompleteFormInterface {
  idPlan!: number;
  plazoMaximo!: number;
    datosConfiguracion: ConfiguracionGeneralResponseDto = {};
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
    public httpPrecioService: HttpPrecioService,
    public confirmationService: ConfirmationService,
    public activatedRoute: ActivatedRoute,
    public httpConfiguracionGeneralService: HttpConfiguracionGeneralService,
    public httpPlanService: HttpPlanService,
  ) {
    super(
      httpPrecioService,
      {
        nombreRegistro: 'Precio',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    const {idPlan, plazoMaximo} = this.activatedRoute.snapshot.params;
    this.plazoMaximo = plazoMaximo;
    this.idPlan = idPlan;
    if (this.idPlan && this.plazoMaximo) {
      this.findDto.idPlanId = this.idPlan;
      this.stablishSkipAndTake(0, TAKE);
    }
    this.obtenerDatosConfiguracion();
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    if (this.create) {
      values.sisHabilitado = ActivoInactivo.Activo;
      values.idPlan = this.idPlan;
      this.blockuiService.habilitarBlockUI();
      this.httpPrecioService
        .createOne(values as PrecioCreateDto)
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
            console.error({error: error, message: "Error creando Precio", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpPrecioService
        .updateById(values as PrecioUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Precio", data: values});
          },
        });
    }
  }

  fieldModalChanged(event: FormField, enableButton: ModalComponent): void {
    if (event.formGroup.valid) {
      this.calcularTasaAdministrativa(event.formGroup);
      this.createEditFormGroup = event.formGroup;
      enableButton.enableButton(true);
    } else {
      event.formGroup.controls['tasaAdministrativa'].patchValue('');
      this.createEditFormGroup = new FormGroup({});
      enableButton.enableButton(false);
    }
  }

  calcularTasaAdministrativa(formGroup: FormGroup) {
    const cuota = formGroup.controls['cuota'].value
    const precio = formGroup.controls['precio'].value
    // const inscripcion = formGroup.controls['inscripcion'].value
    if (cuota && precio && this.datosConfiguracion.ivaPorcentaje && this.plazoMaximo) {
      const abonoCapital = precio / this.plazoMaximo;
      const tasaAdministrativa = ((cuota - abonoCapital) / (abonoCapital - (abonoCapital * (this.datosConfiguracion.ivaPorcentaje / 100))) * 100).toFixed(2);
      formGroup.controls['tasaAdministrativa'].patchValue(tasaAdministrativa);
    } else {
      formGroup.controls['tasaAdministrativa'].patchValue('');
      this.parameters.messageService.toaster(MENSAGE_TOAST.error('Error consultado impuesto, plazo del plan'))
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
    //   case FormPrecioEnum.generoLibro:
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


  createOrEdit(record?: PrecioResponseDto) {
    const formArray = [
      ...FORM_PRECIO(),
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

  obtenerDatosConfiguracion() {
    this.httpConfiguracionGeneralService.find().subscribe(
      {
        next: res => {
          console.log(res);
          if (res[1] >= 1) {
            this.datosConfiguracion = res[0][0];
          } else {
            this.parameters.messageService.toaster(MENSAGE_TOAST.error('Error consultado impuesto'))
          }
        },
        error: err => {
          console.error('Error consultado datos necesarios', err);
        }
      }
    )
  }
}
