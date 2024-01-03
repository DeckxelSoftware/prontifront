import {Component, Input, OnInit} from '@angular/core';
import {RolPermisoResponseDto} from '../../servicios/dto/rol-permiso.response-dto';
import {RolPermisoFindDto} from '../../servicios/dto/rol-permiso.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpRolPermisoService} from '../../servicios/http-rol-permiso-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {RolPermisoCreateDto} from '../../servicios/dto/rol-permiso.create-dto';
import {RolPermisoUpdateDto} from '../../servicios/dto/rol-permiso.update-dto';
import {FormRolPermisoEnum} from '../../form/form-rol-permiso.enum';
import {FORM_ROL_PERMISO} from '../../form/form-rol-permiso';
import {AbstractTable} from '../../../../abstract/table/abstract-table';
import {TAKE} from '../../../../constantes/tabla/take';
import {CreateUpdateModalComponent} from '../../../../componentes/dialog/create-update-modal/create-update-modal.component';
import {MENSAGE_TOAST} from '../../../../constantes/toaster/mensaje-toast';
import {fieldType, FormField, SearchAutoCompleteInterface} from '../../../../componentes/forms/interfaces/form-field';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {TableAbstractClass} from '../../../../abstract/table/interfaces/table-abstract-class';
import {ModalComponent} from '../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import {AutocompleteFormInterface} from '../../../../abstract/table/interfaces/autocomplete-form.interface';
import {CreateUpdateModalParameters} from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {HttpPermisoService} from '../../../permiso/servicios/http-permiso-service';
import {tap} from 'rxjs';
import {ToasterTipo} from '../../../../servicios/logs-mensajes/enums/toaster-tipo';
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";


@Component({
  selector: 'app-rol-permiso-tabla',
  templateUrl: './rol-permiso-tabla.component.html',
  styleUrls: ['./rol-permiso-tabla.component.scss']
})
export class RolPermisoTablaComponent extends AbstractTable<RolPermisoResponseDto, RolPermisoFindDto>
  implements OnInit, TableAbstractClass<RolPermisoResponseDto>, AutocompleteFormInterface {

  @Input()
  idRol = 0;


  datica = [{
    id: 1,
    idRol: {
      id: 1,
      nombre: 'admin',
      sisHabilitado: 1
    },
    nombre: 'Crear libros',
    sisHabilitado: 1,
  }]


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
    public httpRolPermisoService: HttpRolPermisoService,
    private _permisoService: HttpPermisoService,
    public confirmationService: ConfirmationService,
  ) {
    super(
      httpRolPermisoService,
      {
        nombreRegistro: 'Rol Permiso',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {

    // const {idRol} = this._activatedRouter.snapshot.params
    this.stablishSkipAndTake(0, TAKE);
    this.findDto.idRol = this.idRol;
    // this.findDto.sisHabilitado = ActivoInactivo.Activo;
    this.findDto.sortAscending = true;
    this.findDto.sortField = 'id';
    // this.findDto.busqueda = '';

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
      values.idRol = Number(this.idRol);
      this.blockuiService.habilitarBlockUI();
      this.httpRolPermisoService
        .createOne(values as RolPermisoCreateDto)
        .subscribe({
          next: (data: any) => {
            this.blockuiService.deshabilitarBlockUI();
            if (data.error) {
              this.parameters.messageService.toaster({
                titulo: 'Error',
                mensaje: 'El rol ya cuenta con ese permiso',
                tipo: ToasterTipo.error
              })
            } else {

              this.parameters.messageService.toaster(
                MENSAGE_TOAST.creacionExitosa(
                  this.parameters.nombreRegistro ? this.parameters.nombreRegistro : 'Registro'
                )
              );
              closeModal.closeModal();
              this.searchData();
            }
          },
          error: (error) => {
            this.blockuiService.deshabilitarBlockUI();
            this.parameters.messageService.toaster(MENSAGE_TOAST.error());
            console.error({error: error, message: "Error creando Rol Permiso", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpRolPermisoService
        .updateById(values as RolPermisoUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Rol Permiso", data: values});
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
      case FormRolPermisoEnum.permiso:
        this.buscarAutocomplete(event);
    }
  }

  buscarAutocomplete(evento: SearchAutoCompleteInterface) {
    const busqueda: RolPermisoFindDto = {
      busqueda: evento.query,
      skip: 0,
      take: 3,
      sisHabilitado: ActivoInactivo.Activo,
      sortField: 'id',
      sortAscending: true
    };

    console.info({busqueda});

    /*    if (evento.field.autoComplete) {
          evento.field.autoComplete.suggestions = [
            {
              id: 1,
              nombre: 'Crear Usuario',
              descripcion: 'Crear usuarios',
              codigoPrimario: 'GL1-1',
            },
            {
              id: 2,
              nombre: 'Editar usuario',
              descripcion: 'Editar usuarios',
              codigoPrimario: 'GL1-2',
            }
          ]
        }*/

    this._permisoService
      .find(busqueda)
      .pipe(
        tap((data) => {
          console.log('permisos auto complete', data);
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
        })
      ).subscribe({
      next: (resp) => {
        console.log('data', resp)
      }
    });


    // .toPromise()
    // .then(res => res as [PermisoResponseDto[], number])
    // .then(data => {
    //   const arregloDatos = data[0];
    //   // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
    //   // const arregloDatos = data[0].map((a:any)=>{ a.nombreCompeto = a.nombre + ' ' + a.apellido; return a;});
    //   if (evento.field.autoComplete) {
    //     if (Array.isArray(arregloDatos)) {
    //       evento.field.autoComplete.suggestions = [...arregloDatos];
    //     } else {
    //       evento.field.autoComplete.suggestions = [arregloDatos];
    //     }
    //   }
    //   return data;
    // });
  }


  createOrEdit(record?: RolPermisoResponseDto) {
    const formArray = [
      ...FORM_ROL_PERMISO(),
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
