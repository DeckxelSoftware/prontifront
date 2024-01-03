import {Component, Input, OnInit} from '@angular/core';
import {PagoInterface} from "../../rutas/ruta-cuota-cobro/ruta-cuota-cobro.component";

@Component({
  selector: 'app-pago-tabla',
  templateUrl: './pago-tabla.component.html',
  styleUrls: ['./pago-tabla.component.scss']
})
export class PagoTablaComponent {
  @Input() pagos!: PagoInterface[]
  @Input() mostrarBotonFacturaDetalles = false;

  constructor() {
  }

}
