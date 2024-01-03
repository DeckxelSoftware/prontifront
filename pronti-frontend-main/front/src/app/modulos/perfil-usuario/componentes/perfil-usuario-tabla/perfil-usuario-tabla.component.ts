import {Component, OnInit} from '@angular/core';
import {PerfilUsuarioResponseDto} from '../../servicios/dto/perfil-usuario.response-dto';
import {PerfilUsuarioFindDto} from '../../servicios/dto/perfil-usuario.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {PerfilUsuarioCreateDto} from '../../servicios/dto/perfil-usuario.create-dto';
import {PerfilUsuarioUpdateDto} from '../../servicios/dto/perfil-usuario.update-dto';
import {FormPerfilUsuarioEnum} from '../../form/form-perfil-usuario.enum';
import {FORM_PERFIL_USUARIO, FORM_UPDATE_PASS} from '../../form/form-perfil-usuario';
import {TAKE} from '../../../../constantes/tabla/take';
import {CreateUpdateModalComponent} from '../../../../componentes/dialog/create-update-modal/create-update-modal.component';
import {MENSAGE_TOAST} from '../../../../constantes/toaster/mensaje-toast';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {AutocompleteFormInterface} from '../../../../abstract/table/interfaces/autocomplete-form.interface';
import {CreateUpdateModalParameters} from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import {AbstractTable} from '../../../../abstract/table/abstract-table';
import {FormField, SearchAutoCompleteInterface} from '../../../../componentes/forms/interfaces/form-field';
import {TableAbstractClass} from '../../../../abstract/table/interfaces/table-abstract-class';
import {ModalComponent} from '../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import {HttpUsuarioService} from '../../../usuario/servicios/http-usuario-service';
import {UsuarioCreateDto} from '../../../usuario/servicios/dto/usuario.create-dto';
import {ToasterTipo} from '../../../../servicios/logs-mensajes/enums/toaster-tipo';
import {AuthService} from '../../../../servicios/login/auth.service';
import {UsuarioResponseDto} from '../../../usuario/servicios/dto/usuario.response-dto';
import {Router} from '@angular/router';
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";

@Component({
  selector: 'app-perfil-usuario-tabla',
  templateUrl: './perfil-usuario-tabla.component.html',
  styleUrls: ['./perfil-usuario-tabla.component.scss']
})
export class PerfilUsuarioTablaComponent extends AbstractTable<PerfilUsuarioResponseDto, PerfilUsuarioFindDto>
  implements OnInit, TableAbstractClass<PerfilUsuarioResponseDto>, AutocompleteFormInterface {
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
  updatePassword = false;
  usuario: any;

  constructor(
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
    public dialog: MatDialog,
    public httpUsuarioService: HttpUsuarioService,
    public confirmationService: ConfirmationService,
    public authService: AuthService,
    private router: Router,
  ) {
    super(
      httpUsuarioService,
      {
        nombreRegistro: 'Perfil Usuario',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    this.stablishSkipAndTake(0, TAKE);
    this.obtenerUsuario();
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
  }

  obtenerUsuario() {
    this.usuario = JSON.parse(localStorage.getItem('usuario') as string);
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    // values.username = this.authService
    console.log('lo del form:', values, this.updatePassword);


    if (this.updatePassword) {
      values.userName = this.usuario.username;
      this.httpUsuarioService.updatePassword(this.usuario.id, values.password, values.newPassword).subscribe(
        {
          next: (res) => {
            this.logsMlabsService.toaster({
              titulo: 'Éxito',
              tipo: ToasterTipo.success,
              mensaje: 'Password actualizado'
            });
            closeModal.closeModal();
          },
          error: (err) => {
            this.logsMlabsService.toaster({
              titulo: 'Error',
              tipo: ToasterTipo.error,
              mensaje: 'Error actualizando password'
            });
            console.error('Error actualizando password:', err);
          }
        }
      )
    } else if (!this.updatePassword) {
      if (values.fechaNacimiento) {
        const fechaNacimiento = new Date(values.fechaNacimiento);
        fechaNacimiento.setDate(fechaNacimiento.getDate() + 1);
        values.fechaNacimiento = fechaNacimiento.toISOString();
      }
      this.httpUsuarioService.updateById(values, this.usuario.id)
        .subscribe(
          {
            next: (res) => {
              this.logsMlabsService.toaster({
                titulo: 'Éxito',
                tipo: ToasterTipo.success,
                mensaje: 'Perfil actualizado'
              });
              this.usuario.nombres = values.nombres;
              this.usuario.apellidos = values.apellidos;
              this.usuario.fechaNacimiento = values.fechaNacimiento;
              closeModal.closeModal();
            },
            error: (err) => {
              this.logsMlabsService.toaster({
                titulo: 'Error',
                tipo: ToasterTipo.error,
                mensaje: 'Error actualizando perfil'
              });
              console.error('Error actualizando perfil:', err);
            }
          }
        )
    }
    // if (this.create) {
    //   this.blockuiService.habilitarBlockUI();
    //   this.httpUsuarioService
    //     .createOne(values as UsuarioCreateDto)
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
    //         console.error({error: error, message: "Error creando Perfil Usuario", data: values});
    //       },
    //     });
    // } else {
    //   this.blockuiService.habilitarBlockUI();
    //   this.httpUsuarioService
    //     .updateById(values as PerfilUsuarioUpdateDto, this.recordUpdated.id as number)
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
    //         console.error({error: error, message: "Error actualizando Perfil Usuario", data: values});
    //       },
    //     });
    // }
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

  openDialogUpdatePassword(formFields: FormField[], arrayAccordeon: MatStepperArray[] = []): void {
    const createUpdateModalParameters: CreateUpdateModalParameters = {
      title: `Cambio de password`,
      description: "Llene los campos para cambiar su password",
      accordeons: arrayAccordeon,
      formsFields: formFields,
      button: `Actualizar`,
      route: this,
    };
    const dialogRef = this.dialog.open(CreateUpdateModalComponent, {
      data: createUpdateModalParameters,
    });
  }

  openDialogUpdateProfile(formFields: FormField[], arrayAccordeon: MatStepperArray[] = []): void {
    const createUpdateModalParameters: CreateUpdateModalParameters = {
      title: `Actualizar perfil`,
      description: "Llene los campos para actualizar su perfil",
      accordeons: arrayAccordeon,
      formsFields: formFields,
      button: `Actualizar`,
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
    //   case FormPerfilUsuarioEnum.generoLibro:
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


  createOrEdit(record?: PerfilUsuarioResponseDto) {
    const formArray = [
      ...FORM_PERFIL_USUARIO(),
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
    //  this.openDialog(this.createEditFormArray);
  }

  updatePass() {
    this.updatePassword = true;
    const formArray = [
      ...FORM_UPDATE_PASS()
    ]
    this.createEditFormArray = [...formArray];
    this.openDialogUpdatePassword(this.createEditFormArray);
  }

  openDialog(formFields: FormField[], arrayAccordeon: MatStepperArray[] | undefined): void {
  }

  salirDeLaAplicacion() {
    this.borrarSessionStorage()
    this.setearEstadoAutenticacion();
    this.navegarARutaPrincipal();
  }

  borrarSessionStorage() {
    localStorage.clear();
  }

  setearEstadoAutenticacion() {
    this.authService.tieneSesion$.next(false);
  }

  navegarARutaPrincipal() {
    this.router.navigate(['/'])
  }
}
