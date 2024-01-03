import {FormGroup, Validators} from '@angular/forms';
import {FormUsuarioEnum} from './form-usuario.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {REGEX_LETRAS_ESPACIOS} from '../../../constantes/form/regex/letras-espacios';
import {REGEX_EMAIL} from '../../../constantes/form/regex/email';
import {REGEX_PASS} from '../../../constantes/form/regex/password';
import {REGEX_NUMEROS} from '../../../constantes/form/regex/numeros';


export const FORM_USUARIO: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.text,
      label: 'Nombres',
      formControlName: FormUsuarioEnum.nombres,
      placeholder: 'Ej: Cristian ...',
      initialValue: "",
      help: 'Ingrese los nombres',
      patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
        Validators.maxLength(255),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.text,
      label: 'Apellidos',
      formControlName: FormUsuarioEnum.apellidos,
      placeholder: 'Ej: Lara ...',
      initialValue: "",
      help: 'Ingrese los apellidos',
      patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
        Validators.maxLength(255),
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
    {
      type: fieldType.text,
      label: 'Correo',
      formControlName: FormUsuarioEnum.correo,
      placeholder: 'Ej: cristian@mail.com',
      initialValue: "",
      help: 'Ingrese el correo',
      patternMessage: REGEX_EMAIL.mensaje,
      validators: [
        Validators.required,
        Validators.maxLength(255),
        Validators.pattern(REGEX_EMAIL.regex),

      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      type: fieldType.text,
      label: 'Usuario',
      formControlName: FormUsuarioEnum.username,
      placeholder: 'Ej: cristian.lara ...',
      initialValue: "",
      help: 'Ingrese el nombre de usuario',
      validators: [
        Validators.required,
        Validators.maxLength(255),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.text,
      label: 'Clave',
      formControlName: FormUsuarioEnum.password,
      placeholder: '',
      initialValue: "",
      help: 'Ingrese la clave',
      validators: [
        Validators.required,
        Validators.maxLength(255),
        Validators.pattern(REGEX_PASS.regex)
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      patternMessage: REGEX_PASS.mensaje,
    },
    {
      label: 'Tipo medio de contacto',
      placeholder: 'Ej: Tipo medio contacto',
      help: 'Seleccione el tipo de medio de contacto',
      formControlName: FormUsuarioEnum.tipoMedioContacto,
      initialValue: '',
      validators: [
        Validators.required,
      ],
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
      type: fieldType.text,
      label: 'Medio de contrato',
      formControlName: FormUsuarioEnum.medioContacto,
      placeholder: 'Ej: medio de contrato ...',
      initialValue: "",
      help: 'Ingrese el medio de contrato',
      validators: [
        Validators.required,
        Validators.maxLength(255),
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex)
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
    },
    {
      label: 'Tipo documento de identidad',
      placeholder: 'Ej: Cédula',
      help: 'Seleccione el tipo de documento de identidad',
      formControlName: FormUsuarioEnum.tipoDocumentoIdentidad,
      initialValue: '',
      validators: [
        Validators.required,
      ],
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
      type: fieldType.text,
      label: 'Documento de identidad',
      formControlName: FormUsuarioEnum.documentoIdentidad,
      placeholder: 'Ej: 1712...',
      initialValue: "",
      help: 'Ingrese el documento de identidad',
      validators: [
        Validators.required,
        Validators.maxLength(255),
        Validators.pattern(REGEX_NUMEROS.regex)
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      patternMessage: REGEX_NUMEROS.mensaje,
    },
    {
      label: 'País',
      placeholder: 'Ej: Ecuador',
      help: 'Seleccione un país',
      formControlName: FormUsuarioEnum.pais,
      initialValue: '',
      validators: [
        Validators.required,
      ],
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
      label: 'Provincia',
      placeholder: 'Ej: Pichincha',
      help: 'Seleccione una provincia',
      formControlName: FormUsuarioEnum.provincia,
      initialValue: '',
      validators: [
        Validators.required,
      ],
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
      label: 'Ciudad',
      placeholder: 'Ej: Quito',
      help: 'Seleccione una ciudad',
      formControlName: FormUsuarioEnum.ciudad,
      initialValue: '',
      validators: [
        Validators.required,
      ],
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
  ]
  return arregloCampos;
}
