import {Component, OnInit} from '@angular/core';
import {LicitacionResponseDto} from '../../servicios/dto/licitacion.response-dto';
import {LicitacionFindDto} from '../../servicios/dto/licitacion.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpLicitacionService} from '../../servicios/http-licitacion-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {LicitacionCreateDto} from '../../servicios/dto/licitacion.create-dto';
import {LicitacionUpdateDto} from '../../servicios/dto/licitacion.update-dto';
import {FORM_LICITACION} from '../../form/form-licitacion';
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
import {ModalLicitacionComponent} from '../../modales/modal-licitacion/modal-licitacion.component';
import {EstadoLicitacionEnum} from '../../../../enums/estado-licitacion.enum';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-licitacion-preasamblea-tabla',
  templateUrl: './licitacion-preasamblea-tabla.component.html',
  styleUrls: ['./licitacion-preasamblea-tabla.component.scss']
})
export class LicitacionPreasambleaTablaComponent extends AbstractTable<LicitacionResponseDto, LicitacionFindDto>
  implements OnInit, TableAbstractClass<LicitacionResponseDto>, AutocompleteFormInterface {
  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por nombre, identificación, número de contrato o nombre de grupo',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Búsqueda',
      placeholder: 'Ej: Ana Mar...',
      column: '12',
      actualValue: '',
    },
    // {
    //   label: 'Habilitado',
    //   formControlName: 'sisHabilitado',
    //   type: fieldType.select,
    //   help: 'Seleccione si esta habilitado o no',
    //   select: {
    //     filterBy: 'sisHabilitado',
    //     dataKey: 'sisHabilitado',
    //     filterPlaceholder: '0 = Inactivo, 1 = Activo',
    //     optionLabel: 'nombre',
    //     options: [
    //       {
    //         sisHabilitado: ActivoInactivo.Activo,
    //         nombre: 'Activo',
    //       },
    //       {
    //         sisHabilitado: ActivoInactivo.Inactivo,
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
    public httpLicitacionService: HttpLicitacionService,
    public confirmationService: ConfirmationService,
    public matDialogRef: MatDialog,
    private router: Router,
  ) {
    super(
      httpLicitacionService,
      {
        nombreRegistro: 'Licitacion',
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
      this.blockuiService.habilitarBlockUI();
      this.httpLicitacionService
        .createOne(values as LicitacionCreateDto)
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
            console.error({error: error, message: "Error creando Licitacion", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpLicitacionService
        .updateById(values as LicitacionUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Licitacion", data: values});
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
    //   case FormLicitacionEnum.generoLibro:
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


  createOrEdit(record?: LicitacionResponseDto) {
    const formArray = [
      ...FORM_LICITACION(),
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

  crearLicitacion(objetoCrear: LicitacionCreateDto) {
    this.blockuiService.habilitarBlockUI()
    this.httpLicitacionService.createOne(objetoCrear)
      .subscribe({
        next: res => {
          this.logsMlabsService.toaster(MENSAGE_TOAST.creacionExitosa('Licitación'));
          this.matDialogRef.closeAll();
          this.searchData();
          this.blockuiService.deshabilitarBlockUI()
        },
        error: err => {
          console.error('Error creando licitacion: ', err);
          this.logsMlabsService.toaster(MENSAGE_TOAST.error('Error creando licitación.'));
          this.blockuiService.deshabilitarBlockUI()
        }
      })
  }

  editarLicitacion(objetoEditar: LicitacionUpdateDto, idLicitacion: number) {
    this.blockuiService.habilitarBlockUI()
    this.httpLicitacionService.updateById(objetoEditar, idLicitacion)
      .subscribe({
        next: res => {
          this.logsMlabsService.toaster(MENSAGE_TOAST.actualizacionExitosa('Licitación'));
          this.matDialogRef.closeAll();
          this.searchData();
          this.blockuiService.deshabilitarBlockUI()
        },
        error: err => {
          console.error('Error acutalizando licitacion: ', err);
          this.logsMlabsService.toaster(MENSAGE_TOAST.error('Error actualizando licitación.'));
          this.blockuiService.deshabilitarBlockUI()
        }
      })
  }


  abrirModalCrearEditar(registro?: LicitacionResponseDto) {
    const dialogRef$ = this.matDialogRef.open(ModalLicitacionComponent, {
      disableClose: true,
      data: {
        componente: this,
        registro: registro ? registro : null,
      }
    });
    // dialogRef$.afterClosed().subscribe(
    //   {
    //     next: res => {
    //       if (res) {
    //         // crear la licitacion
    //         console.log('crear la licitacion');
    //       }
    //     }
    //   }
    // )
  }
  irAAprobacion(registro: LicitacionResponseDto){
    this.router.navigate(['licitacion-modulo','gestion-preasamblea', registro.id ,'aprobacion']);
  }
}
