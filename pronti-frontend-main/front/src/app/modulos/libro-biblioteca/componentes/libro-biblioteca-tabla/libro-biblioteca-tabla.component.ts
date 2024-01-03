import {Component, OnInit} from '@angular/core';
import {AbstractTable} from '../../../../abstract/table/abstract-table';
import {LibroBibliotecaResponseDto} from '../../servicios/dto/libro-biblioteca.response-dto';
import {LibroBibliotecaFindDto} from '../../servicios/dto/libro-biblioteca.find-dto';
import {TableAbstractClass} from '../../../../abstract/table/interfaces/table-abstract-class';
import {
  fieldType,
  FormField,
  SearchAutoCompleteInterface,
} from '../../../../componentes/forms/interfaces/form-field';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {MatDialog} from '@angular/material/dialog';
import {HttpLibroBibliotecaService} from '../../servicios/http-libro-biblioteca-service';
import {ConfirmationService, MenuItem} from 'primeng/api';
import {
  CreateUpdateModalParameters
} from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import {
  CreateUpdateModalComponent
} from '../../../../componentes/dialog/create-update-modal/create-update-modal.component';
import {TAKE} from '../../../../constantes/tabla/take';
import {AbstractControl, FormGroup, Validators} from '@angular/forms';
import {AutocompleteFormInterface} from '../../../../abstract/table/interfaces/autocomplete-form.interface';
import {ModalComponent} from '../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import {LibroBibliotecaCreateDto} from '../../servicios/dto/libro-biblioteca.create-dto';
import {MENSAGE_TOAST} from '../../../../constantes/toaster/mensaje-toast';
import {LibroBibliotecaUpdateDto} from '../../servicios/dto/libro-biblioteca.update-dto';
import {FormLibroBibliotecaEnum} from '../../form/form-libro-biblioteca.enum';
import {FORM_LIBRO_BIBLIOTECA} from '../../form/form-libro-biblioteca';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {SELECT_SIS_HABILITADO} from '../../../../constantes/form/select/sis-habilitado';
import {Router} from '@angular/router';
import {TipoDocumento} from '../../../archivo/constantes/tipo-documento';
import {HttpArchivoService} from '../../../archivo/servicios/http-archivo-service';
import {FORM_IMAGEN_LIBRO_BIBLIOTECA} from '../../form/form-imagen-libro';
import {TipoArchivo} from '../../../archivo/constantes/tipo-archivo';
import {catchError} from 'rxjs';
import {ModalArchivoLibroComponent} from '../modal-archivo-libro/modal-archivo-libro.component';
import {HttpListaValoresDetalleService} from '../../../lista-valores-detalle/servicios/http-lista-valores-detalle-service';
import {ListaValoresDetalleFindDto} from '../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.find-dto';
import {ListaValoresEnum} from '../../../../constantes/lista-valores/lista-valores.enum';
import {HttpListaValoresTipoService} from '../../../../servicios/lista-valores-tipo/http-lista-valores-tipo.service';
import {ListaValoresTipoFindDto} from '../../../../servicios/lista-valores-tipo/dto/lista-valores-tipo.find-dto';
import {ListaValoresTipoResponseDto} from '../../../../servicios/lista-valores-tipo/dto/lista-valores-tipo.response-dto';
import {ListaValoresDetalleResponseDto} from '../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.response-dto';
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";

@Component({
  selector: 'app-libro-biblioteca-tabla',
  templateUrl: './libro-biblioteca-tabla.component.html',
  styleUrls: ['./libro-biblioteca-tabla.component.scss']
})
export class LibroBibliotecaTablaComponent extends AbstractTable<LibroBibliotecaResponseDto, LibroBibliotecaFindDto>
  implements OnInit, TableAbstractClass<LibroBibliotecaResponseDto>, AutocompleteFormInterface {


  datica = [
    {
      id: 1,
      generoLibro: 'Terror',
      isbn: '234123412341',
      nombre: 'La oscuridad',
      descripcion: 'libro sobre la oscuridad',
      sisHabilitado: 1
    }
  ]


  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por nombre o isbn',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Busqueda',
      placeholder: 'Ej: Harry p...',
      column: '12',
      actualValue: '',
    },
    {
      label: 'Estado',
      formControlName: 'sisHabilitado',
      type: fieldType.select,
      help: 'Seleccione si esta habilitado o no',
      select: SELECT_SIS_HABILITADO,
      initialValue: "",
      validators: [],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Activo / Inactivo',
      column: '6',
      actualValue: '',
    },
    {
      label: 'Genero libro',
      placeholder: 'Ej: Drama/Terror',
      help: 'Selecciona un genero libro',
      formControlName: FormLibroBibliotecaEnum.generoLibro,
      initialValue: '',
      validators: [],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      autoComplete: {
        field: 'nombre',
        inputId: 'nombre',
        suggestions: []
      },
      column: '6'
    },
  ];

  constructor(
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
    public dialog: MatDialog,
    public httpLibroBibliotecaService: HttpLibroBibliotecaService,
    public confirmationService: ConfirmationService,
    private _router: Router,
    private httpArchivoService: HttpArchivoService,
    private httpListaValoresDetalle: HttpListaValoresDetalleService,
    private httpListaValoresTipo: HttpListaValoresTipoService,
  ) {
    super(
      httpLibroBibliotecaService,
      {
        nombreRegistro: 'Libro biblioteca',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    this.stablishSkipAndTake(0, TAKE);
    this.findDto.sortAscending = true;
    this.findDto.sortField = 'id';
    this.findDto.sisHabilitado = ActivoInactivo.Activo;


  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.generoLibro = undefined;
    this.findDto.sisHabilitado = undefined;
  }

  editarImagen(closeModal: ModalComponent) {

    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    if (values.file) {
      this.blockuiService.habilitarBlockUI();
      if (this.recordUpdated.sisImagen) {

        this.httpArchivoService.editarArchivo(
          String(this.recordUpdated.sisImagen.id),
          {
            idTabla: String(this.recordUpdated.id),
            file: this.createEditFormArray[0].actualValue,
            nombreTabla: 'libro_biblioteca',
            tipoArchivo: TipoArchivo.Principal,
            tipoDocumento: TipoDocumento.Imagen,
            sisHabilitado: ActivoInactivo.Activo
          }
        )
          .pipe(
          ).subscribe(
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


      } else {
        this.httpArchivoService.crearArchivo(
          this.createEditFormArray[0].actualValue,
          String(this.recordUpdated.id),
          'libro_biblioteca',
          TipoArchivo.Principal,
          TipoDocumento.Imagen,
          ActivoInactivo.Activo)
          .pipe(
          ).subscribe(
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

      }


    }
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);


    if (this.create) {
      values.sisHabilitado = ActivoInactivo.Activo;
      this.blockuiService.habilitarBlockUI();
      this.httpLibroBibliotecaService
        .createOne(values as LibroBibliotecaCreateDto)
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
            console.error({error: error, message: "Error creando Libro Biblioteca", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpLibroBibliotecaService
        .updateById(values as LibroBibliotecaUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Libro Biblioteca", data: values});
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

    console.log('formsFields', formFields)

    const tieneImagen = formFields.some((field: FormField) => {
      return field.type === fieldType.file
    });

    const createUpdateModalParameters: CreateUpdateModalParameters = {
      title: `${this.create ? 'Crear ' : 'Actualizar'} ${this.parameters.nombreRegistro}`,
      description: "Por favor llene la informacion pertinente.",
      accordeons: arrayAccordeon,
      formsFields: formFields,
      button: `${this.create ? 'Crear ' : 'Actualizar'} `,
      route: this,
    };

    if (tieneImagen) {
      console.log('va editar iamgen ');
      const dialogRef = this.dialog.open(ModalArchivoLibroComponent, {
        data: createUpdateModalParameters,
      });
    } else {
      const dialogRef = this.dialog.open(CreateUpdateModalComponent, {
        data: createUpdateModalParameters,
      });
    }

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
      if (event.formControlName === FormLibroBibliotecaEnum.generoLibro) {
        this.findDto.generoLibro = event.actualValue?.nombre
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
      case FormLibroBibliotecaEnum.generoLibro:
        this.buscarGeneroLibro(event);
    }
  }

  buscarGeneroLibro(evento: SearchAutoCompleteInterface) {
    const findDto: ListaValoresDetalleFindDto = {
      idListaValoresTipoCodigoPrimario: ListaValoresEnum.generoLibro,
      busqueda: evento.query,
    }


    this.httpListaValoresDetalle
      .find(findDto)
      .toPromise()
      .then(
        res => res as [ListaValoresDetalleResponseDto[], number]
      )
      .then( data => {
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

      })
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        // const arregloDatos = data[0].map((a: any) => {
        //   a.nombreCompeto = a.nombre + ' ' + a.apellido;
        //   return a;
        // });
/*        if (evento.field.autoComplete) {
          if (Array.isArray(arregloDatos)) {
            console.log('evento', evento);

            let arregloFiltradoPorEvento = arregloDatos.filter((valor) => valor.nombre === evento.query);
            // evento.field.autoComplete.suggestions = [...arregloFiltradoPorEvento];
            if (evento.query !== '') {
              arregloFiltradoPorEvento = arregloDatos.filter((valor) => {
                return valor.nombre.includes(evento.query);
              });

              evento.field.autoComplete.suggestions = [...arregloFiltradoPorEvento];
              console.log('estamos filtrando los datos')
            } else {

              evento.field.autoComplete.suggestions = [...arregloDatos];

            }

            if (arregloFiltradoPorEvento.length > 0) {

            }

          } else {
            console.log('Nunca entra aqui')
            evento.field.autoComplete.suggestions = [arregloDatos];
          }
        }*/

  }


  createOrEdit(record?: LibroBibliotecaResponseDto) {
    const formArray = [
      ...FORM_LIBRO_BIBLIOTECA(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      const generoLibro = {
        nombre: record.generoLibro
      }
      this.recordUpdated = {...record, generoLibro};
      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;
    } else {
      this.create = true;
      this.recordUpdated = undefined;
    }
    this.openDialog(this.createEditFormArray);
  }

  irAutoresLibro(registro: LibroBibliotecaResponseDto) {
    this._router.navigate(['/libro-module', registro.id, 'autor-libro-module'])
  }

  subirImagenLibro(record: LibroBibliotecaResponseDto) {
    const formArray = [
      ...FORM_IMAGEN_LIBRO_BIBLIOTECA()
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
