import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthenticacionInterface} from '../../rutas/login/interfaces/authenticacion.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  url = environment.url;
  jwt = '';

  tieneSesion$ = new BehaviorSubject(false);

  estaLogueado = false;
  permisos : string[] = [];

  constructor(private http: HttpClient) {
  }

  authenticar(username: string, password: string): Observable<AuthenticacionInterface> {
    return this.http.post<AuthenticacionInterface>(`${this.url}/auth`, {
      password,
      username
    });
  }

  resetPassword(correo: string) {
    return this.http.post(`${this.url}/auth/reset`, {
      correo
    })
  }


  updatePassword(body: { newPassword: string, password: string, userName: string }) {
    return this.http.post(`${this.url}/api/change`, body
    )

  }

  private createRequestOptions(): HttpHeaders {
    return new HttpHeaders({
      Authorization : `Bearer ${this.jwt}`
    });
  }

  existeRolPorNombre(){

  }
}
