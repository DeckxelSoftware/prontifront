import {Component, Input, OnInit} from '@angular/core';
import {AbonoPrestamoResponseDto} from '../../servicios/dto/abono-prestamo.response-dto';
import {AbonoPrestamoFindDto} from '../../servicios/dto/abono-prestamo.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpAbonoPrestamoService} from '../../servicios/http-abono-prestamo-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {AbonoPrestamoCreateDto} from '../../servicios/dto/abono-prestamo.create-dto';
import {AbonoPrestamoUpdateDto} from '../../servicios/dto/abono-prestamo.update-dto';
import {FORM_ABONO_PRESTAMO} from '../../form/form-abono-prestamo';
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
import {MatStepperArray} from '../../../../componentes/forms/form-container/interfaces/mat-stepper-array';
import {EstadoPagoEnum} from '../../../../enums/estado-pago.enum';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {FormAbonoPrestamoEnum} from '../../form/form-abono-prestamo.enum';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-abono-prestamo-tabla',
  templateUrl: './abono-prestamo-tabla.component.html',
  styleUrls: ['./abono-prestamo-tabla.component.scss']
})
export class AbonoPrestamoTablaComponent extends AbstractTable<AbonoPrestamoResponseDto, AbonoPrestamoFindDto>
  implements OnInit, TableAbstractClass<AbonoPrestamoResponseDto>, AutocompleteFormInterface {
  @Input()
  idPrestamoInput!: number;

  idPrestamo!: number;
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
    {
      label: 'Está pagado?.',
      formControlName: FormAbonoPrestamoEnum.estaPagado,
      type: fieldType.select,
      help: 'Seleccione si está pagado',
      select: {
        filterBy: 'nombre',
        dataKey: 'estaPagado',
        filterPlaceholder: 'Ej: Cancelado',
        optionLabel: 'nombre',
        options: [
          {
            estaPagado: EstadoPagoEnum.cancelado,
            nombre: 'Cancelado',
          },
          {
            estaPagado: EstadoPagoEnum.pendiente,
            nombre: 'Pendiente',
          },
        ]
      },
      initialValue: "",
      validators: [],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Cancelado',
      column: '6',
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
    public httpAbonoPrestamoService: HttpAbonoPrestamoService,
    public confirmationService: ConfirmationService,
    public route: ActivatedRoute,
  ) {
    super(
      httpAbonoPrestamoService,
      {
        nombreRegistro: 'Abono Prestamo',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    this.stablishSkipAndTake(0, TAKE);
    const {idPrestamo} = this.route.snapshot.params;
    if (idPrestamo) {
      this.idPrestamo = +idPrestamo;
      this.findDto.idPrestamo = this.idPrestamo;
    } else if (this.idPrestamoInput) {
      this.findDto.idPrestamo = this.idPrestamoInput;
    }

    // this.tableData = [
    //   {
    //     "fechaPago": "2022-06-01",
    //     "numeroPago": 1,
    //     "modalidadDescuento": ModalidadDescuentoEnum.decimoCuarto,
    //     "mes": MesEnum.Diciembre,
    //     "anio": 2000,
    //     "valorCuota": 500,
    //     "estaPagado": EstadoPagoEnum.pendiente
    //   }
    // ]
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
    this.findDto.estaPagado = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    if (this.create) {
      values.sisHabilitado = ActivoInactivo.Activo;
      values.idPrestamo = this.idPrestamo;
      this.blockuiService.habilitarBlockUI();
      this.httpAbonoPrestamoService
        .createOne(values as AbonoPrestamoCreateDto)
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
            console.error({error: error, message: "Error creando Abono Prestamo", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpAbonoPrestamoService
        .updateById(values as AbonoPrestamoUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Abono Prestamo", data: values});
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
      if (event.formControlName === 'estaPagado') {
        this.findDto.estaPagado = event.actualValue?.estaPagado
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
    //   case FormAbonoPrestamoEnum.generoLibro:
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


  createOrEdit(record?: AbonoPrestamoResponseDto) {
    const formArray = [
      ...FORM_ABONO_PRESTAMO(),
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
