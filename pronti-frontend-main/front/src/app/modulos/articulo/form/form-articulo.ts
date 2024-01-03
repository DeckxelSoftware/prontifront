import {FormGroup, Validators} from '@angular/forms';
import {FormArticuloEnum} from './form-articulo.enum';
import {fieldType, FormField} from "../../../componentes/forms/interfaces/form-field";
import {EstadoArticuloEnum} from '../../../enums/estado-articulo.enum';
import {FormTrabajadorEnum} from '../../trabajador/form/form-trabajador.enum';


export const FORM_ARTICULO: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    // {
    //   type: fieldType.text,
    //   label: 'Placa',
    //   formControlName: FormArticuloEnum.placa,
    //   placeholder: 'Ej: PCA-2145',
    //   initialValue: "",
    //   help: 'Ingrese la placa',
    //   // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
    //   validators: [
    //     Validators.required,
    //     Validators.maxLength(255),
    //     // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
    //   ],
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   column: '6',
    //   actualValue: '',
    // },
    // {
    //   type: fieldType.text,
    //   label: 'Chasis',
    //   formControlName: FormArticuloEnum.chasis,
    //   placeholder: 'Ej: 1HGB41JSKC',
    //   initialValue: "",
    //   help: 'Ingrese el chasis',
    //   // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
    //   validators: [
    //     Validators.required,
    //     Validators.maxLength(255),
    //     // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
    //     // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
    //   ],
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   column: '6',
    //   actualValue: '',
    // },
    {
      label: 'Estado',
      formControlName: FormArticuloEnum.estado,
      type: fieldType.select,
      help: 'Seleccione un estado',
      select: {
        filterBy: 'estado',
        dataKey: 'estado',
        filterPlaceholder: 'E = Entregado, F = Flota, C = Comprado',
        optionLabel: 'nombre',
        options: [
          {
            estado: EstadoArticuloEnum.Flota,
            nombre: 'Flota',
          },
          {
            estado: EstadoArticuloEnum.Comprado,
            nombre: 'Comprado',
          },
          {
            estado: EstadoArticuloEnum.Entregado,
            nombre: 'Entregado',
          }
        ]
      },
      initialValue: "",
      validators: [
        Validators.required,
      ],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: F= Flota /C= Comprado /E= Entregado',
      column: '6',
      actualValue: '',
    },
    // {
    //   label: 'Marca',
    //   placeholder: 'Ej: NISSAN',
    //   help: 'Seleccione una marca',
    //   formControlName: FormArticuloEnum.marca,
    //   initialValue: '',
    //   validators: [
    //     Validators.required,
    //   ],
    //   type: fieldType.autoComplete,
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   column: '6',
    //   actualValue: '',
    //   autoComplete: {
    //     field: 'nombre',
    //     inputId: 'nombre',
    //     suggestions: []
    //   }
    // },
    //
    // {
    //   label: 'Modelo',
    //   placeholder: 'Ej: Versa',
    //   help: 'Seleccione un modelo',
    //   formControlName: FormArticuloEnum.modelo,
    //   initialValue: '',
    //   validators: [
    //     Validators.required,
    //   ],
    //   type: fieldType.autoComplete,
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   column: '6',
    //   actualValue: '',
    //   autoComplete: {
    //     field: 'nombre',
    //     inputId: 'nombre',
    //     suggestions: []
    //   }
    // },
    //
    // {
    //   label: 'Color',
    //   placeholder: 'Ej: Rojo',
    //   help: 'Seleccione un color',
    //   formControlName: FormArticuloEnum.color,
    //   initialValue: '',
    //   validators: [
    //     Validators.required,
    //   ],
    //   type: fieldType.autoComplete,
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   column: '6',
    //   actualValue: '',
    //   autoComplete: {
    //     field: 'nombre',
    //     inputId: 'nombre',
    //     suggestions: []
    //   }
    // },
    // {
    //   type: fieldType.inputNumber,
    //   inputNumber: {
    //     min: 1980,
    //     max: 2100
    //   },
    //   label: 'Año',
    //   formControlName: FormArticuloEnum.anio,
    //   placeholder: 'Ej: 2015',
    //   initialValue: "",
    //   help: 'Ingrese el año',
    //   // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
    //   validators: [
    //     Validators.required,
    //     Validators.max(2100),
    //     Validators.min(1980)
    //     // Validators.maxLength(255),
    //     // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
    //   ],
    //   number: {
    //     min: 1980,
    //     max: 2100
    //   },
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   column: '6',
    //   actualValue: '',
    // },
    {
      label: 'Ubicación física',
      placeholder: 'Ej: Patio matriz',
      help: 'Seleccione la ubicación',
      formControlName: FormArticuloEnum.ubicacionFisica,
      initialValue: '',
      validators: [
        // Validators.required,
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
      label: 'Observación',
      formControlName: FormArticuloEnum.observacion,
      placeholder: 'Ej: Ninguna',
      initialValue: "",
      help: 'Ingrese la observación',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.maxLength(255),
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
