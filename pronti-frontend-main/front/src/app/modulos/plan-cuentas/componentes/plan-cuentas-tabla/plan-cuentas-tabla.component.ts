import {Component, OnInit} from '@angular/core';
import {PlanCuentasResponseDto} from '../../servicios/dto/plan-cuentas.response-dto';
import {PlanCuentasFindDto} from '../../servicios/dto/plan-cuentas.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpPlanCuentasService} from '../../servicios/http-plan-cuentas-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {PlanCuentasCreateDto} from '../../servicios/dto/plan-cuentas.create-dto';
import {PlanCuentasUpdateDto} from '../../servicios/dto/plan-cuentas.update-dto';
import {FormPlanCuentasEnum} from '../../form/form-plan-cuentas.enum';
import {FORM_PLAN_CUENTAS} from '../../form/form-plan-cuentas';
import {AbstractTable} from '../../../../abstract/table/abstract-table';
import {TAKE} from '../../../../constantes/tabla/take';
import {
  CreateUpdateModalComponent
} from '../../../../componentes/dialog/create-update-modal/create-update-modal.component';
import {MENSAGE_TOAST} from '../../../../constantes/toaster/mensaje-toast';
import {fieldType, FormField, SearchAutoCompleteInterface} from '../../../../componentes/forms/interfaces/form-field';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {TableAbstractClass} from '../../../../abstract/table/interfaces/table-abstract-class';
import {ModalComponent} from '../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import {AutocompleteFormInterface} from '../../../../abstract/table/interfaces/autocomplete-form.interface';
import {
  CreateUpdateModalParameters
} from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import {MatStepperArray} from '../../../../componentes/forms/form-container/interfaces/mat-stepper-array';
import {ModalPlanCuentasComponent} from '../modal-plan-cuentas/modal-plan-cuentas.component';
import {CuentaContableResponseDto} from "../../../cuenta-contable/servicios/dto/cuenta-contable.response-dto";
import {HttpCuentaContableService} from "../../../cuenta-contable/servicios/http-cuenta-contable-service";

@Component({
  selector: 'app-plan-cuentas-tabla',
  templateUrl: './plan-cuentas-tabla.component.html',
  styleUrls: ['./plan-cuentas-tabla.component.scss']
})
export class PlanCuentasTablaComponent extends AbstractTable<PlanCuentasResponseDto, PlanCuentasFindDto>
  implements OnInit, TableAbstractClass<PlanCuentasResponseDto>, AutocompleteFormInterface {
  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por nombre o identificador',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Busqueda',
      placeholder: 'Ej: ...',
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
    public httpPlanCuentasService: HttpPlanCuentasService,
    public confirmationService: ConfirmationService,
    private _httpCuentaContableService: HttpCuentaContableService
  ) {
    super(
      httpPlanCuentasService,
      {
        nombreRegistro: 'Plan Cuentas',
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

  async abriModalPlanCuentas(registro?: CuentaContableResponseDto) {

    const objetoCuentasPadres: any = {
      cuentaContableL1: {},
      cuentaContableL2: {},
      cuentaContableL3: {},
      cuentaContableL4: {},
      cuentaContableL5: {},
    }

    if (registro?.nivel) {
      if (registro.nivel > 1) {
        const respuestaPadres = await this.buscarCuentasContrablesPadre(registro);
        // console.log('respuesta kk', respuestaPadres);

        for (let cuentaNivel = 1; cuentaNivel <= respuestaPadres.length; cuentaNivel++) {
          objetoCuentasPadres[`cuentaContableL${cuentaNivel}`] = respuestaPadres[cuentaNivel - 1];
        }
      }
    }
    console.log('se cocnsulto', objetoCuentasPadres);
    const modal = this.dialog.open(ModalPlanCuentasComponent, {
      data: {...registro, ...objetoCuentasPadres}
    });
    modal.afterClosed().subscribe({
      next: value => {
       if(value){
        this.searchData();
       }
      }
    })
  }

  buscarCuentasContrablesPadre(registro: CuentaContableResponseDto) {
    // console.log('lo que voy a consultar', registro);
    const arregloPromesas = [];
    if (registro.nivel) {
      if (registro.nivel > 1) {
        if (registro.nivel === 2) {
          if (registro.idNivel1) {
            arregloPromesas.push(this.buscarPorId(registro.idNivel1));
          }
        }
        if (registro.nivel === 3) {

          if (registro.idNivel1 && registro.idNivel2) {
            arregloPromesas.push(this.buscarPorId(registro.idNivel1));
            arregloPromesas.push(this.buscarPorId(registro.idNivel2));
          }
        }
        if (registro.nivel === 4) {

          if (registro.idNivel1 && registro.idNivel2 && registro.idNivel3) {
            arregloPromesas.push(this.buscarPorId(registro.idNivel1));
            arregloPromesas.push(this.buscarPorId(registro.idNivel2));
            arregloPromesas.push(this.buscarPorId(registro.idNivel3));
          }
        }

        if (registro.nivel === 5) {

          if (registro.idNivel1 && registro.idNivel2 && registro.idNivel3 && registro.idNivel4) {
            arregloPromesas.push(this.buscarPorId(registro.idNivel1));
            arregloPromesas.push(this.buscarPorId(registro.idNivel2));
            arregloPromesas.push(this.buscarPorId(registro.idNivel3));
            arregloPromesas.push(this.buscarPorId(registro.idNivel4));
          }
        }
      }
    }

    return Promise.all(arregloPromesas);
  }

  buscarPorId(idCuentaCont: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpCuentaContableService.find({id: idCuentaCont}).subscribe({
        next: (resp) => {
          resolve(resp[0][0]);
        },
        error: err => {
          console.error('No existe dicha cuenta contable', err);
          reject({});
        }
      })

    })
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    if (this.create) {
      this.blockuiService.habilitarBlockUI();
      this.httpPlanCuentasService
        .createOne(values as PlanCuentasCreateDto)
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
            console.error({error: error, message: "Error creando Plan Cuentas", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpPlanCuentasService
        .updateById(values as PlanCuentasUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Plan Cuentas", data: values});
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
    // switch (event.field.formControlName) {
    //   case FormPlanCuentasEnum.generoLibro:
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


  createOrEdit(record?: PlanCuentasResponseDto) {
    const formArray = [
      ...FORM_PLAN_CUENTAS(),
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
