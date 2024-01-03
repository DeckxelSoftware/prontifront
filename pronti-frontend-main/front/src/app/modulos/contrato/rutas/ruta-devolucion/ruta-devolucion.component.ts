import {Component, OnInit} from '@angular/core';
import {PlanResponseDto} from '../../../plan/servicios/dto/plan.response-dto';
import {ContratoResponseDto} from '../../servicios/dto/contrato.response-dto';
import {PrecioSeleccionadoInterface} from '../../interfaces/precio-seleccionado.interface';
import {FormGroup} from '@angular/forms';
import {ClienteResponseDto} from '../../../cliente/servicios/dto/cliente.response-dto';
import * as dayjs from 'dayjs';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {MenuItem} from 'primeng/api';
import {FORM_ITEM_ACCORDION_CONTRATO} from '../../form/form-item-accordion-contrato';
import {HttpClienteService} from '../../../cliente/servicios/http-cliente-service';
import {HttpVendedorService} from '../../../vendedor/servicios/http-vendedor-service';
import {EstadoContratoService} from '../../../../servicios/estado-contrato/estado-contrato.service';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpContratoService} from '../../servicios/http-contrato-service';
import {MatDialog} from '@angular/material/dialog';
import {HttpConfiguracionGeneralService} from '../../../configuracion-general/servicios/http-configuracion-general-service';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {actualizacionContrato, tipoCambioContrato} from '../ruta-editar-contrato/ruta-editar-contrato.component';
import {FormField, SearchAutoCompleteInterface} from '../../../../componentes/forms/interfaces/form-field';
import {VendedorResponseDto} from '../../../vendedor/servicios/dto/vendedor.response-dto';
import {ToasterTipo} from '../../../../servicios/logs-mensajes/enums/toaster-tipo';
import {ModalSeleccionarCuotasComponent} from '../../../../shared/modal-seleccionar-cuotas/modal-seleccionar-cuotas.component';
import {CuotaResponseDto} from '../../../cuota/servicios/dto/cuota.response-dto';

@Component({
  selector: 'app-ruta-devolucion',
  templateUrl: './ruta-devolucion.component.html',
  styleUrls: ['./ruta-devolucion.component.scss']
})
export class RutaDevolucionComponent implements OnInit {

  contrato: ContratoResponseDto = {};
  idContrato!: number;
  cuotas!: CuotaResponseDto[];

  valorDevolver!: number;
  valorInscripcionDevolver!: number;
  valorPrimerCapitalDevolver!: number;
  valorTasaAdmDevolver!: number;

  formDevolucion = new FormGroup({});


  modelCliente: any = {
    tipoCliente: '',
    apellidos: '',
    nombres: '',
    ciudad: '',
    correo: '',
    documentoIdentidad: '',
    fechaNacimiento: '',
    medioContacto1: '',
    pais: '',
    provincia: '',
    tipoDocumentoIdentidad: '',
    tipoMedioContacto1: '',
    username: ''

  };


  modelVendedor: any = {
    nombres: '',
    apellidos: '',
    agencia: '',
    supervisor: '',
  }

  modelDevolucion: any = {
    valorDevolver: 0,
    valorInscripcionDevolver: 0,
    valorPrimerCapitalDevolver: 0,
    valorTasaAdmDevolver: 0
  }

  items: MenuItem[] = [];
  home!: MenuItem;
  planContrato!: PlanResponseDto;

  fieldsDevolucion: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'valorDevolver',
          type: 'input',
          templateOptions: {
            type: 'number',
            required: true,
            label: 'Valor',
          }
        },
        {
          className: 'col-6',
          key: 'valorInscripcionDevolver',
          type: 'input',
          templateOptions: {
            type: 'number',
            required: true,
            label: 'Valor inscripción ',
          }
        },
        {
          className: 'col-6',
          key: 'valorPrimerCapitalDevolver',
          type: 'input',
          templateOptions: {
            type: 'number',
            required: true,
            label: 'Valor primer capital',
          }
        },
        {
          className: 'col-6',
          key: 'valorTasaAdmDevolver',
          type: 'input',
          templateOptions: {
            type: 'number',
            required: true,
            label: 'Valor tasa administrativa',
          }
        },

      ]
    }
  ]

  constructor(private _httpClienteService: HttpClienteService,
              private _httpVendedorService: HttpVendedorService,
              public estadoContratoService: EstadoContratoService,
              public blockuiService: BlockuiService,
              public route: ActivatedRoute,
              public router: Router,
              public _httpContratoService: HttpContratoService,
              public matDialog: MatDialog,
              private _httpConfiguracionGeneralService: HttpConfiguracionGeneralService,
              public logsMlabsService: LogsMlabsService,
  ) {
  }

  onSubmit(model: any) {
    console.log(model);
  }

  async ngOnInit() {

    const {idContrato} = this.route.snapshot.params;
    this.idContrato = idContrato;
    if (this.idContrato) {
      try {
        const resultadoBusqueda = await this.obtenerDatosContrato();
        if (resultadoBusqueda) {

          this.setearValores();
          this.setearValoresDevolver();
        }

      } catch (e) {
        console.error('Error obteniendo contrato');
      }

    }
    this.items = [
      {label: 'Contratos', routerLink: '/contratos'},
      {label: 'Gestión contratos', routerLink: '/contratos/contrato-modulo'},
      {label: 'Devolución Contrato'},


    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};


  }

  searchFieldChanged(event: FormField) {
    console.info({event});

  }

  searchAutoComplete(event: SearchAutoCompleteInterface): void {
    console.info({event});
    switch (event.field.formControlName) {
      case 'autocomplete':
      // this.buscarSucursal(event);
    }
  }


  cancelarDevolucion() {
    this.router.navigate(['contratos', 'contrato-modulo'])
  }


  deshabilitarSubmit() {


    return !(this.formDevolucion.valid)


  }

  submitForm() {
    const objetoActualizar = this.armarJsonParaEnvío();
    this.enviarDatos(objetoActualizar);
  }

  enviarDatos(objetoActualizar: any) {
    // this.blockuiService.habilitarBlockUI();


  }


  async obtenerDatosContrato() {
    this.blockuiService.habilitarBlockUI();
    return new Promise((resolve, reject) => {
      this._httpContratoService.find({id: this.idContrato})
        .subscribe(
          {
            next: res => {
              if (res[1] > 0) {
                this.contrato = res[0][0];
                this.blockuiService.deshabilitarBlockUI();
                resolve(this.contrato);
              } else {
                this.blockuiService.deshabilitarBlockUI();
                reject();
              }

            },
            error: err => {
              console.error('error: ', err)
              this.blockuiService.deshabilitarBlockUI();
              reject();

            }
          }
        )
    })

  }

  setearValores() {
    this.setearValoresPlan();
    this.setearValoresCliente();
    // this.setearValoresEnFormVendedor() Descomentar cuando el back envíe los datos del vendedor
  }

  setearValoresPlan() {
    // @ts-ignore
    this.planContrato = this.contrato.historicoPlanContratoCollection.at(-1).idPlan;
  }

  setearValoresCliente() {
    this.modelCliente = {...this.contrato.idClienteEnGrupo.idCliente, ...this.contrato.idClienteEnGrupo.idCliente.idUsuario}
  }

  setearValoresEnFormVendedor() {
    // this.modelVendedor = {...evento, ...evento?.idTrabajador?.idUsuario, ...objetoAgenciaSupervisor};
  }

  armarJsonParaEnvío() {
    const objetoEnviar: actualizacionContrato = {
      idContrato: +this.idContrato,
      // @ts-ignore
      idHistoricoPlanContrato: this.contrato.historicoPlanContratoCollection.at(-1).id,
    }

  }

  setearValoresDevolver() {
    this.blockuiService.habilitarBlockUI()
    // @ts-ignore
    const historico = this.contrato.historicoPlanContratoCollection.at(-1);
    console.log(historico.cuotaCollection);
    this.cuotas = historico.cuotaCollection;
    this.modelDevolucion.valorDevolver = +(historico.abonosCapitalActual - historico.cuotaCollection[0].abonoCapital).toFixed(2);
    this.modelDevolucion.valorInscripcionDevolver = +historico.totalCobroInscripcion.toFixed(2);
    this.modelDevolucion.valorPrimerCapitalDevolver = +(historico.totalCobroPrimeraCuota - historico.cuotaCollection[0].valorImpuesto - historico.cuotaCollection[0].valorTasaAdministrativa).toFixed(2);
    this.modelDevolucion.valorTasaAdmDevolver = +historico.totalTasaAdministrativaCobrada.toFixed(2);
    this.formDevolucion.get('valorDevolver')?.setValue(this.modelDevolucion.valorDevolver);
    this.formDevolucion.get('valorInscripcionDevolver')?.setValue(this.modelDevolucion.valorInscripcionDevolver);
    this.formDevolucion.get('valorPrimerCapitalDevolver')?.setValue(this.modelDevolucion.valorPrimerCapitalDevolver);
    this.formDevolucion.get('valorTasaAdmDevolver')?.setValue(this.modelDevolucion.valorTasaAdmDevolver);
    console.log(this.modelDevolucion);
    this.blockuiService.deshabilitarBlockUI()
  }
}
