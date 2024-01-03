import { Component, Input, OnInit } from '@angular/core';
import { RolPagoResponseDto } from '../../servicios/dto/rol-pago.response-dto';
import { RolPagoFindDto } from '../../servicios/dto/rol-pago.find-dto';
import { MatDialog } from '@angular/material/dialog';
import { HttpRolPagoService } from '../../servicios/http-rol-pago-service';
import { ConfirmationService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { RolPagoCreateDto } from '../../servicios/dto/rol-pago.create-dto';
import { RolPagoUpdateDto } from '../../servicios/dto/rol-pago.update-dto';
import { FormRolPagoEnum } from '../../form/form-rol-pago.enum';
import { FORM_ROL_PAGO } from '../../form/form-rol-pago';
import { TAKE } from "../../../../constantes/tabla/take";
import {
  CreateUpdateModalComponent
} from "../../../../componentes/dialog/create-update-modal/create-update-modal.component";
import { MENSAGE_TOAST } from "../../../../constantes/toaster/mensaje-toast";
import { BlockuiService } from "../../../../servicios/block-ui/blockui.service";
import { LogsMlabsService } from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import { AutocompleteFormInterface } from "../../../../abstract/table/interfaces/autocomplete-form.interface";
import {
  CreateUpdateModalParameters
} from "../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters";
import { AbstractTable } from "../../../../abstract/table/abstract-table";
import { fieldType, FormField, SearchAutoCompleteInterface } from "../../../../componentes/forms/interfaces/form-field";
import { TableAbstractClass } from "../../../../abstract/table/interfaces/table-abstract-class";
import { ModalComponent } from "../../../../componentes/dialog/create-update-modal/interfaces/modal-component";
import { MatStepperArray } from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";
import { PeriodoLaboralFindDto } from "../../../periodo-laboral/servicios/dto/periodo-laboral.find-dto";
import { HttpPeriodoLaboralService } from "../../../periodo-laboral/servicios/http-periodo-laboral-service";
import { HttpHistorialLaboralService } from "../../../historial-laboral/servicios/http-historial-laboral-service";
import { PeriodoLaboralResponseDto } from "../../../periodo-laboral/servicios/dto/periodo-laboral.response-dto";
import { ActivoInactivo } from "../../../../enums/activo-inactivo";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { UsuarioResponseDto } from '../../../usuario/servicios/dto/usuario.response-dto';
import { TrabajadorResponseDto } from '../../../trabajador/servicios/dto/trabajador.response-dto';
import { imagenProntiautoB64 } from '../../../../constantes/imagenesB64/prontiB64';
import * as dayjs from 'dayjs';
import { HttpInformacionFinancieraService } from '../../../informacion-financiera/servicios/http-informacion-financiera-service';
import { InformacionFinancieraResponseDto } from '../../../informacion-financiera/servicios/dto/informacion-financiera.response-dto';
import { HttpConfiguracionGeneralService } from '../../../configuracion-general/servicios/http-configuracion-general-service';
import { ConfiguracionGeneralResponseDto } from '../../../configuracion-general/servicios/dto/configuracion-general.response-dto';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-rol-pago-tabla',
  templateUrl: './rol-pago-tabla.component.html',
  styleUrls: ['./rol-pago-tabla.component.scss']
})
export class RolPagoTablaComponent extends AbstractTable<RolPagoResponseDto, RolPagoFindDto>
  implements OnInit, TableAbstractClass<RolPagoResponseDto>, AutocompleteFormInterface {
  @Input()
  mostrarBotonExportar: boolean = false;

  @Input()
  mostrarBotonCerrarRol: boolean = false;

  @Input()
  ocultarBotonesGestion: boolean = false;

  @Input()
  mostrarHistoricoRol: boolean = false;

  configuracionGeneral: ConfiguracionGeneralResponseDto = {};

  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por nombres, apellidos',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Búsqueda',
      placeholder: 'Ej: Andrés ...',
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
    public httpRolPagoService: HttpRolPagoService,
    public confirmationService: ConfirmationService,
    public httpPeriodoLaboralService: HttpPeriodoLaboralService,
    public httpHistorialLaboralService: HttpHistorialLaboralService,
    public httpInformacionFinancieronService: HttpInformacionFinancieraService,
    public httpConfiguracionGeneralService: HttpConfiguracionGeneralService

  ) {
    super(
      httpRolPagoService,
      {
        nombreRegistro: 'Rol Pago',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    this.stablishSkipAndTake(0, TAKE);
    this.obtenerConfiguracionGeneral();
  }

  obtenerConfiguracionGeneral(){
    this.httpConfiguracionGeneralService.find({id: 1}).subscribe(
      {
        next: (respuesta: [ConfiguracionGeneralResponseDto[], number])=>{
          this.configuracionGeneral = respuesta[0][0];
        }
      }
    );
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
      this.blockuiService.habilitarBlockUI();
      this.httpRolPagoService
        .createOne(values as RolPagoCreateDto)
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
            console.error({ error: error, message: "Error creando Rol Pago", data: values });
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpRolPagoService
        .updateById(values as RolPagoUpdateDto, this.recordUpdated.id as number)
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
            console.error({ error: error, message: "Error actualizando Rol Pago", data: values });
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
      case FormRolPagoEnum.idPeriodoLaboral:
        this.buscarAutocompletePeriodoLaboral(event);
        break;
      case FormRolPagoEnum.idHistorialLaboral:
        this.buscarAutocompleteHistorialLaboral(event);
        break;
    }
  }

  buscarAutocompleteHistorialLaboral(evento: SearchAutoCompleteInterface) {
    const busqueda: PeriodoLaboralFindDto = {
      busqueda: evento.query,
    };
    this.httpHistorialLaboralService
      .find(busqueda)
      .toPromise()
      .then(res => res as [PeriodoLaboralResponseDto[], number])
      .then(data => {
        // const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        const arregloDatos = data[0].map((a: any) => {
          a.detalle = a.idTrabajador.idUsuario.nombres + ' ' + a.idTrabajador.idUsuario.apellidos + '- ' + a.idCargo.nombre;
          return a;
        });
        if (evento.field.autoComplete) {
          if (Array.isArray(arregloDatos)) {
            evento.field.autoComplete.suggestions = [...arregloDatos];
          } else {
            evento.field.autoComplete.suggestions = [arregloDatos];
          }
        }
        return data;
      });
  }

  buscarAutocompletePeriodoLaboral(evento: SearchAutoCompleteInterface) {
    const busqueda: PeriodoLaboralFindDto = {
      busqueda: evento.query,
    };
    this.httpPeriodoLaboralService
      .find(busqueda)
      .toPromise()
      .then(res => res as [PeriodoLaboralResponseDto[], number])
      .then(data => {
        // const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        const arregloDatos = data[0].map((a: any) => {
          a.detalle = a.mes + '- ' + a.fechaInicio + '-' + a.fechaFin;
          return a;
        });
        if (evento.field.autoComplete) {
          if (Array.isArray(arregloDatos)) {
            evento.field.autoComplete.suggestions = [...arregloDatos];
          } else {
            evento.field.autoComplete.suggestions = [arregloDatos];
          }
        }
        return data;
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


  createOrEdit(record?: RolPagoResponseDto) {
    const formArray = [
      ...FORM_ROL_PAGO(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      this.recordUpdated = { ...record };
      this.recordUpdated.idPeriodoLaboral.detalle = this.recordUpdated.idPeriodoLaboral.mes + '- ' + this.recordUpdated.idPeriodoLaboral.fechaInicio + '-' + this.recordUpdated.idPeriodoLaboral.fechaFin;
      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;
    } else {
      this.create = true;
      this.recordUpdated = undefined;
    }
    this.openDialog(this.createEditFormArray);
  }

  obtenerTipoPagoEmpleadoID(idTrabajador: number): Promise<any> {
    return this.httpInformacionFinancieronService.find({ idTrabajador }).toPromise();
  }

  async exportarPdf(registro: RolPagoResponseDto) {





    let historialLaboral = registro.idHistorialLaboral;
    // @ts-ignore
    let datosUsuario = registro.idHistorialLaboral?.idTrabajador;
    let tipoPagoEmpleado = '';
    if (datosUsuario && datosUsuario.id) {
      try {

        const resp = await this.obtenerTipoPagoEmpleadoID(datosUsuario.id);
        console.log(resp);
        if (resp[0][0].formaPago === 'T') {

          tipoPagoEmpleado = 'TRANSFERENCIA'
        } else if (resp[0][0].formaPago === 'C') {
          tipoPagoEmpleado = 'CHEQUE'
        }

      }catch(err){
        console.error('No se pudo encontrar una forma de pago del trabajador', err);
      }
    }


    console.log(registro);
    const documento: any = {

      // pageOrientation: 'landscape',

      // header: function (currentPage: any, pageCount: any) {
      //   return {
      //     columns: [
      //       {
      //         image: imagenProntiautoB64,
      //         fit: [57, 25],
      //         margin: [20, 10, 10, 10],
      //         width: '20%',
      //       },
      //       {

      //         width: '50%',
      //         height: '100%',
      //         text: [
      //           { text: `CONSORCIO PRONTIAUTO S A \n`, style: 'header' },
      //           { text: 'Empleado: ', bold: true }, `${datosUsuario?.idUsuario?.nombres || ''}  ${datosUsuario?.idUsuario?.apellidos || ''} \n`,
      //           { text: 'Cargo', bold: true },
      //           `${historialLaboral?.idCargo?.nombre}`

      //         ],

      //       },

      //       {

      //         width: '30%',
      //         text: [
      //           'desde: ' + registro.fechaDesde + '\n',
      //           'hasta: ' + registro.fechaHasta,
      //         ],

      //       },
      //     ]

      //   }


      // },
      content: [
        {
          columns: [
            {
              image: imagenProntiautoB64,
              fit: [57, 25],
              // margin: [0, 10, 10, 0],
              width: '20%',
            },
            {

              width: '50%',
              text: [
                { text: `CONSORCIO PRONTIAUTO S A \n`, style: 'header' },
                { text: 'Empleado: ', bold: true }, `${datosUsuario?.idUsuario?.nombres || ''}  ${datosUsuario?.idUsuario?.apellidos || ''} \n`,
                { text: 'Cargo: ', bold: true },
                `${historialLaboral?.idCargo?.nombre}`

              ],

            },

            {

              width: '30%',
              alignment:'right',
              text: [
                'desde: ' + registro.fechaDesde + '\n',
                'hasta: ' + registro.fechaHasta,
              ],

            },
          ]

        },
        {
          columns: [
            {
              margin: [10, 0, 10, 0],
              layout: {
                vLineWidth: function (i: any, node: any) {
                  return 0;
                },
                hLineWidth: function (i: any, node: any) {
                  if (i === 0) {
                    return 0.2;
                  }
                  return 0;
                },
              },
              table: {
                widths: ['*',
                  // '*',
                  // '*',
                ],
                body: [
                  [
                    {
                      text: '',
                    },
                  ]
                ]
              }
            },

          ],
        },

        {
          // style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*'],
            body: [
              [
                {
                  text: 'DESCRIPCIÓN',


                  border: [false, false, false, true]

                },

                {
                  text: 'INGRESOS',
                  alignment: 'center',
                  border: [false, false, false, true]
                },

                {
                  text: 'DESCUENTOS',
                  alignment: 'center',
                  border: [false, false, false, true]
                },

              ],
              [{ text: 'SUELDO', style: 'contenidoTabla' }, { text: registro.sueldo, alignment: 'center', style: 'contenidoTabla' }, { text: '', alignment: 'center', style: 'contenidoTabla' }],
              [{ text: 'FONDOS RESERVA MENSUALIDAD', style: 'contenidoTabla' }, { text: registro.pagoFondoReservaMes, alignment: 'center', style: 'contenidoTabla' }, { text: '' }],
              [{ text: 'APORTE IESS', style: 'contenidoTabla' }, { text: '' }, { text: registro.aporteIess, alignment: 'center', style: 'contenidoTabla' }],
              [{ text: 'BONIFICACIÓN', style: 'contenidoTabla' }, { text: registro.bonificacion, alignment: 'center', style: 'contenidoTabla' }, { text: '', alignment: 'center', style: 'contenidoTabla' }],
              [{ text: 'MOVILIZACIÓN ESPECIAL', style: 'contenidoTabla' }, { text: registro.movilizacionEspecial, alignment: 'center', style: 'contenidoTabla' }, ''],
              [{ text: 'COMPONENTE SALARIAL UNIFICADO', style: 'contenidoTabla' }, { text: registro.componenteSalarialUnif, alignment: 'center', style: 'contenidoTabla' }, { text: '', alignment: 'center', style: 'contenidoTabla' }],
              [{ text: 'HORAS EXTRAS', style: 'contenidoTabla' }, { text: registro.totalHorasExtra, alignment: 'center', style: 'contenidoTabla' }, { text: '', alignment: 'center', style: 'contenidoTabla' }],
              [{ text: 'OTROS INGRESOS', style: 'contenidoTabla' }, { text: registro.otrosIngresos, alignment: 'center', style: 'contenidoTabla' }, { text: '', alignment: 'center', style: 'contenidoTabla' }],
              [{ text: 'RETENCIONES JUDICIALES', style: 'contenidoTabla' }, { text: '' }, { text: registro.retencionesJudiciales, alignment: 'center', style: 'contenidoTabla' }],
              [{ text: 'PRÉSTAMO IESS', style: 'contenidoTabla' }, { text: '', alignment: 'center' }, { text: registro.prestamosIess, alignment: 'center', style: 'contenidoTabla' }],
              [{ text: 'MULTAS', style: 'contenidoTabla' }, { text: '', alignment: 'center' }, { text: registro.multas, alignment: 'center', style: 'contenidoTabla' }],
              [{ text: 'DESCUENTOS POR FALTAS', style: 'contenidoTabla' }, { text: '', alignment: 'center' }, { text: registro.descuentosPorFaltas, alignment: 'center', style: 'contenidoTabla' }],
              [{ text: 'DESCUENTOS POR ATRASOS', style: 'contenidoTabla' }, { text: '', alignment: 'center' }, { text: registro.descuentosPorAtrasos, alignment: 'center', style: 'contenidoTabla' }],
              [{ text: 'OTROS DESCUENTOS', style: 'contenidoTabla' }, { text: '', alignment: 'center' }, { text: registro.otrosDescuentos, alignment: 'center', style: 'contenidoTabla' }],
              [{ text: 'TOTAL PRÉSTAMOS', style: 'contenidoTabla' }, { text: '', alignment: 'center' }, { text: registro.prestamosEmpresa, alignment: 'center', style: 'contenidoTabla' }],
              // ['TOTAL INGRESOS', registro.totalIngresos, ''],
              // ['TOTAL EGRESOS','' ,registro.totalEgresos],
              ['',
                {
                  text: 0 + (registro?.totalIngresos || 0),
                  border: [false, true, false, false],
                  alignment: 'center'
                },
                {
                  text: 0 + (registro?.totalEgresos || 0),

                  border: [false, true, false, false],
                  alignment: 'center'
                }],

            ]
          },
          layout: {
            defaultBorder: false
          },
        },

        {
          text: '',
          margin: [10, 40, 10, 40]
        },
        {
          columns: [

            {
              margin: [10, 0, 10, 0],
              layout: {
                vLineWidth: function (i: any, node: any) {
                  return 0;
                },
                hLineWidth: function (i: any, node: any) {
                  if (i === 0) {
                    return 0.2;
                  }
                  return 0;
                },
              },
              table: {
                widths: ['*',
                  // '*',
                  // '*',
                ],
                body: [
                  [
                    {
                      text: 'RECIBI CONFORME \n CI: ',
                      alignment: 'center',
                      fontSize: 11,
                      // colSpan: 3
                    },
                  ]
                ]
              }
            },
            {
              margin: [10, 0, 10, 0],
              layout: {
                vLineWidth: function (i: any, node: any) {
                  return 0;
                },
                hLineWidth: function (i: any, node: any) {
                  if (i === 0) {
                    return 0.2;
                  }
                  return 0;
                },
              },
              table: {
                widths: ['*',
                  // '*',
                  // '*',
                ],
                body: [
                  [
                    {
                      text: 'ELABORADO POR \n' + this.configuracionGeneral.elaboradorRol,
                      alignment: 'center',
                      fontSize: 11,
                      // colSpan: 3
                    },
                  ]
                ]
              }
            },
            {
              margin: [10, 0, 10, 0],
              layout: {
                vLineWidth: function (i: any, node: any) {
                  return 0;
                },
                hLineWidth: function (i: any, node: any) {
                  if (i === 0) {
                    return 0.2;
                  }
                  return 0;
                },
              },
              table: {
                widths: ['*',
                  // '*',
                  // '*',
                ],
                body: [
                  [

                    {
                      text: 'REVISADO POR \n' + this.configuracionGeneral.revisorRol,
                      alignment: 'center',
                      fontSize: 11,

                    },

                  ]
                ]
              }
            },
            {
              margin: [10, 0, 10, 0],
              layout: {
                // vLineWidth: function (i: any, node: any) {
                //   return 0;
                // },
                // hLineWidth: function (i: any, node: any) {
                //   console.log(i, node.table.widths.length);
                //   if (i === 0) {
                //     return 0.2;
                //   }
                //   return 0;
                // },
              },
              table: {
                widths: ['*',
                  // '*',
                  // '*',
                ],
                body: [
                  [
                    {
                      text: 'NETA A PAGAR: ' + '$' + registro.totalAPagar,
                      alignment: 'center',
                      fontSize: 11,
                      // colSpan: 3
                    },
                  ],
                  [
                    {
                      border: [false, false, false, false],
                      style: 'leyenda',
                      text: `PAGO: ${tipoPagoEmpleado}`
                    }
                  ]
                ]
              }
            },

          ]
        },



        {
          text: 'El empleado autorizó todos los descuentos incluidos en este comprobante. \n Recibí conforme el neto a pagar del presente comprobante de pago, no teniendo cargo o cobro alguno que hacer por otro concepto.',
          style: 'leyenda',
          margin: [10, 10, 10, 10]
        },
      ],
      styles: {
        header: {
          fontSize: 14,
          bold: true,
          alignment: 'center'
        },
        subtitulo: {
          fontSize: 13,
          bold: true,
          alignment: 'left',
          decoration: 'underline',
          margin: [10, 10, 10, 10]
        },
        leyenda: {
          fontSize: 9
        },
        contenidoTabla: {
          fontSize: 11
        }
      }

    }
    const pdf = pdfMake.createPdf(documento);
    pdf.open();
  }
}
