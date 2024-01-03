import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClienteService} from '../../../cliente/servicios/http-cliente-service';
import {HttpListaValoresDetalleService} from '../../../lista-valores-detalle/servicios/http-lista-valores-detalle-service';
import {MessageService} from 'primeng/api';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ListaValoresDetalleFindDto} from '../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.find-dto';
import {ListaValoresDetalleResponseDto} from '../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.response-dto';
import {ListaValoresEnum} from '../../../../constantes/lista-valores/lista-valores.enum';
import {TipoClienteEnum} from '../../../../enums/tipo-cliente.enum';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import * as dayjs from 'dayjs';
import {SiNoEnum} from '../../../../enums/si-no.enum';
import {HttpProveedorService} from '../../servicios/http-proveedor-service';
import {TipoProveedorEnum} from '../../../../enums/tipo-proveedor.enum';
import {REGEX_NUMEROS} from '../../../../constantes/form/regex/numeros';
import {REGEX_LETRAS_ESPACIOS} from '../../../../constantes/form/regex/letras-espacios';
import {FormField, SearchAutoCompleteInterface} from '../../../../componentes/forms/interfaces/form-field';
import {UsuarioFindDto} from '../../../usuario/servicios/dto/usuario.find-dto';
import {UsuarioResponseDto} from '../../../usuario/servicios/dto/usuario.response-dto';
import {HttpUsuarioService} from '../../../usuario/servicios/http-usuario-service';
import {HttpEmpresaService} from '../../../empresa/servicios/http-empresa-service';
import {EmpresaResponseDto} from '../../../empresa/servicios/dto/empresa.response-dto';
import {MatStepperConfig} from '../../../../componentes/forms/form-container/interfaces/mat-stepper-config';
import {MatStepperArray} from '../../../../componentes/forms/form-container/interfaces/mat-stepper-array';
import {FormContainerComponent} from '../../../../componentes/forms/form-container/form-container.component';
import {FormProveedorEnum} from '../../form/form-proveedor.enum';
import {FormEmpresaEnum} from '../../../empresa/form/form-empresa.enum';
import {FormUsuarioEnum} from '../../../usuario/form/form-usuario.enum';
import {RutaProveedorComponent} from '../../rutas/ruta-proveedor/ruta-proveedor.component';
import {ProveedorTablaComponent} from '../proveedor-tabla/proveedor-tabla.component';
import {ProveedorResponseDto} from '../../servicios/dto/proveedor.response-dto';

@Component({
  selector: 'app-modal-crear-proveedor',
  templateUrl: './modal-crear-proveedor.component.html',
  styleUrls: ['./modal-crear-proveedor.component.scss']
})
export class ModalCrearProveedorComponent implements OnInit {

  checkCrearUsuario = false;
  checkCrearEmpresa = false;
  formularioDatosUsuario!: FormGroup;
  formularioDatosProveedor!: FormGroup;
  formularioEmpresa!: FormGroup;
  estaEditando = false;
  results: any[] = [];
  mostrarFormularioEmpresa = false;

  tiposProveedor: any = [];
  tipoProveedorSeleccionado: string = 'N';
  opcionesSINO: any[] = [];

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private httpProveedorService: HttpProveedorService,
    public httpListavaloresDetalle: HttpListaValoresDetalleService,
    private messageService: MessageService,
    private blockuiService: BlockuiService,
    private httpUsuarioService: HttpUsuarioService,
    private httpEmpresaService: HttpEmpresaService,
    public dialogRef: MatDialogRef<ModalCrearProveedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      estaEditando: boolean,
      registro: ProveedorResponseDto;
      matStepperConfig: MatStepperConfig,
      arregloFormulario: MatStepperArray[],
      componente: ProveedorTablaComponent,

    }) {

    this.tiposProveedor = [
      {name: 'Seleccione una opción'},
      {name: 'Natural', code: 'N'},
      {name: 'Pasaporte', code: 'P'},
      {name: 'Empresa', code: 'E'}
    ];
    this.opcionesSINO = [

      {name: 'Seleccione una opción'},
      {name: 'SI', code: 'S'},
      {name: 'NO', code: 'N'},
    ];
  }


  mostrarErrorRequiredTouchedUsuario(fieldName: string): boolean {
    const errorRequired = this.formularioDatosUsuario.get(fieldName)?.errors?.['required'];
    const errorTouched = this.formularioDatosUsuario.get(fieldName)?.touched;
    return errorRequired && errorTouched;
  }

  mostrarErrorRequiredTouchedProveedor(fieldName: string): boolean {
    const errorRequired = this.formularioDatosProveedor.get(fieldName)?.errors?.['required'];
    const errorTouched = this.formularioDatosProveedor.get(fieldName)?.touched;
    return errorRequired && errorTouched;
  }

  mostrarErrorRequiredTouchedEmpresa(fieldName: string): boolean {
    const errorRequired = this.formularioEmpresa.get(fieldName)?.errors?.['required'];
    const errorTouched = this.formularioEmpresa.get(fieldName)?.touched;
    return errorRequired && errorTouched;
  }


  ngOnInit(): void {


    this.estaEditando = this.data.estaEditando;
    this.formularioDatosProveedor = this.initFormularioProveedor();
    this.formularioDatosUsuario = this.initFormularioAutcompleteUsuario();
    this.formularioEmpresa = this.initFormularioAutcompleteEmpresa();

    if (this.estaEditando) {
      this.setearCamposEditar(this.data.registro);

      // setTimeout(() => {
      //   this.setearCamposEditar(this.data.registro);
      //   // this.formularioCrearCliente.get('nombres')?.setValue('anderon fabian')
      // },500 )
    }
  }

  buscarPorAutocomplete(evento: any, tipo: string) {
    let codigoListaValorTipo = this.findCodListaValorTipo(tipo);
    this.searchListaValorDetalle(evento, codigoListaValorTipo);
  }

  initFormularioProveedor() {
    return this.formBuilder.group(
      {
        tipoProveedor: ['', [Validators.required]],
        nombrePersonaReferencia: ['', [Validators.pattern(REGEX_LETRAS_ESPACIOS.regex), Validators.required]],
        contactoReferencia: ['', [Validators.pattern(REGEX_LETRAS_ESPACIOS.regex), Validators.required]],
        tipoCuentaContable: ['', [Validators.required]],
        claseContribuyente: ['', [Validators.required]],
        obligadoLlevarContabilidad: ['', [Validators.required]],
        agenteRetencion: ['', [Validators.required]],
      }
    );
  }

  initFormularioEmpresa() {

    return this.formBuilder.group(
      {
        nombreComercial: ['', [Validators.required, Validators.maxLength(255)]],
        razonSocial: ['', [Validators.required, Validators.maxLength(255)]],
        rucEmpresa: ['', [Validators.required, Validators.pattern(REGEX_NUMEROS.regex), Validators.maxLength(255)]],
        direccionEmpresa: ['', [Validators.required, Validators.maxLength(255)]],
        telefonoEmpresa: ['', [Validators.required, Validators.pattern(REGEX_NUMEROS.regex), Validators.maxLength(10)]],
        documentoRepresentanteLegal: ['', [Validators.required, Validators.pattern(REGEX_NUMEROS.regex), Validators.maxLength(10)]],
        nombreRepresentanteLegal: ['', [Validators.required, Validators.pattern(REGEX_LETRAS_ESPACIOS.regex), Validators.maxLength(255)]],
        nombreContador: ['', [Validators.required, Validators.pattern(REGEX_LETRAS_ESPACIOS.regex), Validators.maxLength(255)]],
        rucContador: ['', [Validators.required, Validators.pattern(REGEX_NUMEROS.regex), Validators.maxLength(255)]],
        telefonoContador: ['', [Validators.required, Validators.pattern(REGEX_NUMEROS.regex), Validators.maxLength(10)]],
        correoEmpresa: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
        correoContador: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
        correoRepresentanteLegal: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
        tipoEmpresa: ['', [Validators.required, Validators.maxLength(255)]],
        claseContribuyente: ['', [Validators.required, Validators.maxLength(255)]],
        obligadoLlevarContabilidad: ['', [Validators.required]],
        agenteRetencion: ['', [Validators.required]],
      }
    );
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
        console.log(arregloDatos);

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

  initFormularioAutcompleteUsuario() {
    return this.formBuilder.group(
      {
        idUsuario: ['', [Validators.required]]
      }
    );
  }

  initFormularioAutcompleteEmpresa() {
    return this.formBuilder.group(
      {
        idEmpresa: ['', [Validators.required]]
      }
    );
  }

  initFormularioDatosUsuario() {
    return this.formBuilder.group(
      {
        // tipoCliente: ['', [Validators.required]],
        username: ['', [Validators.required, Validators.maxLength(255)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
        nombres: ['', [Validators.required, Validators.pattern(REGEX_LETRAS_ESPACIOS.regex), Validators.maxLength(255)]],
        apellidos: ['', [Validators.required, Validators.pattern(REGEX_LETRAS_ESPACIOS.regex), Validators.maxLength(255)]],
        fechaNacimiento: ['',],
        correo: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
        tipoMedioContacto1: ['', [Validators.required, Validators.maxLength(255)]],
        medioContacto1: ['', [Validators.required, Validators.maxLength(255)]],
        tipoDocumentoIdentidad: ['', [Validators.required, Validators.maxLength(255)]],
        documentoIdentidad: ['', [Validators.required, Validators.maxLength(255)]],
        pais: ['', [Validators.required, Validators.maxLength(255)]],
        provincia: ['', [Validators.required, Validators.maxLength(255)]],
        ciudad: ['', [Validators.required, Validators.maxLength(255)]],

      }
    );
  }


  editarCrear() {
    console.log(this.formularioDatosUsuario.value);
    console.log('tipoCLiente', this.tipoProveedorSeleccionado);


    let clienteEditarCrear: any = {
      tipoProveedor: this.formularioDatosProveedor.value.tipoProveedor,
      nombrePersonaReferencia: this.formularioDatosProveedor.value.nombrePersonaReferencia,
      contactoReferencia: this.formularioDatosProveedor.value.contactoReferencia,
      tipoCuentaContable: this.formularioDatosProveedor.value.tipoCuentaContable.nombre,

      idEmpresa: null,
      // idUsuario: {
      //   ...this.formularioDatosUsuario.value,
      //   tipoDocumentoIdentidad: this.formularioDatosUsuario?.value?.tipoDocumentoIdentidad?.nombre,
      //   tipoMedioContacto1: this.formularioDatosUsuario?.value?.tipoMedioContacto1?.nombre,
      //   ciudad: this.formularioDatosUsuario?.value?.ciudad?.nombre,
      //   pais: this.formularioDatosUsuario?.value?.pais?.nombre,
      //   provincia: this.formularioDatosUsuario?.value?.provincia?.nombre,
      // }
    };
    if (this.tipoProveedorSeleccionado != TipoProveedorEnum.Empresa) {
      clienteEditarCrear.claseContribuyente = this.formularioDatosProveedor.value.claseContribuyente.nombre || null;
      clienteEditarCrear.obligadoLlevarContabilidad = this.formularioDatosProveedor.value.obligadoLlevarContabilidad || null;
      clienteEditarCrear.agenteRetencion = this.formularioDatosProveedor.value.agenteRetencion || null;
    }
    if (this.checkCrearUsuario) {
      clienteEditarCrear.idUsuario = {
        ...this.formularioDatosUsuario.value,
        tipoDocumentoIdentidad: this.formularioDatosUsuario?.value?.tipoDocumentoIdentidad?.nombre,
        tipoMedioContacto1: this.formularioDatosUsuario?.value?.tipoMedioContacto1?.nombre,
        ciudad: this.formularioDatosUsuario?.value?.ciudad?.nombre,
        pais: this.formularioDatosUsuario?.value?.pais?.nombre,
        provincia: this.formularioDatosUsuario?.value?.provincia?.nombre,
      }
    } else {
      clienteEditarCrear.idUsuario = this.formularioDatosUsuario?.value?.idUsuario.id;
    }

    if (this.tipoProveedorSeleccionado === TipoProveedorEnum.Empresa) {
      if (this.checkCrearEmpresa) {
        clienteEditarCrear.idEmpresa = {
          ...this.formularioEmpresa.value,
          tipoEmpresa: this.formularioEmpresa.value.tipoEmpresa.nombre,
          claseContribuyente: this.formularioEmpresa.value.claseContribuyente.nombre,
          obligadoLlevarContabilidad: this.formularioEmpresa.value.obligadoLlevarContabilidad,
          agenteRetencion: this.formularioEmpresa.value.agenteRetencion
        }
      } else {
        clienteEditarCrear.idEmpresa = this.formularioEmpresa?.value?.idEmpresa.id;
      }

    }
    //
    // if (!this.estaEditando) {
    //   clienteEditarCrear.sisHabilitado = ActivoInactivo.Activo;
    //   clienteEditarCrear.idUsuario.sisHabilitado = ActivoInactivo.Activo;
    //   if (this.tipoProveedorSeleccionado === TipoClienteEnum.Empresa) {
    //     clienteEditarCrear.idEmpresa.sisHabilitado = ActivoInactivo.Activo;
    //   }
    //
    //   this.blockuiService.habilitarBlockUI();
    //   this.httpProveedorService.createOne(clienteEditarCrear).subscribe({
    //       next: (resp) => {
    //         console.log('crear', resp);
    //         this.messageService.add(
    //           {
    //             severity: 'success',
    //             summary: 'Cliente creado'
    //           }
    //         );
    //         this.blockuiService.deshabilitarBlockUI();
    //         this.dialogRef.close();
    //       },
    //       error: (err) => {
    //         console.error('No se pudo crear el cliente', err);
    //         this.blockuiService.deshabilitarBlockUI();
    //
    //         this.messageService.add(
    //           {
    //             severity: 'error',
    //             summary: 'Intentelo más tarde.'
    //           }
    //         );
    //       }
    //     }
    //   );
    //
    //
    // } else {
    //   this.blockuiService.habilitarBlockUI();
    //   this.httpProveedorService.updateById(clienteEditarCrear, this.data.registro.id).subscribe({
    //     next: (resp) => {
    //       console.log('editar', resp);
    //       this.messageService.add(
    //         {
    //           severity: 'success',
    //           summary: 'Cliente editado'
    //         }
    //       );
    //       this.blockuiService.deshabilitarBlockUI();
    //       this.dialogRef.close();
    //     },
    //     error: (err) => {
    //       console.error('No se pudo crear el cliente', err);
    //       this.blockuiService.deshabilitarBlockUI();
    //
    //       this.messageService.add(
    //         {
    //           severity: 'error',
    //           summary: 'Intentelo más tarde.'
    //         }
    //       );
    //     }
    //   });
    //
    // }


    console.log(clienteEditarCrear);


  }

  get disabledButton() {
    if (this.tipoProveedorSeleccionado === TipoClienteEnum.Empresa) {
      return this.formularioDatosUsuario.valid && this.formularioEmpresa.valid;
    } else {
      return this.formularioDatosUsuario.valid;
    }
  }

  onReset() {
    // this.submitted = false;
    this.formularioDatosUsuario.reset();
  }

  setearCamposEditar(registroTabla: any) {


    console.log('registro', registroTabla);
    this.tipoProveedorSeleccionado = registroTabla.tipoProveedor;


    let proveedorRegistro: any = {};
    const proveedorFormKeysArray = Object.keys(this.formularioDatosProveedor.controls);
    proveedorFormKeysArray.forEach(llave => {
        if ((registroTabla).hasOwnProperty(llave)) {
          proveedorRegistro[llave] = registroTabla[llave];
          if (llave === 'tipoCuentaContable' || llave === 'claseContribuyente') {
            proveedorRegistro[llave] = {
              nombre: registroTabla[llave]
            };
          }
        }
      }
    );
    console.log(proveedorRegistro, this.formularioDatosProveedor)
    this.formularioDatosProveedor.patchValue(proveedorRegistro);

    let usuarioRegistro: any = {};
    this.checkCrearUsuario = true;
    this.formularioDatosUsuario = this.initFormularioDatosUsuario();
    const usuarioFormKeysArray = Object.keys(this.formularioDatosUsuario.controls);


    usuarioFormKeysArray.forEach(llave => {
        if ((registroTabla.idUsuario).hasOwnProperty(llave)) {
          usuarioRegistro[llave] = registroTabla.idUsuario[llave];

          if (llave === 'fechaNacimiento') {
            usuarioRegistro[llave] = dayjs(registroTabla.idUsuario[llave]).format('YYYY-MM-DD');
            // usuarioRegistro[llave] = new Date(registroTabla.idUsuario[llave]).toISOString().split('T')[0];
          }
          if (llave === 'ciudad' || llave === 'pais' || llave === 'provincia' || llave === 'tipoMedioContacto1' || llave === 'tipoDocumentoIdentidad') {
            usuarioRegistro[llave] = {
              nombre: registroTabla.idUsuario[llave]
            };
          }
        }
      }
    );

    if (this.data.registro.tipoProveedor === TipoProveedorEnum.Empresa) {
      this.checkCrearEmpresa = true;
      this.formularioEmpresa = this.initFormularioEmpresa();
      const empresaFormKeysArray = Object.keys(this.formularioEmpresa.controls);
      const empresaRegistro: any = {};

      empresaFormKeysArray.forEach(llave => {
          if ((registroTabla.idEmpresa).hasOwnProperty(llave)) {
            empresaRegistro[llave] = registroTabla.idEmpresa[llave];

            if (llave === 'claseContribuyente' || llave === 'tipoEmpresa') {
              empresaRegistro[llave] = {
                nombre: registroTabla.idEmpresa[llave]
              };
            }
          }
        }
      );

      // this.formularioEmpresa.removeControl('rucEmpresa');
      console.log('parch Empresa', empresaRegistro);
      this.formularioEmpresa.patchValue(empresaRegistro);
    }

    this.formularioDatosUsuario.removeControl('username');
    this.formularioDatosUsuario.removeControl('password');
    this.formularioDatosUsuario.removeControl('correo');
    this.formularioDatosUsuario.removeControl('documentoIdentidad');

    console.log('path usuario', usuarioRegistro);
    this.formularioDatosUsuario.patchValue(usuarioRegistro);

  }


  cambioSelectTipoProveedor(event: any) {
    console.log(event);
    this.tipoProveedorSeleccionado = event.value;
    if (event.value === TipoClienteEnum.Empresa) {
      this.mostrarFormularioEmpresa = true;
      console.log('inicializa', this.tipoProveedorSeleccionado)
      this.formularioDatosProveedor.get('claseContribuyente')?.setValidators([]);
      this.formularioDatosProveedor.get('obligadoLlevarContabilidad')?.setValidators([]);
      this.formularioDatosProveedor.get('agenteRetencion')?.setValidators([]);

      this.formularioDatosProveedor.get('claseContribuyente')?.reset();
      this.formularioDatosProveedor.get('obligadoLlevarContabilidad')?.reset();
      this.formularioDatosProveedor.get('agenteRetencion')?.reset();

      this.formularioEmpresa = this.initFormularioAutcompleteEmpresa();

    } else {
      this.formularioDatosProveedor.get('claseContribuyente')?.setValidators([Validators.required]);
      this.formularioDatosProveedor.get('obligadoLlevarContabilidad')?.setValidators([Validators.required]);
      this.formularioDatosProveedor.get('agenteRetencion')?.setValidators([Validators.required]);
      this.mostrarFormularioEmpresa = false;
    }
  }

  limpiarNullObjeto(objeto: any) {

  }

  // mostrarErrorMaxLenth(fieldName: string): boolean {
  //   // return this.formularioCrearCliente.get(fieldName)?.
  //   return !!this.formularioCrearCliente.get('fieldName')?.errors?.['minlength'];
  // }
  cambioCheckCrearUsuario(crearUsuario: boolean) {
    if (crearUsuario) {
      this.formularioDatosUsuario = this.initFormularioDatosUsuario();
    } else {
      this.formularioDatosUsuario = this.initFormularioAutcompleteUsuario();
    }
  }

  cambioCheckCrearEmpresa(crearEmpresa: boolean) {
    if (crearEmpresa) {
      this.formularioEmpresa = this.initFormularioEmpresa();
    } else {
      this.formularioEmpresa = this.initFormularioAutcompleteEmpresa();
    }
  }

  buscarAutocompleteUsuario(evento: SearchAutoCompleteInterface) {
    const busqueda: UsuarioFindDto = {
      busqueda: evento.query,
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

  log(event: any, form: any) {
    console.log(event, form);
  }

  searchFieldChanged(event: FormField) {
    console.info({event});

  }

  searchAutoComplete(event: SearchAutoCompleteInterface): void {
    let codigoListaValorTipo = '';
    console.log(event.field.formControlName)
    switch (event.field.formControlName) {
      case FormProveedorEnum.claseContribuyente:
        codigoListaValorTipo = this.findCodListaValorTipo(FormProveedorEnum.claseContribuyente);
        this.searchListaValorDetalle(event, codigoListaValorTipo);
        break;
      case FormProveedorEnum.tipoCuentaContable:
        codigoListaValorTipo = this.findCodListaValorTipo(FormProveedorEnum.tipoCuentaContable);
        this.searchListaValorDetalle(event, codigoListaValorTipo);
        break;
      case FormUsuarioEnum.pais:
        codigoListaValorTipo = this.findCodListaValorTipo(FormUsuarioEnum.pais);
        this.searchListaValorDetalle(event, codigoListaValorTipo);
        break;
      case FormUsuarioEnum.provincia:
        codigoListaValorTipo = this.findCodListaValorTipo(FormUsuarioEnum.provincia);
        this.searchListaValorDetalle(event, codigoListaValorTipo);
        break;
      case FormUsuarioEnum.ciudad:
        codigoListaValorTipo = this.findCodListaValorTipo(FormUsuarioEnum.ciudad);
        this.searchListaValorDetalle(event, codigoListaValorTipo);
        break;
      case FormUsuarioEnum.tipoDocumentoIdentidad:
        codigoListaValorTipo = this.findCodListaValorTipo(FormUsuarioEnum.tipoDocumentoIdentidad);
        this.searchListaValorDetalle(event, codigoListaValorTipo);
        break;
      case FormUsuarioEnum.tipoMedioContacto:
        codigoListaValorTipo = this.findCodListaValorTipo(FormUsuarioEnum.tipoMedioContacto);
        this.searchListaValorDetalle(event, codigoListaValorTipo);
        break;
      case FormProveedorEnum.idUsuario:
        this.buscarAutocompleteUsuario(event);
        break;
      case FormProveedorEnum.idEmpresa:
        this.buscarAutocompleteEmpresa(event);
        break;
      case FormEmpresaEnum.tipoEmpresa:
        codigoListaValorTipo = this.findCodListaValorTipo(FormEmpresaEnum.tipoEmpresa);
        this.searchListaValorDetalle(event, codigoListaValorTipo);
        break;

    }
  }

  async confirmFormEmitter(evento: FormContainerComponent) {
   // await this.data.componente.crearOEditarModal(this)
  }

}
