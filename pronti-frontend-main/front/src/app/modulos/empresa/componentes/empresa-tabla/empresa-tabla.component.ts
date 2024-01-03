import {Component, OnInit} from '@angular/core';
import {EmpresaResponseDto} from '../../servicios/dto/empresa.response-dto';
import {EmpresaFindDto} from '../../servicios/dto/empresa.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpEmpresaService} from '../../servicios/http-empresa-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup, Validators} from '@angular/forms';
import {EmpresaCreateDto} from '../../servicios/dto/empresa.create-dto';
import {EmpresaUpdateDto} from '../../servicios/dto/empresa.update-dto';
import {FormEmpresaEnum} from '../../form/form-empresa.enum';
import {FORM_EMPRESA} from '../../form/form-empresa';
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
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {ListaValoresTipoFindDto} from '../../../../servicios/lista-valores-tipo/dto/lista-valores-tipo.find-dto';
import {ListaValoresEnum} from '../../../../constantes/lista-valores/lista-valores.enum';
import {ListaValoresTipoResponseDto} from '../../../../servicios/lista-valores-tipo/dto/lista-valores-tipo.response-dto';
import {HttpListaValoresTipoService} from '../../../../servicios/lista-valores-tipo/http-lista-valores-tipo.service';
import {HttpListaValoresDetalleService} from '../../../lista-valores-detalle/servicios/http-lista-valores-detalle-service';
import {ListaValoresDetalleFindDto} from '../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.find-dto';
import {find} from 'rxjs';
import {ListaValoresDetalleResponseDto} from '../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.response-dto';
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";

@Component({
  selector: 'app-empresa-tabla',
  templateUrl: './empresa-tabla.component.html',
  styleUrls: ['./empresa-tabla.component.scss']
})
export class EmpresaTablaComponent extends AbstractTable<EmpresaResponseDto, EmpresaFindDto>
  implements OnInit, TableAbstractClass<EmpresaResponseDto>, AutocompleteFormInterface {
  searchBarFormFields: FormField[] = [
    {
      help: 'Busque por nombre comercial,razón social o ruc de la empresa',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Busqueda',
      placeholder: 'Ej: ...',
      column: '6',
      actualValue: '',
    },
    {
      label: 'Tipo',
      placeholder: 'Ej: Sociedad Anónima',
      help: 'Seleccione el tipo de empresa',
      formControlName: 'tipoEmpresa',
      initialValue: '',
      validators: [],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      autoComplete: {
        field: 'nombre',
        inputId: 'nombre',
        suggestions: []
      }
    },
    {
      label: 'Habilitado',
      formControlName: 'sisHabilitado',
      type: fieldType.select,
      help: 'Seleccione si esta habilitado o no',
      select: {
        filterBy: 'sisHabilitado',
        dataKey: 'sisHabilitado',
        filterPlaceholder: '0 = Inactivo, 1 = Activo',
        optionLabel: 'nombre',
        options: [
          {
            sisHabilitado: ActivoInactivo.Activo,
            nombre: 'Activo',
          },
          {
            sisHabilitado: ActivoInactivo.Inactivo,
            nombre: 'Inactivo',
          }
        ]
      },
      initialValue: "",
      validators: [],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Activo / Inactivo',
      column: '6',
      actualValue: '',
    },
  ];

  constructor(
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
    public dialog: MatDialog,
    public httpEmpresaService: HttpEmpresaService,
    private _httpListaValoresService: HttpListaValoresTipoService,
    private _httpListaValoresDetalle: HttpListaValoresDetalleService,
    public confirmationService: ConfirmationService,
  ) {
    super(
      httpEmpresaService,
      {
        nombreRegistro: 'Empresa',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    this.stablishSkipAndTake(0, TAKE);

  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
    this.findDto.tipoEmpresa = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    if (this.create) {
      values.sisHabilitado = ActivoInactivo.Activo;
      this.blockuiService.habilitarBlockUI();
      this.httpEmpresaService
        .createOne(values as EmpresaCreateDto)
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
            console.error({error: error, message: "Error creando Empresa", data: values});
          },
        });
    } else {

      this.blockuiService.habilitarBlockUI();
      this.httpEmpresaService
        .updateById(values as EmpresaUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Empresa", data: values});
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
      if (event.formControlName === 'tipoEmpresa') {
        this.findDto.tipoEmpresa = event.actualValue?.nombre;
      }
      // if (event.formControlName === 'claseContribuyente') {
      //   this.findDto.claseContribuyente = event.actualValue?.nombre;
      // }
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
    switch (event.field.formControlName) {
      case FormEmpresaEnum.tipoEmpresa:
        this.buscarAutocomplete(event);
        break;
      case FormEmpresaEnum.claseContribuyente:
        this.buscarAutocomplete(event);
        break;
    }
  }

  /*if (evento.field.autoComplete) {
  evento.field.autoComplete.suggestions = [
    {
      id:1,
      nombre:'Quito',
      descripcion:'Sucursal de la sierra',
      codigoPrimario: 'SU1-1',
    },
    {
      id:2,
      nombre:'Guayaquil',
      descripcion:'Sucursal de la costa',
      codigoPrimario: 'SU1-2',
    },
    {
      id:2,
      nombre: 'Puyo',
      descripcion:'Sucursal de la amazonia',
      codigoPrimario: 'SU1-3',
    },
  ]
}*/
  buscarAutocomplete(evento: SearchAutoCompleteInterface) {


    let idCodigoPrimario = '';
    if(evento.field.formControlName === 'tipoEmpresa'){
      idCodigoPrimario = ListaValoresEnum.tipoEmpresa;
    }else if (evento.field.formControlName === 'claseContribuyente'){
      idCodigoPrimario = ListaValoresEnum.claseContribuyente;
    }else {
      idCodigoPrimario = '';
    }
    const busqueda: ListaValoresDetalleFindDto = {
      idListaValoresTipoCodigoPrimario: idCodigoPrimario,
      busqueda: evento.query,
    };
    this._httpListaValoresDetalle
      .find(busqueda)
      .toPromise()
      .then(res => res as [ListaValoresDetalleResponseDto[], number])
      .then(data => {
        const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        // const arregloDatos = data[0].map((a:any)=>{ a.nombreCompeto = a.nombre + ' ' + a.apellido; return a;});
        if (evento.field.autoComplete) {
          if (Array.isArray(arregloDatos)) {
            evento.field.autoComplete.suggestions = [...arregloDatos];
          } else {
            evento.field.autoComplete.suggestions = [arregloDatos];
          }
        }
        return data;
      });


    /*    this._httpListaValoresService.find(busqueda).subscribe(
          (data: [ListaValoresTipoResponseDto[], number]) => {
            console.log('data', data[0][0]);

            let arregloDatos = [];
            if (data[0][0].listaValorDetalleCollection) {
              arregloDatos = data[0][0].listaValorDetalleCollection;
            }
            // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
            // const arregloDatos = data[0].map((a: any) => {
            //   a.nombreCompeto = a.nombre + ' ' + a.apellido;
            //   return a;
            // });
            if (evento.field.autoComplete) {
              if (Array.isArray(arregloDatos)) {

                let arregloFiltradoPorEvento = arregloDatos.filter((valor) => valor.nombre === evento.query);
                // evento.field.autoComplete.suggestions = [...arregloFiltradoPorEvento];
                if (evento.query !== '') {
                  arregloFiltradoPorEvento = arregloDatos.filter((valor) => {
                    return valor.nombre.includes(evento.query);
                  });

                  evento.field.autoComplete.suggestions = [...arregloFiltradoPorEvento];
                  console.log('estamos filtrando los datos')
                } else {

                  evento.field.autoComplete.suggestions = [...arregloDatos];

                }

                if (arregloFiltradoPorEvento.length > 0) {

                }

              } else {
                console.log('Nunca entra aqui')
                evento.field.autoComplete.suggestions = [arregloDatos];
              }
            }
            return data;
          })*/


  }



  createOrEdit(record?: EmpresaResponseDto) {
    const formArray = [
      ...FORM_EMPRESA(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      const tipoEmpresa = {
        nombre: record.tipoEmpresa,
      }
      const claseContribuyente= {
        nombre: record.claseContribuyente,
      }

      this.recordUpdated = {...record, tipoEmpresa, claseContribuyente };
      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;
    } else {
      this.create = true;
      this.recordUpdated = undefined;
    }
    this.openDialog(this.createEditFormArray);
  }

}

