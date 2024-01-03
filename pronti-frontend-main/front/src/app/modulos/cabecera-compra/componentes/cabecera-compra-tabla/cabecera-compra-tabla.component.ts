import {Component, OnInit} from '@angular/core';
import {CabeceraCompraResponseDto} from '../../servicios/dto/cabecera-compra.response-dto';
import {CabeceraCompraFindDto} from '../../servicios/dto/cabecera-compra.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpCabeceraCompraService} from '../../servicios/http-cabecera-compra-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {CabeceraCompraCreateDto} from '../../servicios/dto/cabecera-compra.create-dto';
import {CabeceraCompraUpdateDto} from '../../servicios/dto/cabecera-compra.update-dto';
import {FormCabeceraCompraEnum} from '../../form/form-cabecera-compra.enum';
import {FORM_CABECERA_COMPRA} from '../../form/form-cabecera-compra';
import {TAKE} from "../../../../constantes/tabla/take";
import {
  CreateUpdateModalComponent
} from "../../../../componentes/dialog/create-update-modal/create-update-modal.component";
import {MENSAGE_TOAST} from "../../../../constantes/toaster/mensaje-toast";
import {BlockuiService} from "../../../../servicios/block-ui/blockui.service";
import {LogsMlabsService} from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import {AutocompleteFormInterface} from "../../../../abstract/table/interfaces/autocomplete-form.interface";
import {
  CreateUpdateModalParameters
} from "../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters";
import {AbstractTable} from "../../../../abstract/table/abstract-table";
import {FormField, SearchAutoCompleteInterface} from "../../../../componentes/forms/interfaces/form-field";
import {TableAbstractClass} from "../../../../abstract/table/interfaces/table-abstract-class";
import {ModalComponent} from "../../../../componentes/dialog/create-update-modal/interfaces/modal-component";
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";
import {ModalInfoFacturaComponent} from "../../modales/modal-info-factura/modal-info-factura.component";

const {convertXML, createAST} = require("simple-xml-to-json")
const convert = require('xml-js');

@Component({
  selector: 'app-cabecera-compra-tabla',
  templateUrl: './cabecera-compra-tabla.component.html',
  styleUrls: ['./cabecera-compra-tabla.component.scss']
})
export class CabeceraCompraTablaComponent extends AbstractTable<CabeceraCompraResponseDto, CabeceraCompraFindDto>
  implements OnInit, TableAbstractClass<CabeceraCompraResponseDto>, AutocompleteFormInterface {
  searchBarFormFields: FormField[] = [
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

  constructor(
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
    public dialog: MatDialog,
    public httpCabeceraCompraService: HttpCabeceraCompraService,
    public confirmationService: ConfirmationService,
  ) {
    super(
      httpCabeceraCompraService,
      {
        nombreRegistro: 'Cabecera Compra',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    this.stablishSkipAndTake(0, TAKE);
    this.tableData = [
      {
        autorizacion: '123123123123123123',
        rucProveedor: '123345345345',
        nombreProveedor: 'Proveedorcito',

      }
    ]
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
  }

  async createOrEditModal(closeModal: ModalComponent) {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    console.log(values);
    console.log(this.createEditFormArray[0].actualValue);
    try {
      const json = await this.fileReaderText(this.createEditFormArray[0].actualValue);
      closeModal.closeModal();
      this.abrirModalInfoFactura(json);
    } catch (e) {
      console.error('Error leyendo xml');
    }

    // if (this.create) {
    //   this.blockuiService.habilitarBlockUI();
    //   this.httpCabeceraCompraService
    //     .createOne(values as CabeceraCompraCreateDto)
    //     .subscribe({
    //       next: () => {
    //         this.blockuiService.deshabilitarBlockUI();
    //         this.parameters.messageService.toaster(
    //           MENSAGE_TOAST.creacionExitosa(
    //             this.parameters.nombreRegistro ? this.parameters.nombreRegistro : 'Registro'
    //           )
    //         );
    //         closeModal.closeModal();
    //         this.searchData();
    //       },
    //       error: (error) => {
    //         this.blockuiService.deshabilitarBlockUI();
    //         this.parameters.messageService.toaster(MENSAGE_TOAST.error());
    //         console.error({error: error, message: "Error creando Cabecera Compra", data: values});
    //       },
    //     });
    // } else {
    //   this.blockuiService.habilitarBlockUI();
    //   this.httpCabeceraCompraService
    //     .updateById(values as CabeceraCompraUpdateDto, this.recordUpdated.id as number)
    //     .subscribe({
    //       next: () => {
    //         this.blockuiService.deshabilitarBlockUI();
    //         this.parameters.messageService.toaster(
    //           MENSAGE_TOAST.creacionExitosa(
    //             this.parameters.nombreRegistro ? this.parameters.nombreRegistro : 'Registro'
    //           )
    //         );
    //         closeModal.closeModal();
    //         this.searchData();
    //       },
    //       error: (error) => {
    //         this.blockuiService.deshabilitarBlockUI();
    //         this.parameters.messageService.toaster(MENSAGE_TOAST.error());
    //         console.error({error: error, message: "Error actualizando Cabecera Compra", data: values});
    //       },
    //     });
    // }
  }

  abrirModalInfoFactura(factura: Object) {
    this.dialog.open(ModalInfoFacturaComponent, {
      data: {
        factura
      }
    })
  }

  async fileReaderText(file: File) {
    const texto = await file.text()
    // console.log(texto);
    const xmlString = this.separarDatos(texto);
    const json = this.xmlToJson(xmlString);
    // console.log(json);
    return json;
  }

  separarDatos(xml: string) {
    const aux = xml.split('CDATA[')[1];
    const aux2 = aux.split(']]')[0];
    return aux2;
  }

  xmlToJson(xml: string) {
    // const jsonFactura = convertXML(xml);
    const result = convert.xml2js(xml, {compact: true});
    return result;
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
      title: `${this.create ? 'Cargar ' : 'Actualizar'} Factura`,
      description: "Por favor llene la informacion pertinente.",
      accordeons: arrayAccordeon,
      formsFields: formFields,
      button: `${this.create ? 'Cargar ' : 'Actualizar'} `,
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
    // switch (event.field.formControlName) {
    //   case FormCabeceraCompraEnum.generoLibro:
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


  createOrEdit(record?: CabeceraCompraResponseDto) {
    const formArray = [
      ...FORM_CABECERA_COMPRA(),
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
