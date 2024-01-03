import {Component, Input} from '@angular/core';
import {PagoDetalleInterface, PagoInterface} from "../../rutas/ruta-cuota-cobro/ruta-cuota-cobro.component";
import {MatDialog} from "@angular/material/dialog";
import {
  ModalDetallesFacturaComponent
} from "../../../../shared/modal-detalles-factura/modal-detalles-factura.component";

@Component({
  selector: 'app-detalle-pago-tabla',
  templateUrl: './detalle-pago-tabla.component.html',
  styleUrls: ['./detalle-pago-tabla.component.scss']
})
export class DetallePagoTablaComponent {
  @Input() pago: PagoInterface = {};
  @Input() mostrarBotonFactura = false;

  constructor(
    public matDialog: MatDialog,
  ) {
  }

  abirModalDetallesFactura(detalle: PagoDetalleInterface) {
    console.log(detalle.idFactura);
    this.matDialog.open(ModalDetallesFacturaComponent, {
      data: {
        factura: detalle.idFactura,
      }
    })
  }

}
