import {Component, OnInit} from '@angular/core';
import {ChequeResponseDto} from '../../servicios/dto/cheque.response-dto';
import {ChequeFindDto} from '../../servicios/dto/cheque.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpChequeService} from '../../servicios/http-cheque-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {ChequeCreateDto} from '../../servicios/dto/cheque.create-dto';
import {ChequeUpdateDto} from '../../servicios/dto/cheque.update-dto';
import {FormChequeEnum} from '../../form/form-cheque.enum';
import {FORM_CHEQUE} from '../../form/form-cheque';
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
import {ChequeraFindDto} from '../../../chequera/servicios/dto/chequera.find-dto';
import {HttpChequeraService} from '../../../chequera/servicios/http-chequera-service';
import {ChequeraResponseDto} from '../../../chequera/servicios/dto/chequera.response-dto';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {EstadoChequeEnum} from '../../../../enums/estado-cheque.enum';

@Component({
  selector: 'app-cheque-tabla',
  templateUrl: './cheque-tabla.component.html',
  styleUrls: ['./cheque-tabla.component.scss']
})
export class ChequeTablaComponent extends AbstractTable<ChequeResponseDto, ChequeFindDto>
  implements OnInit, TableAbstractClass<ChequeResponseDto>, AutocompleteFormInterface {
  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por número de cheque',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Busqueda',
      placeholder: 'Ej: 1000',
      column: '6',
      actualValue: '',
    },
    {
      label: 'Estado',
      formControlName: FormChequeEnum.estadoCheque,
      type: fieldType.select,
      help: 'Seleccione si esta habilitado o no',
      select: {
        filterBy: 'nombre',
        dataKey: 'estadoCheque',
        filterPlaceholder: 'Libre, Usado, Cobrado, Anulado',
        optionLabel: 'nombre',
        options: [
          {
            estadoCheque: EstadoChequeEnum.libre,
            nombre: 'Libre',
          },
          {
            estadoCheque: EstadoChequeEnum.usado,
            nombre: 'Usado',
          },
          {
            estadoCheque: EstadoChequeEnum.cobrado,
            nombre: 'Cobrado',
          },
          {
            estadoCheque: EstadoChequeEnum.anulado,
            nombre: 'Anulado',
          }
        ]
      },
      initialValue: "",
      validators: [],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Libre / Usado',
      column: '6',
      actualValue: '',
    },
  ];

  constructor(
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
    public dialog: MatDialog,
    public httpChequeService: HttpChequeService,
    public confirmationService: ConfirmationService,
    public httpChequeraService: HttpChequeraService,
  ) {
    super(
      httpChequeService,
      {
        nombreRegistro: 'Cheque',
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
      this.httpChequeService
        .createOne(values as ChequeCreateDto)
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
            console.error({error: error, message: "Error creando Cheque", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpChequeService
        .updateById(values as ChequeUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Cheque", data: values});
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
      if (event.formControlName === 'estadoCheque') {
        this.findDto.estadoCheque = event.actualValue?.estadoCheque
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
      case FormChequeEnum.idChequera:
        this.buscarAutocompleteChequera(event);
    }
  }

  buscarAutocompleteChequera(evento: SearchAutoCompleteInterface) {
    const busqueda: ChequeraFindDto = {
      busqueda: evento.query,
    };
    this.httpChequeraService
      .find(busqueda)
      .toPromise()
      .then(res => res as [ChequeraResponseDto[], number])
      .then(data => {
        // const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        const arregloDatos = data[0].map((a: any) => {
          a.nombre = a.idCuentaBancariaEmpresa.numeroCuenta + ' ' + a.fechaEmision + ' ' + a.serieDesde + '-' + a.serieHasta;
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


  createOrEdit(record?: ChequeResponseDto) {
    const formArray = [
      ...FORM_CHEQUE(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      this.recordUpdated = {...record};
      // @ts-ignore
      this.recordUpdated.idChequera.nombre = record.idChequera.idCuentaBancariaEmpresa.numeroCuenta + ' ' + record.idChequera.fechaEmision + ' ' + record.idChequera.serieDesde + '-' + record.idChequera.serieHasta
      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;
    } else {
      this.create = true;
      this.recordUpdated = undefined;
    }
    this.openDialog(this.createEditFormArray);
  }

}
