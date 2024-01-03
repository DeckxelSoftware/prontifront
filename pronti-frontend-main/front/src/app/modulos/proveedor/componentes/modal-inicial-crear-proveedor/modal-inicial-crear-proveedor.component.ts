import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TipoClienteEnum} from '../../../../enums/tipo-cliente.enum';
import {ProveedorTablaComponent} from '../proveedor-tabla/proveedor-tabla.component';

@Component({
  selector: 'app-modal-inicial-crear-proveedor',
  templateUrl: './modal-inicial-crear-proveedor.component.html',
  styleUrls: ['./modal-inicial-crear-proveedor.component.scss']
})
export class ModalInicialCrearProveedorComponent implements OnInit {
  formularioInicialProveedor!: FormGroup;
  tipoProveedorSeleccionado = 'E';
  tiposProveedor = [
    {name: 'Seleccione una opción'},
    {name: 'Natural', code: 'N'},
    {name: 'Pasaporte', code: 'P'},
    {name: 'Comisionista', code: 'C'},
    {name: 'Empresa', code: 'E'}
  ];
  opcionesSINO = [

    {name: 'Seleccione una opción'},
    {name: 'SI', code: 'S'},
    {name: 'NO', code: 'N'},
  ];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalInicialCrearProveedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      componente: ProveedorTablaComponent
    }
  ) {
  }


  ngOnInit(): void {
    this.formularioInicialProveedor = this.iniciarFormulario();
  }

  iniciarFormulario() {
    return this.formBuilder.group(
      {
        tipoProveedor: ['', [Validators.required]],
        crearDatos: ['', [Validators.required]],
      }
    );
  }

  mostrarErrorRequiredTouchedProveedor(fieldName: string): boolean {
    const errorRequired = this.formularioInicialProveedor.get(fieldName)?.errors?.['required'];
    const errorTouched = this.formularioInicialProveedor.get(fieldName)?.touched;
    return errorRequired && errorTouched;
  }

  cancelar() {
    this.dialogRef.close();
  }

  cambioSelectTipoProveedor(event: any) {
    this.tipoProveedorSeleccionado = event.value;
  }

  continuar() {
    this.dialogRef.close(this.formularioInicialProveedor);
  }
}
