import {Component, OnInit} from '@angular/core';
import {CuentaContableResponseDto} from '../../servicios/dto/cuenta-contable.response-dto';
import {CuentaContableFindDto} from '../../servicios/dto/cuenta-contable.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpCuentaContableService} from '../../servicios/http-cuenta-contable-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {CuentaContableCreateDto} from '../../servicios/dto/cuenta-contable.create-dto';
import {CuentaContableUpdateDto} from '../../servicios/dto/cuenta-contable.update-dto';
import {FORM_CUENTA_CONTABLE} from '../../form/form-cuenta-contable';
import {TAKE} from '../../../../constantes/tabla/take';
import {CreateUpdateModalComponent} from '../../../../componentes/dialog/create-update-modal/create-update-modal.component';
import {MENSAGE_TOAST} from '../../../../constantes/toaster/mensaje-toast';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {AutocompleteFormInterface} from '../../../../abstract/table/interfaces/autocomplete-form.interface';
import {CreateUpdateModalParameters} from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import {AbstractTable} from '../../../../abstract/table/abstract-table';
import {fieldType, FormField, SearchAutoCompleteInterface} from '../../../../componentes/forms/interfaces/form-field';
import {TableAbstractClass} from '../../../../abstract/table/interfaces/table-abstract-class';
import {ModalComponent} from '../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import {MatStepperArray} from '../../../../componentes/forms/form-container/interfaces/mat-stepper-array';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {TipoCuentaEnum} from '../../../../enums/tipo-cuenta.enum';
import {TipoMovimientoEnum} from '../../../../enums/tipo-movimiento.enum';
import {FormCuentaContableEnum} from '../../form/form-cuenta-contable.enum';
import {PeriodoContableFindDto} from '../../../periodo-contable/servicios/dto/periodo-contable.find-dto';
import {HttpPeriodoContableService} from '../../../periodo-contable/servicios/http-periodo-contable-service';
import {PeriodoContableResponseDto} from '../../../periodo-contable/servicios/dto/periodo-contable.response-dto';

@Component({
  selector: 'app-cuenta-contable-tabla',
  templateUrl: './cuenta-contable-tabla.component.html',
  styleUrls: ['./cuenta-contable-tabla.component.scss']
})
export class CuentaContableTablaComponent extends AbstractTable<CuentaContableResponseDto, CuentaContableFindDto>
  implements OnInit, TableAbstractClass<CuentaContableResponseDto>, AutocompleteFormInterface {
  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por nombre',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Búsqueda',
      placeholder: 'Ej: Bancos',
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
    public httpCuentaContableService: HttpCuentaContableService,
    public confirmationService: ConfirmationService,
    public httpPeriodoContableService: HttpPeriodoContableService,
  ) {
    super(
      httpCuentaContableService,
      {
        nombreRegistro: 'Cuenta Contable',
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
    if (this.create) {
      values.sisHabilitado = ActivoInactivo.Activo;
      this.blockuiService.habilitarBlockUI();
      this.httpCuentaContableService
        .createOne(values as CuentaContableCreateDto)
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
            console.error({error: error, message: "Error creando Cuenta Contable", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpCuentaContableService
        .updateById(values as CuentaContableUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Cuenta Contable", data: values});
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
      case FormCuentaContableEnum.idPeriodoContable:
        this.buscarAutocompletePeriodoContable(event);
    }
  }

  buscarAutocompletePeriodoContable(evento: SearchAutoCompleteInterface) {
    const busqueda: PeriodoContableFindDto = {
      busqueda: evento.query,

    };
    this.httpPeriodoContableService
      .find(busqueda)
      .toPromise()
      .then(res => res as [PeriodoContableResponseDto[], number])
      .then(data => {
        // const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        const arregloDatos = data[0].map((a: any) => {
          a.detalle = a.fechaInicio.split('T')[0] + '- ' + a.fechaFin.split('T')[0];
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


  createOrEdit(record?: CuentaContableResponseDto) {
    const formArray = [
      ...FORM_CUENTA_CONTABLE(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      this.recordUpdated = {...record};
      this.recordUpdated.idPeriodoContable = {detalle: record.idPeriodoContable?.fechaInicio?.split('T')[0] + '-' + record.idPeriodoContable?.fechaFin?.split('T')[0]}
      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;
    } else {
      this.create = true;
      this.recordUpdated = undefined;
    }
    this.openDialog(this.createEditFormArray);
  }

}
