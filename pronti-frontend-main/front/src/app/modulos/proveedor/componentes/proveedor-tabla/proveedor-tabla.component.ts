import {Component, OnInit} from '@angular/core';
import {ProveedorResponseDto} from '../../servicios/dto/proveedor.response-dto';
import {ProveedorFindDto} from '../../servicios/dto/proveedor.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpProveedorService} from '../../servicios/http-proveedor-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {ProveedorCreateDto} from '../../servicios/dto/proveedor.create-dto';
import {ProveedorUpdateDto} from '../../servicios/dto/proveedor.update-dto';
import {FormProveedorEnum} from '../../form/form-proveedor.enum';
import {
  FORM_EMPRESA_PROVEEDOR_AUTOCOMPLETE,
  FORM_PROVEEDOR,
  FORM_PROVEEDOR_EMPRESA,
  FORM_USUARIO_PROVEEDOR,
  FORM_USUARIO_PROVEEDOR_AUTOCOMPLETE
} from '../../form/form-proveedor';
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
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {MatStepperArray} from '../../../../componentes/forms/form-container/interfaces/mat-stepper-array';
import {
  ModalInicialCrearProveedorComponent
} from '../modal-inicial-crear-proveedor/modal-inicial-crear-proveedor.component';
import {MatStepperConfig} from '../../../../componentes/forms/form-container/interfaces/mat-stepper-config';
import {ListaValoresEnum} from '../../../../constantes/lista-valores/lista-valores.enum';
import {ListaValoresDetalleFindDto} from '../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.find-dto';
import {
  ListaValoresDetalleResponseDto
} from '../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.response-dto';
import {
  HttpListaValoresDetalleService
} from '../../../lista-valores-detalle/servicios/http-lista-valores-detalle-service';
import {TipoProveedorEnum} from '../../../../enums/tipo-proveedor.enum';
import {SiNoEnum} from '../../../../enums/si-no.enum';
import {ToasterTipo} from '../../../../servicios/logs-mensajes/enums/toaster-tipo';
import {FormUsuarioEnum} from '../../../usuario/form/form-usuario.enum';
import {FormEmpresaEnum} from '../../../empresa/form/form-empresa.enum';
import {UsuarioCreateDto} from "../../../usuario/servicios/dto/usuario.create-dto";
import {EmpresaCreateDto} from "../../../empresa/servicios/dto/empresa.create-dto";
import {UsuarioFindDto} from "../../../usuario/servicios/dto/usuario.find-dto";
import {UsuarioResponseDto} from "../../../usuario/servicios/dto/usuario.response-dto";
import {EmpresaResponseDto} from "../../../empresa/servicios/dto/empresa.response-dto";
import {HttpUsuarioService} from "../../../usuario/servicios/http-usuario-service";
import {HttpEmpresaService} from "../../../empresa/servicios/http-empresa-service";

@Component({
  selector: 'app-proveedor-tabla',
  templateUrl: './proveedor-tabla.component.html',
  styleUrls: ['./proveedor-tabla.component.scss']
})
export class ProveedorTablaComponent extends AbstractTable<ProveedorResponseDto, ProveedorFindDto>
  implements OnInit, TableAbstractClass<ProveedorResponseDto>, AutocompleteFormInterface {
  matStepperConfig: MatStepperConfig = {
    orientation: 'horizontal',
    linear: false,
  };
  editarRegistro = false;
  tipoProveedorSeleccionado!: TipoProveedorEnum;
  crearDatosUsuarioOEmpresa!: boolean;
  results: any[] = [];
  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por Razón social o RUC',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Búsqueda',
      placeholder: 'Ej: 1718...',
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
    public httpProveedorService: HttpProveedorService,
    public confirmationService: ConfirmationService,
    public httpListavaloresDetalle: HttpListaValoresDetalleService,
    private httpUsuarioService: HttpUsuarioService,
    private httpEmpresaService: HttpEmpresaService,
  ) {
    super(
      httpProveedorService,
      {
        nombreRegistro: 'Proveedor',
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
    console.log(values);
    if (!this.editarRegistro) {
      this.crearProveedor(closeModal, values);
    } else {
      this.editarProveedor(closeModal, values);
    }

    // if (this.create) {
    //   this.blockuiService.habilitarBlockUI();
    //   this.httpProveedorService
    //     .createOne(values as ProveedorCreateDto)
    //     .subscribe({
    //       next: () => {
    //         this.blockuiService.deshabilitarBlockUI();
    //         this.parameters.messageService.toaster(
    //           MENSAGE_TOAST.creacionExitosa(
    //             this.parameters.nombreRegistro ? this.parameters.nombreRegistro : 'Registro'
    //           )
    //         );
    //         closeModal.closeModal();
    //         this.searchData();
    //       },
    //       error: (error) => {
    //         this.blockuiService.deshabilitarBlockUI();
    //         this.parameters.messageService.toaster(MENSAGE_TOAST.error());
    //         console.error({error: error, message: "Error creando Proveedor", data: values});
    //       },
    //     });
    // } else {
    //   this.blockuiService.habilitarBlockUI();
    //   this.httpProveedorService
    //     .updateById(values as ProveedorUpdateDto, this.recordUpdated.id as number)
    //     .subscribe({
    //       next: () => {
    //         this.blockuiService.deshabilitarBlockUI();
    //         this.parameters.messageService.toaster(
    //           MENSAGE_TOAST.creacionExitosa(
    //             this.parameters.nombreRegistro ? this.parameters.nombreRegistro : 'Registro'
    //           )
    //         );
    //         closeModal.closeModal();
    //         this.searchData();
    //       },
    //       error: (error) => {
    //         this.blockuiService.deshabilitarBlockUI();
    //         this.parameters.messageService.toaster(MENSAGE_TOAST.error());
    //         console.error({error: error, message: "Error actualizando Proveedor", data: values});
    //       },
    //     });
    // }
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
    let codigoListaValorTipo = '';
    switch (event.field.formControlName) {
      case FormProveedorEnum.claseContribuyente:
        codigoListaValorTipo = this.findCodListaValorTipo(FormProveedorEnum.claseContribuyente);
        this.searchListaValorDetalle(event, codigoListaValorTipo);
        break;
      case FormUsuarioEnum.tipoDocumentoIdentidad:
        codigoListaValorTipo = this.findCodListaValorTipo(FormUsuarioEnum.tipoDocumentoIdentidad);
        this.searchListaValorDetalle(event, codigoListaValorTipo);
        break;
      case FormUsuarioEnum.ciudad:
        codigoListaValorTipo = this.findCodListaValorTipo(FormUsuarioEnum.ciudad);
        this.searchListaValorDetalle(event, codigoListaValorTipo);
        break;
      case FormUsuarioEnum.provincia:
        codigoListaValorTipo = this.findCodListaValorTipo(FormUsuarioEnum.provincia);
        this.searchListaValorDetalle(event, codigoListaValorTipo);
        break;
      case FormUsuarioEnum.tipoMedioContacto:
        codigoListaValorTipo = this.findCodListaValorTipo(FormUsuarioEnum.tipoMedioContacto);
        this.searchListaValorDetalle(event, codigoListaValorTipo);
        break;
      case FormProveedorEnum.tipoCuentaContable:
        codigoListaValorTipo = this.findCodListaValorTipo(FormProveedorEnum.tipoCuentaContable);
        this.searchListaValorDetalle(event, codigoListaValorTipo);
        break;
      case FormProveedorEnum.idUsuario:
        this.buscarAutocompleteUsuario(event);
        break;
      case FormProveedorEnum.idEmpresa:
        this.buscarAutocompleteEmpresa(event);
        break;
    }
  }

  buscarAutocompleteUsuario(evento: SearchAutoCompleteInterface) {
    const busqueda: UsuarioFindDto = {
      busqueda: evento.query,
      sisHabilitado: ActivoInactivo.Activo
    };
    this.httpUsuarioService
      .find(busqueda)
      .toPromise()
      .then(res => res as [UsuarioResponseDto[], number])
      .then(data => {
        // const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA

        const arregloDatos = data[0].map((a: any) => {
          a.nombresCompletos = a.nombres + ' ' + a.apellidos;
          return a;
        });
        if (evento.field.autoComplete) {
          if (Array.isArray(arregloDatos)) {
            evento.field.autoComplete.suggestions = [...arregloDatos];
          } else {
            evento.field.autoComplete.suggestions = [arregloDatos];
          }
        }
      });
  }

  buscarAutocompleteEmpresa(evento: SearchAutoCompleteInterface) {
    const busqueda: UsuarioFindDto = {
      busqueda: evento.query,
    };
    this.httpEmpresaService
      .find(busqueda)
      .toPromise()
      .then(res => res as [EmpresaResponseDto[], number])
      .then(data => {
        // const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        const arregloDatos = data[0].map((a: any) => {
          a.razonSocialRuc = a.razonSocial + '-' + a.rucEmpresa;
          return a;
        });
        if (evento.field.autoComplete) {
          if (Array.isArray(arregloDatos)) {
            evento.field.autoComplete.suggestions = [...arregloDatos];
          } else {
            evento.field.autoComplete.suggestions = [arregloDatos];
          }
        }
      });
  }

  findCodListaValorTipo(field: string) {
    const codListaValorTipo = {
      tipoMedioContacto1: ListaValoresEnum.tipoMedioContacto,
      tipoDocumentoIdentidad: ListaValoresEnum.tipoDocumentoIdentidad,
      pais: ListaValoresEnum.paisUsuario,
      provincia: ListaValoresEnum.provinciaUsuario,
      ciudad: ListaValoresEnum.ciudadUsuario,
      tipoEmpresa: ListaValoresEnum.tipoEmpresa,
      claseContribuyente: ListaValoresEnum.claseContribuyente,
      tipoCuentaContable: ListaValoresEnum.cuentaContable,
      default: ''
    }
    // @ts-ignore
    return (codListaValorTipo[field] || codListaValorTipo.default)
  }

  searchListaValorDetalle(evento: any, codigo: string) {
    // console.log('124', evento, idAutocomplete);
    const busqueda: ListaValoresDetalleFindDto = {
      idListaValoresTipoCodigoPrimario: codigo,
      busqueda: evento.query,
    };


    this.httpListavaloresDetalle
      .find(busqueda)
      .toPromise()
      .then(res => res as [ListaValoresDetalleResponseDto[], number])
      .then(data => {
        const arregloDatos = data[0];

        // this.results = arregloDatos;
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


  createOrEdit(record?: ProveedorResponseDto) {
    const formArray = [
      ...FORM_PROVEEDOR(),
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

  abrirModalCrearEditarProveedor(parametros: { formFields: FormField[], registro?: ProveedorResponseDto }) {
    const parametrosModalCrearProveedor = {
      title: parametros.registro ? 'Editar proveedor' : 'Crear proveedor',
      description: 'Ingrese los campos necesarios',
      formsFields: parametros.formFields,
      route: this,
      registro: parametros.registro ? parametros.registro : null,
      submitButtonDisabled: true,
      button: parametros.registro ? 'Editar' : 'Crear',

    };

    const dialogRef = this.dialog.open(CreateUpdateModalComponent, {
      data: parametrosModalCrearProveedor,
    });
  }

  // async crearOEditarModal(modal: ModalCrearProveedorComponent) {
  //   if (!this.editarRegistro) {
  //     this.crearProveedor(modal);
  //   } else {
  //     this.editarProveedor(modal);
  //   }
  //
  // }

  crearProveedor(modal: ModalComponent, values: any) {
    const valoresProveedorACrear = this.setearDatosParaCrear(values);
    this.blockuiService.habilitarBlockUI();
    if (valoresProveedorACrear) {

      this.httpProveedorService.createOne(valoresProveedorACrear)
        .subscribe(
          {
            next: (res) => {
              this.blockuiService.deshabilitarBlockUI();
              this.parameters.messageService.toaster(
                MENSAGE_TOAST.creacionExitosa(
                  'Proveedor'
                )
              );
              this.dialog.closeAll();
              this.searchData();
            },
            error: (err) => {
              this.blockuiService.deshabilitarBlockUI();
              console.error('Error creando proveedor: ', err)
              this.parameters.messageService.toaster(
                MENSAGE_TOAST.error(
                  'Error creando el registro. '
                )
              );
            }
          }
        )

    }
  }

  setearIdsEnObjetoEditar(valoresProveedorAEditar: ProveedorUpdateDto) {

    valoresProveedorAEditar.id = this.recordUpdated.id;

    if (valoresProveedorAEditar.tipoProveedor === TipoProveedorEnum.Empresa) {

      // @ts-ignore
      valoresProveedorAEditar.idEmpresa.id = modal.data.registro.idEmpresa.id;

    } else if (valoresProveedorAEditar.tipoProveedor === TipoProveedorEnum.Natural || valoresProveedorAEditar.tipoProveedor === TipoProveedorEnum.Pasaporte) {

      // @ts-ignore
      valoresProveedorAEditar.idUsuario.id = modal.data.registro.idUsuario.id;

    }
    return valoresProveedorAEditar;
  }

  editarProveedor(modal: ModalComponent, values: any) {
    let valoresProveedorAEditar = this.setearDatosParaEditar(values);
    valoresProveedorAEditar.tipoProveedor = this.tipoProveedorSeleccionado;
    if (Object.keys(valoresProveedorAEditar).length > 0) {
      valoresProveedorAEditar = this.setearIdsEnObjetoEditar(valoresProveedorAEditar)
      this.httpProveedorService.editarProveedor(valoresProveedorAEditar)
        .subscribe(
          {
            next: (res) => {
              console.log(res);
              this.parameters.messageService.toaster(
                {
                  titulo: 'Exito',
                  mensaje: `Proveedor editado exitosamente`,
                  tipo: ToasterTipo.success
                }
              );
              modal.closeModal();
              this.searchData();
            },
            error: (err) => {
              this.parameters.messageService.toaster(
                {
                  titulo: 'Error',
                  mensaje: `Error actualizando proveedor`,
                  tipo: ToasterTipo.error
                }
              );
              console.error('Error actualizando Proveedor: ', err)
            }
          }
        )
    }


  }

  /*
  * {
    "tipoDocumentoIdentidad": "Pasaporte",
    "documentoIdentidad": "1717171919",
    "nombres": "test",
    "apellidos": "test",
    "claseContribuyente": "RIMPE",
    "obligadoLLevarContabilidad": "N",
    "agenteRetencion": "N",
    "direccion": "test",
    "tipoMedioContacto1": "Correo",
    "medioContacto1": "test",
    "correo": "sfsadfsdfd@mail.com",
    "provincia": "Azuay",
    "ciudad": "Cuenca",
    "nombrePersonaReferencia": "test",
    "contactoReferencia": "test"
  }*/
  setearDatosParaCrear(values: any) {
    const proveedor: ProveedorCreateDto = {};
    if (Object.keys(values).length > 0) {
      proveedor.tipoProveedor = this.tipoProveedorSeleccionado;
      proveedor.nombrePersonaReferencia = values.nombrePersonaReferencia;
      proveedor.contactoReferencia = values.contactoReferencia;
      if (this.crearDatosUsuarioOEmpresa) {
        if (this.tipoProveedorSeleccionado === TipoProveedorEnum.Natural || this.tipoProveedorSeleccionado === TipoProveedorEnum.Pasaporte || this.tipoProveedorSeleccionado === TipoProveedorEnum.Comisionista) {
          proveedor.claseContribuyente = values.claseContribuyente;
          proveedor.agenteRetencion = values.agenteRetencion;
          proveedor.obligadoLLevarContabilidad = values.obligadoLLevarContabilidad;
          const datosUsuario: UsuarioCreateDto = {
            tipoDocumentoIdentidad: values.tipoDocumentoIdentidad,
            documentoIdentidad: values.documentoIdentidad,
            nombres: values.nombres,
            apellidos: values.apellidos,
            direccion: values.direccion,
            tipoMedioContacto1: values.tipoMedioContacto1,
            medioContacto1: values.medioContacto1,
            correo: values.correo,
            provincia: values.provincia,
            ciudad: values.ciudad,
          }
          proveedor.idUsuario = datosUsuario;
        } else if (this.tipoProveedorSeleccionado === TipoProveedorEnum.Empresa) {
          const datosEmpresa: EmpresaCreateDto = {
            rucEmpresa: values.rucEmpresa,
            razonSocial: values.razonSocial,
            nombreComercial: values.nombreComercial,
            claseContribuyente: values.claseContribuyente,
            obligadoLlevarContabilidad: values.obligadoLLevarContabilidad,
            agenteRetencion: values.agenteRetencion,
            direccionEmpresa: values.direccionEmpresa,
            telefonoEmpresa: values.telefonoEmpresa,
            nombreRepresentanteLegal: values.nombreRepresentanteLegal,
            documentoRepresentanteLegal: values.documentoRepresentanteLegal,
          }
          proveedor.idEmpresa = datosEmpresa;
        }

      } else {
        if (this.tipoProveedorSeleccionado === TipoProveedorEnum.Natural || this.tipoProveedorSeleccionado === TipoProveedorEnum.Pasaporte || this.tipoProveedorSeleccionado === TipoProveedorEnum.Comisionista) {
          proveedor.claseContribuyente = values.claseContribuyente;
          proveedor.agenteRetencion = values.agenteRetencion;
          proveedor.obligadoLLevarContabilidad = values.obligadoLLevarContabilidad;
          proveedor.idUsuario = values.idUsuario;
        } else if (this.tipoProveedorSeleccionado === TipoProveedorEnum.Empresa) {
          proveedor.idEmpresa = values.idEmpresa;
        }
      }

    } else {
      this.logsMlabsService.toaster(
        {
          titulo: 'Error',
          mensaje: 'Error obtenieno los datos del formulario',
          tipo: ToasterTipo.error
        }
      );
    }
    return proveedor;
  }

  setearDatosParaEditar(values: any) {
    const proveedor: ProveedorUpdateDto = {id: this.recordUpdated.id};
    if (Object.keys(values).length > 0) {
      proveedor.tipoProveedor = this.tipoProveedorSeleccionado;
      if (this.crearDatosUsuarioOEmpresa) {
        if (this.tipoProveedorSeleccionado === TipoProveedorEnum.Natural || this.tipoProveedorSeleccionado === TipoProveedorEnum.Pasaporte) {
          const datosUsuario: UsuarioCreateDto = {
            tipoDocumentoIdentidad: values.tipoDocumentoIdentidad,
            documentoIdentidad: values.documentoIdentidad,
            nombres: values.nombres,
            apellidos: values.apellidos,
            direccion: values.direccion,
            tipoMedioContacto1: values.tipoMedioContacto1,
            medioContacto1: values.medioContacto1,
            correo: values.correo,
            provincia: values.provincia,
            ciudad: values.ciudad,
          }
          proveedor.idUsuario = datosUsuario;
        }

      } else {
        // todo hacer lo de empresa
        // const datosEmpresa: EmpresaCreateDto = {
        //
        // }
      }

    }
    return proveedor;
  }

  //
  // setearDatosParaCrearEditar(arregloFormulario: MatStepperArray[]) {
  //   if (arregloFormulario.length > 0) {
  //     const valoresFormProveedor = this.getFormData(arregloFormulario[0].fieldsArray as FormField[], arregloFormulario[0].formGroup);
  //     valoresFormProveedor.tipoProveedor = this.tipoProveedorSeleccionado;
  //     valoresFormProveedor.sisHabilitado = ActivoInactivo.Activo;
  //     const valoresFormEmpresaOUsuario = this.getFormData(arregloFormulario[1].fieldsArray as FormField[], arregloFormulario[1].formGroup);
  //
  //     if (this.tipoProveedorSeleccionado === TipoProveedorEnum.Empresa) {
  //       if (this.crearDatosUsuarioOEmpresa) {
  //         valoresFormProveedor.idEmpresa = valoresFormEmpresaOUsuario;
  //         valoresFormProveedor.idEmpresa.sisHabilitado = ActivoInactivo.Activo;
  //       } else {
  //         valoresFormProveedor.idEmpresa = valoresFormEmpresaOUsuario.idEmpresa;
  //       }
  //     } else if (this.tipoProveedorSeleccionado === TipoProveedorEnum.Natural || this.tipoProveedorSeleccionado === TipoProveedorEnum.Pasaporte) {
  //       if (this.crearDatosUsuarioOEmpresa) {
  //         valoresFormProveedor.idUsuario = valoresFormEmpresaOUsuario;
  //         valoresFormProveedor.idUsuario.sisHabilitado = ActivoInactivo.Activo;
  //       } else {
  //         valoresFormProveedor.idUsuario = valoresFormEmpresaOUsuario.idUsuario;
  //       }
  //     }
  //     return valoresFormProveedor;
  //   }
  //
  //
  //}

  abrirModalInicialCrear() {
    console.log('modal inicial crear');
    this.editarRegistro = false;
    const modalIniciarCrearProveedor$ = this.dialog.open(ModalInicialCrearProveedorComponent, {
      data: {
        componente: this
      }
    });
    modalIniciarCrearProveedor$.afterClosed().subscribe(
      {
        next: (res) => {
          if (res) {
            if (res.value) {
              this.tipoProveedorSeleccionado = res.value.tipoProveedor;
              this.crearDatosUsuarioOEmpresa = res.value.crearDatos === SiNoEnum.SI ? true : false;
              let formFields: FormField[] = [];
              formFields = this.setearFormulario(this.tipoProveedorSeleccionado, this.crearDatosUsuarioOEmpresa);
              this.createEditFormArray = [...formFields];
              this.abrirModalCrearEditarProveedor({formFields: this.createEditFormArray})
            }
          }

        },
        error: () => {
        }
      }
    )
  }

  setearFormulario(tipoProveedor: TipoProveedorEnum, crearDatos: boolean) {
    if (tipoProveedor === TipoProveedorEnum.Empresa && crearDatos) {
      return FORM_PROVEEDOR_EMPRESA()
    } else if (tipoProveedor === TipoProveedorEnum.Empresa && !crearDatos) {
      return FORM_EMPRESA_PROVEEDOR_AUTOCOMPLETE();
    } else if ((tipoProveedor === TipoProveedorEnum.Natural || tipoProveedor === TipoProveedorEnum.Pasaporte || tipoProveedor === TipoProveedorEnum.Comisionista) && crearDatos) {
      return FORM_USUARIO_PROVEEDOR();
    } else if ((tipoProveedor === TipoProveedorEnum.Natural || tipoProveedor === TipoProveedorEnum.Pasaporte || tipoProveedor === TipoProveedorEnum.Comisionista) && !crearDatos) {
      return FORM_USUARIO_PROVEEDOR_AUTOCOMPLETE();
    } else {
      return []
    }

  }

  // setearFormulariosStepper(tipoProveedor: TipoProveedorEnum, crearDatos: boolean): MatStepperArray[] {
  //   let stepper: MatStepperArray[] = [];
  //   if (tipoProveedor === TipoProveedorEnum.Empresa && crearDatos) {
  //
  //     stepper = [
  //       {
  //         fieldsArray: FORM_PROVEEDOR_EMPRESA(),
  //         id: 'formProveedor',
  //         formGroup: new FormGroup({}),
  //         labelHtml: 'Datos Proveedor',
  //       },
  //       {
  //         fieldsArray: FORM_EMPRESA_PROVEEDOR(),
  //         id: 'formEmpresa',
  //         formGroup: new FormGroup({}),
  //         labelHtml: 'Datos Empresa',
  //       },
  //     ]
  //   } else if (tipoProveedor === TipoProveedorEnum.Empresa && !crearDatos) {
  //     stepper = [
  //       {
  //         fieldsArray: FORM_PROVEEDOR_EMPRESA(),
  //         id: 'formProveedor',
  //         formGroup: new FormGroup({}),
  //         labelHtml: 'Datos Proveedor',
  //       },
  //       {
  //         fieldsArray: FORM_EMPRESA_PROVEEDOR_AUTOCOMPLETE(),
  //         id: 'formEmpresa',
  //         formGroup: new FormGroup({}),
  //         labelHtml: 'Datos Empresa',
  //       },
  //     ]
  //
  //   } else if ((tipoProveedor === TipoProveedorEnum.Natural || tipoProveedor === TipoProveedorEnum.Pasaporte) && crearDatos) {
  //
  //     stepper = [
  //       {
  //         fieldsArray: FORM_PROVEEDOR_NATURAL_PASAPORTE(),
  //         id: 'formProveedor',
  //         formGroup: new FormGroup({}),
  //         labelHtml: 'Datos Proveedor',
  //       },
  //       {
  //         fieldsArray: FORM_USUARIO_PROVEEDOR(),
  //         id: 'formUsuario',
  //         formGroup: new FormGroup({}),
  //         labelHtml: 'Datos Usuario',
  //       },
  //     ]
  //
  //   } else if ((tipoProveedor === TipoProveedorEnum.Natural || tipoProveedor === TipoProveedorEnum.Pasaporte) && !crearDatos) {
  //     stepper = [
  //       {
  //         fieldsArray: FORM_PROVEEDOR_NATURAL_PASAPORTE(),
  //         id: 'formProveedor',
  //         formGroup: new FormGroup({}),
  //         labelHtml: 'Datos Proveedor',
  //       },
  //       {
  //         fieldsArray: FORM_USUARIO_PROVEEDOR_AUTOCOMPLETE(),
  //         id: 'formUsuario',
  //         formGroup: new FormGroup({}),
  //         labelHtml: 'Datos Usuario',
  //       },
  //     ]
  //   }
  //   return stepper;
  // }

  setearDatosEdicionProveedor(registro?: any) {
    this.editarRegistro = true;
    console.log(registro);
    // registro = {
    //   id: 1,
    //   "nombrePersonaReferencia": "nombre ref",
    //   "contactoReferencia": "contacto",
    //   "tipoCuentaContable": "Gastos telefonia",
    //   "claseContribuyente": "General",
    //   "obligadoLlevarContabilidad": SiNoEnum.SI,
    //   "agenteRetencion": SiNoEnum.SI,
    //   "tipoProveedor": TipoProveedorEnum.Natural,
    //   "idUsuario": {
    //     id: 1,
    //     "nombres": "nombres",
    //     "apellidos": "apellidos",
    //     "fechaNacimiento": "",
    //     "correo": "test@mail.com",
    //     "username": "test.test",
    //     "password": "Rootctm.1",
    //     "tipoMedioContacto1": "Telefono",
    //     "medioContacto1": "medio contacto",
    //     "tipoDocumentoIdentidad": "Cedula",
    //     "documentoIdentidad": "1717171717",
    //     "pais": "Ecuador",
    //     "provincia": "Bolivar",
    //     "ciudad": "Cuenca"
    //   }
    // };
    this.tipoProveedorSeleccionado = registro.tipoProveedor;
    this.crearDatosUsuarioOEmpresa = true;
    let formFields = this.setearFormulario(registro.tipoProveedor as TipoProveedorEnum, true);
    if (registro.tipoProveedor === TipoProveedorEnum.Natural || registro.tipoProveedor === TipoProveedorEnum.Pasaporte) {
      // llenar datos del proveedor para natural y pasaporte
      // eliminar campos que no se pueden editar
      formFields = [...this.eliminarCampoDeFormulario(formFields as FormField[], FormUsuarioEnum.correo)];
      formFields = [...this.eliminarCampoDeFormulario(formFields, FormUsuarioEnum.documentoIdentidad)];
      // armar los objetos para autocompletes
      let objAutocompletesProveedor = {
        tipoCuentaContable: {
          nombre: registro.tipoCuentaContable
        },
        claseContribuyente: {
          nombre: registro.claseContribuyente
        }
      };


      // llenar datos del usuario para natural y pasaporte
      const datosUsuario = registro.idUsuario;
      // armar los objetos para autocompletes
      let objAutocompletesUsuario = {
        tipoMedioContacto1: {
          nombre: datosUsuario.tipoMedioContacto1
        },
        tipoDocumentoIdentidad: {
          nombre: datosUsuario.tipoDocumentoIdentidad
        },
        pais: {
          nombre: datosUsuario.pais
        },
        provincia: {
          nombre: datosUsuario.provincia
        },
        ciudad: {
          nombre: datosUsuario.ciudad
        }
      };

      this.fillForm({...registro, ...datosUsuario, ...objAutocompletesUsuario, ...objAutocompletesProveedor}, formFields);
      console.log(formFields);
    } else if (registro.tipoProveedor === TipoProveedorEnum.Empresa) {
      // llenar datos del proveedor para empresa

      // eliminar campos que no se pueden editar
      formFields = [...this.eliminarCampoDeFormulario(formFields as FormField[], FormEmpresaEnum.rucEmpresa)];

      let objAutocompletesProveedor = {
        tipoCuentaContable: {
          nombre: registro.tipoCuentaContable
        }
      };


      // llenar datos de empresa
      const datosEmpresa = registro.idEmpresa;
      // armar los objetos para autocompletes

      let objAutocompletesEmpresa = {
        tipoEmpresa: {
          nombre: datosEmpresa.tipoEmpresa
        },
        claseContribuyente: {
          nombre: datosEmpresa.claseContribuyente
        }
      };
      this.fillForm({...registro, ...datosEmpresa, ...objAutocompletesProveedor, ...objAutocompletesEmpresa}, formFields as FormField[]);
    }

    this.createEditFormArray = [...formFields];
    this.abrirModalCrearEditarProveedor({
      formFields: this.createEditFormArray,
      registro: registro
    });

  }

  eliminarCampoDeFormulario(formArray: FormField[], formcontrolName: string) {
    const foundFieldIndex = formArray.findIndex((field) => {
      return field.formControlName === formcontrolName;
    })
    if (foundFieldIndex >= 0) {
      formArray.splice(foundFieldIndex, 1);
    }
    return formArray;
  }
}
