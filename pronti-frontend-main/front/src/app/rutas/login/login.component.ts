import {Component, OnInit} from '@angular/core';
import {FORM_LOGIN} from './form/form-login';
import {Router} from '@angular/router';

import {FormField} from '../../componentes/forms/interfaces/form-field';
import {FORM_RESET_PASSWORD} from './form/form-reset-password';
import {AuthService} from '../../servicios/login/auth.service';
import {LogsMlabsService} from '../../servicios/logs-mensajes/logs-mlabs.service';
import {ToasterTipo} from '../../servicios/logs-mensajes/enums/toaster-tipo';
import {AuthenticacionInterface} from './interfaces/authenticacion.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  formulario = FORM_LOGIN();
  formularioResetPassword = FORM_RESET_PASSWORD();


  mostrarCardResetPassword = false;
  botonDeshabilitado = true;
  botonResetDeshabilitado = true;

  constructor(private _router: Router, private _auth: AuthService, private _messageService: LogsMlabsService) {
  }

  searchFieldChanged(event: FormField) {
    console.info({event});
    if (event.formGroup.valid) {
      this.botonDeshabilitado = false;
    } else {
      this.botonDeshabilitado = true;
    }

  }

  searchFieldChangedReset(event: FormField) {

    if (event.formGroup.valid) {
      this.botonResetDeshabilitado = false;
    } else {
      this.botonResetDeshabilitado = true;
    }

  }

  autenticar() {

    const valores = this.formulario.map(campo => {
      return campo.actualValue;
    });

    this._auth.authenticar(valores[0], valores[1]).subscribe(
      {
        next: (authResp: AuthenticacionInterface) => {

          // console.log('login', authResp);

          if (authResp.codigo) {
            this._messageService.toaster({
              titulo: 'Error',
              mensaje: 'Credenciales incorrectas',
              tipo: ToasterTipo.error
            })
            return;
          }

          if (authResp.usuario && authResp.jwt) {
            localStorage.setItem('jwt', `${authResp.jwt}`);
            this._auth.estaLogueado = true;
            if (authResp.permisos) {
              if (authResp.permisos.length > 0) {
                this._auth.permisos = [...authResp.permisos];
              }
            }
            this._auth.jwt = `${authResp.jwt}`;
            localStorage.setItem('usuario', JSON.stringify(authResp.usuario));
            this._auth.tieneSesion$.next(true);
          }

          this._messageService.toaster({
            titulo: 'Correcto',
            mensaje: 'Datos ingresados correctamente',
            tipo: ToasterTipo.success
          });
          this._router.navigate(['configuraciones'])

        },
        error: (err) => {
          this._messageService.toaster({
            titulo: 'Error',
            mensaje: 'Credenciales incorrectas',
            tipo: ToasterTipo.error
          })
          console.error('No se pudo autenticar', err)
        }
      }
    )
    // this._router.navigate(['inicio'])

  }

  mostrarCardOlvidoPassword() {
    this.mostrarCardResetPassword = true;
  }


  validarCorreoUsuario() {
    this._auth.resetPassword(this.formularioResetPassword[0].actualValue)
      .subscribe({
          next: (resetResp: any) => {
            console.log(resetResp);
            this.mostrarCardResetPassword = false;
            if (resetResp.mensaje) {
              this._messageService.toaster({
                titulo: 'Correcto',
                mensaje: resetResp.mensaje,
                tipo: ToasterTipo.info
              });
            }
          }, error: (e) => {
            console.error('No se pudo enviar el correo de reset de password', e.error.mensaje)
            this._messageService.toaster({
              titulo: 'Error',
              mensaje: e.error.mensaje,
              tipo: ToasterTipo.error
            });
          this.mostrarCardResetPassword = true;
          }
        }
      )

  }

  regresarLogin() {
    this.mostrarCardResetPassword = false;
  }
}
