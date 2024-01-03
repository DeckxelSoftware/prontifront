import {FormGroup, Validators} from '@angular/forms';
import {FormLineaImpuestoEnum} from './form-linea-impuesto.enum';
import {fieldType, FormField} from "../../../componentes/forms/interfaces/form-field";
import {FormTrabajadorEnum} from "../../trabajador/form/form-trabajador.enum";


export const FORM_LINEA_IMPUESTO: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.text,
      label: 'Nombre',
      formControlName: FormLineaImpuestoEnum.nombre,
      placeholder: 'Ej: ....',
      initialValue: "",
      help: 'Ingrese el nombre',
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
      type: fieldType.inputNumber,
      label: 'Porcentaje',
      formControlName: FormLineaImpuestoEnum.porcentaje,
      placeholder: 'Ej: 10',
      initialValue: "",
      help: 'Ingrese el porcentaje',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        suffix: '%',
        maxFractionDigits: 2,
        minFractionDigits: 2
      }
    },
    {
      label: 'Cuenta contable',
      placeholder: 'Ej: Bancos',
      help: 'Seleccione una cuenta contable',
      formControlName: FormLineaImpuestoEnum.cuentaContableId,
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
        inputId: 'id',
        suggestions: [],
      }
    },
  ]
  return arregloCampos;
}
