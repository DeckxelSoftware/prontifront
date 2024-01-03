import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PlanResponseDto} from '../../servicios/dto/plan.response-dto';
import {PlanFindDto} from '../../servicios/dto/plan.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpPlanService} from '../../servicios/http-plan-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {PlanCreateDto} from '../../servicios/dto/plan.create-dto';
import {PlanUpdateDto} from '../../servicios/dto/plan.update-dto';
import {FORM_PLAN} from '../../form/form-plan';
import {TAKE} from '../../../../constantes/tabla/take';
import {
  CreateUpdateModalComponent
} from '../../../../componentes/dialog/create-update-modal/create-update-modal.component';
import {MENSAGE_TOAST} from '../../../../constantes/toaster/mensaje-toast';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {AutocompleteFormInterface} from '../../../../abstract/table/interfaces/autocomplete-form.interface';
import {
  CreateUpdateModalParameters
} from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import {AbstractTable} from '../../../../abstract/table/abstract-table';
import {fieldType, FormField, SearchAutoCompleteInterface} from '../../../../componentes/forms/interfaces/form-field';
import {TableAbstractClass} from '../../../../abstract/table/interfaces/table-abstract-class';
import {ModalComponent} from '../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {ToasterTipo} from '../../../../servicios/logs-mensajes/enums/toaster-tipo';
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";
import {Router} from '@angular/router';
import {
  HttpConfiguracionGeneralService
} from '../../../configuracion-general/servicios/http-configuracion-general-service';
import {
  ConfiguracionGeneralResponseDto
} from '../../../configuracion-general/servicios/dto/configuracion-general.response-dto';
import * as xlsx from 'xlsx-with-styles';
import {FORM_ARCHIVO_PLAN} from "../../form/form-archivo";

@Component({
  selector: 'app-plan-tabla',
  templateUrl: './plan-tabla.component.html',
  styleUrls: ['./plan-tabla.component.scss']
})
export class PlanTablaComponent extends AbstractTable<PlanResponseDto, PlanFindDto>
  implements OnInit, TableAbstractClass<PlanResponseDto>, AutocompleteFormInterface {
  files: File[] = [];
  @Input()
  vieneDesdeContrato = false;

  @Output()
  seleccionoPlan = new EventEmitter<PlanResponseDto>();
  @ViewChild('upload') upload: any;
  datosConfiguracion: ConfiguracionGeneralResponseDto = {};
  plazoMaximo!: number;
  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por nombre del plan o código',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Busqueda',
      placeholder: 'Ej: Plan auto ...',
      column: '12',
      actualValue: '',
    },
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
    public httpPlanService: HttpPlanService,
    public confirmationService: ConfirmationService,
    public router: Router,
    public httpConfiguracionGeneralService: HttpConfiguracionGeneralService,
  ) {
    super(
      httpPlanService,
      {
        nombreRegistro: 'Plan',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    this.obtenerDatosConfiguracion();
    this.stablishSkipAndTake(0, TAKE);
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);

    this.setearValoresNumericosDelFormulario(values);
    if (this.create) {
      values.sisHabilitado = ActivoInactivo.Activo;
      this.blockuiService.habilitarBlockUI();
      this.httpPlanService
        .createOne(values as PlanCreateDto)
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
            console.error({error: error, message: "Error creando Plan", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpPlanService
        .updateById(values as PlanUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Plan", data: values});
          },
        });
    }

  }

  setearValoresNumericosDelFormulario(valoresFormulario: any) {
    if (valoresFormulario.precio) {
      valoresFormulario.precio = this.convertirStringNumericoANumero(valoresFormulario.precio);
    }
    if (valoresFormulario.cuotaMes12) {
      valoresFormulario.cuotaMes12 = this.convertirStringNumericoANumero(valoresFormulario.cuotaMes12);
    }
    if (valoresFormulario.cuotaMes24) {
      valoresFormulario.cuotaMes24 = this.convertirStringNumericoANumero(valoresFormulario.cuotaMes24);
    }
    if (valoresFormulario.cuotaMes36) {
      valoresFormulario.cuotaMes36 = this.convertirStringNumericoANumero(valoresFormulario.cuotaMes36);
    }
    if (valoresFormulario.cuotaMes48) {
      valoresFormulario.cuotaMes48 = this.convertirStringNumericoANumero(valoresFormulario.cuotaMes48);
    }
    if (valoresFormulario.cuotaMes60) {
      valoresFormulario.cuotaMes60 = this.convertirStringNumericoANumero(valoresFormulario.cuotaMes60);
    }
    if (valoresFormulario.cuotaMes72) {
      valoresFormulario.cuotaMes72 = this.convertirStringNumericoANumero(valoresFormulario.cuotaMes72);
    }
    if (valoresFormulario.cuotaMes84) {
      valoresFormulario.cuotaMes84 = this.convertirStringNumericoANumero(valoresFormulario.cuotaMes84);
    }

    if (valoresFormulario.inscripcion) {
      valoresFormulario.inscripcion = this.convertirStringNumericoANumero(valoresFormulario.inscripcion);
    }
  }

  convertirStringNumericoANumero(stringNumber: string) {
    return Number(stringNumber);
  }


  convertirFileToB64(file: File) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // @ts-ignore
        const b64 = reader.result.split(',')[1]
        resolve(b64);
      }
      reader.onerror = () => {
        reject(false);
      }
    })
  }

  obtenerArregloDePlanesFromExcel(b64: any): Promise<PlanCreateDto[] | false> {
    let arregloPlanes: any[] = [];
    return new Promise((resolve, reject) => {
      let libro = xlsx.read(b64, {type: 'base64', WTF: true});
      libro.SheetNames.forEach((sheetName) => {
          let jsonPlanes = xlsx.utils.sheet_to_json(libro.Sheets[sheetName],
            {
              header: ['modelo', 'precio', 'cuotaMes12', 'cuotaMes24', 'cuotaMes36', 'cuotaMes48', 'cuotaMes60', 'cuotaMes72', 'cuotaMes84', 'inscripcion']
            }
          );
          jsonPlanes.splice(0, 1); // eliminar el primer objeto por ser el header
          arregloPlanes.push(...jsonPlanes);
        }
      )
      resolve(arregloPlanes as PlanCreateDto[]);
    })

  }

  crearArregloDePlanes(arregloPlanes: PlanResponseDto[]) {
    console.log({arregloPlanes})
  }

  addCampoSisHabilitadoAArregloPlanes(arregloPlanes: PlanCreateDto[]): PlanCreateDto[] {

    const arregloModificado = arregloPlanes.map(plan => {
        plan.sisHabilitado = ActivoInactivo.Activo;
        return plan;
      }
    )
    return arregloModificado;

  }

  async manejarUpload(event: any) {
    this.blockuiService.habilitarBlockUI();
    const file = event.files[0];
    const excelB64 = await this.convertirFileToB64(file);
    const arregloPlanes = await this.obtenerArregloDePlanesFromExcel(excelB64)

    if (arregloPlanes) {
      const arregloPlanesACrear = this.addCampoSisHabilitadoAArregloPlanes(arregloPlanes);
      this.httpPlanService.crearArrayDePlanes(arregloPlanesACrear)
        .subscribe(
          {
            next: res => {
              console.log(res);
              this.upload.clear();
              this.logsMlabsService.toaster(
                {
                  titulo: 'EXITO',
                  mensaje: 'Planes creados',
                  tipo: ToasterTipo.success
                }
              )
              this.searchData();
              this.blockuiService.deshabilitarBlockUI();
            },
            error: err => {
              console.error('Error creando los planes!:', err);
              this.logsMlabsService.toaster(
                {
                  titulo: 'ERROR',
                  mensaje: 'Error creando planes',
                  tipo: ToasterTipo.error
                }
              )
              this.blockuiService.deshabilitarBlockUI();
            }
          }
        )

    } else {
      this.logsMlabsService.toaster(
        {
          titulo: 'ERROR',
          mensaje: 'Error obteniendo datos del archivo',
          tipo: ToasterTipo.error
        }
      )
      this.blockuiService.deshabilitarBlockUI();
    }

  }

  async fieldModalChanged(event: FormField, enableButton: ModalComponent) {

    if (event.formGroup.valid) {

      // this.plazoMaximo = event.formGroup.controls['plazoMesMaximo'].value as number;
      // this.calcularTasaAdministrativa(event.formGroup);

      this.createEditFormGroup = event.formGroup;
      enableButton.enableButton(true);
    }
    // else {
    //   event.formGroup.controls['tasaAdministrativa'].patchValue('');
    //   this.createEditFormGroup = new FormGroup({});
    //   enableButton.enableButton(false);
    // }
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
    //   case FormPlanEnum.generoLibro:
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


  createOrEdit(record?: PlanResponseDto) {
    const formArray = [
      ...FORM_PLAN(),
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

  seleccionarPlan(registro: PlanResponseDto) {

    this.seleccionoPlan.emit(registro);
    console.log('plan', registro);
    // this.dialog.closeAll();
  }

  // navegar(plan: PlanResponseDto, path: string) {
  //   this.router.navigate(['contratos', 'plan-modulo', plan.id, plan.plazoMesMaximo, path])
  // }

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


  calcularTasaAdministrativa(formGroup: FormGroup) {
    const cuota = formGroup.controls['cuota'].value
    const precio = formGroup.controls['precio'].value
    if (cuota && precio && this.datosConfiguracion.ivaPorcentaje && this.plazoMaximo) {
      const abonoCapital = precio / this.plazoMaximo;
      const tasaAdministrativa = ((cuota - abonoCapital) / (abonoCapital + (abonoCapital * (this.datosConfiguracion.ivaPorcentaje / 100))) * 100).toFixed(2);
      formGroup.controls['tasaAdministrativa'].patchValue(tasaAdministrativa);
    } else {
      formGroup.controls['tasaAdministrativa'].patchValue('');
      console.log('error');
      //this.parameters.messageService.toaster(MENSAGE_TOAST.error('Error consultado impuesto, plazo del plan'))
    }


  }

  subirArchivoForm() {
    const formArray = [
      ...FORM_ARCHIVO_PLAN(),
    ];
    this.createEditFormArray = [...formArray];

    this.create = true;
    this.recordUpdated = undefined;

    this.openDialog(this.createEditFormArray);
  }

}
