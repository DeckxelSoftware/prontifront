import {Component, Input, OnInit} from '@angular/core';
import {AutorLibroResponseDto} from '../../servicios/dto/autor-libro.response-dto';
import {AutorLibroFindDto} from '../../servicios/dto/autor-libro.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpAutorLibroService} from '../../servicios/http-autor-libro-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {AutorLibroCreateDto} from '../../servicios/dto/autor-libro.create-dto';
import {AutorLibroUpdateDto} from '../../servicios/dto/autor-libro.update-dto';
import {FORM_AUTOR_LIBRO} from '../../form/form-autor-libro';
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
import {FORM_ARCHIVO_BIOGRAFIA} from '../../form/form-archivo-biografia';
import {ArchivoResponseDto} from '../../../archivo/servicios/dto/archivo.response-dto';
import {HttpArchivoService} from '../../../archivo/servicios/http-archivo-service';
import {TipoArchivo} from '../../../archivo/constantes/tipo-archivo';
import {TipoDocumento} from '../../../archivo/constantes/tipo-documento';
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";

@Component({
  selector: 'app-autor-libro-tabla',
  templateUrl: './autor-libro-tabla.component.html',
  styleUrls: ['./autor-libro-tabla.component.scss']
})
export class AutorLibroTablaComponent extends AbstractTable<AutorLibroResponseDto, AutorLibroFindDto>
  implements OnInit, TableAbstractClass<AutorLibroResponseDto>, AutocompleteFormInterface {


  @Input()
  idLibro!: number;


  // temporal poner en html tableDate OJOOOOO
  datica = [{
    id: 1,
    nombres: 'Anderson',
    apellidos: 'Revelo',
    biografia: 'BIOBIOBIO',
    sisHabilitado: 1
  }]

  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por nombres o apellidos',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Nombres/Apellidos',
      placeholder: 'Ej: Ana Rivera',
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
    public httpAutorLibroService: HttpAutorLibroService,
    public confirmationService: ConfirmationService,
    private httpArchivoService: HttpArchivoService,
  ) {
    super(
      httpAutorLibroService,
      {
        nombreRegistro: 'Autor Libro',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {

    this.stablishSkipAndTake(0, TAKE);
    this.findDto.sisHabilitado = ActivoInactivo.Activo;
    this.findDto.sortAscending = true;
    this.findDto.sortField = 'id';
    // this.findDto.busqueda = ' ';
    this.findDto.idLibroBiblioteca = this.idLibro;
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);


    if (values.file) {
      this.blockuiService.habilitarBlockUI();
      if(this.recordUpdated.sisArchivo){
        this.httpArchivoService.editarArchivo(
          String(this.recordUpdated.sisArchivo.id),
          {
            idTabla: String(this.recordUpdated.id),
            file:  this.createEditFormArray[0].actualValue,
            nombreTabla: 'autor_libro',
            tipoArchivo: TipoArchivo.Principal,
            tipoDocumento: TipoDocumento.Archivo,
            sisHabilitado: ActivoInactivo.Activo
          }
        )
          .subscribe(
            {
              next: (respuesta) => {
                this.blockuiService.deshabilitarBlockUI();
                this.parameters.messageService.toaster(
                  MENSAGE_TOAST.creacionExitosa(
                    this.parameters.nombreRegistro ? this.parameters.nombreRegistro : 'Registro'
                  )
                );
                closeModal.closeModal();
                this.searchData();
                console.log('archivo subido', respuesta);
              },

              error: (err) => {
                this.blockuiService.deshabilitarBlockUI();
                this.parameters.messageService.toaster(MENSAGE_TOAST.error());
                console.error({error: err, message: "Error subiendo biografia", data: values});

              }
            }
          );
      }else {
        this.httpArchivoService.crearArchivo(
          this.createEditFormArray[0].actualValue,
          String(this.recordUpdated.id),
          'autor_libro',
          TipoArchivo.Principal,
          TipoDocumento.Archivo,
          ActivoInactivo.Activo)
          .subscribe(
            {
              next: (respuesta) => {
                this.blockuiService.deshabilitarBlockUI();
                this.parameters.messageService.toaster(
                  MENSAGE_TOAST.creacionExitosa(
                    this.parameters.nombreRegistro ? this.parameters.nombreRegistro : 'Registro'
                  )
                );
                closeModal.closeModal();
                this.searchData();
                console.log('archivo subido', respuesta);
              },

              error: (err) => {
                this.blockuiService.deshabilitarBlockUI();
                this.parameters.messageService.toaster(MENSAGE_TOAST.error());
                console.error({error: err, message: "Error subiendo biografia", data: values});

              }
            }
          );

        return;
        //formData.set('file', this.createEditFormArray[0].actualValue)

      }
    }
    if (this.create) {
      values.sisHabilitado = ActivoInactivo.Activo;
      values.idLibroBiblioteca = Number(this.idLibro);
      this.blockuiService.habilitarBlockUI();
      this.httpAutorLibroService
        .createOne(values as AutorLibroCreateDto)
        .subscribe({
          next: (data) => {
            console.log('dataBestial', data);
            this.blockuiService.deshabilitarBlockUI();
            this.parameters.messageService.toaster(
              MENSAGE_TOAST.creacionExitosa(
                this.parameters.nombreRegistro ? this.parameters.nombreRegistro : 'Registro'
              )
            );
            closeModal.closeModal();
            this.tableData.unshift(data);
            // this.searchData();
          },
          error: (error) => {
            this.blockuiService.deshabilitarBlockUI();
            this.parameters.messageService.toaster(MENSAGE_TOAST.error());
            console.error({error: error, message: "Error creando Autor Libro", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpAutorLibroService
        .updateById(values as AutorLibroUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Autor Libro", data: values});
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

  openDialog(formFields: FormField[], arrayAccordeon: MatStepperArray[] = [], idAutor?: number): void {


    const createUpdateModalParameters: CreateUpdateModalParameters = {
      title: `${this.create ? 'Crear ' : 'Actualizar'} ${this.parameters.nombreRegistro}`,
      description: "Por favor llene la informacion pertinente.",
      accordeons: arrayAccordeon,
      formsFields: formFields,
      button: `${this.create ? 'Crear ' : 'Actualizar'} `,
      route: this,
    };

    let objetoDataModal: any = {...createUpdateModalParameters};

    if (idAutor) {
      objetoDataModal.idAutor = idAutor
    }


    const dialogRef = this.dialog.open(CreateUpdateModalComponent, {
      data: objetoDataModal,
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
    //   case FormAutorLibroEnum.generoLibro:
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


  createOrEdit(record?: AutorLibroResponseDto) {

    const formArray = [
      ...FORM_AUTOR_LIBRO(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      console.log('record', record);
      this.recordUpdated = {...record};
      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;
    } else {
      this.create = true;
      this.recordUpdated = undefined;
    }
    this.openDialog(this.createEditFormArray);
  }

  abrirFormularioArchivo(record?: ArchivoResponseDto) {

    const formArray = [
      ...FORM_ARCHIVO_BIOGRAFIA(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      console.log('record', record);
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
