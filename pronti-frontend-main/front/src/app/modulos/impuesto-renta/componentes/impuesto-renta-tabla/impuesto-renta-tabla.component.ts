import {Component, OnInit} from '@angular/core';
import {ImpuestoRentaResponseDto} from '../../servicios/dto/impuesto-renta.response-dto';
import {ImpuestoRentaFindDto} from '../../servicios/dto/impuesto-renta.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpImpuestoRentaService} from '../../servicios/http-impuesto-renta-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {ImpuestoRentaCreateDto} from '../../servicios/dto/impuesto-renta.create-dto';
import {ImpuestoRentaUpdateDto} from '../../servicios/dto/impuesto-renta.update-dto';
import {FormImpuestoRentaEnum} from '../../form/form-impuesto-renta.enum';
import {FORM_IMPUESTO_RENTA} from '../../form/form-impuesto-renta';
import {AbstractTable} from '../../../../abstract/table/abstract-table';
import {TableAbstractClass} from '../../../../abstract/table/interfaces/table-abstract-class';
import {TAKE} from '../../../../constantes/tabla/take';
import {CreateUpdateModalComponent} from '../../../../componentes/dialog/create-update-modal/create-update-modal.component';
import {MENSAGE_TOAST} from '../../../../constantes/toaster/mensaje-toast';
import {fieldType, FormField, SearchAutoCompleteInterface} from '../../../../componentes/forms/interfaces/form-field';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {ModalComponent} from '../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import {AutocompleteFormInterface} from '../../../../abstract/table/interfaces/autocomplete-form.interface';
import {CreateUpdateModalParameters} from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import {MatStepperArray} from '../../../../componentes/forms/form-container/interfaces/mat-stepper-array';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';

@Component({
  selector: 'app-impuesto-renta-tabla',
  templateUrl: './impuesto-renta-tabla.component.html',
  styleUrls: ['./impuesto-renta-tabla.component.scss']
})
export class ImpuestoRentaTablaComponent extends AbstractTable<ImpuestoRentaResponseDto, ImpuestoRentaFindDto>
  implements OnInit, TableAbstractClass<ImpuestoRentaResponseDto>, AutocompleteFormInterface {
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
      placeholder: 'Ej: Tabla anual...',
      column: '12',
      actualValue: '',
    },
    {
      label: 'Año',
      formControlName: 'anio',
      type: fieldType.inputNumber,
      help: 'Ingrese el año a filtrar',
      // select:{
      //   filterBy:'sisHabilitado',
      //   dataKey:'sisHabilitado',
      //   filterPlaceholder:'0 = Inactivo, 1 = Activo',
      //   optionLabel: 'nombre',
      //   options:[
      //     {
      //       sisHabilitado:ActivoInactivo.Activo,
      //       nombre: 'Activo',
      //     },
      //     {
      //       sisHabilitado:ActivoInactivo.Inactivo,
      //       nombre: 'Inactivo',
      //     }
      //   ]
      // },
      initialValue: "",
      validators: [],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: 2022',
      column: '6',
      actualValue: '',
      inputNumber: {
        min: 1111,
        max: 9999,
        minFractionDigits: 0,
        maxFractionDigits: 0
      }
    },
  ];

  constructor(
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
    public dialog: MatDialog,
    public httpImpuestoRentaService: HttpImpuestoRentaService,
    public confirmationService: ConfirmationService,
  ) {
    super(
      httpImpuestoRentaService,
      {
        nombreRegistro: 'Impuesto Renta',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    this.stablishSkipAndTake(0, TAKE);
    // this.tableData = [
    //   {
    //     nombre: 'test',
    //     anio: 2022,
    //     fraccionBasica1: 10,
    //     impuestoFraccionBasica1: 10,
    //     impuestoFraccionExcedente1: 10,
    //     fraccionBasica2: 10,
    //     impuestoFraccionBasica2: 10,
    //     impuestoFraccionExcedente2: 10,
    //     fraccionBasica3: 10,
    //     impuestoFraccionBasica3: 10,
    //     impuestoFraccionExcedente3: 10,
    //     fraccionBasica4: 10,
    //     impuestoFraccionBasica4: 10,
    //     impuestoFraccionExcedente4: 10,
    //     fraccionBasica5: 10,
    //     impuestoFraccionBasica5: 10,
    //     impuestoFraccionExcedente5: 10,
    //     fraccionBasica6: 10,
    //     impuestoFraccionBasica6: 10,
    //     impuestoFraccionExcedente6: 10,
    //     fraccionBasica7: 10,
    //     impuestoFraccionBasica7: 10,
    //     impuestoFraccionExcedente7: 10,
    //     fraccionBasica8: 10,
    //     impuestoFraccionBasica8: 10,
    //     impuestoFraccionExcedente8: 10,
    //     fraccionBasica9: 10,
    //     impuestoFraccionBasica9: 10,
    //     impuestoFraccionExcedente9: 10,
    //     fraccionBasica10: 10,
    //     impuestoFraccionBasica10: 10,
    //     impuestoFraccionExcedente10: 10,
    //   }
    // ]
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
    this.findDto.anio = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    if (this.create) {
      this.blockuiService.habilitarBlockUI();
      values.sisHabilitado = ActivoInactivo.Activo;
      this.httpImpuestoRentaService
        .createOne(values as ImpuestoRentaCreateDto)
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
            console.error({error: error, message: "Error creando Impuesto Renta", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpImpuestoRentaService
        .updateById(values as ImpuestoRentaUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Impuesto Renta", data: values});
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
      if (event.formControlName === 'anio') {
        this.findDto.anio = event.actualValue
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
    //   case FormImpuestoRentaEnum.generoLibro:
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


  createOrEdit(record?: ImpuestoRentaResponseDto) {
    const formArray = [
      ...FORM_IMPUESTO_RENTA(),
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
