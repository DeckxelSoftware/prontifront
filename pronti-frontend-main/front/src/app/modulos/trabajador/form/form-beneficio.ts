import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {FORM_DESCUENTO_ENUM} from './form-descuento.enum';
import {FormGroup, Validators} from '@angular/forms';
import {FORM_BENEFICIO_ENUM} from './form-beneficio.enum';
import {SiNoEnum} from '../../../enums/si-no.enum';

export const FORM_BENEFICIO: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      label: 'Aporte IESS Asumido',
      placeholder: 'Ej: Si',
      help: 'Seleccione Si o No',
      formControlName: FORM_BENEFICIO_ENUM.aporteIessAsumido,
      initialValue: '',
      validators: [
        // Validators.required,
      ],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'nombre',
        dataKey: 'aporteIessAsumido',
        filterPlaceholder: 'Si/No',
        optionLabel: 'nombre',
        options: [
          {
            aporteIessAsumido: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            aporteIessAsumido: SiNoEnum.NO,
            nombre: 'No',
          }
        ]
      },
    },
    {
      label: 'Décimos al año',
      placeholder: 'Ej: Si',
      help: 'Seleccione Si o No',
      formControlName: FORM_BENEFICIO_ENUM.decimosAnio,
      initialValue: '',
      validators: [
        // Validators.required,
      ],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'nombre',
        dataKey: 'decimosAnio',
        filterPlaceholder: 'Si/No',
        optionLabel: 'nombre',
        options: [
          {
            decimosAnio: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            decimosAnio: SiNoEnum.NO,
            nombre: 'No',
          }
        ]
      },
    },
    // {
    //   label: 'Impuesto renta',
    //   placeholder: 'Ej: Si',
    //   help: 'Seleccione Si o No',
    //   formControlName: FORM_BENEFICIO_ENUM.impuestoRenta,
    //   initialValue: '',
    //   validators: [
    //     // Validators.required,
    //   ],
    //   type: fieldType.select,
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   column: '6',
    //   actualValue: '',
    //   select: {
    //     filterBy: 'nombre',
    //     dataKey: 'impuestoRenta',
    //     filterPlaceholder: 'Si/No',
    //     optionLabel: 'nombre',
    //     options: [
    //       {
    //         impuestoRenta: SiNoEnum.SI,
    //         nombre: 'Si',
    //       },
    //       {
    //         impuestoRenta: SiNoEnum.NO,
    //         nombre: 'No',
    //       }
    //     ]
    //   },
    // },
    {
      label: 'Fondo reserva IESS',
      placeholder: 'Ej: Si',
      help: 'Seleccione Si o No',
      formControlName: FORM_BENEFICIO_ENUM.fondoReservaIess,
      initialValue: '',
      validators: [
        // Validators.required,
      ],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'nombre',
        dataKey: 'fondoReservaIess',
        filterPlaceholder: 'Si/No',
        optionLabel: 'nombre',
        options: [
          {
            fondoReservaIess: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            fondoReservaIess: SiNoEnum.NO,
            nombre: 'No',
          }
        ]
      },
    },
    {
      label: 'Utilidades',
      placeholder: 'Ej: Si',
      help: 'Seleccione Si o No',
      formControlName: FORM_BENEFICIO_ENUM.utilidades,
      initialValue: '',
      validators: [
        // Validators.required,
      ],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'nombre',
        dataKey: 'utilidades',
        filterPlaceholder: 'Si/No',
        optionLabel: 'nombre',
        options: [
          {
            utilidades: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            utilidades: SiNoEnum.NO,
            nombre: 'No',
          }
        ]
      },
    },
    {
      label: 'Pago fondos reserva mes',
      placeholder: 'Ej: Si',
      help: 'Seleccione Si o No',
      formControlName: FORM_BENEFICIO_ENUM.pagoFondosReservaMes,
      initialValue: '',
      validators: [
        // Validators.required,
      ],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'nombre',
        dataKey: 'pagoFondosReservaMes',
        filterPlaceholder: 'Si/No',
        optionLabel: 'nombre',
        options: [
          {
            pagoFondosReservaMes: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            pagoFondosReservaMes: SiNoEnum.NO,
            nombre: 'No',
          }
        ]
      },
    },
    {
      label: 'Impuesto renta patrón',
      placeholder: 'Ej: Si',
      help: 'Seleccione Si o No',
      formControlName: FORM_BENEFICIO_ENUM.impuestoRentaPatron,
      initialValue: '',
      validators: [
        // Validators.required,
      ],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'nombre',
        dataKey: 'impuestoRentaPatron',
        filterPlaceholder: 'Si/No',
        optionLabel: 'nombre',
        options: [
          {
            impuestoRentaPatron: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            impuestoRentaPatron: SiNoEnum.NO,
            nombre: 'No',
          }
        ]
      },
    },
    {
      label: 'Vacaciones',
      placeholder: 'Ej: Si',
      help: 'Seleccione Si o No',
      formControlName: FORM_BENEFICIO_ENUM.vacaciones,
      initialValue: '',
      validators: [
        // Validators.required,
      ],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'nombre',
        dataKey: 'vacaciones',
        filterPlaceholder: 'Si/No',
        optionLabel: 'nombre',
        options: [
          {
            vacaciones: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            vacaciones: SiNoEnum.NO,
            nombre: 'No',
          }
        ]
      },
    },
    {
      label: 'Beneficicios',
      placeholder: 'Ej: Si',
      help: 'Seleccione Si o No',
      formControlName: FORM_BENEFICIO_ENUM.beneficios,
      initialValue: '',
      validators: [
        // Validators.required,
      ],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'nombre',
        dataKey: 'beneficios',
        filterPlaceholder: 'Si/No',
        optionLabel: 'nombre',
        options: [
          {
            beneficios: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            beneficios: SiNoEnum.NO,
            nombre: 'No',
          }
        ]
      },
    },
    {
      label: 'Pago decimo tercero cuarto mes',
      placeholder: 'Ej: Si',
      help: 'Seleccione Si o No',
      formControlName: FORM_BENEFICIO_ENUM.pagoDecTercerCuartoMes,
      initialValue: '',
      validators: [
        // Validators.required,
      ],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'nombre',
        dataKey: 'pagoDecTercerCuartoMes',
        filterPlaceholder: 'Si/No',
        optionLabel: 'nombre',
        options: [
          {
            pagoDecTercerCuartoMes: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            pagoDecTercerCuartoMes: SiNoEnum.NO,
            nombre: 'No',
          }
        ]
      },
    },


  ]
  return arregloCampos;
}
