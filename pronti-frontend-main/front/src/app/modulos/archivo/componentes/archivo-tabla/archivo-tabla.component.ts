import {Component, OnInit} from '@angular/core';
import {ArchivoResponseDto} from '../../servicios/dto/archivo.response-dto';
import {ArchivoFindDto} from '../../servicios/dto/archivo.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpArchivoService} from '../../servicios/http-archivo-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {ArchivoUpdateDto} from '../../servicios/dto/archivo.update-dto';
import {FORM_ARCHIVO} from '../../form/form-archivo';
import {TAKE} from '../../../../constantes/tabla/take';
import {CreateUpdateModalComponent} from '../../../../componentes/dialog/create-update-modal/create-update-modal.component';
import {MENSAGE_TOAST} from '../../../../constantes/toaster/mensaje-toast';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {AutocompleteFormInterface} from '../../../../abstract/table/interfaces/autocomplete-form.interface';
import {CreateUpdateModalParameters} from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import {AbstractTable} from '../../../../abstract/table/abstract-table';
import {FormField, SearchAutoCompleteInterface} from '../../../../componentes/forms/interfaces/form-field';
import {TableAbstractClass} from '../../../../abstract/table/interfaces/table-abstract-class';
import {ModalComponent} from '../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import {ActivatedRoute} from '@angular/router';
import {TipoArchivo} from '../../constantes/tipo-archivo';
import {TipoDocumento} from '../../constantes/tipo-documento';
import {ToasterTipo} from '../../../../servicios/logs-mensajes/enums/toaster-tipo';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";

@Component({
  selector: 'app-archivo-tabla',
  templateUrl: './archivo-tabla.component.html',
  styleUrls: ['./archivo-tabla.component.scss']
})
export class ArchivoTablaComponent extends AbstractTable<ArchivoResponseDto, ArchivoFindDto>
  implements OnInit, TableAbstractClass<ArchivoResponseDto>, AutocompleteFormInterface {
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
  entidad!: string;
  idEntidad!: string;
  tipoDocumento!: TipoDocumento;

  constructor(
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
    public dialog: MatDialog,
    public httpArchivoService: HttpArchivoService,
    public confirmationService: ConfirmationService,
    public activatedRoute: ActivatedRoute,
  ) {
    super(
      httpArchivoService,
      {
        nombreRegistro: 'Archivo',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    const {entidad} = this.activatedRoute.snapshot.params;
    const {idEntidad} = this.activatedRoute.snapshot.params;
    const {tipoDocumento} = this.activatedRoute.snapshot.params;
    this.entidad = entidad;
    this.idEntidad = idEntidad;
    this.tipoDocumento = tipoDocumento;
    this.findDto.idTabla = this.idEntidad;
    this.findDto.nombreTabla = this.entidad;
    this.stablishSkipAndTake(0, TAKE);
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    let values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    console.log(values, this.createEditFormArray);
    this.blockuiService.habilitarBlockUI();
    if (this.create) {
      this.httpArchivoService.crearArchivo(
        this.createEditFormArray[0].actualValue,
        this.idEntidad,
        this.entidad,
        TipoArchivo.Secundario,
        this.tipoDocumento,
        'A'
      )
        .subscribe(
          {
            next: (res) => {
              this.parameters.messageService.toaster(
                MENSAGE_TOAST.creacionExitosa(
                  this.parameters.nombreRegistro ? this.parameters.nombreRegistro : 'Registro'
                )
              );
              closeModal.closeModal();
              this.blockuiService.deshabilitarBlockUI();
              this.searchData();
            },
            error: (error) => {
              this.blockuiService.deshabilitarBlockUI();
              this.parameters.messageService.toaster(MENSAGE_TOAST.error());
              console.error({error: error, message: "Error creando Archivo", data: values});
            },
          }
        )
    } else {
      const datosActualizar: ArchivoUpdateDto = {
        idTabla: this.idEntidad,
        nombreTabla: this.entidad,
        sisHabilitado: this.recordUpdated.sisHabilitado,
        file: this.createEditFormArray[0].actualValue,
        tipoArchivo: TipoArchivo.Secundario,
        tipoDocumento: this.tipoDocumento
      };

      if (values.file) {

      }
      this.httpArchivoService.editarArchivo(
        this.recordUpdated.id,
        datosActualizar
      )
        .subscribe(
          {
            next: (res) => {
              this.parameters.messageService.toaster(
                {
                  titulo: 'ÉXITO',
                  tipo: ToasterTipo.success,
                  mensaje: 'Registro actualizado'

                }
              );
              closeModal.closeModal();
              this.blockuiService.deshabilitarBlockUI();
              this.searchData();
            },
            error: (error) => {
              this.blockuiService.deshabilitarBlockUI();
              this.parameters.messageService.toaster(MENSAGE_TOAST.error());
              console.error({error: error, message: "Error actualizando Archivo", data: values});
            },
          }
        )
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
    //   case FormArchivoEnum.generoLibro:
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


  createOrEdit(record?: ArchivoResponseDto) {
    const formArray = [
      ...FORM_ARCHIVO(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      this.recordUpdated = {...record};
      this.create = false;
    } else {
      this.create = true;
      this.recordUpdated = undefined;
    }
    this.openDialog(this.createEditFormArray);
  }

  async actualizarEstadoArchivo(registro: ArchivoResponseDto, sisHabilitado: ActivoInactivo) {
    this.blockuiService.habilitarBlockUI();
    if (registro.buffer && registro.nombreOriginal) {
      try {
        const fileType = this.getFileTypeOfB64(registro.buffer);
        const file = await this.convertb64ToFile(registro.buffer, registro.nombreOriginal, fileType)
        const updateObject: ArchivoUpdateDto = {
          file: file,
          idTabla: this.idEntidad,
          nombreTabla: this.entidad,
          tipoArchivo: TipoArchivo.Secundario,
          tipoDocumento: this.tipoDocumento,
          sisHabilitado: sisHabilitado === 'A' ? 'I' : 'A'
        };

        this.httpArchivoService.editarArchivo(
          registro.id + '',
          updateObject
        )
          .subscribe(
            {
              next: (res) => {
                this.parameters.messageService.toaster(
                  {
                    titulo: 'ÉXITO',
                    tipo: ToasterTipo.success,
                    mensaje: 'Registro actualizado'
                  }
                );

                this.blockuiService.deshabilitarBlockUI();
                this.searchData();
              },
              error: (error) => {
                this.blockuiService.deshabilitarBlockUI();
                this.parameters.messageService.toaster(MENSAGE_TOAST.error());
                console.error({error: error, message: "Error actualizando Archivo", data: registro.id});
              },
            }
          )
      } catch (e) {
        this.parameters.messageService.toaster(MENSAGE_TOAST.error());
        this.blockuiService.deshabilitarBlockUI();
      }

    } else {
      this.parameters.messageService.toaster(MENSAGE_TOAST.error());
      this.blockuiService.deshabilitarBlockUI();
    }


  }

  convertb64ToFile(b64: string, fileName: string, fileType: string) {
    return fetch(b64)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], fileName, {type: fileType})
        return file;
      })
  }

  getFileTypeOfB64(b64: string) {
    const fileType = b64.split(':')[1].split(';')[0];
    return fileType;
  }
}
