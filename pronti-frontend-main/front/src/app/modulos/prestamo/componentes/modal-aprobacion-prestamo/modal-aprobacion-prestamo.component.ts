import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {RutaAprobacionPrestamoComponent} from "../../rutas/ruta-aprobacion-prestamo/ruta-aprobacion-prestamo.component";
import {PrestamoResponseDto} from "../../servicios/dto/prestamo.response-dto";
import {ModalidadDescuentoEnum} from "../../../../enums/modalidad-descuento.enum";
import {EstadoSolicitudPrestamo} from "../../../../enums/estado-solicitud-prestamo";
import * as dayjs from "dayjs";
import {LogsMlabsService} from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import {ToasterTipo} from "../../../../servicios/logs-mensajes/enums/toaster-tipo";
import {ActivoInactivo} from "../../../../enums/activo-inactivo";
import {HttpPrestamoService} from "../../servicios/http-prestamo-service";
import {PrestamoCreateDto} from "../../servicios/dto/prestamo.create-dto";
import {BlockuiService} from "../../../../servicios/block-ui/blockui.service";

@Component({
  selector: 'app-modal-aprobacion-prestamo',
  templateUrl: './modal-aprobacion-prestamo.component.html',
  styleUrls: ['./modal-aprobacion-prestamo.component.scss']
})
export class ModalAprobacionPrestamoComponent implements OnInit {
  formPrestamo = new FormGroup({});
  prestamosRegistrados!: PrestamoResponseDto[];
  modelPrestamo = {
    nombreTrabajador: '',
    valor: 0,
    tipoPrestamo: '',
    fechaPrestamo: '',
    estadoSolicitud: '',
    modalidadDescuento: '',
    concepto: '',
    comprobanteEgreso: ''
  };
  fieldsPrestamo: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          key: 'nombreTrabajador',
          type: 'input',
          templateOptions: {
            type: 'text',
            readonly: true,
            label: 'Nombre trabajador',
          }
        },
        {
          className: 'col-4',
          key: 'valor',
          type: 'input',
          templateOptions: {
            type: 'number',
            readonly: true,
            label: 'Valor',
          },
          expressionProperties: {}
        },
        {
          className: 'col-4',
          key: 'tipoPrestamo',
          type: 'input',
          templateOptions: {
            type: 'text',
            readonly: true,
            label: 'Tipo prestamo',
          },
          expressionProperties: {}
        },
        {
          className: 'col-4',
          key: 'fechaPrestamo',
          type: 'input',
          templateOptions: {
            type: 'text',
            readonly: true,
            label: 'Fecha prestamo',
          },
          expressionProperties: {}
        },
        {
          className: 'col-4',
          key: 'estadoSolicitud',
          type: 'select',
          templateOptions: {
            required: true,
            label: 'Estado solicitud',
            options: [
              // {
              //   label: 'Registrado',
              //   value: EstadoSolicitudPrestamo.registrado
              // },
              {
                label: 'Vigente',
                value: EstadoSolicitudPrestamo.vigente
              },
              {
                label: 'Cancelado',
                value: EstadoSolicitudPrestamo.cancelado
              },
              {
                label: 'Negado',
                value: EstadoSolicitudPrestamo.negado
              },
            ],
            change: () => {
              this.formPrestamo.get('modalidadDescuento')?.reset();
            }
          },
          expressionProperties: {}
        },
        {
          className: 'col-4',
          key: 'modalidadDescuento',
          type: 'select',
          hideExpression: () => !(this.modelPrestamo.estadoSolicitud === EstadoSolicitudPrestamo.vigente),
          templateOptions: {
            required: true,
            label: 'Modalidad descuento',
            options: [
              {
                label: 'Rol',
                value: ModalidadDescuentoEnum.rol
              },
              {
                label: 'Utilidades',
                value: ModalidadDescuentoEnum.utilidades
              },
              {
                label: 'Décimo tercero',
                value: ModalidadDescuentoEnum.decimoTercero
              },
              {
                label: 'Décimo cuarto',
                value: ModalidadDescuentoEnum.decimoCuarto
              }
            ]
          },

        },
        {
          className: 'col-4',
          key: 'comprobanteEgreso',
          type: 'input',
          hideExpression: () => !(this.modelPrestamo.estadoSolicitud === EstadoSolicitudPrestamo.vigente),
          templateOptions: {
            type: 'text',
            required: true,
            label: 'Comprobante de egreso',
          },

        },
        {
          className: 'col-12',
          key: 'concepto',
          type: 'input',
          templateOptions: {
            type: 'text',
            readonly: true,
            label: 'concepto',
          },
          expressionProperties: {}
        },
      ]
    }
  ]

  constructor(
    private dialogRef: MatDialogRef<ModalAprobacionPrestamoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:
      {
        componente: RutaAprobacionPrestamoComponent,
        registro: PrestamoResponseDto,// enviar si se está editando
      },
    public matDialog: MatDialog,
    public mlabsLogs: LogsMlabsService,
    public httpPrestamoService: HttpPrestamoService,
    public blockuiService: BlockuiService,
  ) {
  }

  ngOnInit(): void {
    this.prestamosRegistrados = this.obtenerPrestamosRegistrados();
    console.log(this.data.registro);
    this.setearValoresEnForm();
  }

  setearValoresEnForm() {
    // @ts-ignore
    this.modelPrestamo.nombreTrabajador = this.data.registro.idTrabajador.idUsuario.nombres + ' ' + this.data.registro.idTrabajador.idUsuario.apellidos;
    this.modelPrestamo.valor = this.data.registro.valor as number;
    this.modelPrestamo.tipoPrestamo = this.data.registro.tipoPrestamo + '';
    //  this.modelPrestamo.fechaPrestamo = this.data.registro.fechaPrestamo + '';
    this.modelPrestamo.fechaPrestamo = dayjs().format('DD-MM-YYYY');
    this.modelPrestamo.estadoSolicitud = this.data.registro.estadoSolicitud + '';
    this.modelPrestamo.modalidadDescuento = this.data.registro.modalidadDescuento + '';
    this.modelPrestamo.concepto = this.data.registro.concepto + '';

  }

  cancelar() {
    this.dialogRef.close();
  }

  submit() {
    this.blockuiService.habilitarBlockUI();
    if (this.modelPrestamo.estadoSolicitud === EstadoSolicitudPrestamo.vigente) {
      console.log('entro en  aprobado!')
      const objetoCrear: PrestamoCreateDto = {
        // @ts-ignore
        idTrabajador: this.data.registro.idTrabajador.id,
        tipoPrestamo: this.data.registro.tipoPrestamo as string,
        valor: this.data.registro.valor as number,
        cuotas: this.data.registro.cuotas as number,
        tasaInteres: this.data.registro.tasaInteres as number,
        concepto: this.data.registro.concepto + '',
        // sisHabilitado: ActivoInactivo.Activo,
        nombreApellidoResponsable: this.data.registro.nombreApellidoResponsable as string,
        comprobanteEgreso: this.modelPrestamo.comprobanteEgreso,
        modalidadDescuento: this.modelPrestamo.modalidadDescuento,
      }
      this.httpPrestamoService.generarPrestamo(objetoCrear).subscribe(
        {
          next: (res) => {
            this.eliminarPrestamoDeLocalStorage(this.data.registro.idAux as string);
            this.mlabsLogs.toaster({
              titulo: 'EXITO',
              mensaje: 'Prestamo generado',
              tipo: ToasterTipo.success
            });
            this.dialogRef.close();
            this.blockuiService.deshabilitarBlockUI();
          },
          error: (err) => {
            console.error('Error generando prestamo:', err);

            this.mlabsLogs.toaster({
              titulo: 'ERROR',
              mensaje: 'Error generando prestamo',
              tipo: ToasterTipo.error
            });
            this.blockuiService.deshabilitarBlockUI();
          }
        }
      )
    } else {
      console.log('entro en negado, cancelado!')
      this.eliminarPrestamoDeLocalStorage(this.data.registro.idAux as string);
      this.blockuiService.deshabilitarBlockUI();
    }
  }

  obtenerPrestamosRegistrados() {
    const prestamosRegistrados = localStorage.getItem('prestamosRegistrados');
    return prestamosRegistrados ? JSON.parse(prestamosRegistrados) : prestamosRegistrados;
  }

  eliminarPrestamoDeLocalStorage(id: string) {
    const indicePrestamoEliminar = this.prestamosRegistrados.findIndex(
      (prestamo) => {
        return prestamo.idAux === id;
      }
    )

    if (indicePrestamoEliminar >= 0) {
      if (this.modelPrestamo.estadoSolicitud === EstadoSolicitudPrestamo.vigente) {

        // this.prestamosRegistrados.splice(indicePrestamoEliminar, 1);
        // localStorage.setItem('prestamosRegistrados', JSON.stringify(this.prestamosRegistrados));
        this.mlabsLogs.toaster(
          {
            titulo: 'EXITO',
            mensaje: 'Préstamo aprobado',
            tipo: ToasterTipo.success
          }
        );
      } else {
        this.mlabsLogs.toaster(
          {
            titulo: 'EXITO',
            mensaje: 'Préstamo eliminado',
            tipo: ToasterTipo.success
          }
        );
      }
      this.prestamosRegistrados.splice(indicePrestamoEliminar, 1);
      localStorage.setItem('prestamosRegistrados', JSON.stringify(this.prestamosRegistrados));

      this.dialogRef.close();
    } else {
      this.mlabsLogs.toaster(
        {
          titulo: 'ERROR',
          mensaje: 'Error al actualizar préstamo',
          tipo: ToasterTipo.warning
        }
      );
    }
  }

}
