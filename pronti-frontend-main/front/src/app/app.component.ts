import {Component, OnInit} from '@angular/core';
import {TranslationPrimengService} from './servicios/primeng/translation-primeng.service';
import {BlockuiService} from './servicios/block-ui/blockui.service';
import {MenuItem} from 'primeng/api';
import {AuthService} from './servicios/login/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  items: MenuItem[] = [];
  home!: MenuItem;

  mostrarMenu = false;
  busquedaMenu = '';
  habilitarBlockUi = false;
  matSidenavOpened: boolean = false;
  opcionesMenuMostrar: OpcionMenuInterface[] = [];
  opcionesMenu: OpcionMenuInterface[] = [
    {
      routerLink: ['configuraciones'],
      nombre: 'Gestión de Configuraciones'
    },
    {
      routerLink: ['personal'],
      nombre: 'Gestión de Personal'
    },
    {
      routerLink: ['bienes'],
      nombre: 'Bienes'
    },
    {
      routerLink: ['contratos'],
      nombre: 'Contratos'
    },
    {
      routerLink: ['proveedores'],
      nombre: 'Proveedores'
    },
    {
      routerLink: ['inventarios'],
      nombre: 'Gestión Inventarios'
    },
    {
      routerLink: ['contabilidad'],
      nombre: 'Contabilidad'
    },
    {
      routerLink: ['documentos-electronicos'],
      nombre: 'Documentos electrónicos'
    },
    {
      routerLink: ['licitacion-modulo'],
      nombre: 'Gestión de oferta'
    },
    {
      routerLink: ['prestamo'],
      nombre: 'Préstamos'
    },
    {
      routerLink: ['novedades-menu'],
      nombre: 'Novedades'
    },
    {
      routerLink: ['licitacion-modulo','gestion-preasamblea'],
      nombre: 'Gestión asamblea'
    },
    {
      routerLink: ['caracteristicas-anuales-menu'],
      nombre: 'Características anuales'
    },
  ]

  constructor(
    private readonly _translationPrimengService: TranslationPrimengService,
    public readonly blockuiService: BlockuiService,
    public _authService: AuthService,
    public router: Router,
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('jwt')) {
      this._authService.tieneSesion$.next(true);
    }
    this.opcionesMenuMostrar = [...this.opcionesMenu]
    this.escucharBlockUi();
    // this._authService.tieneSesion$.subscribe(
    //   {
    //     next: (estaLogueado: boolean)=>{
    //      this.mostrarMenu = estaLogueado ;
    //     }
    //   }
    // )
    this._translationPrimengService.establecerValoresEspanol();

    this.items = [];
    this.home = {icon: 'pi pi-home', routerLink: '/'};

  }

  escucharBlockUi() {
    this.blockuiService.blockUiCambio.subscribe(
      {
        next: (res: boolean) => {
          this.habilitarBlockUi = res;
        }
      }
    )
  }

  irA(evento: any) {
    console.log(evento);
  }

  buscarOpcionMenu() {
    this.opcionesMenuMostrar = this.opcionesMenu.filter(
      opcion => {
        return opcion.nombre.toLowerCase().includes(this.busquedaMenu.toLowerCase());
      }
    )
    if (this.opcionesMenuMostrar.length === 1) {
      this.router.navigate(this.opcionesMenuMostrar[0].routerLink);
    }
    this.busquedaMenu = '';
  }

  auxClick(event: any) {
    console.log(event);
  }
}

export interface OpcionMenuInterface {
  routerLink: string[],
  nombre: string
}
