import { FormGroup, Validators } from '@angular/forms';
import { FormConfiguracionGeneralEnum } from './form-configuracion-general.enum';
import { fieldType, FormField } from '../../../componentes/forms/interfaces/form-field';
import { FORM_BENEFICIO_ENUM } from "../../trabajador/form/form-beneficio.enum";
import { SiNoEnum } from "../../../enums/si-no.enum";
import { AsumeIvaEnum } from "../../../enums/asume-iva.enum";


export const FORM_CONFIGURACION_GENERAL: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      label: 'Iva porcentaje',
      placeholder: 'Ej: 12%',
      help: 'Ingrese el iva',
      formControlName: FormConfiguracionGeneralEnum.ivaPorcentaje,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.inputNumber,
      inputNumber: {
        min: 0,
        max: 100,
        minFractionDigits: 1,
        maxFractionDigits: 4,
        suffix: '%'
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },


    {
      label: 'Tasa de cambio contrato',
      placeholder: 'Ej: 3%',
      help: 'Ingrese la tasa de cambio de un contrato',
      formControlName: FormConfiguracionGeneralEnum.tasaCambioContrato,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.inputNumber,
      inputNumber: {
        min: 0,
        max: 100,
        minFractionDigits: 1,
        maxFractionDigits: 4,
        suffix: '%'
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      label: 'Mínimo cuota mora refinamiento',
      placeholder: 'Ej: 3',
      help: 'Ingrese el mínimo cuota mora refinamiento',
      formControlName: FormConfiguracionGeneralEnum.minCuotaMoraRefinanciamiento,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.inputNumber,
      inputNumber: {
        min: 0,
        // max: 100,
        // minFractionDigits: 1,
        // maxFractionDigits: 4,
        // suffix: '%'
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      label: 'Máximo contratos en grupo',
      placeholder: 'Ej: 144',
      help: 'Ingrese el mínimo cuota mora refinamiento',
      formControlName: FormConfiguracionGeneralEnum.maxContratosEnGrupo,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.inputNumber,
      inputNumber: {
        min: 0,
        // max: 100,
        // minFractionDigits: 1,
        // maxFractionDigits: 4,
        // suffix: '%'
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      label: 'Cuota administrativa',
      placeholder: 'Ej: 3%',
      help: 'Ingrese la cuota administrativa',
      formControlName: FormConfiguracionGeneralEnum.cuotaAdministrativa,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.inputNumber,
      inputNumber: {
        // mode: 'currency',
        min: 0,
        minFractionDigits: 1,
        maxFractionDigits: 4,
        prefix: '$'
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },


    {
      label: 'Aporte patronal IESS',
      placeholder: 'Ej: 11.15%',
      help: 'Ingrese el aporte patronal iess',
      formControlName: FormConfiguracionGeneralEnum.aportePatronalIess,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.inputNumber,
      inputNumber: {
        min: 0,
        max: 100,
        minFractionDigits: 1,
        maxFractionDigits: 2,
        suffix: '%'
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },


    {
      label: 'Aporte personal IESS',
      placeholder: 'Ej: 9.45%',
      help: 'Ingrese el aporte personal iess',
      formControlName: FormConfiguracionGeneralEnum.aportePersonalIess,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.inputNumber,
      inputNumber: {
        min: 0,
        max: 100,
        minFractionDigits: 1,
        maxFractionDigits: 2,
        suffix: '%'
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },


    {
      label: 'Número días vacaciones al año',
      placeholder: 'Ej: 15',
      help: 'Ingrese número de días de vacaciones al año',
      formControlName: FormConfiguracionGeneralEnum.numDiasVacacionesAlAnio,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.inputNumber,
      inputNumber: {
        min: 0,
        max: 100,
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },


    {
      label: 'Sueldo básico',
      placeholder: 'Ej: $425.00',
      help: 'Ingrese el aporte personal iess',
      formControlName: FormConfiguracionGeneralEnum.sueldoBasico,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.inputNumber,
      inputNumber: {
        min: 0,
        minFractionDigits: 1,
        maxFractionDigits: 2,
        prefix: '$'
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',

    },

    {
      label: 'Tasa cargo adjudicación',
      placeholder: 'Ej: 4%',
      help: 'Ingrese la tasa cargo de adjudicación',
      formControlName: FormConfiguracionGeneralEnum.tasaCargoAdjudicacion,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.inputNumber,
      inputNumber: {
        min: 0,
        max: 100,
        minFractionDigits: 1,
        maxFractionDigits: 2,
        suffix: '%'
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      label: 'Rastreo',
      placeholder: 'Ej: 23.33',
      help: 'Ingrese el rastreo',
      formControlName: FormConfiguracionGeneralEnum.rastreo,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.inputNumber,
      inputNumber: {
        min: 0,
        maxFractionDigits: 2,
        // prefix: '$'
        // max: 100,
        // minFractionDigits: 1,
        // maxFractionDigits: 4,
        // suffix: '%'
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      label: 'Dispositivo',
      placeholder: 'Ej: 11.20',
      help: 'Ingrese el dispositivo',
      formControlName: FormConfiguracionGeneralEnum.dispositivo,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.inputNumber,
      inputNumber: {
        min: 0,
        maxFractionDigits: 2,
        // prefix: '$'
        // max: 100,
        // minFractionDigits: 1,
        // maxFractionDigits: 4,
        // suffix: '%'
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type:
        fieldType.text,
      label: 'Elaborador Rol',
      formControlName: FormConfiguracionGeneralEnum.elaboradorRol,
      placeholder: 'Ej: ....',
      initialValue: "",
      help: 'Ingrese el nombre del elaborador que va salir en los reportes del rol',
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
      type:
        fieldType.text,
      label: 'Elaborador Rol',
      formControlName: FormConfiguracionGeneralEnum.revisadorRol,
      placeholder: 'Ej: ....',
      initialValue: "",
      help: 'Ingrese el nombre del revisor que va salir en los reportes del rol',
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


export const FORM_EDITAR_IVA: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      label: 'Iva porcentaje',
      placeholder: 'Ej: 12%',
      help: 'Ingrese el iva',
      formControlName: FormConfiguracionGeneralEnum.ivaPorcentaje,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.inputNumber,
      inputNumber: {
        min: 0,
        max: 100,
        minFractionDigits: 1,
        maxFractionDigits: 4,
        suffix: '%'
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      label: 'Asume',
      placeholder: 'Ej: Cliente',
      help: 'Seleccione Cliente o Empresa',
      formControlName: FormConfiguracionGeneralEnum.asumeIva,
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
        dataKey: 'asumeIva',
        filterPlaceholder: 'Si/No',
        optionLabel: 'nombre',
        options: [
          {
            asumeIva: AsumeIvaEnum.asumeCliente,
            nombre: 'Cliente',
          },
          {
            asumeIva: AsumeIvaEnum.asumeEmpresa,
            nombre: 'Empresa',
          }
        ]
      },
    },

  ]
  return arregloCampos;
}


