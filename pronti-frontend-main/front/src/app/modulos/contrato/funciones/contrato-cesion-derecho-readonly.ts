import {FormlyFieldConfig} from "@ngx-formly/core";

export const FORMLY_CONTRATO_READONLY: () => (FormlyFieldConfig[]) = () =>
  [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          key: 'numeroDeContrato',
          type: 'input',
          templateOptions: {
            readonly: true,
            type: 'number',
            label: 'Número de contrato',
          }
        },

        {
          className: 'col-4',
          key: 'version',
          type: 'input',
          templateOptions: {
            readonly: true,
            type: 'number',
            label: 'Versión'
          }
        },

        {
          className: 'col-4',
          key: 'inscripcion',
          type: 'input',
          templateOptions: {
            readonly: true,
            type: 'number',
            label: 'Inscripción'
          }
        },
        {
          className: 'col-4',
          key: 'fechaInicio',
          type: 'input',
          templateOptions: {
            readonly: true,
            type: 'date',
            label: 'fechaInicio',
          },
          expressionProperties: {}
        },
        {
          className: 'col-4',
          key: 'estado',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Estado',
          },
          expressionProperties: {}
        },

        {
          className: 'col-4',
          key: 'dsctoPrimeraCuota',
          type: 'input',
          templateOptions: {
            readonly: true,
            type: 'number',
            label: 'Descuento primera cuota'
          }
        },


        {
          className: 'col-4',
          key: 'cliente',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Cliente'
          }
        },

        {
          className: 'col-4',
          key: 'plazoMesSeleccionado',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Plazo'
          }
        },

        {
          className: 'col-4',
          key: 'dsctoInscripcion',
          type: 'input',
          templateOptions: {
            readonly: true,
            type: 'number',
            min: 0,
            label: 'Descuento inscripción',
          }
        },
        {
          className: 'col-4',
          key: 'precioPlanSeleccionado',
          type: 'input',
          templateOptions: {
            readonly: true,
            type: 'number',
            label: 'Monto'
          }
        },


        {
          className: 'col-4',
          key: 'planSeleccionado',
          type: 'input',
          templateOptions: {
            readonly: true,
            type: 'text',
            label: 'Plan'
          }
        },

        {
          className: 'col-4',
          key: 'observacion',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Observación'
          }
        },

        {
          className: 'col-4',
          key: 'fechaIniciaCobro',
          type: 'input',
          templateOptions: {
            readonly: true,
            type: 'date',
            label: 'Fecha Inicio Cobro',
          },

        },

      ]
    },
    /*
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-12',
              key: 'observacionCesion',
              type: 'input',
              templateOptions: {
                type: 'textarea',
                label: 'Observación cesion'
              }
            }
          ]
        }
    */
  ];
