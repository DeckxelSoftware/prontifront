import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClienteResponseDto} from '../../servicios/dto/cliente.response-dto';
import {ClienteFindDto} from '../../servicios/dto/cliente.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpClienteService} from '../../servicios/http-cliente-service';
import {ConfirmationService, MenuItem} from 'primeng/api';
import {FormGroup, Validators} from '@angular/forms';
import {ClienteCreateDto} from '../../servicios/dto/cliente.create-dto';
import {ClienteUpdateDto} from '../../servicios/dto/cliente.update-dto';
import {FormClienteEnum} from '../../form/form-cliente.enum';
import {FORM_CLIENTE} from '../../form/form-cliente';
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
import {TipoClienteEnum} from '../../../../enums/tipo-cliente.enum';
import {HttpEmpresaService} from '../../../empresa/servicios/http-empresa-service';
import {HttpUsuarioService} from '../../../usuario/servicios/http-usuario-service';
import {EmpresaFindDto} from '../../../empresa/servicios/dto/empresa.find-dto';
import {EmpresaResponseDto} from '../../../empresa/servicios/dto/empresa.response-dto';
import {UsuarioFindDto} from '../../../usuario/servicios/dto/usuario.find-dto';
import {UsuarioResponseDto} from '../../../usuario/servicios/dto/usuario.response-dto';
import {CrearClienteModalComponent} from '../../../../shared/crear-cliente-modal/crear-cliente-modal.component';
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";
import {MatStepperConfig} from '../../../../componentes/forms/form-container/interfaces/mat-stepper-config';
import {FORM_USUARIO} from '../../../usuario/form/form-usuario';
import {FORM_EMPRESA} from '../../../empresa/form/form-empresa';
import {ModalClienteMatStepperComponent} from '../../../../shared/modal-cliente-mat-stepper/modal-cliente-mat-stepper.component';

@Component({
  selector: 'app-cliente-tabla',
  templateUrl: './cliente-tabla.component.html',
  styleUrls: ['./cliente-tabla.component.scss']
})
export class ClienteTablaComponent extends AbstractTable<ClienteResponseDto, ClienteFindDto>
  implements OnInit, TableAbstractClass<ClienteResponseDto>, AutocompleteFormInterface {

  @Input()
  vieneDesdeContrato = false;

  @Output()
  seleccionoCliente = new EventEmitter<ClienteResponseDto>();

  matStepperConfig: MatStepperConfig = {
    orientation: 'horizontal',
    linear: false,
  }
  items: MenuItem[] = [];
  itemsFormaAsignacion: MenuItem[] = [];
  searchBarFormFields: FormField[] = [

    {
      label: 'Usuario',
      placeholder: 'Ej: 1711111/Adrian/Eguez...',
      help: 'Busque por nombres, apellidos o número de identidad',
      formControlName: 'idUsuario',
      initialValue: '',
      validators: [],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      autoComplete: {
        field: 'nombres',
        inputId: 'id',
        suggestions: []
      }
    },

    {
      label: 'Empresa',
      placeholder: 'Ej: Manticore/174323522001...',
      help: 'Busque por nombre comercial,razón social o ruc empresa',
      formControlName: 'idEmpresa',
      initialValue: '',
      validators: [],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      autoComplete: {
        field: 'nombreComercial',
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

    {
      label: 'Tipo cliente',
      formControlName: 'tipoCliente',
      type: fieldType.select,
      help: 'Seleccione por tipo de cliente',
      select: {
        filterBy: 'tipoCliente',
        dataKey: 'tipoCliente',
        filterPlaceholder: 'Natural, Empresa, Pasaporte',
        optionLabel: 'nombre',
        options: [
          {
            tipoCliente: TipoClienteEnum.Natural,
            nombre: 'Natural',
          },
          {
            tipoCliente: TipoClienteEnum.Empresa,
            nombre: 'Empresa',
          },
          {
            tipoCliente: TipoClienteEnum.Pasaporte,
            nombre: 'Pasaporte',
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

  tipoClienteSeleccionado = '';

  constructor(
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
    public dialog: MatDialog,
    public httpClienteService: HttpClienteService,
    public confirmationService: ConfirmationService,
    private _httpEmpresaService: HttpEmpresaService,
    private _httpUsuarioService: HttpUsuarioService
  ) {
    super(
      httpClienteService,
      {
        nombreRegistro: 'Cliente',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    this.stablishSkipAndTake(0, TAKE);
    this.items = [
      {
        label: 'Natural', icon: 'pi pi-user', command: () => {
          this.tipoClienteSeleccionado = TipoClienteEnum.Natural;
          this.crearClienteInicial(this.tipoClienteSeleccionado);
        }
      },
      {
        label: 'Pasaporte', icon: 'pi pi-id-card', command: () => {
          this.tipoClienteSeleccionado = TipoClienteEnum.Pasaporte;
          this.crearClienteInicial(this.tipoClienteSeleccionado);
        }
      },
      {separator: true},
      {
        label: 'Empresa', icon: 'pi pi-table', command: () => {
          this.tipoClienteSeleccionado = TipoClienteEnum.Empresa;
          this.crearClienteInicial(this.tipoClienteSeleccionado);
        }
      }
    ];

    this.itemsFormaAsignacion = [
      {
        label: 'Natural', icon: 'pi pi-user', command: () => {
          this.tipoClienteSeleccionado = TipoClienteEnum.Natural;
          this.createOrEdit();
        }
      },
      {
        label: 'Pasaporte', icon: 'pi pi-id-card', command: () => {
          this.tipoClienteSeleccionado = TipoClienteEnum.Pasaporte;
          this.createOrEdit();
        }
      },
      {separator: true},
      {
        label: 'Empresa', icon: 'pi pi-table', command: () => {
          this.tipoClienteSeleccionado = TipoClienteEnum.Empresa;
          this.createOrEdit();
        }
      }

    ];
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
    this.findDto.tipoCliente = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    if (this.create) {
      values.sisHabilitado = ActivoInactivo.Activo;
      this.blockuiService.habilitarBlockUI();
      this.httpClienteService
        .createOne(values as ClienteCreateDto)
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
            console.error({error: error, message: "Error creando Cliente", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpClienteService
        .updateById(values as ClienteUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Cliente", data: values});
          },
        });
    }
  }

  fieldModalChanged(event: FormField, enableButton: ModalComponent): void {
    if (event.formGroup.valid) {
      this.tipoClienteSeleccionado = event.actualValue.tipoCliente;
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
      if (event.formControlName === 'tipoCliente') {
        this.findDto.tipoCliente = event.actualValue?.tipoCliente
        // this.findDto.tipoCliente = event.actualValue.tipoCliente.nombre;
      }
      if (event.formControlName === 'idUsuario') {
        this.findDto.idUsuario = event.actualValue?.id
        // this.findDto.tipoCliente = event.actualValue.tipoCliente.nombre;
      }

      if (event.formControlName === 'idEmpresa') {
        this.findDto.idEmpresa = event.actualValue?.id
        // this.findDto.tipoCliente = event.actualValue.tipoCliente.nombre;
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
    console.log('event', event);
    switch (event.field.formControlName) {
      case FormClienteEnum.Empresa:
        this.buscarAutocompleteEmpresa(event);
        break;
      case FormClienteEnum.Usuario:
        this.buscarAutocompleteUsuario(event);
        break;
    }
  }

  buscarAutocompleteEmpresa(evento: SearchAutoCompleteInterface) {
    const busqueda: EmpresaFindDto = {
      busqueda: evento.query,
    };
    this._httpEmpresaService
      .find(busqueda)
      .toPromise()
      .then(res => res as [EmpresaResponseDto[], number])
      .then(data => {
        console.log('empresas autocomplete', data);
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
  }


  buscarAutocompleteUsuario(evento: SearchAutoCompleteInterface) {
    const busqueda: UsuarioFindDto = {
      busqueda: evento.query,
    };
    this._httpUsuarioService
      .find(busqueda)
      .toPromise()
      .then(res => res as [UsuarioResponseDto[], number])
      .then(data => {
        console.log('usuarios autocomplete', data);
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
  }

  createOrEdit(record?: ClienteResponseDto) {
    if (record) {
      this.tipoClienteSeleccionado = record.tipoCliente || 'N';
    }
    const formArray = [
      ...FORM_CLIENTE(this.tipoClienteSeleccionado),
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

// Comentar crearDesdeCero porque se utiliza nueva logica
  crearDesdeCero(record?: ClienteResponseDto) {
    const objetoConfigDialog: any = {
      width: '100%',
      height: '700px',
      data: {
        registro: null,
        estaEditando: false,
        componente: this,
      }
    }

    if (record) {
      objetoConfigDialog.data = {
        registro: record,
        estaEditando: true
      };
    }
    // const dialog$ = this.dialog.open(FormularioClienteCeroComponent, objetoConfigDialog);

    const dialog$ = this.dialog.open(CrearClienteModalComponent, objetoConfigDialog);

    dialog$.beforeClosed().subscribe((data) => {
      console.log('data que llega del modal', data);
      if(this.vieneDesdeContrato){
        this.seleccionarCliente(data);
      }
      this.searchData();
    })
  }

  setearFormulariosStepperCliente(tipoCliente: string): MatStepperArray[] {
    let stepper: MatStepperArray[] = [];
    if (tipoCliente === TipoClienteEnum.Empresa) {
      stepper = [
        {
          fieldsArray: FORM_USUARIO(),
          id: 'formUsuario',
          formGroup: new FormGroup({}),
          labelHtml: 'Datos usuario',
        },
        {
          fieldsArray: FORM_EMPRESA(),
          id: 'formEmpresa',
          formGroup: new FormGroup({}),
          labelHtml: 'Datos empresa',
        },
      ]
    } else {
      stepper = [
        {
          fieldsArray: FORM_USUARIO(),
          id: 'formUsuario',
          formGroup: new FormGroup({}),
          labelHtml: 'Datos usuario',
        },
      ]
    }
    return stepper;

  }

  abrirModalCrearCliente(stepper: MatStepperArray[], stepperConfig: MatStepperConfig) {
    console.log(stepper, stepperConfig);
    const parametrosModalCrearCliente = {
      matStepperConfig: stepperConfig,
      arregloFormulario: stepper,
      componente: this,
    };
    const dialogRef = this.dialog.open(ModalClienteMatStepperComponent, {
      data: parametrosModalCrearCliente,
    });
  }

  crearClienteInicial(tipoCliente?: string) {
    console.log(tipoCliente);
    let stepper: MatStepperArray[] = [];
    stepper = this.setearFormulariosStepperCliente(this.tipoClienteSeleccionado);
    this.abrirModalCrearCliente(stepper, this.matStepperConfig)
    if (tipoCliente) {

    }
  }
  async crearOEditarModal(modal: ModalClienteMatStepperComponent) {

/*    const valoresProveedorACrear = this.setearDatosParaCrear(modal.data.arregloFormulario);
    this.blockuiService.habilitarBlockUI();
    if (valoresProveedorACrear) {

      this.httpProveedorService.createOne(valoresProveedorACrear)
        .subscribe(
          {
            next: (res) => {
              this.blockuiService.deshabilitarBlockUI();
              this.parameters.messageService.toaster(
                MENSAGE_TOAST.creacionExitosa(
                  'Proveedor'
                )
              );
              modal.dialogRef.close();
            },
            error: (err) => {
              this.blockuiService.deshabilitarBlockUI();
              console.error('Error creando proveedor: ', err)
              this.parameters.messageService.toaster(
                MENSAGE_TOAST.error(
                  'Error creando el registro. '
                )
              );
            }
          }
        )

    }*/
  }


  seleccionarCliente(registro: ClienteResponseDto) {
   this.seleccionoCliente.emit(registro);
  }
}
