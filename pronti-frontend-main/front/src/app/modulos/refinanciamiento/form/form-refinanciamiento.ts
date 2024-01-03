import {FormGroup, Validators} from '@angular/forms';
import {FormRefinanciamientoEnum} from './form-refinanciamiento.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {REGEX_NUMEROS} from '../../../constantes/form/regex/numeros';


export const FORM_REFINANCIAMIENTO: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.number,
      label: 'Total cuotas',
      formControlName: FormRefinanciamientoEnum.totalCuotas,
      placeholder: 'Ej: 12',
      initialValue: "",
      help: 'Ingrese el total de cuotas',
      patternMessage: REGEX_NUMEROS.mensaje,
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.pattern(REGEX_NUMEROS.regex)
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      number: {
        min: 0
      }

    },
    {
      type: fieldType.number,
      label: 'Total cuotas pagadas',
      formControlName: FormRefinanciamientoEnum.totalCuotasPagadas,
      placeholder: 'Ej: 12',
      initialValue: "",
      help: 'Ingrese el total de cuotas pagadas',
      patternMessage: REGEX_NUMEROS.mensaje,
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.pattern(REGEX_NUMEROS.regex)
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      number: {
        min: 0
      }

    },
    {
      type: fieldType.number,
      label: 'Total cuotas en mora',
      formControlName: FormRefinanciamientoEnum.totalCuotasMora,
      placeholder: 'Ej: 12',
      initialValue: "",
      help: 'Ingrese el total de cuotas en mora',
      patternMessage: REGEX_NUMEROS.mensaje,
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.pattern(REGEX_NUMEROS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      number: {
        min: 0
      }
    },
    {
      type: fieldType.number,
      label: 'Total cuotas en pagadas de refinanciamiento',
      formControlName: FormRefinanciamientoEnum.totalCuotasPagadasRefinanciamiento,
      placeholder: 'Ej: 12',
      initialValue: "",
      help: 'Ingrese el total de cuotas pagadas de refinanciamiento',
      patternMessage: REGEX_NUMEROS.mensaje,
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.pattern(REGEX_NUMEROS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      number: {
        min: 0
      }
    },
    {
      type: fieldType.number,
      label: 'Total cuotas faltantes de refinanciamiento',
      formControlName: FormRefinanciamientoEnum.totalCuotasFaltantesRefinanciamiento,
      placeholder: 'Ej: 12',
      initialValue: "",
      help: 'Ingrese el total de cuotas faltantes de refinanciamiento',
      patternMessage: REGEX_NUMEROS.mensaje,
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.pattern(REGEX_NUMEROS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      number: {
        min: 0
      }

    },
    {
      type: fieldType.number,
      label: 'Total cuotas restantes sin mora',
      formControlName: FormRefinanciamientoEnum.cuotasRestantesSinMora,
      placeholder: 'Ej: 12',
      initialValue: "",
      help: 'Ingrese el total de cuotas restantes sin mora',
      patternMessage: REGEX_NUMEROS.mensaje,
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.pattern(REGEX_NUMEROS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      number: {
        min: 0
      }
    },
    {
      type: fieldType.number,
      label: 'Valor de  la cuota',
      formControlName: FormRefinanciamientoEnum.valorCuota,
      placeholder: 'Ej: 12',
      initialValue: "",
      help: 'Ingrese el valor de la cuota',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.min(0),
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      number: {
        min: 0
      }

    },
    {
      type: fieldType.number,
      label: 'Valor pendiente de pago',
      formControlName: FormRefinanciamientoEnum.valorPendientePago,
      placeholder: 'Ej: 12',
      initialValue: "",
      help: 'Ingrese el valor pendiente de pago',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.min(0),
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      number:{
        min:0
      }

    },
    {
      type: fieldType.number,
      label: 'Valor a agregarse a la cuota',
      formControlName: FormRefinanciamientoEnum.valorAgregarseCuota,
      placeholder: 'Ej: 12',
      initialValue: "",
      help: 'Ingrese el valor a agregarse a la cuota',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.min(0),
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      number:{
        min:0
      }
    },
    {
      type: fieldType.date,
      label: 'Fecha refinanciamiento',
      formControlName: FormRefinanciamientoEnum.fechaRefinanciamiento,
      placeholder: 'Ej: 12/12/2022',
      initialValue: "",
      help: 'Ingrese la fecha del refinanciamiento',
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
  ]
  return arregloCampos;
}
