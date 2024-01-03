import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ClienteTablaComponent} from '../../modulos/cliente/componentes/cliente-tabla/cliente-tabla.component';

@Component({
  selector: 'app-modal-inicial-cliente',
  templateUrl: './modal-inicial-cliente.component.html',
  styleUrls: ['./modal-inicial-cliente.component.scss']
})
export class ModalInicialClienteComponent implements OnInit {
  formularioInicialCliente!: FormGroup;
  tipoClienteSeleccionado = 'E';
  tiposCliente = [
    {name: 'Seleccione una opción'},
    {name: 'Natural', code: 'N'},
    {name: 'Pasaporte', code: 'P'},
    {name: 'Empresa', code: 'E'}
  ];


  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalInicialClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      componente: ClienteTablaComponent,
    }
  ) {
  }

  ngOnInit(): void {
    this.formularioInicialCliente = this.iniciarFormulario();
  }

  iniciarFormulario() {
    return this.formBuilder.group(
      {
        tipoCliente: ['', [Validators.required]],
      }
    );
  }

  mostrarErrorRequiredTouchedCliente(fieldName: string): boolean {
    const errorRequired = this.formularioInicialCliente.get(fieldName)?.errors?.['required'];
    const errorTouched = this.formularioInicialCliente.get(fieldName)?.touched;
    return errorRequired && errorTouched;
  }
  cancelar() {
    this.dialogRef.close();
  }

  cambioSelectTipoCliente(event: any) {
    this.tipoClienteSeleccionado = event.value;
  }

  continuar() {
    this.dialogRef.close(this.formularioInicialCliente);
  }

}
