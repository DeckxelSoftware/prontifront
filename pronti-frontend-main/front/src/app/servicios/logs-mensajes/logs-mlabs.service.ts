import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';
import {ToasterTipo} from './enums/toaster-tipo';
import {Message} from 'primeng/api/message';
import {MensajeToaster} from './intefaces/mensaje-toaster';

@Injectable({
  providedIn: 'root',
})
export class LogsMlabsService {

  constructor(
    private readonly messageService: MessageService) {
  }

  toaster(mensaje: MensajeToaster) {
    let message: Message = {
      summary: mensaje.titulo,
      detail: mensaje.mensaje,
    };
    if (mensaje.tipo === ToasterTipo.info) {
      message.severity = 'info';
    }
    if (mensaje.tipo === ToasterTipo.error) {
      message.severity = 'error';
    }
    if (mensaje.tipo === ToasterTipo.success) {
      message.severity = 'success';
    }
    if (mensaje.tipo === ToasterTipo.warning) {
      message.severity = 'warn';
    }
    this.messageService.add(message)
  }

  logE(datos: any) {
    console.error(datos);
  }

  logI(datos: any) {
    console.info(datos);
  }
}
