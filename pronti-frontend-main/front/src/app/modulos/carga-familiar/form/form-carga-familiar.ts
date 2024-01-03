import {FormGroup, Validators} from '@angular/forms';
import {FormCargaFamiliarEnum} from './form-carga-familiar.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {REGEX_LETRAS_ESPACIOS} from '../../../constantes/form/regex/letras-espacios';
import {SiNoEnum} from '../../../enums/si-no.enum';
import {GeneroEnum} from '../../../enums/genero.enum';


export const FORM_CARGA_FAMILIAR: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.text,
      label: 'Nombre',
      formControlName: FormCargaFamiliarEnum.nombres,
      placeholder: 'Ej: Allison ...',
      initialValue: "",
      help: 'Ingrese los nombres',
      patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.text,
      label: 'Apellidos',
      formControlName: FormCargaFamiliarEnum.apellidos,
      placeholder: 'Ej: Lara ...',
      initialValue: "",
      help: 'Ingrese los apellidos',
      patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      label: 'Género',
      placeholder: 'Ej: Femenino/Masculino',
      help: 'Seleccione el género',
      formControlName: FormCargaFamiliarEnum.genero,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'nombre',
        dataKey: 'genero',
        filterPlaceholder: 'Femenino/Masculino',
        optionLabel: 'nombre',
        options: [
          {
            genero: GeneroEnum.femenino,
            nombre: 'Femenino',
          },
          {
            genero: GeneroEnum.masculino,
            nombre: 'Masculino',
          },
        ]
      }
    },
    {
      label: 'Parentesco',
      placeholder: 'Ej: Conyugue',
      help: 'Seleccione el parentesco',
      formControlName: FormCargaFamiliarEnum.parentesco,
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
      label: 'Tipo documento',
      placeholder: 'Ej: Cédula',
      help: 'Seleccione el tipo de documento',
      formControlName: FormCargaFamiliarEnum.tipoDocumento,
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
      formControlName: FormCargaFamiliarEnum.documentoIdentidad,
      placeholder: 'Ej: 1718...',
      initialValue: "",
      help: 'Ingrese el documento de identidad',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
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
      formControlName: FormCargaFamiliarEnum.fechaNacimiento,
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
      label: 'Edad',
      formControlName: FormCargaFamiliarEnum.edad,
      placeholder: 'Ej: 18',
      initialValue: "",
      help: 'Edad del trabajador',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      disabled: true,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      label: 'Discapacidad',
      placeholder: 'Ej: Si/No',
      help: 'Seleccione si tiene una discapacidad',
      formControlName: FormCargaFamiliarEnum.discapacidad,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'discapacidad',
        dataKey: 'discapacidad',
        filterPlaceholder: 'Si/No',
        optionLabel: 'nombre',
        options: [
          {
            discapacidad: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            discapacidad: SiNoEnum.NO,
            nombre: 'No',
          },
        ]
      }
    },
    {
      label: 'Tipo Discapacidad',
      placeholder: 'Ej: Visual',
      help: 'Seleccione el tipo de discapacidad',
      formControlName: FormCargaFamiliarEnum.tipoDiscapacidad,
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
      label: 'Aplica utilidad',
      placeholder: 'Ej: Si/No',
      help: 'Seleccione si aplica utilidad',
      formControlName: FormCargaFamiliarEnum.aplicaUtilidad,
      initialValue: '',
      validators: [
        // Validators.required,
      ],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      disabled: true,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'aplicaUtilidad',
        dataKey: 'aplicaUtilidad',
        filterPlaceholder: 'Si/No',
        optionLabel: 'nombre',
        options: [
          {
            aplicaUtilidad: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            aplicaUtilidad: SiNoEnum.NO,
            nombre: 'No',
          },
        ]
      }
    },
    {
      label: 'Estudia?',
      placeholder: 'Ej: Si/No',
      help: 'Seleccione si está estudiando',
      formControlName: FormCargaFamiliarEnum.estudia,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'estudia',
        dataKey: 'estudia',
        filterPlaceholder: 'Si/No',
        optionLabel: 'nombre',
        options: [
          {
            estudia: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            estudia: SiNoEnum.NO,
            nombre: 'No',
          },
        ]
      }
    },
  ]
  return arregloCampos;
}
