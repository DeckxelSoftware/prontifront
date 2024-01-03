import {Component, Input, OnInit} from '@angular/core';
import {RegistroVacacionResponseDto} from '../../servicios/dto/registro-vacacion.response-dto';
import {RegistroVacacionFindDto} from '../../servicios/dto/registro-vacacion.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpRegistroVacacionService} from '../../servicios/http-registro-vacacion-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {RegistroVacacionCreateDto} from '../../servicios/dto/registro-vacacion.create-dto';
import {RegistroVacacionUpdateDto} from '../../servicios/dto/registro-vacacion.update-dto';
import {FORM_REGISTRO_VACACION} from '../../form/form-registro-vacacion';
import {AbstractTable} from "../../../../abstract/table/abstract-table";
import {TAKE} from "../../../../constantes/tabla/take";
import {CreateUpdateModalComponent} from "../../../../componentes/dialog/create-update-modal/create-update-modal.component";
import {MENSAGE_TOAST} from "../../../../constantes/toaster/mensaje-toast";
import {FormField, SearchAutoCompleteInterface} from "../../../../componentes/forms/interfaces/form-field";
import {BlockuiService} from "../../../../servicios/block-ui/blockui.service";
import {LogsMlabsService} from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import {TableAbstractClass} from "../../../../abstract/table/interfaces/table-abstract-class";
import {ModalComponent} from "../../../../componentes/dialog/create-update-modal/interfaces/modal-component";
import {AutocompleteFormInterface} from "../../../../abstract/table/interfaces/autocomplete-form.interface";
import {CreateUpdateModalParameters} from "../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters";
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";
import {ActivoInactivo} from "../../../../enums/activo-inactivo";
import * as dayjs from 'dayjs';
import {FormRegistroVacacionEnum} from '../../form/form-registro-vacacion.enum';
import {SiNoEnum} from '../../../../enums/si-no.enum';
import {CargoVacacionResponseDto} from '../../../cargo-vacacion/servicios/dto/cargo-vacacion.response-dto';
import {ToasterTipo} from '../../../../servicios/logs-mensajes/enums/toaster-tipo';

@Component({
  selector: 'app-registro-vacacion-tabla',
  templateUrl: './registro-vacacion-tabla.component.html',
  styleUrls: ['./registro-vacacion-tabla.component.scss']
})
export class RegistroVacacionTablaComponent extends AbstractTable<RegistroVacacionResponseDto, RegistroVacacionFindDto>
  implements OnInit, TableAbstractClass<RegistroVacacionResponseDto>, AutocompleteFormInterface {


  @Input()
  idCargoVacacion!: number;
  @Input()
  registroCargoVacacion!: CargoVacacionResponseDto;

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
    public httpRegistroVacacionService: HttpRegistroVacacionService,
    public confirmationService: ConfirmationService,
  ) {
    super(
      httpRegistroVacacionService,
      {
        nombreRegistro: 'Registro Vacación',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    this.stablishSkipAndTake(0, TAKE);
    this.findDto.idCargoVacacion = this.idCargoVacacion;

    /*
        this.tableData= [{
          id: 1,
          fechaDesde: '2022-09-09',
          fechaHasta: '2022-10-09',
          comprobantePago: '0123',
          diasTomados: 1,
          idCargoVacacion: 1,
          numeroSolicitud: '123',
          estaPagado: 'S',
          fechaPago: '2022-09-09',
          valorTomado: 1,
          nombreApellidoResponsable: 'Juan Perez',
          sisHabilitado: ActivoInactivo.Activo,
          valorPagado: 123
        }]
    */
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
      const nombresResponsable = JSON.parse(localStorage.getItem('usuario') || '');
      console.log(nombresResponsable);
      values.nombreApellidoResponsable = nombresResponsable.nombres + nombresResponsable.apellidos;
      values.idCargoVacacion = +this.idCargoVacacion;
      this.blockuiService.habilitarBlockUI();
      this.httpRegistroVacacionService
        .createOne(values as RegistroVacacionCreateDto)
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
            console.error({error: error, message: "Error creando Registro Vacacion", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpRegistroVacacionService
        .updateById(values as RegistroVacacionUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Registro Vacacion", data: values});
          },
        });
    }
  }

  fieldModalChanged(event: FormField, enableButton: ModalComponent): void {

    if (event.formControlName === FormRegistroVacacionEnum.fechaDesde || event.formControlName === FormRegistroVacacionEnum.diasTomados) {
      if (event.formGroup.get('fechaDesde')?.value && event.formGroup.get('diasTomados')?.value) {
        const fechaDesde = event.formGroup.get('fechaDesde')?.value;
        const diasTomados = event.formGroup.get('diasTomados')?.value;
        if (this.registroCargoVacacion?.valorDias) {
          console.log('registro cargo vacacion:', this.registroCargoVacacion);
          const valorTomado = +((this.registroCargoVacacion.valorDias * diasTomados).toFixed(2));
          console.log({valorTomado});
          event.formGroup.get('valorTomado')?.setValue(valorTomado);
        } else {
          this.logsMlabsService.toaster(
            {
              titulo: 'Error',
              mensaje: 'Error obteniendo valor días de cargo vacación',
              tipo: ToasterTipo.error
            }
          )
        }
        const fechaHasta = dayjs(fechaDesde).add(diasTomados - 1, 'day').format('YYYY-MM-DD');
        event.formGroup.get('fechaHasta')?.setValue(fechaHasta);
      }
    }
    if (event.formControlName === FormRegistroVacacionEnum.estaPagado) {
      if (event.formGroup.get('estaPagado')?.value.estaPagado === SiNoEnum.SI) {
        if (event.formGroup.get('valorTomado')?.value) {
          event.formGroup.get('fechaPago')?.enable();
          event.formGroup.get('comprobantePago')?.enable();
          event.formGroup.get('valorPagado')?.setValue(event.formGroup.get('valorTomado')?.value);
        } else {
          event.formGroup.get('estaPagado')?.setValue({estaPagado: SiNoEnum.NO, nombre: 'NO'});
          this.logsMlabsService.toaster(
            {
              titulo: 'Error',
              mensaje: 'Primero seleccione la fecha desde y los días de vacaciones.',
              tipo: ToasterTipo.error
            }
          )
        }

      } else {

        event.formGroup.get('fechaPago')?.disable();
        event.formGroup.get('fechaPago')?.reset();
        event.formGroup.get('comprobantePago')?.disable();
        event.formGroup.get('comprobantePago')?.reset();
        event.formGroup.get('valorPagado')?.reset();

      }
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
    //   case FormRegistroVacacionEnum.generoLibro:
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


  createOrEdit(record?: RegistroVacacionResponseDto) {
    const formArray = [
      ...FORM_REGISTRO_VACACION(),
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
