import {Injectable} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class TranslationPrimengService {
  constructor(private config: PrimeNGConfig) {

  }

  establecerValoresEspanol() {
    this.config.setTranslation({
      accept: 'Aceptar',
      // Aqui Otros
    });
  }

}
