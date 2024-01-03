import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import * as dayjs from 'dayjs'
import {ListaValoresDetalleFindDto} from '../../modulos/lista-valores-detalle/servicios/dto/lista-valores-detalle.find-dto';
import {HttpListaValoresDetalleService} from '../../modulos/lista-valores-detalle/servicios/http-lista-valores-detalle-service';
import {ListaValoresDetalleResponseDto} from '../../modulos/lista-valores-detalle/servicios/dto/lista-valores-detalle.response-dto';
import {TipoClienteEnum} from '../../enums/tipo-cliente.enum';
import {ListaValoresEnum} from '../../constantes/lista-valores/lista-valores.enum';
import {HttpClienteService} from '../../modulos/cliente/servicios/http-cliente-service';
import {ActivoInactivo} from '../../enums/activo-inactivo';
import {SiNoEnum} from '../../enums/si-no.enum';
import {MessageService} from 'primeng/api';
import {BlockuiService} from '../../servicios/block-ui/blockui.service';
import {ClienteTablaComponent} from '../../modulos/cliente/componentes/cliente-tabla/cliente-tabla.component';

@Component({
  selector: 'app-crear-cliente-modal',
  templateUrl: './crear-cliente-modal.component.html',
  styleUrls: ['./crear-cliente-modal.component.scss']
})
export class CrearClienteModalComponent implements OnInit {

  // formularioCrearCliente: FormGroup = new FormGroup({});

  formularioCrearCliente!: FormGroup;
  formularioEmpresa!: FormGroup;
  estaEditando = false;
  results: any[] = [];
  mostrarFormularioEmpresa = false;

  tiposCliente: any = [];
  tipoClienteSeleccionado: string = 'N';
  opcionesSINO: any[] = [];

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private httpClienteService: HttpClienteService,
    public httpListavaloresDetalle: HttpListaValoresDetalleService,
    private messageService: MessageService,
    private blockuiService: BlockuiService,
    public dialogRef: MatDialogRef<CrearClienteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      estaEditando: boolean,
      registro: any;
      componente: ClienteTablaComponent
    }) {

    this.tiposCliente = [
      {name: 'Natural', code: 'N'},
      {name: 'Pasaporte', code: 'P'},
      {name: 'Empresa', code: 'E'}
    ];
    this.opcionesSINO = [
      {name: 'Seleccione Si o No'},
      {name: 'SI', code: 'S'},
      {name: 'NO', code: 'N'},
    ];
  }


  mostrarErrorRequiredTouchedUsuario(fieldName: string): boolean {
    const errorRequired = this.formularioCrearCliente.get(fieldName)?.errors?.['required'];
    const errorTouched = this.formularioCrearCliente.get(fieldName)?.touched;
    return errorRequired && errorTouched;
  }

  mostrarErrorRequiredTouchedEmpresa(fieldName: string): boolean {
    const errorRequired = this.formularioEmpresa.get(fieldName)?.errors?.['required'];
    const errorTouched = this.formularioEmpresa.get(fieldName)?.touched;
    return errorRequired && errorTouched;
  }


  ngOnInit(): void {


    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

    this.estaEditando = this.data.estaEditando;

    this.formularioCrearCliente = this.initFormularioUsuario();

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

  initFormularioEmpresa() {

    return this.formBuilder.group(
      {
        nombreComercial: ['', [Validators.required, Validators.maxLength(255)]],
        razonSocial: ['', [Validators.required, Validators.maxLength(255)]],
        rucEmpresa: ['', [Validators.required, Validators.maxLength(255)]],
        direccionEmpresa: ['', [Validators.required, Validators.maxLength(255)]],
        telefonoEmpresa: ['', [Validators.required, Validators.maxLength(10)]],
        documentoRepresentanteLegal: ['', [Validators.required, Validators.maxLength(10)]],
        nombreRepresentanteLegal: ['', [Validators.required, Validators.maxLength(255)]],
        nombreContador: ['', [Validators.required, Validators.maxLength(255)]],
        rucContador: ['', [Validators.required, Validators.maxLength(255)]],
        telefonoContador: ['', [Validators.required, Validators.maxLength(10)]],
        correoEmpresa: ['', [Validators.required, Validators.maxLength(255)]],
        correoContador: ['', [Validators.required, Validators.maxLength(255)]],
        correoRepresentanteLegal: ['', [Validators.required, Validators.maxLength(255)]],
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

        this.results = arregloDatos;
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        // const arregloDatos = data[0].map((a: any) => {
        //   a.nombreCompeto = a.nombre + ' ' + a.apellido;
        //   return a;
        // });
        /*if (evento.field.autoComplete) {
          if (Array.isArray(arregloDatos)) {
            evento.field.autoComplete.suggestions = [...arregloDatos];
          } else {
            evento.field.autoComplete.suggestions = [arregloDatos];
          }
        }*/
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
      default: ''
    }
    // @ts-ignore
    return (codListaValorTipo[field] || codListaValorTipo.default)
  }


  initFormularioUsuario() {
    return this.formBuilder.group(
      {
        // tipoCliente: ['', [Validators.required]],
        // username: ['', [Validators.required, Validators.maxLength(255)]],
        // password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
        nombres: ['', [Validators.required, Validators.maxLength(255)]],
        apellidos: ['', [Validators.required, Validators.maxLength(255)]],
        fechaNacimiento: ['',],
        correo: ['', [Validators.required, Validators.maxLength(255)]],
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
    console.log(this.formularioCrearCliente.value);
    console.log('tipoCLiente', this.tipoClienteSeleccionado);


    let clienteEditarCrear: any = {
      tipoCliente: this.tipoClienteSeleccionado,
      idEmpresa: null,
      idUsuario: {
        ...this.formularioCrearCliente.value,
        ciudad: this.formularioCrearCliente?.value?.ciudad?.nombre,
        pais: this.formularioCrearCliente?.value?.pais?.nombre,
        provincia: this.formularioCrearCliente?.value?.provincia?.nombre,
        tipoMedioContacto1: this.formularioCrearCliente?.value?.tipoMedioContacto1?.nombre,
        tipoDocumentoIdentidad: this.formularioCrearCliente?.value?.tipoDocumentoIdentidad?.nombre,
      }
    };
    delete clienteEditarCrear.idUsuario.tipoCliente;

    if (this.tipoClienteSeleccionado === TipoClienteEnum.Empresa) {
      clienteEditarCrear.idEmpresa = {
        ...this.formularioEmpresa.value,
        tipoEmpresa: this.formularioEmpresa.value.tipoEmpresa.nombre,
        claseContribuyente: this.formularioEmpresa.value.claseContribuyente.nombre,
        obligadoLlevarContabilidad: this.formularioEmpresa.value.obligadoLlevarContabilidad,
        agenteRetencion: this.formularioEmpresa.value.agenteRetencion
      }
    }

    if (!this.estaEditando) {
      clienteEditarCrear.sisHabilitado = ActivoInactivo.Activo;
      clienteEditarCrear.idUsuario.sisHabilitado = ActivoInactivo.Activo;
      if (this.tipoClienteSeleccionado === TipoClienteEnum.Empresa) {
        clienteEditarCrear.idEmpresa.sisHabilitado = ActivoInactivo.Activo;
      }

      this.blockuiService.habilitarBlockUI();
      this.httpClienteService.createOne(clienteEditarCrear).subscribe({
          next: (resp) => {
            console.log('crear', resp);
            this.messageService.add(
              {
                severity: 'success',
                summary: 'Cliente creado'
              }
            );
            this.blockuiService.deshabilitarBlockUI();
            this.dialogRef.close({...resp, ...clienteEditarCrear});
          },
          error: (err) => {
            console.error('No se pudo crear el cliente', err);
            this.blockuiService.deshabilitarBlockUI();

            this.messageService.add(
              {
                severity: 'error',
                summary: 'Intentelo más tarde.'
              }
            );
          }
        }
      );


    } else {
      this.blockuiService.habilitarBlockUI();

      this.httpClienteService.updateById(clienteEditarCrear, this.data.registro.id).subscribe({
        next: (resp) => {
          console.log('editar', resp);
          this.messageService.add(
            {
              severity: 'success',
              summary: 'Cliente editado'
            }
          );
          this.blockuiService.deshabilitarBlockUI();
          this.dialogRef.close();
        },
        error: (err) => {
          console.error('No se pudo crear el cliente', err);
          this.blockuiService.deshabilitarBlockUI();

          this.messageService.add(
            {
              severity: 'error',
              summary: 'Intentelo más tarde.'
            }
          );
        }
      });

    }


    console.log(clienteEditarCrear);


  }

  get disabledButton() {
    if (this.tipoClienteSeleccionado === TipoClienteEnum.Empresa) {
      return this.formularioCrearCliente.valid && this.formularioEmpresa.valid;
    } else {
      return this.formularioCrearCliente.valid;
    }
  }

  onReset() {
    // this.submitted = false;
    this.formularioCrearCliente.reset();
  }

  setearCamposEditar(registroTabla: any) {

    console.log('registro', registroTabla);
    this.tipoClienteSeleccionado = registroTabla.tipoCliente;


    let usuarioRegistro: any = {};
    const usuarioFormKeysArray = Object.keys(this.formularioCrearCliente.controls);

    usuarioFormKeysArray.forEach(llave => {
        if ((registroTabla.idUsuario).hasOwnProperty(llave)) {
          usuarioRegistro[llave] = registroTabla.idUsuario[llave];

          if (llave === 'fechaNacimiento') {
            usuarioRegistro[llave] = dayjs(registroTabla.idUsuario[llave]).format('YYYY-MM-DD');
            // usuarioRegistro[llave] = new Date(registroTabla.idUsuario[llave]).toISOString().split('T')[0];
          }
          if (llave === 'ciudad' || llave === 'pais' || llave === 'provincia') {
            usuarioRegistro[llave] = {
              nombre: registroTabla.idUsuario[llave]
            };
          }
        }
      }
    );

    if (this.data.registro.tipoCliente === TipoClienteEnum.Empresa) {

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

            if (llave === 'obligadoLlevarContabilidad' || llave === 'agenteRetencion') {
              if (empresaRegistro[llave]) {
                empresaRegistro[llave] = this.opcionesSINO.find((opcion: any) => opcion.code === registroTabla.idEmpresa[llave]);
              } else {
                empresaRegistro[llave] = this.opcionesSINO.find((opcion: any) => opcion.code === SiNoEnum.NO).code;
              }
            }

            // if (llave === 'agenteRetencion' || llave === 'obligadoLlevarContabilidad') {
            //   this.formularioEmpresa.get(llave)?.setValue(this.opcionesSINO.find((tipo: any) => tipo.code === registroTabla.idEmpresa[llave]));
            // }
          }
        }
      );

      // this.formularioEmpresa.removeControl('rucEmpresa');
      console.log('parch Empresa', empresaRegistro);
      this.formularioEmpresa.patchValue(empresaRegistro);
    }

    this.formularioCrearCliente.removeControl('username');
    this.formularioCrearCliente.removeControl('password');
    this.formularioCrearCliente.removeControl('correo');
    this.formularioCrearCliente.removeControl('documentoIdentidad');

    console.log('path usuario', usuarioRegistro);
    this.formularioCrearCliente.patchValue(usuarioRegistro);

  }


  cambioSelectTipoCliente(event: any) {
    console.log(event);
    this.tipoClienteSeleccionado = event.value;
    if (event.value === TipoClienteEnum.Empresa) {
      this.mostrarFormularioEmpresa = true;
      console.log('inicializa', this.tipoClienteSeleccionado)
      this.formularioEmpresa = this.initFormularioEmpresa();

    } else {
      this.mostrarFormularioEmpresa = false;
    }
  }

  limpiarNullObjeto(objeto: any) {

  }

  // mostrarErrorMaxLenth(fieldName: string): boolean {
  //   // return this.formularioCrearCliente.get(fieldName)?.
  //   return !!this.formularioCrearCliente.get('fieldName')?.errors?.['minlength'];
  // }

}
