import {FormGroup, Validators} from '@angular/forms';
import {FormHistoricoPlanContratoEnum} from './form-historico-plan-contrato.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {REGEX_NUMEROS} from '../../../constantes/form/regex/numeros';


export const FORM_HISTORICO_PLAN_CONTRATO: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.autoComplete,
      label: 'plan',
      formControlName: FormHistoricoPlanContratoEnum.idPlan,
      placeholder: 'Ej: Plan ...',
      initialValue: "",
      help: 'Seleccione el plan',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      autoComplete: {
        field: 'modelo',
        inputId: 'id',
        suggestions: []
      }
    },
    {
      type: fieldType.number,
      label: 'Total inscripción plan',
      formControlName: FormHistoricoPlanContratoEnum.totalInscripcionPlan,
      placeholder: 'Ej: 100',
      initialValue: "",
      help: 'Ingrese el total de inscripción',
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
      label: 'Valor descuento inscripción',
      formControlName: FormHistoricoPlanContratoEnum.valorDsctoInscripcion,
      placeholder: 'Ej: 10',
      initialValue: "",
      help: 'Ingrese el descuento de inscripción',
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
      label: 'Total inscripción',
      formControlName: FormHistoricoPlanContratoEnum.totalCobroInscripcion,
      placeholder: 'Ej: 90',
      initialValue: "",
      help: 'Ingrese el total de inscripción',
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
      label: 'Capital total',
      formControlName: FormHistoricoPlanContratoEnum.capitalTotal,
      placeholder: 'Ej: 9000',
      initialValue: "",
      help: 'Ingrese el capital total',
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
      label: 'Capital por refinanciamiento',
      formControlName: FormHistoricoPlanContratoEnum.capitalPorRefinanciamiento,
      placeholder: 'Ej: 5000',
      initialValue: "",
      help: 'Ingrese el capital por refinanciamiento',
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
      label: 'Abonos capital actual',
      formControlName: FormHistoricoPlanContratoEnum.abonosCapitalActual,
      placeholder: 'Ej: 250',
      initialValue: "",
      help: 'Ingrese los abonos al capital actual',
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
      label: 'Saldo capital',
      formControlName: FormHistoricoPlanContratoEnum.saldoCapital,
      placeholder: 'Ej: 2500',
      initialValue: "",
      help: 'Ingrese el saldo del capital',
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
      label: 'Valor tasa administrativa',
      formControlName: FormHistoricoPlanContratoEnum.valorTasaAdministrativa,
      placeholder: 'Ej: 12',
      initialValue: "",
      help: 'Ingrese el valor de la tasa administrativa',
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
      label: 'Total tasa administrativa cobrada',
      formControlName: FormHistoricoPlanContratoEnum.totalTasaAdministrativaCobrada,
      placeholder: 'Ej: 12',
      initialValue: "",
      help: 'Ingrese el total de la tasa administrativa cobrada',
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
      label: 'Total cuotas cobradas',
      formControlName: FormHistoricoPlanContratoEnum.totalCuotasCobradas,
      placeholder: 'Ej: 12',
      initialValue: "",
      help: 'Ingrese el total de cuotas cobradas',
      patternMessage: REGEX_NUMEROS.mensaje,
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.pattern(REGEX_NUMEROS.regex)
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
      label: 'Total cuotas mora actual',
      formControlName: FormHistoricoPlanContratoEnum.totalCuotasMoraActual,
      placeholder: 'Ej: 12',
      initialValue: "",
      help: 'Ingrese el total de cuotas mora actual',
      patternMessage: REGEX_NUMEROS.mensaje,
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.pattern(REGEX_NUMEROS.regex)
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
      label: 'Total cuotas mora',
      formControlName: FormHistoricoPlanContratoEnum.totalCuotasMora,
      placeholder: 'Ej: 12',
      initialValue: "",
      help: 'Ingrese el total de cuotas mora',
      patternMessage: REGEX_NUMEROS.mensaje,
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.pattern(REGEX_NUMEROS.regex)
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      number: {
        min: 0
      }
    },


  ]
  return arregloCampos;
}
