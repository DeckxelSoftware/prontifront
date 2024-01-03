import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {FormPerfilUsuarioEnum} from './form-perfil-usuario.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {REGEX_PASS} from '../../../constantes/form/regex/password';
import {FormUsuarioEnum} from '../../usuario/form/form-usuario.enum';
import {REGEX_LETRAS_ESPACIOS} from '../../../constantes/form/regex/letras-espacios';


export const FORM_PERFIL_USUARIO: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.text,
      label: 'Nombres',
      formControlName: FormPerfilUsuarioEnum.nombres,
      placeholder: 'Ej: Cristian...',
      initialValue: "",
      help: 'Ingrese los nombres',
      patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    }, {
      type: fieldType.text,
      label: 'Apellidos',
      formControlName: FormPerfilUsuarioEnum.apellidos,
      placeholder: 'Ej: Lara ...',
      initialValue: "",
      help: 'Ingrese los apellidos',
      patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        //  Validators.required,
        Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      label: 'Fecha de nacimiento',
      placeholder: 'Ej: mm-dd-yyyy',
      help: 'Ingrese la fecha de nacimiento',
      formControlName: FormUsuarioEnum.fechaNacimiento,
      initialValue: '',
      validators: [],
      type: fieldType.date,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
  ]
  return arregloCampos;
}
export const FORM_UPDATE_PASS: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.password,
      label: 'Password actual',
      formControlName: FormPerfilUsuarioEnum.password,
      placeholder: '',
      initialValue: "",
      help: 'Ingrese el nombre',
      // patternMessage: REGEX_PASS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_PASS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.password,
      label: 'Nuevo password',
      formControlName: FormPerfilUsuarioEnum.newPassword,
      placeholder: '',
      initialValue: "",
      help: 'Ingrese su nuevo password',
      patternMessage: REGEX_PASS.mensaje,
      validators: [
        Validators.required,
        Validators.pattern(REGEX_PASS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.password,
      label: 'Confirme su nuevo password',
      formControlName: FormPerfilUsuarioEnum.confirmNewPassword,
      placeholder: '',
      initialValue: "",
      help: 'Ingrese otra vez su nuevo password',
      patternMessage: REGEX_PASS.mensaje,

      validators: [
        Validators.required,
        Validators.pattern(REGEX_PASS.regex),
        validarNuevoPassConfirmacion()
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
  ]
  return arregloCampos;
}

export function validarNuevoPassConfirmacion(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valido = control.value == control.parent?.value.newPassword;
    return valido ? null : {confirmacionPassword: {value: control.value}};
  };
}
