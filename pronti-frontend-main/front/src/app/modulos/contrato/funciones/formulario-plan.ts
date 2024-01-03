import {FormlyFieldConfig} from '@ngx-formly/core';

export const FORMLY_PLAN: (planSolo: boolean) => (FormlyFieldConfig[]) = (planSolo: boolean) => {

  const arregloFormly: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          key: 'modelo',
          type: 'input',
          templateOptions: {
            label: 'Modelo',
            type: 'text',
            readonly: true
          }
        },

        {
          className: 'col-4',
          key: 'precio',
          type: 'input',
          templateOptions: {
            label: 'Monto',
            type: 'number',
            readonly: true
          }
        },

        {
          className: 'col-4',
          key: 'inscripcion',
          type: 'input',
          templateOptions: {
            label: 'Inscripción',
            type: 'number',
            readonly: true
          }
        },
        {
          className: 'col-4',
          key: 'plazoMesSeleccionado',
          type: 'input',
          templateOptions: {
            label: 'Plazo',
            type: 'number',
            readonly: true
          }
        },

        {
          className: 'col-4',
          key: 'valorTasaAdministrativa',
          type: 'input',
          templateOptions: {
            label: 'Tasa administrativa',
            type: 'number',
            readonly: true
          }
        },


      ]
    }
  ];

  if (!planSolo) {

    arregloFormly.push(
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-4',
            key: 'dsctoInscripcion',
            type: 'input',
            templateOptions: {
              label: 'Dscto inscripción',
              type: 'number',
              readonly: true
            }
          },

          {
            className: 'col-4',
            key: 'dsctoPrimeraCuota',
            type: 'input',
            templateOptions: {
              label: 'Dscto primera cuota',
              type: 'number',
              readonly: true
            }
          },
        ]
      }
    );
  }


  return arregloFormly;
}
