import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ContratoResponseDto } from '../../servicios/dto/contrato.response-dto';
import { ContratoFindDto } from '../../servicios/dto/contrato.find-dto';
import { MatDialog } from '@angular/material/dialog';
import { HttpContratoService } from '../../servicios/http-contrato-service';
import { ConfirmationService } from 'primeng/api';
import { FormGroup, Validators } from '@angular/forms';
import { ContratoCreateDto } from '../../servicios/dto/contrato.create-dto';
import { ContratoUpdateDto } from '../../servicios/dto/contrato.update-dto';
import { FormContratoEnum } from '../../form/form-contrato.enum';
import { FORM_CONTRATO } from '../../form/form-contrato';
import { AbstractTable } from '../../../../abstract/table/abstract-table';
import { TAKE } from '../../../../constantes/tabla/take';
import {
  CreateUpdateModalComponent
} from '../../../../componentes/dialog/create-update-modal/create-update-modal.component';
import { MENSAGE_TOAST } from '../../../../constantes/toaster/mensaje-toast';
import { fieldType, FormField, SearchAutoCompleteInterface } from '../../../../componentes/forms/interfaces/form-field';
import { BlockuiService } from '../../../../servicios/block-ui/blockui.service';
import { LogsMlabsService } from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import { TableAbstractClass } from '../../../../abstract/table/interfaces/table-abstract-class';
import { ModalComponent } from '../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import { AutocompleteFormInterface } from '../../../../abstract/table/interfaces/autocomplete-form.interface';
import {
  CreateUpdateModalParameters
} from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import { Router } from '@angular/router';
import { ActivoInactivo } from '../../../../enums/activo-inactivo';
import { MatStepperArray } from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";
import { ToasterTipo } from '../../../../servicios/logs-mensajes/enums/toaster-tipo';
import { ContratoStorageService } from '../../../../servicios/estado-contrato/contrato-storage.service';
import { StorageCesionDerechosService } from "../../servicios/storage-cesion-derechos.service";
import {
  ModalConfirmarCesionDerechosComponent
} from "../modal-confirmar-cesion-derechos/modal-confirmar-cesion-derechos.component";
import {
  ContratoCesionDerechoTablaComponent
} from '../contrato-cesion-derecho-tabla/contrato-cesion-derecho-tabla.component';
import { EstadoContratoEnum } from 'src/app/enums/estado-contrato.enum';
import { ModalMoverGrupoComponent } from '../modal-mover-grupo/modal-mover-grupo.component';
import { HttpClienteEnGrupoService } from '../../../cliente-en-grupo/servicios/http-cliente-en-grupo-service';

@Component({
  selector: 'app-contrato-tabla',
  templateUrl: './contrato-tabla.component.html',
  styleUrls: ['./contrato-tabla.component.scss']
})
export class ContratoTablaComponent extends AbstractTable<ContratoResponseDto, ContratoFindDto>
  implements OnInit, TableAbstractClass<ContratoResponseDto>, AutocompleteFormInterface {
  @Input()
  usarTablaParaSeleccionar = false;

  @Output() contratoSeleccionado = new EventEmitter<ContratoResponseDto>();

  @Input()
  vieneDesdeContrato = false;

  @Input()
  idContratoInicial = 0;

  @Input()
  cedulaContrato = ''

  searchBarFormFields: FormField[] = [
    {
      help: 'Busque por número de contrato o nombre, cédula, id del cliente',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Busqueda',
      placeholder: 'Ej: 1',
      column: '12',
      actualValue: '',
    },
    {
      label: 'Fecha inicio',
      placeholder: 'Ej: 10-30-2022',
      help: 'Ingrese una fecha de inicio',
      formControlName: FormContratoEnum.fechaInicio,
      initialValue: '',
      validators: [],
      type: fieldType.date,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      label: 'Fecha fin',
      placeholder: 'Ej: 10-30-2022',
      help: 'Ingrese una fecha de fin',
      formControlName: FormContratoEnum.fechaFin,
      initialValue: '',
      validators: [],
      type: fieldType.date,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
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
    public httpContratoService: HttpContratoService,
    public httpClienteGrupoService: HttpClienteEnGrupoService,
    private _router: Router,
    public confirmationService: ConfirmationService,
    private _storageContratoService: ContratoStorageService,
    private _storageCesionDerechoService: StorageCesionDerechosService
  ) {
    super(
      httpContratoService,
      {
        nombreRegistro: 'Contrato',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    );
    this.rowsPerPage = [5, 10, 20, 30];
    this.startingRows = 5;
    this.stablishSkipAndTake(0, 5);

  }


  ngOnInit(): void {
    this.findDto.sortAscending = true;
    this.findDto.sortField = 'id';
    if(this.cedulaContrato !== ''){
      this.findDto.busqueda = this.cedulaContrato
    }
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    // this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    if (this.create) {
      values.version = Number(values.version);
      values.plazoMesSeleccionado = Number(values.plazoMesSeleccionado);
      values.numeroDeContrato = Number(values.numeroDeContrato);
      // OJO => eliminar este dato quemado
      values.idClienteEnGrupo = 1;
      values.sisHabilitado = ActivoInactivo.Activo;
      this.blockuiService.habilitarBlockUI();
      this.httpContratoService
        .createOne(values as ContratoCreateDto)
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
            console.error({ error: error, message: "Error creando Contrato", data: values });
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpContratoService
        .updateById(values as ContratoUpdateDto, this.recordUpdated.id as number)
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
            console.error({ error: error, message: "Error actualizando Contrato", data: values });
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

      if (event.formControlName === 'fechaInicio') {
        this.findDto.fechaInicio = event.actualValue
      }

      if (event.formControlName === 'fechaFin') {
        this.findDto.fechaFin = event.actualValue
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
    //   case FormContratoEnum.generoLibro:
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


  createOrEdit(record?: ContratoResponseDto) {
    const formArray = [
      ...FORM_CONTRATO(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      this.recordUpdated = { ...record };
      console.log('eliminar aqui', this.createEditFormArray);
      this.createEditFormArray = this.createEditFormArray.filter((campo: FormField) => {
        return campo.formControlName === FormContratoEnum.numeroDeContrato ||
          campo.formControlName === FormContratoEnum.observacion ||
          campo.formControlName === FormContratoEnum.estado ||
          campo.formControlName === FormContratoEnum.version;
      });
      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;
    } else {
      this.create = true;
      this.recordUpdated = undefined;
    }
    this.openDialog(this.createEditFormArray);
  }

  irRutaCrearContrato() {
    this._router.navigate(['contratos', 'contrato-modulo', 'crear-contrato'])
  }

  navegarAEditarContrato(registro: ContratoResponseDto) {
    // const tieneCuotasEnMora = this.tieneCuotasEnMora(registro);
    const tieneCuotasEnMora = false;
    if (tieneCuotasEnMora) {
      this.parameters.messageService.toaster({
        titulo: 'Información',
        mensaje: 'El contrato tiene cuotas en mora. No puede editarlo.',
        tipo: ToasterTipo.warning
      })
    } else {
      this.navegar(registro.id as number, ['cambiar-contrato']);
    }
  }

  tieneCuotasEnMora(registro: ContratoResponseDto): boolean {
    if (registro.historicoPlanContratoCollection) {
      if (registro.historicoPlanContratoCollection.length > 0) {
        if (registro.historicoPlanContratoCollection[0].totalCuotasMoraActual === 0) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }


  }

  navegar(idContrato: number, path: string[]) {

    this._router.navigate(['contratos', 'contrato-modulo', idContrato, ...path])
  }

  irUnificar(contratoInicial: ContratoResponseDto) {
    this._storageContratoService.contratoInicial = contratoInicial;
    this._router.navigate(['contratos', 'contrato-modulo', 'acciones-contrato'])
  }

  // este metodo solo se mostrara cuando se este unificando
  guardarContratoUnificar(registro: ContratoResponseDto) {
    console.log('vea', registro);
    this._storageContratoService.contratoUnificar = registro;
    this._storageContratoService.seleccionoContrato.next(true);
    this.dialog.closeAll();
  }

  empezarContratoCesionDerecho(contrato: ContratoResponseDto) {
    console.log('el contrato', contrato);
    const modal$ = this.dialog.open(ModalConfirmarCesionDerechosComponent, {
      height: '100vh',
      width: '100vw',
      data: contrato,
    });
    modal$.afterClosed().subscribe({
      next: (respuesta: boolean) => {
        if (respuesta) {
          this._storageCesionDerechoService.contratoCesionDerechos = contrato;
          this._storageCesionDerechoService.vaConfirmar.next(false); /// ???
          this._router.navigate(['contratos', 'contrato-modulo', contrato.id, 'cesion-derechos']);
        }
      }
    });
  }

  emitirContratoSelecciondo(contrato: ContratoResponseDto) {
    this.contratoSeleccionado.emit(contrato);
  }

  mostrarModalCesionesDerechos() {

    this._storageCesionDerechoService.vaConfirmar.next(true);

    this.dialog.open(ContratoCesionDerechoTablaComponent,
      {
        height: '100vh',
        width: '100vw',
      }
    );
  }
  puedeLiquidar(registro: ContratoResponseDto): boolean {
    return registro.estado === (EstadoContratoEnum.EnProceso || EstadoContratoEnum.Ofertado || EstadoContratoEnum.PreadjudicadoBuscando || EstadoContratoEnum.PreadjudicadoComprado || EstadoContratoEnum.PreadjudicadoAprobado || EstadoContratoEnum.Preadjudicado);

  }
  moverGrupo(registro: any) {
    const modal = this.dialog.open(ModalMoverGrupoComponent, {
      data: registro,
      width: '500px',
      height: '500px'
    });
    modal.afterClosed().subscribe({
      next: (resp) => {

        this.blockuiService.habilitarBlockUI();
        if (!resp) {
          this.parameters.messageService.toaster(
            {
              titulo: 'Información',
              mensaje: 'El contrato seguirá con el mismo grupo',
              tipo: ToasterTipo.info
            }
          );
          this.blockuiService.deshabilitarBlockUI();
        } else {

          this.httpContratoService.moverDeGrupoContrato(resp.id).subscribe(
            {
              next: (resp) => {
                this.parameters.messageService.toaster(
                  {
                    titulo: 'Correcto',
                    mensaje: 'El contrato se cambio de grupo',
                    tipo: ToasterTipo.success
                  }
                );
                this.blockuiService.deshabilitarBlockUI();
              },
              error: err => {
                console.error({
                  mensaje: 'No se pudo cambiar de grupo el contrato',
                  error: err
                });

                this.parameters.messageService.toaster(
                  {
                    titulo: 'Error',
                    mensaje: 'El contrato no pudo cambiarse de grupo',
                    tipo: ToasterTipo.error
                  }
                );

                this.blockuiService.deshabilitarBlockUI();
              }
            }
          );
        }
      }
    });

  }
}
