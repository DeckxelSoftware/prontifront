import {MensajeToaster} from '../../servicios/logs-mensajes/intefaces/mensaje-toaster';
import {ToasterTipo} from '../../servicios/logs-mensajes/enums/toaster-tipo';

export const MENSAGE_TOAST = {
  busquedaExitosa: (x: string = 'Registros'): MensajeToaster => {
    return {
      titulo: 'Exito',
      mensaje: `${x} buscados exitosamente`,
      tipo: ToasterTipo.info
    }
  },
  creacionExitosa: (x: string): MensajeToaster => {
    return {
      titulo: 'Exito',
      mensaje: `${x} creado exitosamente`,
      tipo: ToasterTipo.success
    }
  },
  error: (x: string = ''): MensajeToaster => {
    return {
      titulo: 'Error',
      mensaje: `${x} Intentalo mas tarde`,
      tipo: ToasterTipo.error
    }
  },
  habilitadoExitoso: (x: string= 'Registro'): MensajeToaster => {
    return {
      titulo: 'Exito',
      mensaje: `${x} cambio de habilitado exitoso.`,
      tipo: ToasterTipo.success
    }
  },
  actualizacionExitosa: (x: string= 'Registro'): MensajeToaster => {
    return {
      titulo: 'Exito',
      mensaje: `${x} actualización exitosa.`,
      tipo: ToasterTipo.success
    }
  },
}
