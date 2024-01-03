import {FormGroup, Validators} from '@angular/forms';
import {FormTrabajadorEnum} from './form-trabajador.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {ModalidadContrato} from '../../../enums/modalidad-contrato';
import {GeneroEnum} from '../../../enums/genero.enum';
import {EstadoFamiliarEnum} from '../../../enums/estado-familiar.enum';
import {SiNoEnum} from '../../../enums/si-no.enum';
import {FormVendedorEnum} from "../../vendedor/form/form-vendedor.enum";


export const FORM_TRABAJADOR: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      label: 'Usuario',
      placeholder: 'Ej: Cristian',
      help: 'Seleccione un usuario',
      formControlName: FormTrabajadorEnum.usuario,
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
        field: 'nombresCompletos',
        inputId: 'id',
        suggestions: [],
      }
    },
    {
      label: 'Agencia',
      placeholder: 'Ej: Agencia norte',
      help: 'Seleccione una agencia',
      formControlName: FormTrabajadorEnum.idAgencia,
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
    // {
    //   label: 'Modalidad de contrato',
    //   placeholder: 'Ej: S/N/NP',
    //   help: 'Seleccione una modalidad de contrato',
    //   formControlName: FormTrabajadorEnum.modalidadContrato,
    //   initialValue: '',
    //   validators: [
    //     Validators.required,
    //   ],
    //   type: fieldType.select,
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   column: '6',
    //   actualValue: '',
    //   select: {
    //     filterBy: 'modalidadContrato',
    //     dataKey: 'modalidadContrato',
    //     filterPlaceholder: 'S/N/NP',
    //     optionLabel: 'nombre',
    //     options: [
    //       {
    //         modalidadContrato: ModalidadContrato.S.label,
    //         nombre: ModalidadContrato.S.modalidadContrato,
    //       },
    //       {
    //         modalidadContrato: ModalidadContrato.N.label,
    //         nombre: ModalidadContrato.N.modalidadContrato,
    //       },
    //       {
    //         modalidadContrato: ModalidadContrato.NP.label,
    //         nombre: ModalidadContrato.NP.modalidadContrato,
    //       },
    //
    //     ]
    //   }
    // },
    {
      label: 'Fecha ingreso',
      placeholder: 'Ej: 01/07/2022',
      help: 'Seleccione la fecha de ingreso',
      formControlName: FormTrabajadorEnum.fechaIngreso,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.date,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',

    },
    {
      label: 'Estado civil',
      placeholder: 'Ej: Soltero',
      help: 'Seleccione el estado civil',
      formControlName: FormTrabajadorEnum.estadoCivil,
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
        inputId: 'nombre',
        suggestions: []
      }
    },
    {
      label: 'Género',
      placeholder: 'Ej: Femenino',
      help: 'Seleccione un género',
      formControlName: FormTrabajadorEnum.genero,
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
        dataKey: 'genero',
        filterPlaceholder: 'Femenino',
        optionLabel: 'nombre',
        options: [
          {
            genero: GeneroEnum.masculino,
            nombre: 'Masculino',
          },
          {
            genero: GeneroEnum.femenino,
            nombre: 'Femenino',
          }
        ]
      }
    },
    {
      label: 'Estado familiar',
      placeholder: 'Ej: Madre',
      help: 'Seleccione el estado familiar',
      formControlName: FormTrabajadorEnum.estadoFamiliar,
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
        dataKey: 'estadoFamiliar',
        filterPlaceholder: 'Madre',
        optionLabel: 'nombre',
        options: [
          {
            estadoFamiliar: EstadoFamiliarEnum.madre,
            nombre: 'Madre',
          },
          {
            estadoFamiliar: EstadoFamiliarEnum.padre,
            nombre: 'Padre',
          },
          {
            estadoFamiliar: EstadoFamiliarEnum.noAplica,
            nombre: 'No aplica',
          }
        ]
      }
    },
    {
      label: 'Grupo sanguineo',
      placeholder: 'Ej: O+',
      help: 'Seleccione un grupo sanguineo',
      formControlName: FormTrabajadorEnum.grupoSanguineo,
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
        inputId: 'nombre',
        suggestions: []
      }
    },
    {
      label: 'Nivel de estudios',
      placeholder: 'Ej: Bachillerato',
      help: 'Seleccione el nivel de estudios',
      formControlName: FormTrabajadorEnum.nivelEstudios,
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
        inputId: 'nombre',
        suggestions: []
      }
    },
    {
      label: 'Profesión',
      placeholder: 'Ej: Trabajador en general',
      help: 'Seleccione la profesión',
      formControlName: FormTrabajadorEnum.profesion,
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
        inputId: 'nombre',
        suggestions: []
      }
    },
    {
      label: 'Dirección domiciliaria',
      placeholder: 'Ej: Av. 10 de agosto y ...',
      help: 'Ingrese la dirección domiciliaria',
      formControlName: FormTrabajadorEnum.direccionDomiciliaria,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    // {
    //   label: 'Código sectorial',
    //   placeholder: 'Ej: 0101011210',
    //   help: 'Seleccione el código sectorial',
    //   formControlName: FormTrabajadorEnum.codigoSectorial,
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
    {
      label: 'Número afiliación',
      placeholder: 'Ej: 1324',
      help: 'Ingrese el número de afiliación',
      formControlName: FormTrabajadorEnum.numeroAfiliacion,
      initialValue: '',
      validators: [
        // Validators.required,
      ],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      label: 'Discapacidad',
      placeholder: 'Ej: No',
      help: 'Seleccione si tiene discapacidad',
      formControlName: FormTrabajadorEnum.discapacidad,
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
        dataKey: 'discapacidad',
        filterPlaceholder: 'No',
        optionLabel: 'nombre',
        options: [
          {
            discapacidad: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            discapacidad: SiNoEnum.NO,
            nombre: 'No',
          }
        ]
      }
    },
    {
      label: 'Tipo Discapacidad',
      placeholder: 'Ej: Visual',
      help: 'Seleccione el tipo de discapacidad',
      formControlName: FormTrabajadorEnum.tipoDiscapacidad,
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
      label: 'Tiempo parcial',
      placeholder: 'Ej: No',
      help: 'Seleccione si es trabajador a tiempo parcial',
      formControlName: FormTrabajadorEnum.tiempoParcial,
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
        dataKey: 'tiempoParcial',
        filterPlaceholder: 'No',
        optionLabel: 'nombre',
        options: [
          {
            tiempoParcial: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            tiempoParcial: SiNoEnum.NO,
            nombre: 'No',
          }
        ]
      }
    },
    {
      label: 'Factor parcial',
      placeholder: 'Ej: 0,5',
      help: 'Ingrese el factor parcial',
      formControlName: FormTrabajadorEnum.factorParcial,
      initialValue: '',
      disabled: true,
      validators: [
        // Validators.required,
      ],
      type: fieldType.inputNumber,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2
      }
    },
    {
      label: 'Pasante',
      placeholder: 'Ej: No',
      help: 'Seleccione si es pasante',
      formControlName: FormTrabajadorEnum.pasante,
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
        dataKey: 'pasante',
        filterPlaceholder: 'No',
        optionLabel: 'nombre',
        options: [
          {
            pasante: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            pasante: SiNoEnum.NO,
            nombre: 'No',
          }
        ]
      }
    },
    {
      label: 'Reingreso',
      placeholder: 'Ej: No',
      help: 'Seleccione si es reingreso',
      formControlName: FormTrabajadorEnum.reingreso,
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
        dataKey: 'reingreso',
        filterPlaceholder: 'No',
        optionLabel: 'nombre',
        options: [
          {
            reingreso: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            reingreso: SiNoEnum.NO,
            nombre: 'No',
          }
        ]
      }
    },
    {
      label: 'Fecha reingreso',
      placeholder: 'Ej: 01/07/2022',
      help: 'Seleccione la fecha de reingreso',
      formControlName: FormTrabajadorEnum.fechaReingreso,
      initialValue: '',
      disabled: true,
      validators: [
        // Validators.required,
      ],
      type: fieldType.date,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',

    },

    //
    // {
    //   label: 'Aporte IESS',
    //   placeholder: 'Ej: Si',
    //   help: 'Seleccione si aporta al IESS',
    //   formControlName: FormTrabajadorEnum.aporteIess,
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
    //     dataKey: 'aporteIess',
    //     filterPlaceholder: 'No',
    //     optionLabel: 'nombre',
    //     options: [
    //       {
    //         aporteIess: SiNoEnum.SI,
    //         nombre: 'Si',
    //       },
    //       {
    //         aporteIess: SiNoEnum.NO,
    //         nombre: 'No',
    //       }
    //     ]
    //   }
    // },

    {
      label: 'Retenciones judiciales',
      placeholder: 'Ej: $100',
      help: 'Ingrese las retenciones judiciales',
      formControlName: FormTrabajadorEnum.retencionesJudiciales,
      initialValue: '',
      disabled: false,
      validators: [
        // Validators.required,
      ],
      type: fieldType.inputNumber,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        min: 0,
        // minFractionDigits: 2,
        maxFractionDigits: 2,
        prefix: '$'
      }
    },
    {
      label: 'Póliza personal',
      placeholder: 'Ej: $100',
      help: 'Ingrese la póliza personal',
      formControlName: FormTrabajadorEnum.polizaPersonal,
      initialValue: '',
      disabled: false,
      validators: [
        // Validators.required,
      ],
      type: fieldType.inputNumber,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        min: 0,
        // minFractionDigits: 2,
        maxFractionDigits: 2,
        prefix: '$'
      }
    },



  ]
  return arregloCampos;
}
