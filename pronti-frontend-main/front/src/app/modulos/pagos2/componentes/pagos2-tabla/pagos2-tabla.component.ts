import { Component, OnInit } from '@angular/core';
import { Pagos2ResponseDto } from '../../servicios/dto/pagos2.response-dto';
import { Pagos2FindDto } from '../../servicios/dto/pagos2.find-dto';
import { MatDialog } from '@angular/material/dialog';
import { HttpPagos2Service } from '../../servicios/http-pagos2-service';
import { ConfirmationService } from 'primeng/api';
import { FormGroup, Validators } from '@angular/forms';
import { Pagos2CreateDto } from '../../servicios/dto/pagos2.create-dto';
import { Pagos2UpdateDto } from '../../servicios/dto/pagos2.update-dto';
import { FormPagos2Enum } from '../../form/form-pagos2.enum';
import { FORM_PAGOS_2 } from '../../form/form-pagos2';
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
import { FormField, SearchAutoCompleteInterface, fieldType } from '../../../../componentes/forms/interfaces/form-field';
import { TableAbstractClass } from "../../../../abstract/table/interfaces/table-abstract-class";
import { ModalComponent } from "../../../../componentes/dialog/create-update-modal/interfaces/modal-component";
import { MatStepperArray } from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ToasterTipo } from '../../../../servicios/logs-mensajes/enums/toaster-tipo';
import * as xlsx from "xlsx-with-styles";
import { TrabajadorResponseDto } from '../../../trabajador/servicios/dto/trabajador.response-dto';
import { HistorialLaboralResponseDto } from '../../../historial-laboral/servicios/dto/historial-laboral.response-dto';
import { HttpTrabajadorService } from '../../../trabajador/servicios/http-trabajador-service';
import { TrabajadorFindDto } from '../../../trabajador/servicios/dto/trabajador.find-dto';
import { HttpPeriodoContableService } from '../../../periodo-contable/servicios/http-periodo-contable-service';
import { PeriodoContableFindDto } from '../../../periodo-contable/servicios/dto/periodo-contable.find-dto';
import { PeriodoContableResponseDto } from '../../../periodo-contable/servicios/dto/periodo-contable.response-dto';
import { RolPagoResponseDto } from '../../../rol-pago/servicios/dto/rol-pago.response-dto';
import { PeriodoLaboralResponseDto } from '../../../periodo-laboral/servicios/dto/periodo-laboral.response-dto';
import { HttpPeriodoLaboralService } from '../../../periodo-laboral/servicios/http-periodo-laboral-service';
import { PeriodoLaboralFindDto } from '../../../periodo-laboral/servicios/dto/periodo-laboral.find-dto';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pagos2-tabla',
  templateUrl: './pagos2-tabla.component.html',
  styleUrls: ['./pagos2-tabla.component.scss']
})
export class Pagos2TablaComponent extends AbstractTable<Pagos2ResponseDto, Pagos2FindDto>
  implements OnInit, TableAbstractClass<Pagos2ResponseDto>, AutocompleteFormInterface {

  calculos: { utilidad: number, participacion10: number, participacion5: number, totalUtilidad: number } = {
    utilidad: 0, participacion10: 0, participacion5: 0, totalUtilidad: 0
  }

  registrosUtilidades: Pagos2ResponseDto[] = [];
  searchBarFormFields: FormField[] = [

    {
      label: 'Trabajador desde',
      placeholder: 'Ej: ...',
      help: 'Seleccione un trabajador desde',
      formControlName: 'trabajadorDesde',
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      autoComplete: {
        field: 'nombre',
        inputId: 'id',
        suggestions: []
      }
    },

    {
      label: 'Trabajador hasta',
      placeholder: 'Ej: ...',
      help: 'Seleccione el trabajador hasta',
      formControlName: 'trabajadorHasta',
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      autoComplete: {
        field: 'nombre',
        inputId: 'id',
        suggestions: []
      }
    },
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

  periodoContableActual: PeriodoContableResponseDto = {};
  periodoLaboralActual: PeriodoLaboralResponseDto = {};


  constructor(
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
    public dialog: MatDialog,
    public httpPagos2Service: HttpPagos2Service,
    public confirmationService: ConfirmationService,
    public httpTrabajadorService: HttpTrabajadorService,
    public httpPeriodoContableService: HttpPeriodoContableService,
    public httpPeriodoLaboralService: HttpPeriodoLaboralService
  ) {
    super(
      httpPagos2Service,
      {
        nombreRegistro: 'Pagos 2',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    this.stablishSkipAndTake(0, TAKE);
    this.obtenerPeriodoContableActual();
    this.obtenerPeriodoLaboralActual();
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    if (this.create) {
      this.blockuiService.habilitarBlockUI();
      this.httpPagos2Service
        .createOne(values as Pagos2CreateDto)
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
            console.error({ error: error, message: "Error creando Pagos 2", data: values });
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpPagos2Service
        .updateById(values as Pagos2UpdateDto, this.recordUpdated.id as number)
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
            console.error({ error: error, message: "Error actualizando Pagos 2", data: values });
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

      if (event.formControlName === 'trabajadorDesde') {
        this.findDto.trabajadorDesde = event.actualValue.idUsuario.apellidos;
      }
      if (event.formControlName === 'trabajadorHasta') {
        this.findDto.trabajadorHasta = event.actualValue.idUsuario.apellidos;
        if (this.findDto.trabajadorDesde && this.findDto.trabajadorHasta) {
          // console.log('otra vez', event.formGroup);

          // if ((this.findDto.trabajadorDesde).localeCompare(this.findDto.trabajadorHasta) < 0) {
          if (this.findDto.trabajadorDesde.split(' ')[0].toUpperCase() > this.findDto.trabajadorHasta.split(' ')[0].toUpperCase()) {

            // event.formGroup.get('trabajadorDesde')?.reset();

            event.formGroup.get('trabajadorHasta')?.reset();
            // delete this.findDto.trabajadorDesde;
            this.searchButtonDisabled = true;
          }
        }
      }

      // Habilitar boton
      if (this.findDto.trabajadorDesde && this.findDto.trabajadorHasta) {
        this.searchButtonDisabled = false;
      } else {
        this.searchButtonDisabled = true;
      }
      console.log('findDto', this.findDto);
    } else {
      // limpiar dto
      this.clearFindDto();
      // Deshabilitar boton
      this.searchButtonDisabled = true;
    }
  }

  obtenerDatos() {
    return new Promise((resolve, reject) => {
      this.blockuiService.blockUiCambio.next(true);
      delete this.findDto.skip;
      delete this.findDto.take;
      this.httpPagos2Service.find(this.findDto).subscribe(
        {
          next: res => {
            if (res[1] > 0) {
              this.registrosUtilidades = res[0];
              this.blockuiService.blockUiCambio.next(false);
              resolve(true);
            } else {
              this.blockuiService.blockUiCambio.next(false);
              reject(false);
            }
          },
          error: err => {
            this.blockuiService.blockUiCambio.next(true);
            reject(false);
          }
        }
      )
    })
  }


  searchAutoComplete(event: SearchAutoCompleteInterface): void {
    switch (event.field.formControlName) {
      case FormPagos2Enum.trabajadorDesde:
        this.buscarAutocomplete(event);
        break;
      case FormPagos2Enum.trabajadorHasta:
        this.buscarAutocomplete(event);
        break;
    }
  }

  buscarAutocomplete(evento: SearchAutoCompleteInterface) {
    const busqueda: TrabajadorFindDto = {
      busqueda: evento.query,
    };
    this.httpTrabajadorService
      .find(busqueda)
      .toPromise()
      .then(res => res as [TrabajadorResponseDto[], number])
      .then(data => {
        // const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        const arregloDatos = data[0].map((a: any) => { a.nombre = a.idUsuario.nombres + ' ' + a.idUsuario.apellidos; return a; });
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


  createOrEdit(record?: Pagos2ResponseDto) {
    const formArray = [
      ...FORM_PAGOS_2(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      this.recordUpdated = { ...record };
      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;
    } else {
      this.create = true;
      this.recordUpdated = undefined;
    }
    this.openDialog(this.createEditFormArray);
  }

  exportPDF() {


    const documento: any = {
      content: [
        {
          text: 'CONSORCIO PRONTIAUTO S A',
          style: 'header',
          margin: [10, 10, 10, 10]
        },
        {
          text: 'CONTROL DE PERSONAL',
          style: 'subHeader',
          margin: [10, 10, 10, 10]
        },
        {
          text: 'Utilidades Anuales',
          style: 'subHeader',
          margin: [10, 10, 10, 10]
        },
        {
          text: `Periodo: ${this.periodoLaboralActual.fechaInicio} - ${this.periodoLaboralActual.fechaFin}`,
          style: 'subHeader',
          margin: [10, 10, 10, 10]
        },
        {
          layout: '', // optional'*', '*', '*', '*'
          table: {
            widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            headerRows: 2,
            // keepWithHeaderRows: 1,
            body: [
              [
                {
                  text: 'Nombres y apellidos',
                  style: 'tableHeader',
                  alignment: 'center'
                },
                {
                  text: 'Documento de identidad',
                  alignment: 'center'
                },
                {
                  text: 'Fecha de ingreso',
                  alignment: 'center'
                },
                {
                  text: 'Días laborados',
                  alignment: 'center'
                },
                {
                  text: 'Utilidades',
                  alignment: 'center',
                },
                {
                  text: 'Préstamos empresa',
                  alignment: 'center',
                },
                {
                  text: 'Total egresos',
                  alignment: 'center',
                },

                {
                  text: 'Valor a pagar',
                  alignment: 'center',
                }
              ],
              // ['', 'Total', '', '', '1000', '1000', '1000', '1000'],             // [

              // [
              //   registro.idTrabajador?.idUsuario?.nombres + ' ' + registro.idTrabajador?.idUsuario?.apellidos,
              //   registro.idTrabajador?.idUsuario?.documentoIdentidad,
              //   registro.idTrabajador?.fechaIngreso,
              //   registro.diasLaboradosAlAnio,
              //   this.calcularUtilidadPorTrabajador(registro.idTrabajador),
              //   registro.prestamosEmpresa,
              //   registro.totalEgresos,
              //   this.calcularValorAPagarPorTrabajador(registro.idTrabajador),

              //   // registro.idPeriodoLaboral.rolPagoCollection[]

              // ],

              ...this.armarArregloRegistrosParaPdfUtilidades(this.registrosUtilidades),

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
        subHeader: {
          fontSize: 13,
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

  exportExcel(registro?: Pagos2ResponseDto) {
    console.log('registro', registro);
    if (!this.findDto.trabajadorDesde && !this.findDto.trabajadorHasta) {
      this.httpPagos2Service.obtenerPagos2Todos()
        .subscribe(
          {
            next: (resp: any) => {
              this.registrosUtilidades = resp[0][0];
            },
            error: err => console.error('no se pudo traer todos los registros de pagos2')
          }
        )
    }
    let hoja = xlsx.utils.table_to_sheet(document.getElementById('tablaPago2'), { cellStyles: true });

    hoja["!cols"] = [
      // {
      //   width: 15,  // width in Excel "Max Digit Width", width*256 is integral
      // },
      // {
      //   width: 15,  // width in Excel "Max Digit Width", width*356 is integral
      // },
      // {
      //   width: 35,  // width in Excel "Max Digit Width", width*356 is integral
      // },
      // {
      //   width: 20,  // width in Excel "Max Digit Width", width*356 is integral
      // },
      // {
      //   width: 35,  // width in Excel "Max Digit Width", width*356 is integral
      // },
    ];


    const workbook = {
      Sheets: {
        'Datos contrato': hoja,
      },
      SheetNames: ['Datos contrato']
    };

    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    console.log('descargarAlgo', excelBuffer);
    this.descargarArchivo(excelBuffer, 'xd');

  }


  descargarArchivo(archivo: any, tipo: any) {
    let EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const filePath = window.URL.createObjectURL(new Blob([archivo], { type: EXCEL_TYPE }));
    const downloadLink = document.createElement('a');
    downloadLink.href = filePath;
    downloadLink.setAttribute('download', `reporte-clientes-contrato`);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }


  calcularUtilidadParticion(idPeriodo: number) {

    this.registrosUtilidades.forEach((registros: Pagos2ResponseDto) => {

      this.calculos.participacion10 += Number(registros.valorNominal);
      this.calculos.participacion5 += Number(registros.otrosIngresos);

      if (registros.idTrabajador) {
        if (registros.idTrabajador.historialLaboralCollection) {
          const historialLaboralCollection = registros.idTrabajador.historialLaboralCollection;
          if (historialLaboralCollection.length > 0) {
            const historicoLaboral = historialLaboralCollection[historialLaboralCollection.length - 1] as HistorialLaboralResponseDto;
            if (historicoLaboral.idCuentaContable) {
              if (historicoLaboral.idCuentaContable.identificador) {
                if (String(historicoLaboral.idCuentaContable.identificador)[0] === '4' && historicoLaboral.idCuentaContable.idPeriodoContable?.id === idPeriodo) {
                  this.calculos.utilidad += Number(historicoLaboral.idCuentaContable.actualSaldo);
                }
                if (String(historicoLaboral.idCuentaContable.identificador)[0] === '5' && historicoLaboral.idCuentaContable.idPeriodoContable?.id === idPeriodo) {
                  this.calculos.utilidad -= Number(historicoLaboral.idCuentaContable.actualSaldo);
                }
              }
            }

          }
        }
      }
    });

  }

  obtenerPeriodoContableActual() {
    const busqueda: PeriodoContableFindDto = {
      esPeriodoActual: 'A',
    }
    this.httpPeriodoContableService.find(busqueda).subscribe(
      {
        next: (resp: [PeriodoContableResponseDto[], number]) => {
          if (resp[1] > 0) {
            this.periodoContableActual = resp[0][0];
          }
        },
        error: (err) => {
          console.error({ mensaje: 'No se pudo traer el periodo cont actual', error: err });
        }
      }
    )
  }

  obtenerPeriodoLaboralActual() {
    const busqueda: PeriodoLaboralFindDto = {
      activo: 'A'
    }
    this.httpPeriodoLaboralService.find(busqueda).subscribe({
      next: (resp) => {
        if (resp[1] > 0) {
          this.periodoLaboralActual = resp[0][0];
        }
      },
      error: (error) => { console.error('No se pudo obtener el periodo laboral actual', error) }
    })
  }

  llenarDatosEnTabla() {
    const idPeriodoActual = this.periodoContableActual.id;
    if (idPeriodoActual) {
      this.calcularUtilidadParticion(idPeriodoActual);
    }
  }

  calcularUtilidadPorTrabajador(registro?: TrabajadorResponseDto) {
    if (!registro) {
      return 0;
    }
    if (!registro.historialLaboralCollection) {
      return 0;
    }

    const ultimoHistorialLaboral = registro.historialLaboralCollection[registro.historialLaboralCollection.length - 1] as HistorialLaboralResponseDto

    if (!ultimoHistorialLaboral.rolPagoCollection) {
      return 0;
    }

    const ultimoRolPago = ultimoHistorialLaboral.rolPagoCollection[ultimoHistorialLaboral.rolPagoCollection.length - 1] as RolPagoResponseDto;
    if (!ultimoRolPago.idHistoricoRol) {
      return 0;
    }
    return ultimoRolPago.idHistoricoRol.totalEgresos;
  }


  calcularValorAPagarPorTrabajador(registro?: TrabajadorResponseDto) {
    if (!registro) {
      return 0;
    }
    if (!registro.historialLaboralCollection) {
      return 0;
    }

    const ultimoHistorialLaboral = registro.historialLaboralCollection[registro.historialLaboralCollection.length - 1] as HistorialLaboralResponseDto

    if (!ultimoHistorialLaboral.rolPagoCollection) {
      return 0;
    }

    const ultimoRolPago = ultimoHistorialLaboral.rolPagoCollection[ultimoHistorialLaboral.rolPagoCollection.length - 1] as RolPagoResponseDto;

    if (!ultimoRolPago.idHistoricoRol) {
      return 0;
    }
    return ultimoRolPago.idHistoricoRol.utilidad;
  }

  armarArregloRegistrosParaPdfUtilidades(registros: Pagos2ResponseDto[]) {
    return registros.map(
      (registro) => [
        registro.idTrabajador?.idUsuario?.nombres + ' ' + registro.idTrabajador?.idUsuario?.apellidos,
        registro.idTrabajador?.idUsuario?.documentoIdentidad,
        registro.idTrabajador?.fechaIngreso,
        registro.diasLaboradosAlAnio,
        this.calcularUtilidadPorTrabajador(registro.idTrabajador),
        registro.prestamosEmpresa,
        registro.totalEgresos,
        this.calcularValorAPagarPorTrabajador(registro.idTrabajador),
      ]
    );
  }



}
