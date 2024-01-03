import {ToasterTipo} from '../enums/toaster-tipo';

export interface MensajeToaster {
  titulo: string,
  mensaje: string,
  tipo: ToasterTipo
}
