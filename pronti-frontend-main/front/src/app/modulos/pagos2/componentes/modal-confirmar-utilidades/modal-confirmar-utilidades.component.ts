import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pagos1ResponseDto } from '../../../pagos1/servicios/dto/pagos1.response-dto';


@Component({
  selector: 'app-modal-confirmar-utilidades',
  templateUrl: './modal-confirmar-utilidades.component.html',
  styleUrls: ['./modal-confirmar-utilidades.component.scss']
})
export class ModalConfirmarUtilidadesComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Pagos1ResponseDto,
    public dialogRef: MatDialogRef<ModalConfirmarUtilidadesComponent>,

  ) { }



  confirmar() {
    this.dialogRef.close(true);
  }
}
