import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu-recursos',
  templateUrl: './menu-recursos.component.html',
  styleUrls: ['./menu-recursos.component.scss']
})
export class MenuRecursosComponent {

  constructor(
    public router: Router,
  ) {
  }

  navegar(path: string[]) {
    this.router.navigate(['recursos-menu', ...path]);
  }
}
