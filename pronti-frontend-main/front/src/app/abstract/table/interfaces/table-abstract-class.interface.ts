import {BlockuiService} from '../../../servicios/block-ui/blockui.service';
import {LogsMlabsService} from '../../../servicios/logs-mensajes/logs-mlabs.service';
import {ConfirmationService} from 'primeng/api';

export interface TableAbstractClassInterface {
  blockuiService: BlockuiService,
  messageService: LogsMlabsService,
  confirmationService: ConfirmationService,
  nombreRegistro: string
}

