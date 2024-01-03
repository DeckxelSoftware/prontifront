import {Component, OnInit} from '@angular/core';
import {NotaCreditoResponseDto} from '../../servicios/dto/nota-credito.response-dto';
import {NotaCreditoFindDto} from '../../servicios/dto/nota-credito.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpNotaCreditoService} from '../../servicios/http-nota-credito-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup, Validators} from '@angular/forms';
import {NotaCreditoCreateDto} from '../../servicios/dto/nota-credito.create-dto';
import {NotaCreditoUpdateDto} from '../../servicios/dto/nota-credito.update-dto';
import {FormNotaCreditoEnum} from '../../form/form-nota-credito.enum';
import {FORM_NOTA_CREDITO} from '../../form/form-nota-credito';
import {AbstractTable} from '../../../../abstract/table/abstract-table';
import {TAKE} from '../../../../constantes/tabla/take';
import {CreateUpdateModalComponent} from '../../../../componentes/dialog/create-update-modal/create-update-modal.component';
import {MENSAGE_TOAST} from '../../../../constantes/toaster/mensaje-toast';
import {fieldType, FormField, SearchAutoCompleteInterface} from '../../../../componentes/forms/interfaces/form-field';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {TableAbstractClass} from '../../../../abstract/table/interfaces/table-abstract-class';
import {ModalComponent} from '../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import {AutocompleteFormInterface} from '../../../../abstract/table/interfaces/autocomplete-form.interface';
import {CreateUpdateModalParameters} from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import {MatStepperArray} from '../../../../componentes/forms/form-container/interfaces/mat-stepper-array';
import {ActivatedRoute} from '@angular/router';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-nota-credito-tabla',
  templateUrl: './nota-credito-tabla.component.html',
  styleUrls: ['./nota-credito-tabla.component.scss']
})
export class NotaCreditoTablaComponent extends AbstractTable<NotaCreditoResponseDto, NotaCreditoFindDto>
  implements OnInit, TableAbstractClass<NotaCreditoResponseDto>, AutocompleteFormInterface {
  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por identificación o razón social de un comprador, dirección establecimiento, número documento modificado',
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

    {
      label: 'Fecha desde',
      placeholder: 'Ej: mm-dd-yyyy',
      help: 'Seleccione un rango de fechas',
      formControlName: 'desde',
      initialValue: '',
      validators: [
        // Validators.required,
      ],
      type: fieldType.date,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      label: 'Fecha hasta',
      placeholder: 'Ej: mm-dd-yyyy',
      help: '',
      formControlName: 'hasta',
      initialValue: '',
      validators: [
        // Validators.required,
      ],
      type: fieldType.date,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    }

    // {
    //   label: 'Fecha hasta',
    //   placeholder: 'Ej: mm-dd-yyyy',
    //   help: 'Ingrese una fecha emisión',
    //   formControlName: 'inFechaEmision',
    //   initialValue: '',
    //   validators: [
    //     // Validators.required,
    //   ],
    //   type: fieldType.date,
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   column: '6',
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

  constructor(
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
    public dialog: MatDialog,
    public httpNotaCreditoService: HttpNotaCreditoService,
    public confirmationService: ConfirmationService,
    private _activatedRouter: ActivatedRoute
  ) {
    super(
      httpNotaCreditoService,
      {
        nombreRegistro: 'Nota Credito',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    const {numDocModificado} = this._activatedRouter.snapshot.queryParams;
    if (numDocModificado) {
      this.findDto.numDocModificado = numDocModificado;
    }
    this.stablishSkipAndTake(0, TAKE);
    this.tableData = [{
      id: 1,
      itRuc: '0401123',
      itRazonSocial: 'asdfasdf',
      itNombreComercial: 'sdfasdff',
      itCodDoc: '234',
      itEstab: '234234asdf',
      itPtoEmision: '23',
      itNumeroDocumento: '23',
      inIdentificacionComprador: '23',
      inRazonSocialComprador: '234',
      inCodDocModificado: '234',
      inNumDocModificado: '234',
      inDirEstablecimiento: '234',
      inFechaEmision: '234',
      inTotalSinImpuesto: 12,
      inValorModificado: 12,
      inMotivo: 'asdfasf',
      jsonFactura: '{\n' +
        '  "directorioGuardarXML": "${directorioGuardarXML}",\n' +
        '  "directorioGuardarXMLFirmados": "${directorioGuardarXMLFirmados}",\n' +
        '  "nombreArchivoXML": "${nombreArchivoXML}",\n' +
        '  "nombreArchivoXMLFirmado": "${nombreArchivoXMLFirmado}",\n' +
        '  "clave": "${clave}",\n' +
        '  "directorioYNombreArchivoRegistroCivilP12": "${directorioYNombreArchivoRegistroCivilP12}",\n' +
        '  "debug": true,\n' +
        '  "infoTributario": {\n' +
        '    "ambiente": "1",\n' +
        '    "tipoEmision": "1",\n' +
        '    "razonSocial": "PADILLA CAMUENDO LUIS ALFREDO",\n' +
        '    "nombreComercial": "COMERCIAL BRENDA",\n' +
        '    "ruc": "1710361658001",\n' +
        '    "claveAcceso": null,\n' +
        '    "codDoc": "04",\n' +
        '    "estab": "001",\n' +
        '    "ptoEmision": "001",\n' +
        '    "secuencial": "000000016",\n' +
        '    "dirMatriz": "PICHINCHA / QUITO / QUITO/ LLANO CHICO"\n' +
        '  },\n' +
        '  "infoNotaCredito": {\n' +
        '    "fechaEmision": "14/02/2019",\n' +
        '    "dirEstablecimiento": "GRAL. VEINTIMILLA E8-30 Y AV. 6 DE DICIEMBRE",\n' +
        '    "tipoIdentificacionComprador": "04",\n' +
        '    "razonSocialComprador": "BAZAR Y PAPELERIA MEXICO",\n' +
        '    "identificacionComprador": "1800095612001",\n' +
        '    "contribuyenteEspecial": "5368",\n' +
        '    "obligadoContabilidad": "SI",\n' +
        '    "rise": "Contribuyente Régimen Simplificado RISE",\n' +
        '    "codDocModificado": "01",\n' +
        '    "numDocModificado": "001-020-000000007",\n' +
        '    "fechaEmisionDocSustento": "14/02/2019",\n' +
        '    "totalSinImpuestos": "161.79",\n' +
        '    "valorModificacion": "181.20",\n' +
        '    "moneda": "DOLAR",\n' +
        '    "totalConImpuesto": [\n' +
        '      {\n' +
        '        "codigo": "2",\n' +
        '        "codigoPorcentaje": "2",\n' +
        '        "descuentoAdicional": null,\n' +
        '        "baseImponible": "161.79",\n' +
        '        "valor": "19.41",\n' +
        '        "tarifa": null,\n' +
        '        "valorDevolucionIva": null\n' +
        '      }\n' +
        '    ],\n' +
        '    "motivo": "CLIENTE - NO HAY QUIEN RECIBA"\n' +
        '  },\n' +
        '  "detalles": [\n' +
        '    {\n' +
        '      "codigoPrincipal": "0152002",\n' +
        '      "codigoAuxiliar": "7450008864655",\n' +
        '      "descripcion": "ASILICON BARRA MERLETTO 11.2X27 FUNDA/30 UNID",\n' +
        '      "cantidad": "8.00",\n' +
        '      "unidadMedida": null,\n' +
        '      "precioUnitario": "7.75",\n' +
        '      "descuento": "10.46",\n' +
        '      "precioTotalSinImpuesto": "51.54",\n' +
        '      "detallesAdicionales": null,\n' +
        '      "impuestos": [\n' +
        '        {\n' +
        '          "codigo": "2",\n' +
        '          "codigoPorcentaje": "2",\n' +
        '          "tarifa": "12.00",\n' +
        '          "baseImponible": "51.54",\n' +
        '          "valor": "6.18"\n' +
        '        }\n' +
        '      ]\n' +
        '    }\n' +
        '  ],\n' +
        '  "infoAdicional": [{"nombre":"algo","valor":"algovalor"}]'+'\n' +
        '}',
    }]

  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
  }

  parserJsonFactura(jsonString: string){
   const jsonParseFactura = JSON.parse(jsonString);
   return jsonParseFactura;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    if (this.create) {
      this.blockuiService.habilitarBlockUI();
      this.httpNotaCreditoService
        .createOne(values as NotaCreditoCreateDto)
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
            console.error({error: error, message: "Error creando Nota Credito", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpNotaCreditoService
        .updateById(values as NotaCreditoUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Nota Credito", data: values});
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
      console.log('vea', event);
      this.findForm = event.formGroup;
      if (event.formControlName === 'busqueda') {
        this.findDto.busqueda = event.actualValue
      }
      if (event.formControlName === 'sisHabilitado') {
        this.findDto.sisHabilitado = event.actualValue?.sisHabilitado
      }
      if (event.formControlName === 'desde') {
        this.findDto.desde = dayjs(event.actualValue).format('YYYY/MM/DD');
      }
      if (event.formControlName === 'hasta') {
        this.findDto.hasta = dayjs(event.actualValue).format('YYYY/MM/DD');
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
    //   case FormNotaCreditoEnum.generoLibro:
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


  createOrEdit(record?: NotaCreditoResponseDto) {
    const formArray = [
      ...FORM_NOTA_CREDITO(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      this.recordUpdated = {...record};
      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;
    } else {
      this.create = true;
      this.recordUpdated = undefined;
    }
    this.openDialog(this.createEditFormArray);
  }

}
