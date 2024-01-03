import {Component, OnInit} from '@angular/core';
import {AbstractTable} from "../../../../abstract/table/abstract-table";
import {PrestamoResponseDto} from "../../../prestamo/servicios/dto/prestamo.response-dto";
import {PrestamoFindDto} from "../../../prestamo/servicios/dto/prestamo.find-dto";
import {TableAbstractClass} from "../../../../abstract/table/interfaces/table-abstract-class";
import {AutocompleteFormInterface} from "../../../../abstract/table/interfaces/autocomplete-form.interface";
import {ConfirmationService, MenuItem} from "primeng/api";
import {fieldType, FormField, SearchAutoCompleteInterface} from "../../../../componentes/forms/interfaces/form-field";
import {FormGroup} from "@angular/forms";
import {EstadoPrestamoEnum} from "../../../../enums/estado-prestamo.enum";
import {HttpPrestamoService} from "../../../prestamo/servicios/http-prestamo-service";
import {BlockuiService} from "../../../../servicios/block-ui/blockui.service";
import {LogsMlabsService} from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import * as dayjs from "dayjs";
import {ToasterTipo} from "../../../../servicios/logs-mensajes/enums/toaster-tipo";
import {ModalComponent} from "../../../../componentes/dialog/create-update-modal/interfaces/modal-component";
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";
import * as pdfMake from "pdfmake/build/pdfmake";
import {ContratoResponseDto} from "../../servicios/dto/contrato.response-dto";
import {ContratoFindDto} from "../../servicios/dto/contrato.find-dto";
import {EstadoContratoEnum} from "../../../../enums/estado-contrato.enum";
import {HttpContratoService} from "../../servicios/http-contrato-service";
import * as xlsx from "xlsx-with-styles";
import {
  HistoricoPlanContratoResponseDto
} from "../../../historico-plan-contrato/servicios/dto/historico-plan-contrato.response-dto";

@Component({
  selector: 'app-ruta-informe-cliente',
  templateUrl: './ruta-informe-cliente.component.html',
  styleUrls: ['./ruta-informe-cliente.component.scss']
})
export class RutaInformeClienteComponent extends AbstractTable<ContratoResponseDto, ContratoFindDto>
  implements OnInit, TableAbstractClass<ContratoResponseDto>, AutocompleteFormInterface {

  contratos: ContratoResponseDto[] = [];
  items: MenuItem[] = [];
  fechaActual = dayjs().format('YYYY-MM-DD');
  searchBarFormFields: FormField[] = [
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
            estado: EstadoContratoEnum.Registrado,
            nombre: 'Registrado',
          },
          {
            estado: EstadoContratoEnum.EnProceso,
            nombre: 'En Proceso',
          },
          {
            estado: EstadoContratoEnum.Preadjudicado,
            nombre: 'Preadjudicado',
          },
          {
            estado: EstadoContratoEnum.PreadjudicadoBuscando,
            nombre: 'Preadjudicado Buscando',
          },
          {
            estado: EstadoContratoEnum.PreadjudicadoComprado,
            nombre: 'Preadjudicado Comprado',
          },
          {
            estado: EstadoContratoEnum.Ofertado,
            nombre: 'Ofertado',
          },
          {
            estado: EstadoContratoEnum.Adjudicado,
            nombre: 'Adjudicado',
          },
          {
            estado: EstadoContratoEnum.CambioDePlan,
            nombre: 'Cambio De Plan',
          },
          {
            estado: EstadoContratoEnum.CambioMonto,
            nombre: 'Cambio Monto',
          },
          {
            estado: EstadoContratoEnum.CambioPlazo,
            nombre: 'CambioPlazo',
          },
          {
            estado: EstadoContratoEnum.Desistimiento,
            nombre: 'Desistimiento',
          },
          {
            estado: EstadoContratoEnum.CesionDerechos,
            nombre: 'Cesión Derechos',
          },
          {
            estado: EstadoContratoEnum.Refinamiento,
            nombre: 'Refinamiento',
          },
          {
            estado: EstadoContratoEnum.Reactivacion,
            nombre: 'Reactivacion',
          },
          {
            estado: EstadoContratoEnum.Unificacion,
            nombre: 'Unificación',
          },
          {
            estado: EstadoContratoEnum.Devolucion,
            nombre: 'Devolución',
          },
          {
            estado: EstadoContratoEnum.Liquidado,
            nombre: 'Liquidado',
          },
          {
            estado: EstadoContratoEnum.EnProcesoPenalizado,
            nombre: 'En Proceso Penalizado',
          },
          {
            estado: EstadoContratoEnum.PreadjudicadoAprobado,
            nombre: 'Preadjudicado Aprobado',
          }
        ]
      },
      initialValue: "",
      validators: [],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: En Proceso ',
      column: '6',
      actualValue: '',
    },
  ];

  constructor(
    public httpContratoService: HttpContratoService,
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
    public confirmationService: ConfirmationService,
  ) {
    super(
      httpContratoService,
      {
        nombreRegistro: 'Contrato',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit() {
    this.searchButtonDisabled = false;
    this.items = [
      {label: 'Contabilidad menú', routerLink: '/contabilidad'},
      {label: 'Reportes menú', routerLink: '/contabilidad/reportes-contabilidad-menu'},
      {label: 'Informe clientes'},
    ];
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.estado = undefined;
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

  obtenerDatos() {

    return new Promise((resolve, reject) => {
        this.blockuiService.blockUiCambio.next(true);
        this.httpContratoService.find(this.findDto).subscribe(
          {
            next: res => {
              if (res[1] > 0) {
                this.contratos = res[0];
                this.blockuiService.blockUiCambio.next(false);
                resolve(true);
              } else {
                this.blockuiService.blockUiCambio.next(false);
                reject(false);
              }

            },
            error: err => {
              this.blockuiService.blockUiCambio.next(false);
              reject(false);
            }
          }
        )
      }
    );
  }

  async buscarDatosYGenerarExcel() {
    await this.obtenerDatos();
    this.clearFindDto();
    this.findForm.reset();
    setTimeout(() => {
      this.exportExcel()
    }, 1000);

  }

  exportExcel() {

    let hoja = xlsx.utils.table_to_sheet(document.getElementById('tablaContratos'), {cellStyles: true});

    hoja["!cols"] = [
      {
        width: 15,  // width in Excel "Max Digit Width", width*256 is integral
      },
      {
        width: 15,  // width in Excel "Max Digit Width", width*356 is integral
      },
      {
        width: 35,  // width in Excel "Max Digit Width", width*356 is integral
      },
      {
        width: 20,  // width in Excel "Max Digit Width", width*356 is integral
      },
      {
        width: 35,  // width in Excel "Max Digit Width", width*356 is integral
      },
    ];


    const workbook = {
      Sheets: {
        'Datos contrato': hoja,
      },
      SheetNames: ['Datos contrato']
    };

    const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
    this.descargarArchivo(excelBuffer, 'xd');
  }


  descargarArchivo(archivo: any, tipo: any) {
    let EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const filePath = window.URL.createObjectURL(new Blob([archivo], {type: EXCEL_TYPE}));
    const downloadLink = document.createElement('a');
    downloadLink.href = filePath;
    downloadLink.setAttribute('download', `reporte-clientes-contrato-${this.findDto.estado}`);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }


}
