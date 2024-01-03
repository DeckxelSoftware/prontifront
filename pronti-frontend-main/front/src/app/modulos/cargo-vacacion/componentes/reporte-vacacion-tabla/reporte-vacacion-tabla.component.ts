
import { Component, Input, OnInit } from '@angular/core';
import { CargoVacacionResponseDto } from '../../servicios/dto/cargo-vacacion.response-dto';
import { CargoVacacionFindDto } from '../../servicios/dto/cargo-vacacion.find-dto';
import { MatDialog } from '@angular/material/dialog';
import { HttpCargoVacacionService } from '../../servicios/http-cargo-vacacion-service';
import { ConfirmationService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { CargoVacacionCreateDto } from '../../servicios/dto/cargo-vacacion.create-dto';
import { CargoVacacionUpdateDto } from '../../servicios/dto/cargo-vacacion.update-dto';
import { FORM_CARGO_VACACION } from '../../form/form-cargo-vacacion';
import { TAKE } from '../../../../constantes/tabla/take';
import {
  CreateUpdateModalComponent
} from '../../../../componentes/dialog/create-update-modal/create-update-modal.component';
import { MENSAGE_TOAST } from '../../../../constantes/toaster/mensaje-toast';
import { BlockuiService } from '../../../../servicios/block-ui/blockui.service';
import { LogsMlabsService } from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import { AutocompleteFormInterface } from '../../../../abstract/table/interfaces/autocomplete-form.interface';
import {
  CreateUpdateModalParameters
} from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import { AbstractTable } from '../../../../abstract/table/abstract-table';
import { fieldType, FormField, SearchAutoCompleteInterface } from '../../../../componentes/forms/interfaces/form-field';
import { TableAbstractClass } from '../../../../abstract/table/interfaces/table-abstract-class';
import { ModalComponent } from '../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import { MatStepperArray } from '../../../../componentes/forms/form-container/interfaces/mat-stepper-array';
import { ModalConfirmacionComponent } from '../../../../shared/modal-confirmacion/modal-confirmacion.component';
import { ActivoInactivo } from '../../../../enums/activo-inactivo';
import { ActivatedRoute, Router } from '@angular/router';
import * as dayjs from 'dayjs'
import {
  HttpConfiguracionGeneralService
} from '../../../configuracion-general/servicios/http-configuracion-general-service';
import { TrabajadorResponseDto } from '../../../trabajador/servicios/dto/trabajador.response-dto';
import { HttpTrabajadorService } from '../../../trabajador/servicios/http-trabajador-service';
import {
  ConfiguracionGeneralResponseDto
} from '../../../configuracion-general/servicios/dto/configuracion-general.response-dto';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ToasterTipo } from '../../../../servicios/logs-mensajes/enums/toaster-tipo';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-reporte-vacacion-tabla',
  templateUrl: './reporte-vacacion-tabla.component.html',
  styleUrls: ['./reporte-vacacion-tabla.component.scss']
})
export class ReporteVacacionTablaComponent extends AbstractTable<CargoVacacionResponseDto, CargoVacacionFindDto>
  implements OnInit, TableAbstractClass<CargoVacacionResponseDto>, AutocompleteFormInterface {
  idTrabajador!: number;

  @Input()
  mostrarBuscador?= false;

  trabajador: TrabajadorResponseDto = {};
  configuracionGeneral: ConfiguracionGeneralResponseDto = {};

  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por trabajador',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Busqueda',
      placeholder: 'Ej: ...',
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
    public httpCargoVacacionService: HttpCargoVacacionService,
    public confirmationService: ConfirmationService,
    public matDialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    private _router: Router,
    private _httpConfiguracionGeneralService: HttpConfiguracionGeneralService,
    private _httpTrabajadorService: HttpTrabajadorService,
  ) {
    super(
      httpCargoVacacionService,
      {
        nombreRegistro: 'Cargo Vacación',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    const { idTrabajador } = this.activatedRoute.snapshot.params;
    if (idTrabajador) {
      this.idTrabajador = +idTrabajador;
      this.findDto.idTrabajador = this.idTrabajador;
    }
    this.stablishSkipAndTake(0, TAKE);
    this.obtenerInformacionTrabajador();
    this.obtenerInformacionConfiguracionGeneral();
  }

  obtenerInformacionTrabajador() {
    this.blockuiService.habilitarBlockUI();
    this._httpTrabajadorService.find({ id: this.idTrabajador }).subscribe(
      {
        next: (value) => {
          this.trabajador = value[0][0];
          console.log(value);

          this.blockuiService.deshabilitarBlockUI();
        },
        error: err => {
          this.blockuiService.deshabilitarBlockUI();
          console.error('no se pudo traer al trabajor', err);
        }
      }
    )

  }

  obtenerInformacionConfiguracionGeneral() {
    this.blockuiService.habilitarBlockUI();
    this._httpConfiguracionGeneralService.find({ id: 1 }).subscribe(
      {
        next: (value) => {
          this.blockuiService.deshabilitarBlockUI();
          this.configuracionGeneral = value[0][0];
          console.log('conf', this.configuracionGeneral);
        },
        error: err => {
          this.blockuiService.deshabilitarBlockUI();
          console.error('no se pudo traer la configuracion general', err);

        }
      }
    )
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
      values.idTrabajador = this.idTrabajador;
      this.blockuiService.habilitarBlockUI();
      this.httpCargoVacacionService
        .createOne(values as CargoVacacionCreateDto)
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
            console.error({ error: error, message: "Error creando Cargo Vacacion", data: values });
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpCargoVacacionService
        .updateById(values as CargoVacacionUpdateDto, this.recordUpdated.id as number)
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
            console.error({ error: error, message: "Error actualizando Cargo Vacacion", data: values });
          },
        });
    }
  }

  fieldModalChanged(event: FormField, enableButton: ModalComponent): void {

    // event.formGroup.get('diasTeoricos')?.disable();
    // event.formGroup.get('valorVacacion')?.disable();
    // event.formGroup.get('diasVacaciones')?.disable();

    if (event.formControlName === 'fechaDesde') {
      const nuevaFecha = dayjs(event.formGroup.get('fechaDesde')?.value).add(364, 'd');
      event.formGroup.get('fechaHasta')?.setValue(dayjs(nuevaFecha).format('YYYY-MM-DD'));
    }

    // if (event.formControlName === 'diasAntiguedad') {
    //   const diasVacaciones = event.formGroup.get('diasVacaciones')?.value;
    //   const diasAntiguedad = event.formGroup.get('diasAntiguedad')?.value;
    //   event.formGroup.get('diasTeoricos')?.setValue(diasVacaciones + diasAntiguedad);
    // }


    if (event.formControlName === 'diasTomados') {
      const diasTeoricos = event.formGroup.get('diasTeoricos')?.value;
      const diasTomados = event.formGroup.get('diasTomados')?.value;
      event.formGroup.get('diasSaldo')?.setValue(diasTeoricos - diasTomados);
    }

    if (event.formControlName === 'totalIngresosAnio') {
      const totalIngresos = event.formGroup.get('totalIngresosAnio')?.value;
      event.formGroup.get('valorVacacion')?.setValue(+(totalIngresos / 24).toFixed(2));
      const valorVacacion = event.formGroup.get('valorVacacion')?.value;
      const diasVacaciones = event.formGroup.get('diasVacaciones')?.value;
      event.formGroup.get('valorDias')?.setValue(valorVacacion / diasVacaciones);

      // valores de antiguedad
      const valorDias = event.formGroup.get('valorDias')?.value;
      const diasAntiguedad = event.formGroup.get('diasAntiguedad')?.value;
      event.formGroup.get('valorAntiguedad')?.setValue(+(valorDias * diasAntiguedad).toFixed(2));
      const valorAntiguedad = event.formGroup.get('valorAntiguedad')?.value;
      event.formGroup.get('valorTeorico')?.setValue(valorAntiguedad + valorVacacion);

    }


    if (event.formControlName === 'diasTomados') {
      const valorDias = event.formGroup.get('valorDias')?.value;
      const diasTomados = event.formGroup.get('diasTomados')?.value;
      event.formGroup.get('valorTomado')?.setValue(+(valorDias * diasTomados).toFixed(2));


      const valorTeorico = event.formGroup.get('valorTeorico')?.value;
      const valorTomado = event.formGroup.get('valorTomado')?.value;
      event.formGroup.get('valorSaldo')?.setValue(valorTeorico - valorTomado);
    }


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
    event.formGroup.get('diasVacaciones')?.disable();
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
    // switch (event.field.formControlName) {
    //   case FormCargoVacacionEnum.generoLibro:
    //     this.buscarAutocomplete(event);
    // }
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


  createOrEdit(record?: CargoVacacionResponseDto) {
    const formArray = [
      ...FORM_CARGO_VACACION(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      this.recordUpdated = { ...record };
      this.recordUpdated.fechaDesde = this.recordUpdated.fechaDesde.split('T')[0];
      this.recordUpdated.fechaHasta = this.recordUpdated.fechaHasta.split('T')[0];
      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;
    } else {
      this.create = true;
      const objetoCargoVacacion: Partial<CargoVacacionCreateDto> = {};
      objetoCargoVacacion.diasVacaciones = this.configuracionGeneral.numDiasVacacionesAlAnio;
      const esPrimerRegistro = this.tableData.length === 0;

      objetoCargoVacacion.fechaDesde = dayjs(this.trabajador.fechaIngreso).format('YYYY-MM-DD');
      if (esPrimerRegistro) {

        objetoCargoVacacion.fechaHasta = dayjs(this.trabajador.fechaIngreso).add(364).format('YYYY-MM-DD');

      } else {
        // ya ha tenido antes vacaciones
        objetoCargoVacacion.fechaHasta = dayjs(this.trabajador.fechaIngreso).add(365).format('YYYY-MM-DD');
      }

      objetoCargoVacacion.numAnioAcumulado = dayjs().diff(objetoCargoVacacion.fechaDesde, 'y');

      if (objetoCargoVacacion.numAnioAcumulado <= 5) {
        objetoCargoVacacion.diasAntiguedad = 0;
      } else {
        // consulto el ultimo registro para ver que diasTiene el ultimo diasAntiguiedad?
        const diasAntiguedadUltimo = this.tableData[this.tableData.length - 1].diasAntiguedad || 0;
        if (diasAntiguedadUltimo < 15) {
          objetoCargoVacacion.diasAntiguedad = diasAntiguedadUltimo + 1;
        } else {
          objetoCargoVacacion.diasAntiguedad = diasAntiguedadUltimo;
        }
      }

      // @ts-ignore
      objetoCargoVacacion.diasTeoricos = objetoCargoVacacion.diasAntiguedad + objetoCargoVacacion.diasVacaciones;
      // console.log(objetoCargoVacacion)

      this.recordUpdated = { ...objetoCargoVacacion };

      this.fillForm(this.recordUpdated, this.createEditFormArray);

    }
    this.openDialog(this.createEditFormArray);
  }

  abrirModalConfirmacionCrear() {
    const dialogRef = this.matDialog.open(ModalConfirmacionComponent, {
      data: {
        mensaje: '¿Desea continuar?', // se puede enviar este key pra el detalle
        titulo: 'Confirmación',
        mostrarBotonAceptar: true,
        mostrarBotonCancelar: true,
        textoBotonAceptar: 'Continuar',
        textoBotonCancelar: 'Cancelar'
      }
    })
    dialogRef.afterClosed()
      .subscribe(
        {
          next: res => {
            if (res) {
              console.log('acepto');
            }
          },
        }
      )
  }

  irARegistroVacaciones(registro: any) {
    // /personal/trabajadores-modulo/1/reporte-vacacion-modulo/1/registro-vacacion-modulo/registro-vacacion
    const { idTrabajador } = this.activatedRoute.snapshot.params;
    this._router.navigate([
      'personal',
      'trabajadores-modulo',
      idTrabajador,
      'reporte-vacacion-modulo',
      registro.id,
      'registro-vacacion-modulo'
    ])
  }

  exportPdf(cargoVacacion: CargoVacacionResponseDto) {
    if (cargoVacacion.diasSaldo && cargoVacacion?.diasSaldo > 0) {
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
            text: 'Informe de vacaciones',
            style: 'subHeader',
            margin: [10, 10, 10, 10]
          },
          {
            layout: '', // optional'*', '*', '*', '*'
            table: {
              widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
              headerRows: 2,
              // keepWithHeaderRows: 1,
              body: [
                [
                  {
                    text: 'Nombres y apellidos',
                    style: 'tableHeader',
                    colSpan: 1,
                    rowSpan: 2,
                    alignment: 'center'
                  },
                  {
                    text: 'DÍAS',
                    colSpan: 3,
                    alignment: 'center'
                  },
                  {}, {},
                  {
                    text: 'VALORES',
                    alignment: 'center',
                    colSpan: 3
                  },
                  {}, {}
                ],
                ['', 'Días de vacaciones', 'Días tomados', 'Días saldo', 'Total ingreso', 'Valor vacación', 'Valor saldo'],             // [

                // ['', '', '', '', '', '', ''],             // [
                [`${cargoVacacion.idTrabajador.idUsuario.nombres} ${cargoVacacion.idTrabajador.idUsuario.apellidos}`,
                String(cargoVacacion.diasVacaciones),
                String(cargoVacacion.diasTomados),
                String(cargoVacacion.diasSaldo),
                '$ ' + String(cargoVacacion.totalIngresosAnio),
                '$ ' + String(cargoVacacion.valorVacacion),
                '$ ' + String(cargoVacacion.valorSaldo)
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

    } else {
      this.logsMlabsService.toaster({ tipo: ToasterTipo.warning ,
      titulo: 'Reporte vacaciones', mensaje: 'El trabajador no cumple el requerisito para descargar el reporte'});
    }

  }


  async generarPdfTodosVacaciones() {
    let arregloArregloPdfCargo = await this.obtenerTodosRegistrosVacaciones();


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
          text: 'Informe de vacaciones',
          style: 'subHeader',
          margin: [10, 10, 10, 10]
        },
        {
          layout: '', // optional'*', '*', '*', '*'
          table: {
            widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            headerRows: 2,
            // keepWithHeaderRows: 1,
            body: [
              [
                {
                  text: 'Nombres y apellidos',
                  style: 'tableHeader',
                  colSpan: 1,
                  rowSpan: 2,
                  alignment: 'center'
                },
                {
                  text: 'DÍAS',
                  colSpan: 3,
                  alignment: 'center'
                },
                {}, {},
                {
                  text: 'VALORES',
                  alignment: 'center',
                  colSpan: 3
                },
                {}, {}
              ],
              ['', 'Días de vacaciones', 'Días tomados', 'Días saldo', 'Total ingreso', 'Valor vacación', 'Valor saldo'],             // [
              ...arregloArregloPdfCargo,

              // [`${cargoVacacion.idTrabajador.idUsuario.nombres} ${cargoVacacion.idTrabajador.idUsuario.apellidos}`,
              // String(cargoVacacion.diasVacaciones),
              // String(cargoVacacion.diasTomados),
              // String(cargoVacacion.diasSaldo),
              // '$ ' + String(cargoVacacion.totalIngresosAnio),
              // '$ ' + String(cargoVacacion.valorVacacion),
              // '$ ' + String(cargoVacacion.valorSaldo)
              // ]

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

  obtenerTodosRegistrosVacaciones(): Promise<[string[]] | []> {

    return new Promise((resolve, reject) => {

      this.httpCargoVacacionService.obtenerTodosCargoVacacion().subscribe({
        next: (resp: any) => {
          if (resp) {
            const arregloArregloCv = resp[0][0]
              .filter((cargoVacacion: CargoVacacionResponseDto | any) => {
                return cargoVacacion?.diasSaldo > 0;
              }).map((cargoVacacion: CargoVacacionResponseDto) => {
                return [`${cargoVacacion.idTrabajador.idUsuario.nombres} ${cargoVacacion.idTrabajador.idUsuario.apellidos}`,
                String(cargoVacacion.diasVacaciones),
                String(cargoVacacion.diasTomados),
                String(cargoVacacion.diasSaldo),
                '$ ' + String(cargoVacacion.totalIngresosAnio),
                '$ ' + String(cargoVacacion.valorVacacion),
                '$ ' + String(cargoVacacion.valorSaldo)
                ]
              });
            resolve(arregloArregloCv);
          } else {
            resolve([]);
          }
        },
        error: err => {
          reject([]);
          console.error('No se pudo consultar las vacaciones de todos los empleados', err);
        }
      })

    })
  }
}

