import {Component} from '@angular/core';
import {MenuItem} from "primeng/api";
import {fieldType, FormField, SearchAutoCompleteInterface} from "../../../../componentes/forms/interfaces/form-field";
import {FormGroup, Validators} from "@angular/forms";
import {LogsMlabsService} from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import {ToasterTipo} from "../../../../servicios/logs-mensajes/enums/toaster-tipo";
import * as pdfMake from "pdfmake/build/pdfmake";
import {BlockuiService} from "../../../../servicios/block-ui/blockui.service";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import {imagenProntiautoB64} from "../../../../constantes/imagenesB64/prontiB64";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-ruta-balance-resultados',
  templateUrl: './ruta-balance-resultados.component.html',
  styleUrls: ['./ruta-balance-resultados.component.scss']
})
export class RutaBalanceResultadosComponent {
  items: MenuItem[] = [];
  findDto: any = {};
  confirmarDeshabilitado = true;
  mesDesde = '';
  mesHasta = '';
  searchBarFormFields: FormField[] = [
    {
      label: 'Año',
      placeholder: '',
      help: 'Ingrese el año',
      formControlName: 'anio',
      initialValue: '',
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

  ];

  constructor(
    public logsService: LogsMlabsService,
    public blockuiService: BlockuiService
  ) {
    this.items = [
      {label: 'Menú contabilidad', routerLink: '/contabilidad'},
      {label: 'Balances', routerLink: '/contabilidad/balances-menu'},
      {label: 'Resultados'}
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
      if (this.findDto.anio && this.findDto.mesDesde && this.findDto.mesHasta) {
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
    // switch (event.field.formControlName) {
    //   case 'idPeriodoLaboral':
    //     this.buscarAutocompletePeriodoLaboral(event);
    //     break;
    // }
  }

  buscarYGenerarPdf() {
    console.log(this.findDto);
    this.blockuiService.habilitarBlockUI();
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
          text: 'Balance de resultados',
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
            widths: ['20%', '60%', '20%'],

            body: [
              [
                {
                  text: 'Código',
                  fontSize: 10,
                  bold: true,
                  fillColor: '000000',
                  color: '#ffffff',
                  margin: [2, 0, 0, 0]
                },
                {
                  text: 'Nombre de cuenta',
                  fontSize: 10,
                  bold: true,
                  fillColor: '000000',
                  color: '#ffffff',
                  margin: [2, 0, 0, 0]
                },
                {
                  text: 'Saldo',
                  fontSize: 10,
                  bold: true,
                  fillColor: '000000',
                  color: '#ffffff',
                  margin: [2, 0, 0, 0]
                },
              ],

              [
                {
                  text: '4',
                  fontSize: 11,
                  bold: true,
                },
                {
                  text: 'Ingresos',
                  fontSize: 11,
                  bold: true,
                },
                {
                  text: '',
                },
              ],

              [
                {
                  text: '41',
                  fontSize: 10,
                  bold: true,
                },
                {
                  text: 'Ingresos de actividades ordinarias',
                  fontSize: 10,
                  bold: true,

                },
                {
                  text: '',
                },

              ],

              [
                {
                  text: '4102',
                  fontSize: 10,
                  bold: true,
                },
                {
                  text: 'Prestaciones locales de servicios',
                  fontSize: 10,
                  bold: true,

                },
                {
                  text: '',
                },
              ],

              [
                {
                  text: '4102010101',
                  fontSize: 10,
                  bold: false,

                },
                {
                  text: 'Ingresos por inscripción autos',
                  fontSize: 10,
                  bold: false,
                },
                {
                  text: '10000',
                  fontSize: 10,
                  bold: false,
                },
              ],
              [
                {
                  text: 'TOTAL',
                  fontSize: 10,
                  bold: true,
                },
                {
                  text: '',
                },
                {
                  text: '10000',
                  fontSize: 10,
                  bold: false,
                },
              ],

            ]
          }
        },

      ]
    };
    const pdf = pdfMake.createPdf(documento);
    pdf.open();
    this.blockuiService.deshabilitarBlockUI();
  }

}
