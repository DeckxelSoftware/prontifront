import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {HttpCuentaContableService} from "../../../cuenta-contable/servicios/http-cuenta-contable-service";
import {CuentaContableFindDto} from "../../../cuenta-contable/servicios/dto/cuenta-contable.find-dto";
import {CuentaContableResponseDto} from "../../../cuenta-contable/servicios/dto/cuenta-contable.response-dto";
import {BlockuiService} from "../../../../servicios/block-ui/blockui.service";
import {LogsMlabsService} from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToasterTipo} from "../../../../servicios/logs-mensajes/enums/toaster-tipo";
import {PlanCuentasFindDto} from "../../servicios/dto/plan-cuentas.find-dto";
import {ActivoInactivo} from '../../../../enums/activo-inactivo';

@Component({
  selector: 'app-modal-plan-cuentas',
  templateUrl: './modal-plan-cuentas.component.html',
  styleUrls: ['./modal-plan-cuentas.component.scss']
})
export class ModalPlanCuentasComponent implements OnInit {


  cuentasContables: any[] = [];
  identificadorLength = 1;


  nivelEscrito: number = 1;
  cuentaContableL1: CuentaContableResponseDto = {};
  cuentaContableL2: CuentaContableResponseDto = {};
  cuentaContableL3: CuentaContableResponseDto = {};
  cuentaContableL4: CuentaContableResponseDto = {};


  form = new FormGroup({});
  model = {
    identificador: '',
    nombre: '',
    tipoCuenta: '',
    movimiento: ''
  }
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'identificador',
          type: 'input',
          templateOptions: {
            label: 'Identificador',
            required: true,
            pattern: /(^[0-9]+$)/,
            // maxLength: this.identificadorLength

          },
          validation: {
            messages: {
              pattern: (error, field: FormlyFieldConfig) => {
                // console.log(error, field);
                return 'Ingrese únicamente números';
              }
            }
          },
          expressionProperties: {
            'templateOptions.maxLength': () => this.identificadorLength + '',
          },


        },
        {
          className: 'col-6',
          key: 'nombre',
          type: 'input',
          templateOptions: {
            label: 'Nombre',
            required: true,
          }
        },

        {
          className: 'col-6',
          key: 'movimiento',
          type: 'select',
          templateOptions: {
            label: 'Movimiento',
            required: true,
            options: [
              {
                label: 'Mayor',
                value: 'M'
              },

              {
                label: 'Auxiliar',
                value: 'A'
              }
            ]
          }
        },

        {
          className: 'col-6',
          key: 'tipoCuenta',
          type: 'select',
          templateOptions: {
            label: 'Tipo cuenta',
            required: true,
            options: [
              {
                label: 'Acreedora',
                value: 'A'
              },

              {
                label: 'Deudora',
                value: 'D'
              }
            ]
          }
        },
      ]
    }
  ]

  constructor(private _httpCuentaContableService: HttpCuentaContableService,
              private blockuiService: BlockuiService,
              private messageService: LogsMlabsService,
              public dialogRef: MatDialogRef<ModalPlanCuentasComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {


  }


  ngOnInit() {
    if (this.data.id) {
      // console.log('llenar la informacion');
      this.llenarFormulario();
    }
  }

  buscarPorNivelesCuentas(registro: CuentaContableResponseDto) {

    // dependiendo del nivel que sea se va a consultar los niveles hijos para llenar los autocompletes
    // si registro.nivel = 3
    // entonces vamos a buscar unicamente los niveles 1 y 2
    // y los resutados los asignamos a las variables cuentaContableL1 y 2
    // y enviamos conjunto con la data
    const busqueda: PlanCuentasFindDto = {}

    if (registro?.nivel) {
      for (let nivelCuenta = 1; nivelCuenta <= registro.nivel; nivelCuenta++) {
        if (nivelCuenta == 1) {
          busqueda.idNivel1 = '';
          busqueda.idNivel2 = '';
          busqueda.idNivel3 = '';
          busqueda.idNivel4 = '';
        }
        if (nivelCuenta === 2) {
          busqueda.idNivel1 = registro.idNivel1;
        }
        if (nivelCuenta === 3) {

          busqueda.idNivel1 = registro.idNivel1;
          busqueda.idNivel2 = registro.idNivel2;
        }
        if (nivelCuenta === 4) {
          busqueda.idNivel1 = registro.idNivel1;
          busqueda.idNivel2 = registro.idNivel2;
          busqueda.idNivel3 = registro.idNivel3;
        }

        if (nivelCuenta === 5) {
          busqueda.idNivel1 = registro.idNivel1;
          busqueda.idNivel2 = registro.idNivel2;
          busqueda.idNivel3 = registro.idNivel3;
          busqueda.idNivel4 = registro.idNivel4;
        }

        busqueda.nivel = nivelCuenta;
        // console.log('lo que buscare', busqueda);
      }
    }
  }


  buscarCuentaContable(event: any, nivel: number) {
    const busqueda: CuentaContableFindDto = {
      busqueda: event.query,
      nivel,
    };

    if (nivel === 2) {
      busqueda.idNivel1 = this.cuentaContableL1.id;
    }
    if (nivel === 3) {

      busqueda.idNivel1 = this.cuentaContableL1.id;
      busqueda.idNivel2 = this.cuentaContableL2.id;
    }
    if (nivel === 4) {
      busqueda.idNivel1 = this.cuentaContableL1.id;
      busqueda.idNivel2 = this.cuentaContableL2.id;
      busqueda.idNivel3 = this.cuentaContableL3.id;
    }
    if(nivel === 5){
      busqueda.idNivel1 = this.cuentaContableL1.id;
      busqueda.idNivel2 = this.cuentaContableL2.id;
      busqueda.idNivel3 = this.cuentaContableL3.id;
      busqueda.idNivel4 = this.cuentaContableL4.id;
    }


    let dataCuentaContable: any[] = [];
    this._httpCuentaContableService
      .find(busqueda)
      .toPromise()
      .then(res => res as [CuentaContableResponseDto[], number])
      .then(data => {
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        // const arregloDatos = data[0].map((a:any)=>{ a.nombreCompeto = a.nombre + ' ' + a.apellido; return a;});
        dataCuentaContable = data[0];
        // dataCuentaContable = data[0].map((a: any) => {
        //   console.log(a);
        //   a.label = a.nombre;
        //   a.value = a.id;
        //   return a;
        // });

        // console.log(dataCuentaContable)
        this.cuentasContables = dataCuentaContable;
        return dataCuentaContable;
      });
  }


  validarNivelIdentificador(nivel: number) {

    if (nivel < this.nivelEscrito) {
      switch (nivel) {
        case 1:
          this.cuentaContableL2 = {};
          this.cuentaContableL3 = {};
          this.cuentaContableL4 = {};
          this.identificadorLength = 2;
          this.nivelEscrito = 2;
          break;
        case 2:
          this.cuentaContableL3 = {};
          this.cuentaContableL4 = {};
          this.nivelEscrito = 3;
          this.identificadorLength = 3;
          break;
        case 3:
          this.cuentaContableL4 = {};
          this.nivelEscrito = 4;
          this.identificadorLength = 5;
          break;
        case 4:
          this.nivelEscrito = 5;
          this.identificadorLength = 7;
          break;
        default:
          break;
      }

    } else {
      switch (nivel) {
        case 1:
          this.nivelEscrito = 2;
          this.identificadorLength = 2;
          break;
        case 2:
          this.nivelEscrito = 3;
          this.identificadorLength = 3;
          break;
        case 3:
          this.nivelEscrito = 4;
          this.identificadorLength = 5;
          break;
        case 4:
          this.nivelEscrito = 5;
          this.identificadorLength = 7;
          break;
        default:
          break;
      }
    }

    this.setearControlesIdentificador();


  }

  setearControlesIdentificador() {

    this.form.get('identificador')?.setValue('');
    this.form.controls['identificador'].setValidators(
      [
        Validators.required,
        Validators.maxLength(this.identificadorLength),
        Validators.minLength(this.identificadorLength),
        Validators.pattern(/(^[0-9]+$)/)
      ]);

  }

  setearLengthIdentificador() {
    // this.identificadorLength = this.identificadorLength
    switch (this.nivelEscrito) {
      case 1:
        this.identificadorLength = 1;
        break;
      case 2:
        this.identificadorLength = 2;
        break;
      case 3:
        this.identificadorLength = 3;
        break;
      case 4:
        this.identificadorLength = 5;
        break;
      case 5:
        this.identificadorLength = 7;
        break;
      default:
        break;
    }
  }


  validarEnvioCuentaContable() {
    return !this.form.valid;
  }

  enviarCrearCuentaContable() {
    const objetoCuentaContable = {
      nivel: this.nivelEscrito,
      idNivel1: this.cuentaContableL1.id || '',
      idNivel2: this.cuentaContableL2.id || '',
      idNivel3: this.cuentaContableL3.id || '',
      idNivel4: this.cuentaContableL4.id || '',
      identificador: +this.model.identificador,
      nombre: this.model.nombre,
      tipoCuenta: this.model.tipoCuenta,
      movimiento: this.model.movimiento,
      sisHabilitado: ActivoInactivo.Activo
    }


    this.blockuiService.habilitarBlockUI();
    if (this.data.id) {

      // @ts-ignore
      this._httpCuentaContableService.updateById(objetoCuentaContable, this.data.id).subscribe({
        next: () => {
          this.blockuiService.deshabilitarBlockUI();
          this.dialogRef.close(true);
          this.messageService.toaster({
            titulo: 'Plan cuenta',
            tipo: ToasterTipo.success,
            mensaje: 'Registrado correctamente'
          });

        },
        error: (err) => {
          this.blockuiService.deshabilitarBlockUI();
          this.messageService.toaster({
            titulo: 'Plan cuenta',
            tipo: ToasterTipo.error,
            mensaje: 'Intentelo nuevamente'
          })
          console.error('Hubo problemas al crear cuenta contable', err);
        }
      });
    } else {
      // @ts-ignore
      this._httpCuentaContableService.createOne(objetoCuentaContable).subscribe({
        next: () => {
          this.blockuiService.deshabilitarBlockUI();
          this.dialogRef.close(true);
          this.messageService.toaster({
            titulo: 'Plan cuenta',
            tipo: ToasterTipo.success,
            mensaje: 'Registrado correctamente'
          });

        },
        error: (err) => {
          this.blockuiService.deshabilitarBlockUI();
          this.messageService.toaster({
            titulo: 'Plan cuenta',
            tipo: ToasterTipo.error,
            mensaje: 'Intentelo nuevamente'
          })
          console.error('Hubo problemas al crear cuenta contable', err);
        }
      });

    }

  }

  llenarFormulario() {
    this.model = {...this.data};
    this.cuentaContableL1 = this.data.cuentaContableL1;
    this.cuentaContableL2 = this.data.cuentaContableL2;
    this.cuentaContableL3 = this.data.cuentaContableL3;
    this.cuentaContableL4 = this.data.cuentaContableL4;
    this.nivelEscrito = this.data.nivel;
    // console.log('nivel escrito', this.nivelEscrito);
    this.setearLengthIdentificador();

  }
}
