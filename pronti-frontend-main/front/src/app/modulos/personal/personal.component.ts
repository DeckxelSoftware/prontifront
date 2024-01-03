import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent {

  constructor(
    public router: Router,
  ) {
  }

  navegar(path: string[]) {
    this.router.navigate(['personal', ...path])
  }

}
