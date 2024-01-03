import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlockuiService {

  blockuiHabilitado = true;

  blockUiCambio = new EventEmitter<boolean>();

  constructor() { }

  habilitarBlockUI(){
    setTimeout(() => {
      this.blockuiHabilitado = true;
      this.blockUiCambio.emit(true);
    })
  }

  deshabilitarBlockUI(){
    setTimeout(() => {
      this.blockuiHabilitado = false;
      this.blockUiCambio.emit(false);
    })
  }
}
