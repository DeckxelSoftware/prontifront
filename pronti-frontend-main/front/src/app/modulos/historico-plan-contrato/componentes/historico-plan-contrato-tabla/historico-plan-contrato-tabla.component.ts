import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {HistoricoPlanContratoResponseDto} from '../../servicios/dto/historico-plan-contrato.response-dto';
import {HistoricoPlanContratoFindDto} from '../../servicios/dto/historico-plan-contrato.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpHistoricoPlanContratoService} from '../../servicios/http-historico-plan-contrato-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {HistoricoPlanContratoCreateDto} from '../../servicios/dto/historico-plan-contrato.create-dto';
import {HistoricoPlanContratoUpdateDto} from '../../servicios/dto/historico-plan-contrato.update-dto';
import {FormHistoricoPlanContratoEnum} from '../../form/form-historico-plan-contrato.enum';
import {FORM_HISTORICO_PLAN_CONTRATO} from '../../form/form-historico-plan-contrato';
import {AbstractTable} from '../../../../abstract/table/abstract-table';
import {TableAbstractClass} from '../../../../abstract/table/interfaces/table-abstract-class';
import {AutocompleteFormInterface} from '../../../../abstract/table/interfaces/autocomplete-form.interface';
import {FormField, SearchAutoCompleteInterface} from '../../../../componentes/forms/interfaces/form-field';
import {TAKE} from '../../../../constantes/tabla/take';
import {
  CreateUpdateModalComponent
} from '../../../../componentes/dialog/create-update-modal/create-update-modal.component';
import {MENSAGE_TOAST} from '../../../../constantes/toaster/mensaje-toast';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {ModalComponent} from '../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import {
  CreateUpdateModalParameters
} from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import {PlanFindDto} from '../../../plan/servicios/dto/plan.find-dto';
import {HttpPlanService} from '../../../plan/servicios/http-plan-service';
import {PlanResponseDto} from '../../../plan/servicios/dto/plan.response-dto';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {ActivatedRoute, Router} from '@angular/router';
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";
import {Table} from "primeng/table";

@Component({
  selector: 'app-historico-plan-contrato-tabla',
  templateUrl: './historico-plan-contrato-tabla.component.html',
  styleUrls: ['./historico-plan-contrato-tabla.component.scss']
})
export class HistoricoPlanContratoTablaComponent extends AbstractTable<HistoricoPlanContratoResponseDto, HistoricoPlanContratoFindDto>
  implements OnInit, TableAbstractClass<HistoricoPlanContratoResponseDto>, AutocompleteFormInterface {

  @Input() idContrato!: number | undefined;
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
    public httpHistoricoPlanContratoService: HttpHistoricoPlanContratoService,
    public confirmationService: ConfirmationService,
    public httpPlanService: HttpPlanService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) {
    super(
      httpHistoricoPlanContratoService,
      {
        nombreRegistro: 'Historico Plan Contrato',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    const {idContrato} = this.activatedRoute.snapshot.params
    if (idContrato) {
      this.findDto.idContrato = +idContrato;
    } else if (this.idContrato) {
      this.findDto.idContrato = this.idContrato;
    }

    this.stablishSkipAndTake(0, TAKE);
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
      values.idContrato = this.findDto.idContrato;
      this.blockuiService.habilitarBlockUI();
      this.httpHistoricoPlanContratoService
        .createOne(values as HistoricoPlanContratoCreateDto)
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
            console.error({error: error, message: "Error creando Historico Plan Contrato", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpHistoricoPlanContratoService
        .updateById(values as HistoricoPlanContratoUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Historico Plan Contrato", data: values});
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
    switch (event.field.formControlName) {
      case FormHistoricoPlanContratoEnum.idPlan:
        this.buscarAutocompletePlan(event);
    }
  }

  buscarAutocompletePlan(evento: SearchAutoCompleteInterface) {
    const busqueda: PlanFindDto = {
      busqueda: evento.query,
    };
    this.httpPlanService
      .find(busqueda)
      .toPromise()
      .then(res => res as [PlanResponseDto[], number])
      .then(data => {
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


  createOrEdit(record?: HistoricoPlanContratoResponseDto) {
    // record = {
    //   totalInscripcionPlan: 100,
    //   valorDsctoInscripcion: 100,
    //   totalCobroInscripcion: 100,
    //   capitalTotal: 100,
    //   capitalPorRefinanciamiento: 100,
    //   abonosCapitalActual: 100,
    //   saldoCapital: 100,
    //   valorTasaAdministrativa: 100,
    //   totalTasaAdministrativaCobrada: 100,
    //   totalCuotasCobradas: 100,
    //   totalCuotasMoraActual: 100,
    //   totalCuotasMora: 100
    // };
    let formArray = [
      ...FORM_HISTORICO_PLAN_CONTRATO(),
    ];

    if (record) {
      formArray = [...this.eliminarCampoDeFormulario(formArray, FormHistoricoPlanContratoEnum.totalInscripcionPlan)];
      formArray = [...this.eliminarCampoDeFormulario(formArray, FormHistoricoPlanContratoEnum.valorDsctoInscripcion)];
      formArray = [...this.eliminarCampoDeFormulario(formArray, FormHistoricoPlanContratoEnum.totalCobroInscripcion)];
      formArray = [...this.eliminarCampoDeFormulario(formArray, FormHistoricoPlanContratoEnum.capitalTotal)];
      this.createEditFormArray = [...formArray];
      this.recordUpdated = {...record};
      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;
    } else {
      this.createEditFormArray = [...formArray];
      this.create = true;
      this.recordUpdated = undefined;
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

  navegar(idHistorico: number, path: string) {
    const {idContrato} = this.activatedRoute.snapshot.params;
    this.router.navigate(['contratos', 'contrato-modulo', idContrato, 'historico-estado-contrato-modulo', idHistorico, path]);
  }
}
