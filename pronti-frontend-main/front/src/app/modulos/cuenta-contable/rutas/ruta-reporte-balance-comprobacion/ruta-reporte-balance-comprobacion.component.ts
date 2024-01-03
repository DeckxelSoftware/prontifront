import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import * as pdfMake from "pdfmake/build/pdfmake";
import { BlockuiService } from "../../../../servicios/block-ui/blockui.service";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { imagenProntiautoB64 } from "../../../../constantes/imagenesB64/prontiB64";
import { FormField, fieldType, SearchAutoCompleteInterface } from '../../../../componentes/forms/interfaces/form-field';
import { FormGroup, Validators } from '@angular/forms';
import { LogsMlabsService } from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import { ToasterTipo } from '../../../../servicios/logs-mensajes/enums/toaster-tipo';
import { HttpCuentaContableService } from '../../servicios/http-cuenta-contable-service';
import { CuentaContableResponseDto } from '../../servicios/dto/cuenta-contable.response-dto';
import { CuentaContableFindDto } from '../../servicios/dto/cuenta-contable.find-dto';
import { obtenerMesNumberAString } from '../../../../constantes/funciones/mes-number.funcion';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-ruta-reporte-balance-comprobacion',
  templateUrl: './ruta-reporte-balance-comprobacion.component.html',
  styleUrls: ['./ruta-reporte-balance-comprobacion.component.scss']
})
export class RutaReporteBalanceComprobacionComponent {

  items: MenuItem[] = [];
  cuentasContables: CuentaContableResponseDto[] = [];


  findDto: any = {
    anio: new Date().getFullYear()
  };
  confirmarDeshabilitado = true;
  mesDesde = '';
  mesHasta = '';
  searchBarFormFields: FormField[] = [
    {
      label: 'Año',
      placeholder: '',
      help: 'Ingrese el año',
      formControlName: 'anio',
      initialValue: new Date().getFullYear(),
      validators: [
        Validators.required
      ],
      type: fieldType.inputNumber,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        minFractionDigits: 0,
        maxFractionDigits: 0,
      }
    },
    {
      label: 'Mes desde',
      placeholder: 'Ej: Enero',
      help: 'Seleccione un mes',
      formControlName: 'mesDesde',
      initialValue: '',
      validators: [],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'nombre',
        dataKey: 'mesDesde',
        filterPlaceholder: 'Enero',
        optionLabel: 'nombre',
        options: [
          {
            mesDesde: 1,
            nombre: 'Enero',
          },
          {
            mesDesde: 2,
            nombre: 'Febrero',
          },
          {
            mesDesde: 3,
            nombre: 'Marzo',
          },
          {
            mesDesde: 4,
            nombre: 'Abril',
          },
          {
            mesDesde: 5,
            nombre: 'Mayo',
          },
          {
            mesDesde: 6,
            nombre: 'Junio',
          },
          {
            mesDesde: 7,
            nombre: 'Julio',
          },
          {
            mesDesde: 8,
            nombre: 'Agosto',
          },
          {
            mesDesde: 9,
            nombre: 'Septiembre',
          },
          {
            mesDesde: 10,
            nombre: 'Octubre',
          },
          {
            mesDesde: 11,
            nombre: 'Noviembre',
          },
          {
            mesDesde: 12,
            nombre: 'Diciembre',
          }
        ]
      }

    },
    {
      label: 'Mes hasta',
      placeholder: 'Ej: Diciembre',
      help: 'Seleccione un mes',
      formControlName: 'mesHasta',
      initialValue: '',
      validators: [],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'nombre',
        dataKey: 'mesHasta',
        filterPlaceholder: 'Enero',
        optionLabel: 'nombre',
        options: [
          {
            mesHasta: 1,
            nombre: 'Enero',
          },
          {
            mesHasta: 2,
            nombre: 'Febrero',
          },
          {
            mesHasta: 3,
            nombre: 'Marzo',
          },
          {
            mesHasta: 4,
            nombre: 'Abril',
          },
          {
            mesHasta: 5,
            nombre: 'Mayo',
          },
          {
            mesHasta: 6,
            nombre: 'Junio',
          },
          {
            mesHasta: 7,
            nombre: 'Julio',
          },
          {
            mesHasta: 8,
            nombre: 'Agosto',
          },
          {
            mesHasta: 9,
            nombre: 'Septiembre',
          },
          {
            mesHasta: 10,
            nombre: 'Octubre',
          },
          {
            mesHasta: 11,
            nombre: 'Noviembre',
          },
          {
            mesHasta: 12,
            nombre: 'Diciembre',
          }
        ]
      }
    },
    {
      label: 'Cuenta identificador desde',
      placeholder: 'Activos',
      help: 'Seleccione la cuenta contable',
      formControlName: 'identificadorCuentaContableDesde',
      initialValue: '',
      validators: [
        // Validators.required,
      ],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      autoComplete: {
        field: 'nombre',
        inputId: 'identificador',
        suggestions: []
      }
    },

    {
      label: 'Cuenta identificador hasta',
      placeholder: 'Activos',
      help: 'Seleccione la cuenta contable',
      formControlName: 'identificadorCuentaContableHasta',
      initialValue: '',
      validators: [
        // Validators.required,
      ],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      autoComplete: {
        field: 'nombre',
        inputId: 'identificador',
        suggestions: []
      }
    },

  ];
  constructor(
    public logsService: LogsMlabsService,
    public blockuiService: BlockuiService,
    public httpCuentaContableService: HttpCuentaContableService
  ) {

    this.items = [
      { label: 'Menú contabilidad', routerLink: '/contabilidad' },
      { label: 'Balances', routerLink: '/contabilidad/balances-menu' },
      { label: 'Reporte de balance de comprobación' }
    ];

  }

  searchFieldChanged(event: FormField): void {
    if (event.valid) {
      if (event.formControlName === 'anio') {
        if (event.actualValue) {
          this.findDto.anio = event.actualValue;
        } else {
          this.findDto.anio = undefined;
        }

      }
      if (event.formControlName === 'mesDesde') {
        if (event.actualValue) {
          this.findDto.mesDesde = event.actualValue.mesDesde;
          this.mesDesde = event.actualValue.nombre;
          if (this.findDto.mesHasta) {
            if (this.findDto.mesDesde > this.findDto.mesHasta) {
              this.findDto.mesDesde = undefined;
              event.formGroup.get('mesDesde')?.reset();
              event.formGroup.get('mesHasta')?.reset();
              this.mesDesde = '';
              this.mesHasta = '';
              this.logsService.toaster(
                {
                  titulo: 'Aviso',
                  mensaje: 'Mes desde debes ser menor al Mes hasta',
                  tipo: ToasterTipo.warning
                }
              )
            }
          }
        } else {
          this.findDto.mesDesde = undefined;
        }
      }
      if (event.formControlName === 'mesHasta') {
        if (event.actualValue) {
          this.findDto.mesHasta = event.actualValue.mesHasta;
          this.mesHasta = event.actualValue.nombre;
          if (this.findDto.mesDesde > this.findDto.mesHasta) {
            this.findDto.mesDesde = undefined;
            event.formGroup.get('mesDesde')?.reset();
            event.formGroup.get('mesHasta')?.reset();
            this.mesDesde = '';
            this.mesHasta = '';
            this.logsService.toaster(
              {
                titulo: 'Aviso',
                mensaje: 'Mes desde debes ser menor al Mes hasta',
                tipo: ToasterTipo.warning
              }
            )
          }
        } else {
          this.findDto.mesHasta = undefined;
        }
      }
      if (event.formControlName === 'identificadorCuentaContableDesde') {
        this.findDto.identificadorCuentaContableDesde = event.actualValue.identificador;
      }

      if (event.formControlName === 'identificadorCuentaContableHasta') {
        this.findDto.identificadorCuentaContableHasta = event.actualValue.identificador;
      }
      if (this.findDto.anio && this.findDto.mesDesde && this.findDto.mesHasta && this.findDto.identificadorCuentaContableDesde && this.findDto.identificadorCuentaContableHasta) {
        this.confirmarDeshabilitado = false;
      } else {
        this.confirmarDeshabilitado = true;
      }
      console.log(this.findDto);
    } else {
      this.confirmarDeshabilitado = true;
    }

  }

  searchAutoComplete(event: SearchAutoCompleteInterface): void {
    console.log(event.field);
    switch (event.field.formControlName) {
      case 'identificadorCuentaContableDesde':
        this.buscarAutocomplete(event);
        break;

      case 'identificadorCuentaContableHasta':
        this.buscarAutocomplete(event);
        break;
    }

  }

  buscarAutocomplete(evento: SearchAutoCompleteInterface) {

    const busqueda: CuentaContableFindDto = {
      busqueda: evento.query,
      nivel: 1,
    };
    this.httpCuentaContableService
      .find(busqueda)
      .toPromise()
      .then(res => res as [CuentaContableResponseDto[], number])
      .then(data => {
        const arregloDatos = data[0];
        // console.log('data', arregloDatos);
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        // const arregloDatos = data[0].map((a: any) => {
        //   if (a.idUsuario) {
        //     a.nombres = a.idUsuario.nombres + ' ' + a.idUsuario.apellidos;
        //     if (a.idEmpresa) {
        //       a.nombres += ` - ${a.idEmpresa.razonSocial}`
        //     }
        //   }
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
      });
  }



  obtenerRegistrosCuentaContable() {
    return new Promise((resolve, reject) => {

      this.httpCuentaContableService.obtenerRegistrosBalanceComprobacion(this.findDto)
        .subscribe({
          next: (resp: any) => {
            this.cuentasContables = resp[0];
            resolve(true);
          },
          error: (err) => {
            reject(false);

            this.logsService.toaster(
              {
                titulo: 'Aviso',
                mensaje: 'No se pudo traer la información',
                tipo: ToasterTipo.error
              }
            );
            console.error('Error', err);
          }
        });
    });
  }

  armarObjetoPdfFromRegistros(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const arregloPDF = this.cuentasContables.map((cuenta: any) => {
        const mesHasta = obtenerMesNumberAString(this.findDto.mesHasta);
        const mesAnterior = obtenerMesNumberAString(this.findDto.mesHasta - 1);
        const objetoMeses: any = {};
        objetoMeses.saldoInicial = cuenta[`${mesAnterior}Saldo`];
        objetoMeses.saldoFinal = cuenta[`${mesHasta}Saldo`];
        objetoMeses.debito = cuenta[`${mesHasta}Debito`];
        objetoMeses.credito = cuenta[`${mesHasta}Credito`];

        return [
          {
            text: cuenta.identificador
          },
          {
            text: cuenta.nombre
          },
          {
            text: objetoMeses.saldoInicial,//
          },

          {
            text: objetoMeses.debito,//
          },

          {
            text: objetoMeses.credito,//
          },

          {
            text: objetoMeses.saldoFinal,//
          },
        ]
      });


      resolve(arregloPDF);

    });
  }

  async buscarYGenerarPdf() {
    console.log(this.findDto);
    this.blockuiService.habilitarBlockUI();
    try {

      await this.obtenerRegistrosCuentaContable();
      const registrosPdf = await this.armarObjetoPdfFromRegistros();

      const documento: any = {
        pageMargins: [10, 10, 10, 10],
        content: [
          {
            text: 'CONSORCIO PRONTIAUTO S A',
            fontSize: 18,
            bold: true,
            alignment: 'center',
            margin: [10, 5, 10, 5]
          },
          {
            text: 'Balance de comprobación',
            fontSize: 14,
            bold: true,
            alignment: 'center',
            margin: [0, 5, 0, 0]
          },
          {
            text: `Año: ${this.findDto.anio}`,
            fontSize: 14,
            bold: true,
            alignment: 'center',
            margin: [0, 2, 0, 0]
          },
          {
            text: `Mes desde: ${this.mesDesde} Mes hasta: ${this.mesHasta}`,
            fontSize: 14,
            bold: true,
            alignment: 'center',
            margin: [0, 2, 0, 10]
          },
          {
            layout: 'headerLineOnly',
            margin: [0, 0, 0, 0],
            table: {
              headerRows: 1,
              widths: ['*', '*', '*', '*', '*', '*'],

              body: [
                [
                  {
                    text: 'CÓDIGO',
                    fontSize: 10,
                    bold: true,
                    fillColor: '000000',
                    color: '#ffffff',
                    margin: [2, 0, 0, 0]
                  },
                  {
                    text: 'NOMBRE',
                    fontSize: 10,
                    bold: true,
                    fillColor: '000000',
                    color: '#ffffff',
                    margin: [2, 0, 0, 0]
                  },

                  {
                    text: 'SALDO INICIAL',
                    fontSize: 10,
                    bold: true,
                    fillColor: '000000',
                    color: '#ffffff',
                    margin: [2, 0, 0, 0]
                  },

                  {
                    text: 'DÉBITOS',
                    fontSize: 10,
                    bold: true,
                    fillColor: '000000',
                    color: '#ffffff',
                    margin: [2, 0, 0, 0]
                  },

                  {
                    text: 'CRÉDITOS',
                    fontSize: 10,
                    bold: true,
                    fillColor: '000000',
                    color: '#ffffff',
                    margin: [2, 0, 0, 0]
                  },
                  {
                    text: 'SALDO FINAL',
                    fontSize: 10,
                    bold: true,
                    fillColor: '000000',
                    color: '#ffffff',
                    margin: [2, 0, 0, 0]
                  },
                ],
                ...registrosPdf,
              ]
            }
          },

        ]
      };
      const pdf = pdfMake.createPdf(documento);
      pdf.open();
      this.blockuiService.deshabilitarBlockUI();

    } catch (err) {



      this.
        blockuiService.deshabilitarBlockUI();
      this.logsService.toaster(
        {
          titulo: 'Aviso',
          mensaje: 'No se pudo generar el informe',
          tipo: ToasterTipo.error
        }
      );

    }
  }





}
