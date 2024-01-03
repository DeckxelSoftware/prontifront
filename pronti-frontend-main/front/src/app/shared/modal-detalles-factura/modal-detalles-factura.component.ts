import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FacturaResponseDto} from "../../modulos/factura/servicios/dto/factura.response-dto";

@Component({
  selector: 'app-modal-detalles-factura',
  templateUrl: './modal-detalles-factura.component.html',
  styleUrls: ['./modal-detalles-factura.component.scss']
})
export class ModalDetallesFacturaComponent {
  constructor(
    private dialogRef: MatDialogRef<ModalDetallesFacturaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      factura: FacturaResponseDto
    }
  ) {
  }

  cerrarModal() {
    this.dialogRef.close();
  }

}
