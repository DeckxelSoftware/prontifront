import {FormGroup, Validators} from '@angular/forms';
import {FormRubrosRolEnum} from './form-rubros-rol.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {CodigoAuxiliarRubrosRolEnum} from '../../../enums/codigo-auxiliar-rubros-rol.enum';
import {UnidadesEnum} from '../../../enums/unidades.enum';
import {SiNoEnum} from '../../../enums/si-no.enum';


export const FORM_RUBROS_ROL: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      label: 'Código auxiliar',
      formControlName: FormRubrosRolEnum.codigoAuxiliar,
      type: fieldType.select,
      help: 'Seleccione el código auxiliar',
      select: {
        filterBy: 'nombre',
        dataKey: 'codigoAuxiliar',
        filterPlaceholder: 'Ej: Argumento de egreso',
        optionLabel: 'nombre',
        options: [
          {
            codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.argumentoDeEgreso,
            nombre: 'Argumento de egreso',
          },
          {
            codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.argumentoDeIngreso,
            nombre: 'Argumento de ingreso',
          },
          {
            codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.egresosFijos,
            nombre: 'Egresos fijos',
          },
          {
            codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.egresosLegales,
            nombre: 'Egresos legales',
          },
          {
            codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.otrosEgresos,
            nombre: 'Otros egresos',
          },
          {
            codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.egresosPrestamos,
            nombre: 'Egresos prestamos',
          },
          {
            codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.ingresosFijos,
            nombre: 'Ingresos fijos',
          },
          {
            codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.ingresosLegales,
            nombre: 'Ingresos legales',
          },
          {
            codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.otrosIngresos,
            nombre: 'Otros ingresos',
          },
          {
            codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.totalesAcumulados,
            nombre: 'Totales acumulados',
          },
          {
            codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.totalesIndividuales,
            nombre: 'Totales individuales',
          },
          {
            codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.provisiones,
            nombre: 'Provisiones',
          },

        ]
      },
      initialValue: "",
      validators: [
        Validators.required
      ],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Totales ...',
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.text,
      label: 'Nombre',
      formControlName: FormRubrosRolEnum.nombre,
      placeholder: 'Ej: Días de falta',
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
      type: fieldType.text,
      label: 'Nombre auxiliar 1',
      formControlName: FormRubrosRolEnum.nombreAuxiliarUno,
      placeholder: 'Ej: Días de falta',
      initialValue: "",
      help: 'Ingrese el nombre auxiliar 1',
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
      type: fieldType.text,
      label: 'Nombre auxiliar 2',
      formControlName: FormRubrosRolEnum.nombreAuxiliarDos,
      placeholder: 'Ej: Días de falta',
      initialValue: "",
      help: 'Ingrese el nombre auxiliar 2',
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
      label: 'Unidad',
      formControlName: FormRubrosRolEnum.unidad,
      type: fieldType.select,
      help: 'Seleccione la unidad',
      select: {
        filterBy: 'nombre',
        dataKey: 'unidad',
        filterPlaceholder: 'Ej: Valor',
        optionLabel: 'nombre',
        options: [
          {
            unidad: UnidadesEnum.valor,
            nombre: 'Valor',
          },
          {
            unidad: UnidadesEnum.horas,
            nombre: 'Horas',
          },
          {
            unidad: UnidadesEnum.dias,
            nombre: 'Días',
          },
        ]
      },
      initialValue: "",
      validators: [
        Validators.required
      ],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Valor',
      column: '6',
      actualValue: '',
    },
    {
      label: 'Calcúla IESS',
      formControlName: FormRubrosRolEnum.calculaIess,
      type: fieldType.select,
      help: 'Seleccione Si o No',
      select: {
        filterBy: 'nombre',
        dataKey: 'calculaIess',
        filterPlaceholder: 'Ej: Si',
        optionLabel: 'nombre',
        options: [
          {
            calculaIess: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            calculaIess: SiNoEnum.NO,
            nombre: 'No',
          }
        ]
      },
      initialValue: "",
      validators: [
        Validators.required
      ],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Si',
      column: '6',
      actualValue: '',
    },
    {
      label: 'Calcúla renta',
      formControlName: FormRubrosRolEnum.calculaRenta,
      type: fieldType.select,
      help: 'Seleccione Si o No',
      select: {
        filterBy: 'nombre',
        dataKey: 'calculaRenta',
        filterPlaceholder: 'Ej: SI',
        optionLabel: 'nombre',
        options: [
          {
            calculaRenta: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            calculaRenta: SiNoEnum.NO,
            nombre: 'No',
          }
        ]
      },
      initialValue: "",
      validators: [
        Validators.required
      ],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Si',
      column: '6',
      actualValue: '',
    },
    {
      label: 'Calcúla décimo tercero',
      formControlName: FormRubrosRolEnum.calculaDecTercero,
      type: fieldType.select,
      help: 'Seleccione Si o No',
      select: {
        filterBy: 'nombre',
        dataKey: 'calculaDecTercero',
        filterPlaceholder: 'Ej: Si',
        optionLabel: 'nombre',
        options: [
          {
            calculaDecTercero: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            calculaDecTercero: SiNoEnum.NO,
            nombre: 'No',
          }
        ]
      },
      initialValue: "",
      validators: [
        Validators.required
      ],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Si',
      column: '6',
      actualValue: '',
    },
    {
      label: 'Calcúla décimo cuarto',
      formControlName: FormRubrosRolEnum.calculaDecCuarto,
      type: fieldType.select,
      help: 'Seleccione Si o No',
      select: {
        filterBy: 'nombre',
        dataKey: 'calculaDecCuarto',
        filterPlaceholder: 'Ej: SI',
        optionLabel: 'nombre',
        options: [
          {
            calculaDecCuarto: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            calculaDecCuarto: SiNoEnum.NO,
            nombre: 'No',
          }
        ]
      },
      initialValue: "",
      validators: [
        Validators.required
      ],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Si',
      column: '6',
      actualValue: '',
    },
    {
      label: 'Calcúla fondos de reserva',
      formControlName: FormRubrosRolEnum.calculaFReserva,
      type: fieldType.select,
      help: 'Seleccione Si o No',
      select: {
        filterBy: 'nombre',
        dataKey: 'calculaFReserva',
        filterPlaceholder: 'Ej: Si',
        optionLabel: 'nombre',
        options: [
          {
            calculaFReserva: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            calculaFReserva: SiNoEnum.NO,
            nombre: 'No',
          }
        ]
      },
      initialValue: "",
      validators: [
        Validators.required
      ],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Si',
      column: '6',
      actualValue: '',
    },
    {
      label: 'Calcúla vacaciones',
      formControlName: FormRubrosRolEnum.calculaVacaciones,
      type: fieldType.select,
      help: 'Seleccione Si o No',
      select: {
        filterBy: 'nombre',
        dataKey: 'calculaVacaciones',
        filterPlaceholder: 'Ej: Si',
        optionLabel: 'nombre',
        options: [
          {
            calculaVacaciones: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            calculaVacaciones: SiNoEnum.NO,
            nombre: 'No',
          }
        ]
      },
      initialValue: "",
      validators: [
        Validators.required
      ],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Si',
      column: '6',
      actualValue: '',
    },
    {
      label: 'Se suma',
      formControlName: FormRubrosRolEnum.seSuma,
      type: fieldType.select,
      help: 'Seleccione Si o No',
      select: {
        filterBy: 'nombre',
        dataKey: 'seSuma',
        filterPlaceholder: 'Ej: Si',
        optionLabel: 'nombre',
        options: [
          {
            seSuma: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            seSuma: SiNoEnum.NO,
            nombre: 'No',
          }
        ]
      },
      initialValue: "",
      validators: [
        Validators.required
      ],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Si',
      column: '6',
      actualValue: '',
    },
  ]
  return arregloCampos;
}
