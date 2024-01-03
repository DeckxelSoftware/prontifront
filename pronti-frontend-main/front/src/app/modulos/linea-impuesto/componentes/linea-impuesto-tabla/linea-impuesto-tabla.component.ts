import {Component, OnInit} from '@angular/core';
import {LineaImpuestoResponseDto} from '../../servicios/dto/linea-impuesto.response-dto';
import {LineaImpuestoFindDto} from '../../servicios/dto/linea-impuesto.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpLineaImpuestoService} from '../../servicios/http-linea-impuesto-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {LineaImpuestoCreateDto} from '../../servicios/dto/linea-impuesto.create-dto';
import {LineaImpuestoUpdateDto} from '../../servicios/dto/linea-impuesto.update-dto';
import {FormLineaImpuestoEnum} from '../../form/form-linea-impuesto.enum';
import {FORM_LINEA_IMPUESTO} from '../../form/form-linea-impuesto';
import {TAKE} from "../../../../constantes/tabla/take";
import {
  CreateUpdateModalComponent
} from "../../../../componentes/dialog/create-update-modal/create-update-modal.component";
import {MENSAGE_TOAST} from "../../../../constantes/toaster/mensaje-toast";
import {BlockuiService} from "../../../../servicios/block-ui/blockui.service";
import {LogsMlabsService} from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import {AutocompleteFormInterface} from "../../../../abstract/table/interfaces/autocomplete-form.interface";
import {
  CreateUpdateModalParameters
} from "../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters";
import {AbstractTable} from "../../../../abstract/table/abstract-table";
import {fieldType, FormField, SearchAutoCompleteInterface} from "../../../../componentes/forms/interfaces/form-field";
import {TableAbstractClass} from "../../../../abstract/table/interfaces/table-abstract-class";
import {ModalComponent} from "../../../../componentes/dialog/create-update-modal/interfaces/modal-component";
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";
import {CuentaContableFindDto} from "../../../cuenta-contable/servicios/dto/cuenta-contable.find-dto";
import {HttpCuentaContableService} from "../../../cuenta-contable/servicios/http-cuenta-contable-service";
import {CuentaContableResponseDto} from "../../../cuenta-contable/servicios/dto/cuenta-contable.response-dto";
import {ActivoInactivo} from "../../../../enums/activo-inactivo";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-linea-impuesto-tabla',
  templateUrl: './linea-impuesto-tabla.component.html',
  styleUrls: ['./linea-impuesto-tabla.component.scss']
})
export class LineaImpuestoTablaComponent extends AbstractTable<LineaImpuestoResponseDto, LineaImpuestoFindDto>
  implements OnInit, TableAbstractClass<LineaImpuestoResponseDto>, AutocompleteFormInterface {
  idRecurso!: number;
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
      placeholder: 'Ej: impuesto...',
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
    public httpLineaImpuestoService: HttpLineaImpuestoService,
    public confirmationService: ConfirmationService,
    public httpCuentaContableService: HttpCuentaContableService,
    public route: ActivatedRoute,
  ) {
    super(
      httpLineaImpuestoService,
      {
        nombreRegistro: 'Linea Impuesto',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    this.stablishSkipAndTake(0, TAKE);
    const {idRecurso} = this.route.snapshot.params;
    if (idRecurso) {
      this.idRecurso = idRecurso;
      this.findDto.idRecurso = this.idRecurso;
    }
    // this.tableData = [
    //   {
    //     nombre: 'test',
    //     porcentaje: 12,
    //     sisHabilitado: ActivoInactivo.Activo,
    //     cuentaContableId: {
    //       nombre: 'bancos',
    //       id: 1
    //     }
    //   }
    // ]
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    if (this.create) {
      this.blockuiService.habilitarBlockUI();
      values.sisHabilitado = ActivoInactivo.Activo;
      values.idRecurso = this.idRecurso;
      this.httpLineaImpuestoService
        .createOne(values as LineaImpuestoCreateDto)
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
            console.error({error: error, message: "Error creando Linea Impuesto", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpLineaImpuestoService
        .updateById(values as LineaImpuestoUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Linea Impuesto", data: values});
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
      case FormLineaImpuestoEnum.cuentaContableId:
        this.buscarAutocompleteCuentaContable(event);
    }
  }

  buscarAutocompleteCuentaContable(evento: SearchAutoCompleteInterface) {
    const busqueda: CuentaContableFindDto = {
      busqueda: evento.query,
    };
    this.httpCuentaContableService
      .find(busqueda)
      .toPromise()
      .then(res => res as [CuentaContableResponseDto[], number])
      .then(data => {
        const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        // const arregloDatos = data[0].map((a: any) => {
        //   a.nombreCompeto = a.nombre + ' ' + a.apellido;
        //   return a;
        // });
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


  createOrEdit(record?: LineaImpuestoResponseDto) {
    const formArray = [
      ...FORM_LINEA_IMPUESTO(),
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
