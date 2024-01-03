import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.scss']
})
export class ModalConfirmacionComponent {

  constructor(
    private dialogRef: MatDialogRef<ModalConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data:
      {
        mensaje: string, // se puede enviar este key pra el detalle
        titulo: string,
        mostrarBotonAceptar: boolean,
        mostrarBotonCancelar: boolean,
        html: string, // se puede enviar este key para el detalle
        icono: string, // de prime-ng
        textoBotonAceptar: string,
        textoBotonCancelar: string
      },
  ) {
  }

  cerrarModalConfirmacion(acepto: boolean): void {
    this.dialogRef.close(acepto);
  }

}
