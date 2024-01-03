import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MenuItem} from "primeng/api";
import {fieldType, FormField, SearchAutoCompleteInterface} from "../../../../componentes/forms/interfaces/form-field";
import {FormGroup} from "@angular/forms";
import {AbstractTable} from "../../../../abstract/table/abstract-table";
import {PrestamoResponseDto} from "../../servicios/dto/prestamo.response-dto";
import {PrestamoFindDto} from "../../servicios/dto/prestamo.find-dto";
import {TableAbstractClass} from "../../../../abstract/table/interfaces/table-abstract-class";
import {AutocompleteFormInterface} from "../../../../abstract/table/interfaces/autocomplete-form.interface";
import {ModalComponent} from "../../../../componentes/dialog/create-update-modal/interfaces/modal-component";
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";
import {HttpPrestamoService} from "../../servicios/http-prestamo-service";
import {BlockuiService} from "../../../../servicios/block-ui/blockui.service";
import {LogsMlabsService} from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import {EstadoPrestamoEnum} from "../../../../enums/estado-prestamo.enum";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as dayjs from "dayjs";
import {ToasterTipo} from "../../../../servicios/logs-mensajes/enums/toaster-tipo";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-ruta-informe-prestamo',
  templateUrl: './ruta-informe-prestamo.component.html',
  styleUrls: ['./ruta-informe-prestamo.component.scss']
})
export class RutaInformePrestamoComponent extends AbstractTable<PrestamoResponseDto, PrestamoFindDto>
  implements OnInit, TableAbstractClass<PrestamoResponseDto>, AutocompleteFormInterface {

  items: MenuItem[] = [];
  searchBarFormFields: FormField[] = [
    {
      help: 'Seleccione un rango de fechas',
      formControlName: 'fechaInicio',
      initialValue: "",
      validators: [],
      type: fieldType.date,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Fecha inicio',
      placeholder: 'Ej: 22/08/2022',
      column: '6',
      actualValue: '',
    },
    {
      help: '',
      formControlName: 'fechaFin',
      initialValue: "",
      validators: [],
      type: fieldType.date,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Fecha fin',
      placeholder: 'Ej: 01/09/2022',
      column: '6',
      actualValue: '',
    },
    {
      label: 'Estado',
      formControlName: 'estado',
      type: fieldType.select,
      help: 'Seleccione el estado de los préstamos',
      select: {
        filterBy: 'estado',
        dataKey: 'estado',
        filterPlaceholder: 'Pagado, Pendiente',
        optionLabel: 'nombre',
        options: [
          {
            estado: EstadoPrestamoEnum.pagado,
            nombre: 'Pagado',
          },
          {
            estado: EstadoPrestamoEnum.pendiente,
            nombre: 'Pendiente',
          }
        ]
      },
      initialValue: "",
      validators: [],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Pagado / Pendiente',
      column: '6',
      actualValue: '',
    },
  ];

  constructor(
    public httpPrestamoService: HttpPrestamoService,
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
    public confirmationService: ConfirmationService,
  ) {
    super(
      httpPrestamoService,
      {
        nombreRegistro: 'Prestamo',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit() {
    this.items = [
      {label: 'Personal menú', routerLink: '/personal'},
      {label: 'Reportes', routerLink: '/personal/reportes-personal'},
      {label: 'Informe préstamos'},
    ];
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.estado = undefined;
    this.findDto.fechaInicio = undefined;
    this.findDto.fechaFin = undefined;
  }

  searchFieldChanged(event: FormField): void {
    if (event.valid) {
      // setear formgroup
      this.findForm = event.formGroup;
      if (event.formControlName === 'estado') {
        if (event.actualValue?.estado) {
          this.findDto.estado = event.actualValue.estado
        } else {
          this.findDto.estado = undefined;
        }

      }
      if (event.formControlName === 'fechaInicio') {
        this.findDto.fechaInicio = event.actualValue
      }
      if (event.formControlName === 'fechaFin') {
        this.findDto.fechaFin = event.actualValue
      }
      if (this.findDto.estado && this.findDto.fechaInicio && this.findDto.fechaFin) {
        const diferenciaEntreFechas = dayjs(this.findDto.fechaFin, 'days').diff(this.findDto.fechaInicio);
        if (diferenciaEntreFechas >= 0) {
          this.searchButtonDisabled = false;
        } else {
          this.logsMlabsService.toaster({
            titulo: 'Error',
            mensaje: 'La fecha fin debe ser superior o igual a la fecha inicio',
            tipo: ToasterTipo.error
          });
          event.formGroup.get('fechaFin')?.reset();
        }

      } else {
        this.searchButtonDisabled = true;
      }
      // Habilitar boton

    }
    // else {
    //   // limpiar dto
    //   this.clearFindDto();
    //   // Deshabilitar boton
    //   this.searchButtonDisabled = true;
    // }
  }

  searchAutoComplete(event: SearchAutoCompleteInterface): void {
    switch (event.field.formControlName) {
      // case FormPrestamoEnum.tipoPrestamo:
      //   this.buscarAutocompleteListaValorDetalle(event);
      //   break;
      // case FormPrestamoEnum.idTrabajador:
      //   this.buscarAutocompleteTrabajador(event);
      //   break;
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
    // const createUpdateModalParameters: CreateUpdateModalParameters = {
    //   title: `${this.create ? 'Crear ' : 'Actualizar'} ${this.parameters.nombreRegistro}`,
    //   description: "Por favor llene la información pertinente.",
    //   accordeons: arrayAccordeon,
    //   formsFields: formFields,
    //   button: `${this.create ? 'Crear ' : 'Actualizar'} `,
    //   route: this,
    // };
    // const dialogRef = this.dialog.open(CreateUpdateModalComponent, {
    //   data: createUpdateModalParameters,
    // });
  }

  createOrEditModal(closeModal: ModalComponent): void {

  }

  buscarDatosYGenerarPDF() {
    this.exportPdf();
  }

  exportPdf() {
    const documento: any = {
      pageMargins: [10, 10, 10, 5],
      content: [
        {
          text: `CONSORCIO PRONTIAUTO S A`,
          style: 'header',
          margin: [10, 10, 10, 10]
        },
        {
          text: `Informe de Préstamos`,
          style: 'header',
          margin: [10, 5, 10, 5]
        },
        {
          text: '',
          margin: [10, 10, 10, 10]
        },
        {
          // layout: 'headerLineOnly', // optional
          layout: {
            hLineStyle: function (i: any, node: any) {
              if (i === 0 || i === node.table.body.length) {
                return null;
              }
              return {dash: {length: 10, space: 4}};
            },
            vLineStyle: function (i: any, node: any) {
              if (i === 0 || i === node.table.widths.length) {
                return null;
              }
              return {dash: {length: 10, space: 4}};
            },
            vLineWidth: function (i: any, node: any) {
              if (i === 0 || i === node.table.widths.length) {
                return 0.2;
              }
              return 0;
            },
            hLineWidth: function (i: any, node: any) {
              return 0.2;
            },
          },
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            border: '',
            body: [
              [
                {text: 'APELLIDOS Y NOMBRES', bold: false, alignment: 'center', fontSize: 11},
                {text: 'TIPO PRÉSTAMO', bold: false, alignment: 'center', fontSize: 11},
                {text: 'FECHA PRÉSTAMO', bold: false, alignment: 'center', fontSize: 11},
                {text: 'INTERÉS', bold: false, alignment: 'center', fontSize: 11},
                {text: 'VALOR PRÉSTAMO', bold: false, alignment: 'center', fontSize: 11},
                {text: 'CUOTAS PAGADAS', bold: false, alignment: 'center', fontSize: 11},
                {text: 'TOTAL PAGADO', bold: false, alignment: 'center', fontSize: 11},
                {text: 'TOTAL SALDO', bold: false, alignment: 'center', fontSize: 11},
              ]
            ]
          }
        },

      ],

      styles: {
        header: {
          fontSize: 14,
          bold: true,
          alignment: 'center'
        },
        subheader: {
          fontSize: 12,
          bold: true,
          alignment: 'center'
        },
        subtitulo: {
          fontSize: 13,
          bold: true,
          alignment: 'left',
          decoration: 'underline',
          margin: [10, 10, 10, 10]
        }
      }
    };

    const pdf = pdfMake.createPdf(documento);
    pdf.open();
  }

  // generarRowsCuotas(): any[] {
  //   const arregloRows = this.historico.cuotaCollection?.map(
  //     cuota => {
  //       return [
  //         cuota.numeroCuota,
  //         cuota.fechaCobro,
  //         cuota.valorCuota,
  //         cuota.abonoCapital,
  //         cuota.valorTasaAdministrativa,
  //         cuota.valorImpuesto,
  //         cuota.estaPagado === 'S' ? 'Si' : 'No'
  //       ]
  //     }
  //   )
  //   return arregloRows || [];
  // }


}
