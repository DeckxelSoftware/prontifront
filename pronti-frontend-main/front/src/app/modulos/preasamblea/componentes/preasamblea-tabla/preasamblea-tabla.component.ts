import {Component, OnInit} from '@angular/core';
import {PreasambleaResponseDto} from '../../servicios/dto/preasamblea.response-dto';
import {PreasambleaFindDto} from '../../servicios/dto/preasamblea.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpPreasambleaService} from '../../servicios/http-preasamblea-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {PreasambleaCreateDto} from '../../servicios/dto/preasamblea.create-dto';
import {PreasambleaUpdateDto} from '../../servicios/dto/preasamblea.update-dto';
import {FORM_PREASAMBLEA} from '../../form/form-preasamblea';
import {AbstractTable} from "../../../../abstract/table/abstract-table";
import {TableAbstractClass} from "../../../../abstract/table/interfaces/table-abstract-class";
import {TAKE} from "../../../../constantes/tabla/take";
import {
  CreateUpdateModalComponent
} from "../../../../componentes/dialog/create-update-modal/create-update-modal.component";
import {MENSAGE_TOAST} from "../../../../constantes/toaster/mensaje-toast";
import {fieldType, FormField, SearchAutoCompleteInterface} from "../../../../componentes/forms/interfaces/form-field";
import {BlockuiService} from "../../../../servicios/block-ui/blockui.service";
import {LogsMlabsService} from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import {ModalComponent} from "../../../../componentes/dialog/create-update-modal/interfaces/modal-component";
import {AutocompleteFormInterface} from "../../../../abstract/table/interfaces/autocomplete-form.interface";
import {
  CreateUpdateModalParameters
} from "../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters";
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";
import {ActivoInactivo} from "../../../../enums/activo-inactivo";
import {ModalAprobarPreasambleaComponent} from "../modal-aprobar-preasamblea/modal-aprobar-preasamblea.component";

@Component({
  selector: 'app-preasamblea-tabla',
  templateUrl: './preasamblea-tabla.component.html',
  styleUrls: ['./preasamblea-tabla.component.scss']
})
export class PreasambleaTablaComponent extends AbstractTable<PreasambleaResponseDto, PreasambleaFindDto>
  implements OnInit, TableAbstractClass<PreasambleaResponseDto>, AutocompleteFormInterface {
  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por nombre o apellido del cliente, número de contrato, grupo, o documento de identidad',
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
    public httpPreasambleaService: HttpPreasambleaService,
    public confirmationService: ConfirmationService,
  ) {
    super(
      httpPreasambleaService,
      {
        nombreRegistro: 'Preasamblea',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    this.stablishSkipAndTake(0, TAKE);
    this.tableData = [{id: 1, sisHabilitado: ActivoInactivo.Activo}]
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
      this.httpPreasambleaService
        .createOne(values as PreasambleaCreateDto)
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
            console.error({error: error, message: "Error creando Preasamblea", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpPreasambleaService
        .updateById(values as PreasambleaUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Preasamblea", data: values});
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
    //   case FormPreasambleaEnum.generoLibro:
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


  createOrEdit(record?: PreasambleaResponseDto) {
    const formArray = [
      ...FORM_PREASAMBLEA(),
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

  abriModalAprobar(registro: any) {
    this.dialog.open(ModalAprobarPreasambleaComponent, {
      width: '100vw', height: '100vh', data: {
        component: this
      }
    });
  }


  aprobarPreasamblea(values: any): Promise<boolean> {
    return new Promise((resolve, reject)=>{
      this.blockuiService.habilitarBlockUI();
      this.httpPreasambleaService
        .createOne(values as PreasambleaCreateDto)
        .subscribe({
          next: () => {
            this.blockuiService.deshabilitarBlockUI();
            this.parameters.messageService.toaster(
              MENSAGE_TOAST.creacionExitosa(
                this.parameters.nombreRegistro ? this.parameters.nombreRegistro : 'Registro'
              )
            );
            this.searchData();
            resolve(true);
          },
          error: (error) => {
            this.blockuiService.deshabilitarBlockUI();
            this.parameters.messageService.toaster(MENSAGE_TOAST.error());
            console.error({error: error, message: "Error creando Preasamblea", data: values});
            resolve(false)
          },
        });
    });
  }


}
