import {fieldType, FormField} from "../../../componentes/forms/interfaces/form-field";
import {FormCuentaContableEnum} from "./form-cuenta-contable.enum";
import {FormGroup, Validators} from "@angular/forms";
import {FormTrabajadorEnum} from "../../trabajador/form/form-trabajador.enum";

export const FORM_CUENTA_AGENCIA: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.text,
      label: 'Cuenta',
      formControlName: FormCuentaContableEnum.nombre,
      placeholder: 'Ej: Bancos1',
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
      label: 'Agencia',
      placeholder: 'Ej: Norte',
      help: 'Seleccione la agencia',
      formControlName: FormCuentaContableEnum.idAgencia,
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
        suggestions: []
      }
    },
    {
      label: 'Concepto',
      placeholder: 'Ej: Cristian',
      help: 'Seleccione el concepto',
      formControlName: FormCuentaContableEnum.idRubrosRol,
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
        suggestions: []
      }
    },
    {
      type: fieldType.text,
      label: 'Tipo',
      formControlName: FormCuentaContableEnum.tipo,
      placeholder: 'Ej: AI',
      initialValue: "",
      help: '',
      disabled: true,
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
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
