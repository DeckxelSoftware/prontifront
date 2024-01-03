import {Component, OnInit} from '@angular/core';
import {AbstractTable} from "../../../../abstract/table/abstract-table";
import {CobroResponseDto} from "../../servicios/dto/cobro.response-dto";
import {CobroFindDto} from "../../servicios/dto/cobro.find-dto";
import {TableAbstractClass} from "../../../../abstract/table/interfaces/table-abstract-class";
import {AutocompleteFormInterface} from "../../../../abstract/table/interfaces/autocomplete-form.interface";
import {fieldType, FormField, SearchAutoCompleteInterface} from "../../../../componentes/forms/interfaces/form-field";
import {BlockuiService} from "../../../../servicios/block-ui/blockui.service";
import {LogsMlabsService} from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import {MatDialog} from "@angular/material/dialog";
import {HttpCobroService} from "../../servicios/http-cobro-service";
import {ConfirmationService} from "primeng/api";
import {TAKE} from "../../../../constantes/tabla/take";
import {TipoDetallePagoEnum} from "../../../../enums/tipo-detalle-pago.enum";
import {ModalComponent} from "../../../../componentes/dialog/create-update-modal/interfaces/modal-component";
import {CobroCreateDto} from "../../servicios/dto/cobro.create-dto";
import {MENSAGE_TOAST} from "../../../../constantes/toaster/mensaje-toast";
import {CobroUpdateDto} from "../../servicios/dto/cobro.update-dto";
import {FormGroup} from "@angular/forms";
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";
import {
  CreateUpdateModalParameters
} from "../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters";
import {
  CreateUpdateModalComponent
} from "../../../../componentes/dialog/create-update-modal/create-update-modal.component";
import {FORM_COBRO} from "../../form/form-cobro";

@Component({
  selector: 'app-tabla-cuentas-por-cobrar',
  templateUrl: './tabla-cuentas-por-cobrar.component.html',
  styleUrls: ['./tabla-cuentas-por-cobrar.component.scss']
})
export class TablaCuentasPorCobrarComponent extends AbstractTable<CobroResponseDto, CobroFindDto>
  implements OnInit, TableAbstractClass<CobroResponseDto>, AutocompleteFormInterface {
  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por nombres, apellidos o documento',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Busqueda',
      placeholder: 'Ej: 1717...',
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
    public httpCobroService: HttpCobroService,
    public confirmationService: ConfirmationService,
  ) {
    super(
      httpCobroService,
      {
        nombreRegistro: 'Cobro',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    this.stablishSkipAndTake(0, TAKE);
    // this.tableData = [
    //   {
    //     valorACobrar: 700,
    //     id: 1,
    //     idContrato: {
    //       nombresCliente: 'Nombrecito',
    //       apellidosCliente: 'Apellidos',
    //       idClienteEnGrupo: {
    //         idCliente: {
    //           idUsuario: {
    //             numeroDocumento: '1724040595'
    //           }
    //         }
    //       }
    //     },
    //     pagoCollection: [
    //       {
    //         valor: 500,
    //         numeroDocumento: '23',
    //         tipoDocumento: 'Transeferencia',
    //         id: 1,
    //         detallePago: [
    //           {
    //             numeroCuota: 2,
    //             valor: 80,
    //             tipo: TipoDetallePagoEnum.rastreo,
    //             idItemCobroPago: 1,
    //             idFactura: {
    //               ifRazonSocialComprador: 'Razoncita',
    //               jsonFactura: '{"directorioGuardarXML":"${directorioGuardarXML}","directorioGuardarXMLFirmados":"${directorioGuardarXMLFirmados}","nombreArchivoXML":"${nombreArchivoXML}","nombreArchivoXMLFirmado":"${nombreArchivoXMLFirmado}","clave":"${clave}","directorioYNombreArchivoRegistroCivilP12":"${directorioYNombreArchivoRegistroCivilP12}","debug":true,"infoTributario":{"ambiente":"1","tipoEmision":"1","razonSocial":"PADILLA CAMUENDO LUIS ALFREDO","nombreComercial":"COMERCIAL BRENDA","ruc":"1710361658001","claveAcceso":null,"codDoc":"01","estab":"001","ptoEmision":"001","secuencial":"000000016","dirMatriz":"PICHINCHA / QUITO / QUITO/ LLANO CHICO"},"infoFactura":{"fechaEmision":"13/02/2019","dirEstablecimiento":"PICHINCHA / CAYAMBE / CAYAMBE / ROCAFUERTE N0-45 Y LIBERTAD","contribuyenteEspecial":"0047","obligadoContabilidad":"SI","tipoIdentificacionComprador":"04","guiaRemision":null,"razonSocialComprador":"BAZAR Y PAPELERIA MEXICO","identificacionComprador":"1800095612001","direccionComprador":"CHAMBO 1067 Y GUAYLLABAMBA","totalSinImpuestos":"161.79","totalDescuento":"20.48","totalConImpuestos":[{"codigo":"2","codigoPorcentaje":"2","descuentoAdicional":null,"baseImponible":"161.79","tarifa":null,"valor":"19.41","valorDevolucionIva":null}],"propina":"0.00","importeTotal":"181.20","moneda":"DOLAR","pagos":[{"formaPago":"20","total":"181.20","plazo":"30.00","unidadTiempo":"dias"}],"valorRetIva":"0.00","valorRetRenta":"0.00"},"detalles":[{"codigoPrincipal":"679_73","codigoAuxiliar":null,"unidadMedida":null,"descripcion":"ABRIGO IMPERMIABLE PESADO","cantidad":"8.00","precioUnitario":"7.75","descuento":"10.46","precioTotalSinImpuesto":"51.54","detallesAdicionales":null,"impuestos":[{"codigo":"2","codigoPorcentaje":"2","tarifa":"12.00","baseImponible":"51.54","valor":"6.18"}]},{"codigoPrincipal":"A25-32","codigoAuxiliar":null,"descripcion":"ABRAZADERAS 25/32","cantidad":"17.00","precioUnitario":"2.11","descuento":"5.80","precioTotalSinImpuesto":"30.07","detallesAdicionales":null,"impuestos":[{"codigo":"2","codigoPorcentaje":"2","tarifa":"12.00","baseImponible":"30.07","valor":"3.61"}]}],"infoAdicional":[{"nombre":"DIRECCION","valor":"LLANO CHICO"},{"nombre":"E-MAIL","valor":"asetemp@hotmail.com"},{"nombre":"APELLIDO","valor":"HINOJOSA"},{"nombre":"NOMBRE","valor":"WASHINGTON"},{"nombre":"NOMBRECOMERCIAL","valor":"BESTSYSTEM"},{"nombre":"CIUDAD","valor":"QUITO"},{"nombre":"TELEFONO","valor":"0993530018"},{"nombre":"CELULAR","valor":"0987654321"},{"nombre":"PLAZO","valor":"1.00"},{"nombre":"DIAS","valor":"30.00"},{"nombre":"TARIFAIMP","valor":"12.00"}]}'
    //             }
    //           },
    //           {
    //             numeroCuota: 2,
    //             valor: 420,
    //             tipo: TipoDetallePagoEnum.rastreo,
    //             idItemCobroPago: 2,
    //             idFactura: {
    //               ifRazonSocialComprador: 'Razoncita',
    //               jsonFactura: '{"directorioGuardarXML":"${directorioGuardarXML}","directorioGuardarXMLFirmados":"${directorioGuardarXMLFirmados}","nombreArchivoXML":"${nombreArchivoXML}","nombreArchivoXMLFirmado":"${nombreArchivoXMLFirmado}","clave":"${clave}","directorioYNombreArchivoRegistroCivilP12":"${directorioYNombreArchivoRegistroCivilP12}","debug":true,"infoTributario":{"ambiente":"1","tipoEmision":"1","razonSocial":"PADILLA CAMUENDO LUIS ALFREDO","nombreComercial":"COMERCIAL BRENDA","ruc":"1710361658001","claveAcceso":null,"codDoc":"01","estab":"001","ptoEmision":"001","secuencial":"000000016","dirMatriz":"PICHINCHA / QUITO / QUITO/ LLANO CHICO"},"infoFactura":{"fechaEmision":"13/02/2019","dirEstablecimiento":"PICHINCHA / CAYAMBE / CAYAMBE / ROCAFUERTE N0-45 Y LIBERTAD","contribuyenteEspecial":"0047","obligadoContabilidad":"SI","tipoIdentificacionComprador":"04","guiaRemision":null,"razonSocialComprador":"BAZAR Y PAPELERIA MEXICO","identificacionComprador":"1800095612001","direccionComprador":"CHAMBO 1067 Y GUAYLLABAMBA","totalSinImpuestos":"161.79","totalDescuento":"20.48","totalConImpuestos":[{"codigo":"2","codigoPorcentaje":"2","descuentoAdicional":null,"baseImponible":"161.79","tarifa":null,"valor":"19.41","valorDevolucionIva":null}],"propina":"0.00","importeTotal":"181.20","moneda":"DOLAR","pagos":[{"formaPago":"20","total":"181.20","plazo":"30.00","unidadTiempo":"dias"}],"valorRetIva":"0.00","valorRetRenta":"0.00"},"detalles":[{"codigoPrincipal":"679_73","codigoAuxiliar":null,"unidadMedida":null,"descripcion":"ABRIGO IMPERMIABLE PESADO","cantidad":"8.00","precioUnitario":"7.75","descuento":"10.46","precioTotalSinImpuesto":"51.54","detallesAdicionales":null,"impuestos":[{"codigo":"2","codigoPorcentaje":"2","tarifa":"12.00","baseImponible":"51.54","valor":"6.18"}]},{"codigoPrincipal":"A25-32","codigoAuxiliar":null,"descripcion":"ABRAZADERAS 25/32","cantidad":"17.00","precioUnitario":"2.11","descuento":"5.80","precioTotalSinImpuesto":"30.07","detallesAdicionales":null,"impuestos":[{"codigo":"2","codigoPorcentaje":"2","tarifa":"12.00","baseImponible":"30.07","valor":"3.61"}]}],"infoAdicional":[{"nombre":"DIRECCION","valor":"LLANO CHICO"},{"nombre":"E-MAIL","valor":"asetemp@hotmail.com"},{"nombre":"APELLIDO","valor":"HINOJOSA"},{"nombre":"NOMBRE","valor":"WASHINGTON"},{"nombre":"NOMBRECOMERCIAL","valor":"BESTSYSTEM"},{"nombre":"CIUDAD","valor":"QUITO"},{"nombre":"TELEFONO","valor":"0993530018"},{"nombre":"CELULAR","valor":"0987654321"},{"nombre":"PLAZO","valor":"1.00"},{"nombre":"DIAS","valor":"30.00"},{"nombre":"TARIFAIMP","valor":"12.00"}]}'
    //             }
    //           }
    //         ]
    //       },
    //       {
    //         valor: 200,
    //         numeroDocumento: '2',
    //         tipoDocumento: 'Deposito',
    //         id: 2,
    //         detallePago: [
    //           {
    //             numeroCuota: 3,
    //             valor: 100,
    //             tipo: TipoDetallePagoEnum.rastreo,
    //             idItemCobroPago: 1,
    //             idFactura: {
    //               ifRazonSocialComprador: 'Razoncita',
    //               jsonFactura: '{"directorioGuardarXML":"${directorioGuardarXML}","directorioGuardarXMLFirmados":"${directorioGuardarXMLFirmados}","nombreArchivoXML":"${nombreArchivoXML}","nombreArchivoXMLFirmado":"${nombreArchivoXMLFirmado}","clave":"${clave}","directorioYNombreArchivoRegistroCivilP12":"${directorioYNombreArchivoRegistroCivilP12}","debug":true,"infoTributario":{"ambiente":"1","tipoEmision":"1","razonSocial":"PADILLA CAMUENDO LUIS ALFREDO","nombreComercial":"COMERCIAL BRENDA","ruc":"1710361658001","claveAcceso":null,"codDoc":"01","estab":"001","ptoEmision":"001","secuencial":"000000016","dirMatriz":"PICHINCHA / QUITO / QUITO/ LLANO CHICO"},"infoFactura":{"fechaEmision":"13/02/2019","dirEstablecimiento":"PICHINCHA / CAYAMBE / CAYAMBE / ROCAFUERTE N0-45 Y LIBERTAD","contribuyenteEspecial":"0047","obligadoContabilidad":"SI","tipoIdentificacionComprador":"04","guiaRemision":null,"razonSocialComprador":"BAZAR Y PAPELERIA MEXICO","identificacionComprador":"1800095612001","direccionComprador":"CHAMBO 1067 Y GUAYLLABAMBA","totalSinImpuestos":"161.79","totalDescuento":"20.48","totalConImpuestos":[{"codigo":"2","codigoPorcentaje":"2","descuentoAdicional":null,"baseImponible":"161.79","tarifa":null,"valor":"19.41","valorDevolucionIva":null}],"propina":"0.00","importeTotal":"181.20","moneda":"DOLAR","pagos":[{"formaPago":"20","total":"181.20","plazo":"30.00","unidadTiempo":"dias"}],"valorRetIva":"0.00","valorRetRenta":"0.00"},"detalles":[{"codigoPrincipal":"679_73","codigoAuxiliar":null,"unidadMedida":null,"descripcion":"ABRIGO IMPERMIABLE PESADO","cantidad":"8.00","precioUnitario":"7.75","descuento":"10.46","precioTotalSinImpuesto":"51.54","detallesAdicionales":null,"impuestos":[{"codigo":"2","codigoPorcentaje":"2","tarifa":"12.00","baseImponible":"51.54","valor":"6.18"}]},{"codigoPrincipal":"A25-32","codigoAuxiliar":null,"descripcion":"ABRAZADERAS 25/32","cantidad":"17.00","precioUnitario":"2.11","descuento":"5.80","precioTotalSinImpuesto":"30.07","detallesAdicionales":null,"impuestos":[{"codigo":"2","codigoPorcentaje":"2","tarifa":"12.00","baseImponible":"30.07","valor":"3.61"}]}],"infoAdicional":[{"nombre":"DIRECCION","valor":"LLANO CHICO"},{"nombre":"E-MAIL","valor":"asetemp@hotmail.com"},{"nombre":"APELLIDO","valor":"HINOJOSA"},{"nombre":"NOMBRE","valor":"WASHINGTON"},{"nombre":"NOMBRECOMERCIAL","valor":"BESTSYSTEM"},{"nombre":"CIUDAD","valor":"QUITO"},{"nombre":"TELEFONO","valor":"0993530018"},{"nombre":"CELULAR","valor":"0987654321"},{"nombre":"PLAZO","valor":"1.00"},{"nombre":"DIAS","valor":"30.00"},{"nombre":"TARIFAIMP","valor":"12.00"}]}'
    //             }
    //           },
    //           {
    //             numeroCuota: 3,
    //             valor: 100,
    //             tipo: TipoDetallePagoEnum.rastreo,
    //             idItemCobroPago: 2,
    //             idFactura: {
    //               ifRazonSocialComprador: 'Razoncita',
    //               jsonFactura: '{"directorioGuardarXML":"${directorioGuardarXML}","directorioGuardarXMLFirmados":"${directorioGuardarXMLFirmados}","nombreArchivoXML":"${nombreArchivoXML}","nombreArchivoXMLFirmado":"${nombreArchivoXMLFirmado}","clave":"${clave}","directorioYNombreArchivoRegistroCivilP12":"${directorioYNombreArchivoRegistroCivilP12}","debug":true,"infoTributario":{"ambiente":"1","tipoEmision":"1","razonSocial":"PADILLA CAMUENDO LUIS ALFREDO","nombreComercial":"COMERCIAL BRENDA","ruc":"1710361658001","claveAcceso":null,"codDoc":"01","estab":"001","ptoEmision":"001","secuencial":"000000016","dirMatriz":"PICHINCHA / QUITO / QUITO/ LLANO CHICO"},"infoFactura":{"fechaEmision":"13/02/2019","dirEstablecimiento":"PICHINCHA / CAYAMBE / CAYAMBE / ROCAFUERTE N0-45 Y LIBERTAD","contribuyenteEspecial":"0047","obligadoContabilidad":"SI","tipoIdentificacionComprador":"04","guiaRemision":null,"razonSocialComprador":"BAZAR Y PAPELERIA MEXICO","identificacionComprador":"1800095612001","direccionComprador":"CHAMBO 1067 Y GUAYLLABAMBA","totalSinImpuestos":"161.79","totalDescuento":"20.48","totalConImpuestos":[{"codigo":"2","codigoPorcentaje":"2","descuentoAdicional":null,"baseImponible":"161.79","tarifa":null,"valor":"19.41","valorDevolucionIva":null}],"propina":"0.00","importeTotal":"181.20","moneda":"DOLAR","pagos":[{"formaPago":"20","total":"181.20","plazo":"30.00","unidadTiempo":"dias"}],"valorRetIva":"0.00","valorRetRenta":"0.00"},"detalles":[{"codigoPrincipal":"679_73","codigoAuxiliar":null,"unidadMedida":null,"descripcion":"ABRIGO IMPERMIABLE PESADO","cantidad":"8.00","precioUnitario":"7.75","descuento":"10.46","precioTotalSinImpuesto":"51.54","detallesAdicionales":null,"impuestos":[{"codigo":"2","codigoPorcentaje":"2","tarifa":"12.00","baseImponible":"51.54","valor":"6.18"}]},{"codigoPrincipal":"A25-32","codigoAuxiliar":null,"descripcion":"ABRAZADERAS 25/32","cantidad":"17.00","precioUnitario":"2.11","descuento":"5.80","precioTotalSinImpuesto":"30.07","detallesAdicionales":null,"impuestos":[{"codigo":"2","codigoPorcentaje":"2","tarifa":"12.00","baseImponible":"30.07","valor":"3.61"}]}],"infoAdicional":[{"nombre":"DIRECCION","valor":"LLANO CHICO"},{"nombre":"E-MAIL","valor":"asetemp@hotmail.com"},{"nombre":"APELLIDO","valor":"HINOJOSA"},{"nombre":"NOMBRE","valor":"WASHINGTON"},{"nombre":"NOMBRECOMERCIAL","valor":"BESTSYSTEM"},{"nombre":"CIUDAD","valor":"QUITO"},{"nombre":"TELEFONO","valor":"0993530018"},{"nombre":"CELULAR","valor":"0987654321"},{"nombre":"PLAZO","valor":"1.00"},{"nombre":"DIAS","valor":"30.00"},{"nombre":"TARIFAIMP","valor":"12.00"}]}'
    //             }
    //           }
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     valorACobrar: 200,
    //     id: 2,
    //     idContrato: {
    //       nombresCliente: 'Nombrecito2',
    //       apellidosCliente: 'Apelli2',
    //       idClienteEnGrupo: {
    //         idCliente: {
    //           idUsuario: {
    //             numeroDocumento: '1724040595'
    //           }
    //         }
    //       }
    //     },
    //     pagoCollection: [
    //       {
    //         valor: 200,
    //         numeroDocumento: '2',
    //         tipoDocumento: 'Deposito',
    //         id: 3,
    //         detallePago: [
    //           {
    //             numeroCuota: 3,
    //             valor: 100,
    //             tipo: TipoDetallePagoEnum.rastreo,
    //             idItemCobroPago: 1,
    //             idFactura: {
    //               ifRazonSocialComprador: 'Razoncita',
    //               jsonFactura: '{"directorioGuardarXML":"${directorioGuardarXML}","directorioGuardarXMLFirmados":"${directorioGuardarXMLFirmados}","nombreArchivoXML":"${nombreArchivoXML}","nombreArchivoXMLFirmado":"${nombreArchivoXMLFirmado}","clave":"${clave}","directorioYNombreArchivoRegistroCivilP12":"${directorioYNombreArchivoRegistroCivilP12}","debug":true,"infoTributario":{"ambiente":"1","tipoEmision":"1","razonSocial":"PADILLA CAMUENDO LUIS ALFREDO","nombreComercial":"COMERCIAL BRENDA","ruc":"1710361658001","claveAcceso":null,"codDoc":"01","estab":"001","ptoEmision":"001","secuencial":"000000016","dirMatriz":"PICHINCHA / QUITO / QUITO/ LLANO CHICO"},"infoFactura":{"fechaEmision":"13/02/2019","dirEstablecimiento":"PICHINCHA / CAYAMBE / CAYAMBE / ROCAFUERTE N0-45 Y LIBERTAD","contribuyenteEspecial":"0047","obligadoContabilidad":"SI","tipoIdentificacionComprador":"04","guiaRemision":null,"razonSocialComprador":"BAZAR Y PAPELERIA MEXICO","identificacionComprador":"1800095612001","direccionComprador":"CHAMBO 1067 Y GUAYLLABAMBA","totalSinImpuestos":"161.79","totalDescuento":"20.48","totalConImpuestos":[{"codigo":"2","codigoPorcentaje":"2","descuentoAdicional":null,"baseImponible":"161.79","tarifa":null,"valor":"19.41","valorDevolucionIva":null}],"propina":"0.00","importeTotal":"181.20","moneda":"DOLAR","pagos":[{"formaPago":"20","total":"181.20","plazo":"30.00","unidadTiempo":"dias"}],"valorRetIva":"0.00","valorRetRenta":"0.00"},"detalles":[{"codigoPrincipal":"679_73","codigoAuxiliar":null,"unidadMedida":null,"descripcion":"ABRIGO IMPERMIABLE PESADO","cantidad":"8.00","precioUnitario":"7.75","descuento":"10.46","precioTotalSinImpuesto":"51.54","detallesAdicionales":null,"impuestos":[{"codigo":"2","codigoPorcentaje":"2","tarifa":"12.00","baseImponible":"51.54","valor":"6.18"}]},{"codigoPrincipal":"A25-32","codigoAuxiliar":null,"descripcion":"ABRAZADERAS 25/32","cantidad":"17.00","precioUnitario":"2.11","descuento":"5.80","precioTotalSinImpuesto":"30.07","detallesAdicionales":null,"impuestos":[{"codigo":"2","codigoPorcentaje":"2","tarifa":"12.00","baseImponible":"30.07","valor":"3.61"}]}],"infoAdicional":[{"nombre":"DIRECCION","valor":"LLANO CHICO"},{"nombre":"E-MAIL","valor":"asetemp@hotmail.com"},{"nombre":"APELLIDO","valor":"HINOJOSA"},{"nombre":"NOMBRE","valor":"WASHINGTON"},{"nombre":"NOMBRECOMERCIAL","valor":"BESTSYSTEM"},{"nombre":"CIUDAD","valor":"QUITO"},{"nombre":"TELEFONO","valor":"0993530018"},{"nombre":"CELULAR","valor":"0987654321"},{"nombre":"PLAZO","valor":"1.00"},{"nombre":"DIAS","valor":"30.00"},{"nombre":"TARIFAIMP","valor":"12.00"}]}'
    //             }
    //           },
    //           {
    //             numeroCuota: 3,
    //             valor: 100,
    //             tipo: TipoDetallePagoEnum.rastreo,
    //             idItemCobroPago: 2,
    //             idFactura: {
    //               ifRazonSocialComprador: 'Razoncita',
    //               jsonFactura: '{"directorioGuardarXML":"${directorioGuardarXML}","directorioGuardarXMLFirmados":"${directorioGuardarXMLFirmados}","nombreArchivoXML":"${nombreArchivoXML}","nombreArchivoXMLFirmado":"${nombreArchivoXMLFirmado}","clave":"${clave}","directorioYNombreArchivoRegistroCivilP12":"${directorioYNombreArchivoRegistroCivilP12}","debug":true,"infoTributario":{"ambiente":"1","tipoEmision":"1","razonSocial":"PADILLA CAMUENDO LUIS ALFREDO","nombreComercial":"COMERCIAL BRENDA","ruc":"1710361658001","claveAcceso":null,"codDoc":"01","estab":"001","ptoEmision":"001","secuencial":"000000016","dirMatriz":"PICHINCHA / QUITO / QUITO/ LLANO CHICO"},"infoFactura":{"fechaEmision":"13/02/2019","dirEstablecimiento":"PICHINCHA / CAYAMBE / CAYAMBE / ROCAFUERTE N0-45 Y LIBERTAD","contribuyenteEspecial":"0047","obligadoContabilidad":"SI","tipoIdentificacionComprador":"04","guiaRemision":null,"razonSocialComprador":"BAZAR Y PAPELERIA MEXICO","identificacionComprador":"1800095612001","direccionComprador":"CHAMBO 1067 Y GUAYLLABAMBA","totalSinImpuestos":"161.79","totalDescuento":"20.48","totalConImpuestos":[{"codigo":"2","codigoPorcentaje":"2","descuentoAdicional":null,"baseImponible":"161.79","tarifa":null,"valor":"19.41","valorDevolucionIva":null}],"propina":"0.00","importeTotal":"181.20","moneda":"DOLAR","pagos":[{"formaPago":"20","total":"181.20","plazo":"30.00","unidadTiempo":"dias"}],"valorRetIva":"0.00","valorRetRenta":"0.00"},"detalles":[{"codigoPrincipal":"679_73","codigoAuxiliar":null,"unidadMedida":null,"descripcion":"ABRIGO IMPERMIABLE PESADO","cantidad":"8.00","precioUnitario":"7.75","descuento":"10.46","precioTotalSinImpuesto":"51.54","detallesAdicionales":null,"impuestos":[{"codigo":"2","codigoPorcentaje":"2","tarifa":"12.00","baseImponible":"51.54","valor":"6.18"}]},{"codigoPrincipal":"A25-32","codigoAuxiliar":null,"descripcion":"ABRAZADERAS 25/32","cantidad":"17.00","precioUnitario":"2.11","descuento":"5.80","precioTotalSinImpuesto":"30.07","detallesAdicionales":null,"impuestos":[{"codigo":"2","codigoPorcentaje":"2","tarifa":"12.00","baseImponible":"30.07","valor":"3.61"}]}],"infoAdicional":[{"nombre":"DIRECCION","valor":"LLANO CHICO"},{"nombre":"E-MAIL","valor":"asetemp@hotmail.com"},{"nombre":"APELLIDO","valor":"HINOJOSA"},{"nombre":"NOMBRE","valor":"WASHINGTON"},{"nombre":"NOMBRECOMERCIAL","valor":"BESTSYSTEM"},{"nombre":"CIUDAD","valor":"QUITO"},{"nombre":"TELEFONO","valor":"0993530018"},{"nombre":"CELULAR","valor":"0987654321"},{"nombre":"PLAZO","valor":"1.00"},{"nombre":"DIAS","valor":"30.00"},{"nombre":"TARIFAIMP","valor":"12.00"}]}'
    //             }
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // ]


  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    if (this.create
    ) {
      this.blockuiService.habilitarBlockUI();
      this.httpCobroService
        .createOne(values as CobroCreateDto)
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
            console.error({error: error, message: "Error creando Cobro", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpCobroService
        .updateById(values as CobroUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Cobro", data: values});
          },
        });
    }
  }

  fieldModalChanged(event: FormField, enableButton: ModalComponent): void {
    if (event.formGroup.valid
    ) {
      this.createEditFormGroup = event.formGroup;
      enableButton.enableButton(true);
    } else {
      this.createEditFormGroup = new FormGroup({});
      enableButton.enableButton(false);
    }
  }

  openDialog(formFields: FormField[], arrayAccordeon: MatStepperArray[] = []): void {
    const createUpdateModalParameters
      :
      CreateUpdateModalParameters = {
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
    if (event.valid
    ) {
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
    //   case FormCobroEnum.generoLibro:
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


  createOrEdit(record ?: CobroResponseDto) {
    const formArray = [
      ...FORM_COBRO(),
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
