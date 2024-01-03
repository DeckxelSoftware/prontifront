import {fieldType, FormField} from "../../../componentes/forms/interfaces/form-field";
import {FormPrestamoEnum} from "./form-prestamo.enum";
import {FormGroup, Validators} from "@angular/forms";
import {SELECT_MODALIDAD_DESCUENTO} from "./form-prestamo";

export const FORM_EDITAR_PAGO: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [

    {
      label: 'Modalidad descuento',
      placeholder: 'Ej: Utilidades/Decimo cuarto,tercero/Rol',
      help: 'Ingrese la modaliddad de descuento',
      formControlName: FormPrestamoEnum.modalidadDescuento,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: SELECT_MODALIDAD_DESCUENTO
    },


  ]
  return arregloCampos;
}
