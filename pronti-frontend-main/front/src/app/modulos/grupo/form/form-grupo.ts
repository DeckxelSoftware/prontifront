import {FormGroup, Validators} from '@angular/forms';
import {FormGrupoEnum} from './form-grupo.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';


export const FORM_GRUPO: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      label: 'Nombre grupo',
      placeholder: 'Ej: 1',
      help: 'Ingrese un nombre para el grupo',
      formControlName: FormGrupoEnum.nombreGrupo,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      inputNumber: {
        min: 0
      },
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      label: 'Sumatoria monto meta',
      placeholder: 'Ej: 25.000',
      help: 'Ingrese la sumatoria de monto meta',
      formControlName: FormGrupoEnum.sumatoriaMontoMeta,
      initialValue: '',
      validators: [
        Validators.required,
        Validators.min(0),
      ],
      inputNumber: {
        min: 0,
        maxFractionDigits: 2,
      },
      type: fieldType.inputNumber,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },


    {
      label: 'Total contratos usados',
      placeholder: 'Ej: 100',
      help: 'Ingrese el total de contratos usados',
      formControlName: FormGrupoEnum.totalContratosUsados,
      initialValue: '',
      validators: [
        Validators.required,
        Validators.min(0),
      ],
      inputNumber: {
        min: 0,
      },
      type: fieldType.inputNumber,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },


    {
      label: 'Total contratos permitidos',
      placeholder: 'Ej: 100',
      help: 'Ingrese el total de contratos permitidos',
      formControlName: FormGrupoEnum.totalContratosPermitidos,
      initialValue: '',
      validators: [
        Validators.required,
        Validators.min(0),
      ],
      inputNumber: {
        min: 0
      },
      type: fieldType.inputNumber,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      label: 'Fondo acumulado',
      placeholder: 'Ej: 15.000',
      help: 'Ingrese el fondo acumulado',
      formControlName: FormGrupoEnum.fondoAcumulado,
      initialValue: '',
      validators: [
        Validators.required,
        Validators.min(0),
      ],
      inputNumber: {
        min: 0,
        maxFractionDigits: 2,
      },
      type: fieldType.inputNumber,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    // {
    //   type: fieldType.text,
    //   label: 'Nombre',
    //   formControlName: FormGrupoEnum.nombre,
    //   placeholder: 'Ej: ....',
    //   initialValue: "",
    //   help: 'Ingrese el nombre',
    //   // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
    //   validators: [
    //     // Validators.required,
    //     // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
    //   ],
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   column: '6',
    //   actualValue: '',
    // },
  ]
  return arregloCampos;
}
