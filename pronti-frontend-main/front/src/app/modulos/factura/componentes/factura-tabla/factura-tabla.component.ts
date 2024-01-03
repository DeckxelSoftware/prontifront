import {Component, OnInit} from '@angular/core';
import {FacturaResponseDto} from '../../servicios/dto/factura.response-dto';
import {FacturaFindDto} from '../../servicios/dto/factura.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpFacturaService} from '../../servicios/http-factura-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {FacturaCreateDto} from '../../servicios/dto/factura.create-dto';
import {FacturaUpdateDto} from '../../servicios/dto/factura.update-dto';
import {FormFacturaEnum} from '../../form/form-factura.enum';
import {FORM_FACTURA} from '../../form/form-factura';
import {TAKE} from '../../../../constantes/tabla/take';
import {CreateUpdateModalComponent} from '../../../../componentes/dialog/create-update-modal/create-update-modal.component';
import {MENSAGE_TOAST} from '../../../../constantes/toaster/mensaje-toast';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {AutocompleteFormInterface} from '../../../../abstract/table/interfaces/autocomplete-form.interface';
import {CreateUpdateModalParameters} from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import {AbstractTable} from '../../../../abstract/table/abstract-table';
import {fieldType, FormField, SearchAutoCompleteInterface} from '../../../../componentes/forms/interfaces/form-field';
import {TableAbstractClass} from '../../../../abstract/table/interfaces/table-abstract-class';
import {ModalComponent} from '../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import {MatStepperArray} from '../../../../componentes/forms/form-container/interfaces/mat-stepper-array';
import * as dayjs from 'dayjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-factura-tabla',
  templateUrl: './factura-tabla.component.html',
  styleUrls: ['./factura-tabla.component.scss']
})
export class FacturaTablaComponent extends AbstractTable<FacturaResponseDto, FacturaFindDto>
  implements OnInit, TableAbstractClass<FacturaResponseDto>, AutocompleteFormInterface {
  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por Identificación Comprador, Razón Social Comprador, Dirección Establecimiento',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Búsqueda',
      placeholder: 'Ej: 1718...',
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
    public httpFacturaService: HttpFacturaService,
    public confirmationService: ConfirmationService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) {
    super(
      httpFacturaService,
      {
        nombreRegistro: 'Factura',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    const {itNumeroDocumento} = this.activatedRoute.snapshot.queryParams;
    if (itNumeroDocumento) {
      this.findDto.itNumeroDocumento = itNumeroDocumento;
    }
    this.stablishSkipAndTake(0, TAKE);
    this.tableData = [
      {
        itRuc: 'ruc',
        itFactura: 'string',
        itRazonSocial: 'string',
        itNombreComercial: 'string',
        itCodDoc: 'string',
        itEstab: 'string',
        itPtoEmision: 'string',
        itNumeroDocumento: 'string',
        ifIdentificacionComprador: 'string',
        ifRazonSocialComprador: 'string',
        ifDirEstablecimiento: 'string',
        ifFechaEmision: '10/10/2022',
        ifImporteTotal: '181.20',
        jsonFactura: '{"directorioGuardarXML":"directorioGuardarXML","directorioGuardarXMLFirmados":"{directorioGuardarXMLFirmados}","nombreArchivoXML":"{nombreArchivoXML}","nombreArchivoXMLFirmado":"{nombreArchivoXMLFirmado}","clave":"{clave}","directorioYNombreArchivoRegistroCivilP12":"{directorioYNombreArchivoRegistroCivilP12}","debug":true,"infoTributario":{"ambiente":"1","tipoEmision":"1","razonSocial":"PADILLA CAMUENDO LUIS ALFREDO","nombreComercial":"COMERCIAL BRENDA","ruc":"1710361658001","claveAcceso":null,"codDoc":"01","estab":"001","ptoEmision":"001","secuencial":"000000016","dirMatriz":"PICHINCHA / QUITO / QUITO/ LLANO CHICO"},"infoFactura":{"fechaEmision":"13/02/2019","dirEstablecimiento":"PICHINCHA / CAYAMBE / CAYAMBE / ROCAFUERTE N0-45 Y LIBERTAD","contribuyenteEspecial":"0047","obligadoContabilidad":"SI","tipoIdentificacionComprador":"04","guiaRemision":null,"razonSocialComprador":"BAZAR Y PAPELERIA MEXICO","identificacionComprador":"1800095612001","direccionComprador":"CHAMBO 1067 Y GUAYLLABAMBA","totalSinImpuestos":"161.79","totalDescuento":"20.48","totalConImpuestos":[{"codigo":"2","codigoPorcentaje":"2","descuentoAdicional":null,"baseImponible":"161.79","tarifa":null,"valor":"19.41","valorDevolucionIva":null}],"propina":"0.00","importeTotal":"181.20","moneda":"DOLAR","pagos":[{"formaPago":"20","total":"181.20","plazo":"30.00","unidadTiempo":"dias"}],"valorRetIva":"0.00","valorRetRenta":"0.00"},"detalles":[{"codigoPrincipal":"679_73","codigoAuxiliar":null,"unidadMedida":null,"descripcion":"ABRIGO IMPERMIABLE PESADO","cantidad":"8.00","precioUnitario":"7.75","descuento":"10.46","precioTotalSinImpuesto":"51.54","detallesAdicionales":null,"impuestos":[{"codigo":"2","codigoPorcentaje":"2","tarifa":"12.00","baseImponible":"51.54","valor":"6.18"}]},{"codigoPrincipal":"A25-32","codigoAuxiliar":null,"descripcion":"ABRAZADERAS 25/32","cantidad":"17.00","precioUnitario":"2.11","descuento":"5.80","precioTotalSinImpuesto":"30.07","detallesAdicionales":null,"impuestos":[{"codigo":"2","codigoPorcentaje":"2","tarifa":"12.00","baseImponible":"30.07","valor":"3.61"}]}],"infoAdicional":[{"nombre":"DIRECCION","valor":"LLANO CHICO"},{"nombre":"E-MAIL","valor":"asetemp@hotmail.com"},{"nombre":"APELLIDO","valor":"HINOJOSA"},{"nombre":"NOMBRE","valor":"WASHINGTON"},{"nombre":"NOMBRECOMERCIAL","valor":"BESTSYSTEM"},{"nombre":"CIUDAD","valor":"QUITO"},{"nombre":"TELEFONO","valor":"0993530018"},{"nombre":"CELULAR","valor":"0987654321"},{"nombre":"PLAZO","valor":"1.00"},{"nombre":"DIAS","valor":"30.00"},{"nombre":"TARIFAIMP","valor":"12.00"}]}'
      }

    ]
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
      this.httpFacturaService
        .createOne(values as FacturaCreateDto)
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
            console.error({error: error, message: "Error creando Factura", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpFacturaService
        .updateById(values as FacturaUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Factura", data: values});
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
      if (event.formControlName === 'desde') {
        // this.findDto.desde = dayjs(event.actualValue).format('YYYY/MM/DD');
        this.findDto.desde = event.actualValue;
      }
      if (event.formControlName === 'hasta') {
        // this.findDto.hasta = dayjs(event.actualValue).format('YYYY/MM/DD');
        this.findDto.hasta = event.actualValue;
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
    //   case FormFacturaEnum.generoLibro:
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


  createOrEdit(record?: FacturaResponseDto) {
    const formArray = [
      ...FORM_FACTURA(),
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
