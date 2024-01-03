import { Component, OnInit } from '@angular/core';
import { ClienteEnGrupoResponseDto } from '../../servicios/dto/cliente-en-grupo.response-dto';
import { ClienteEnGrupoFindDto } from '../../servicios/dto/cliente-en-grupo.find-dto';
import { MatDialog } from '@angular/material/dialog';
import { HttpClienteEnGrupoService } from '../../servicios/http-cliente-en-grupo-service';
import { ConfirmationService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { ClienteEnGrupoCreateDto } from '../../servicios/dto/cliente-en-grupo.create-dto';
import { ClienteEnGrupoUpdateDto } from '../../servicios/dto/cliente-en-grupo.update-dto';
import { FORM_CLIENTE_EN_GRUPO } from '../../form/form-cliente-en-grupo';
import { AbstractTable } from '../../../../abstract/table/abstract-table';
import { TAKE } from '../../../../constantes/tabla/take';
import { CreateUpdateModalComponent } from '../../../../componentes/dialog/create-update-modal/create-update-modal.component';
import { MENSAGE_TOAST } from '../../../../constantes/toaster/mensaje-toast';
import { fieldType, FormField, SearchAutoCompleteInterface } from '../../../../componentes/forms/interfaces/form-field';
import { BlockuiService } from '../../../../servicios/block-ui/blockui.service';
import { LogsMlabsService } from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import { TableAbstractClass } from '../../../../abstract/table/interfaces/table-abstract-class';
import { ModalComponent } from '../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import { AutocompleteFormInterface } from '../../../../abstract/table/interfaces/autocomplete-form.interface';
import { CreateUpdateModalParameters } from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import { ActivoInactivo } from '../../../../enums/activo-inactivo';
import { TipoClienteEnum } from '../../../../enums/tipo-cliente.enum';
import { FormClienteEnGrupoEnum } from '../../form/form-cliente-en-grupo.enum';
import { GrupoFindDto } from '../../../grupo/servicios/dto/grupo.find-dto';
import { HttpGrupoService } from '../../../grupo/servicios/http-grupo-service';
import { GrupoResponseDto } from '../../../grupo/servicios/dto/grupo.response-dto';
import { ClienteFindDto } from '../../../cliente/servicios/dto/cliente.find-dto';
import { HttpClienteService } from '../../../cliente/servicios/http-cliente-service';
import { ClienteResponseDto } from '../../../cliente/servicios/dto/cliente.response-dto';
import { MatStepperArray } from '../../../../componentes/forms/form-container/interfaces/mat-stepper-array';
import { FORM_MOVER_GRUPO } from '../../form/form-mover-grupo';

@Component({
  selector: 'app-cliente-en-grupo-tabla',
  templateUrl: './cliente-en-grupo-tabla.component.html',
  styleUrls: ['./cliente-en-grupo-tabla.component.scss']
})
export class ClienteEnGrupoTablaComponent extends AbstractTable<ClienteEnGrupoResponseDto, ClienteEnGrupoFindDto>
  implements OnInit, TableAbstractClass<ClienteEnGrupoResponseDto>, AutocompleteFormInterface {

  // datica: ClienteEnGrupoResponseDto[] = [{
  //   idGrupo: {
  //     id: 1,
  //     sisHabilitado: ActivoInactivo.Activo,
  //     nombreGrupo: 1,
  //     sumatoriaMontoMeta: 100,
  //     totalContratosUsados: 100,
  //     totalContratosPermitidos: 1,
  //   },
  //   idCliente: {
  //     id: 1,
  //     sisHabilitado: ActivoInactivo.Activo,
  //     tipoCliente: TipoClienteEnum.Natural,
  //     idUsuario: 1,
  //     idEmpresa: 1
  //   }
  // }];

  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por nombre, apellido o nombre de grupo',
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
    public httpClienteEnGrupoService: HttpClienteEnGrupoService,
    public confirmationService: ConfirmationService,
    private _httpGrupoService: HttpGrupoService,
    private _httpClienteService: HttpClienteService

  ) {
    super(
      httpClienteEnGrupoService,
      {
        nombreRegistro: 'Cliente En Grupo',
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
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    if (this.create) {
      values.sisHabilitado = ActivoInactivo.Activo;
      this.blockuiService.habilitarBlockUI();

      this.httpClienteEnGrupoService
        .createOne(values as ClienteEnGrupoCreateDto)
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
            console.error({ error: error, message: "Error creando Cliente En Grupo", data: values });
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpClienteEnGrupoService
        .updateById(values as ClienteEnGrupoUpdateDto, this.recordUpdated.id as number)
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
            console.error({ error: error, message: "Error actualizando Cliente En Grupo", data: values });
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
      case FormClienteEnGrupoEnum.idGrupo:
        this.buscarAutocomplete(event, FormClienteEnGrupoEnum.idGrupo);
        break;

      case FormClienteEnGrupoEnum.idCliente:
        this.buscarAutocomplete(event, FormClienteEnGrupoEnum.idCliente);
        break;

    }
  }

  buscarAutocomplete(evento: SearchAutoCompleteInterface, tipoBusqueda: string) {

    if (tipoBusqueda === FormClienteEnGrupoEnum.idGrupo) {
      const busqueda: GrupoFindDto = {
        busqueda: evento.query,
      };

      this._httpGrupoService
        .find(busqueda)
        .toPromise()
        .then(res => res as [GrupoResponseDto[], number])
        .then(data => {
          // const arregloDatos = data[0];
          // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
          const arregloDatos = data[0]
            .filter((a: any) =>  a.totalContratosUsados < a.totalContratosPermitidos)
            .map((a: any) => { a.detalleCompleto = `Nombre:  ${a.nombreGrupo}    ----|----    ${a.totalContratosUsados} /  ${a.totalContratosPermitidos}       ----|----       Abonos: $${a.sumatoriaMontoMeta}`; return a; });
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
    if (tipoBusqueda === FormClienteEnGrupoEnum.idCliente) {

      const busqueda: ClienteFindDto = {
        busqueda: evento.query,
      };

      this._httpClienteService
        .find(busqueda)
        .toPromise()
        .then(res => res as [ClienteResponseDto[], number])
        .then(data => {
          // const arregloDatos = data[0];

          // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA

          const arregloDatos = data[0].map((a: any) => { a.nombreCompleto = a.idUsuario?.nombres + ' ' + a.idUsuario?.apellidos; return a; });

          console.log('con nombre completo', arregloDatos);
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
  }


  createOrEdit(record?: ClienteEnGrupoResponseDto) {
    const formArray = [
      ...FORM_CLIENTE_EN_GRUPO(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      console.log('record', record);
      const objetoCliente = {
        idCliente: {
          nombreCompleto: `${record.idCliente?.idUsuario?.nombres} ${record.idCliente?.idUsuario?.apellidos}`,
        }
      }
      this.recordUpdated = { ...record, ...objetoCliente };
      console.log('result con nombre completo', this.recordUpdated);
      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;
    } else {
      this.create = true;
      this.recordUpdated = undefined;
    }
    this.openDialog(this.createEditFormArray);
  }

  moverGrupo(record: any) {
    const formArray = [
      ...FORM_MOVER_GRUPO(),];
    this.createEditFormArray = [...formArray];
    console.log('record', record);
    const objetoCliente = {
      idCliente: {
        nombreCompleto: `${record.idCliente?.idUsuario?.nombres} ${record.idCliente?.idUsuario?.apellidos}`,
      }
    }
    this.recordUpdated = { ...record, ...objetoCliente };
    console.log('result con nombre completo', this.recordUpdated);
    this.fillForm(this.recordUpdated, this.createEditFormArray);
    this.create = false;
    this.openDialog(this.createEditFormArray);

  }
}
