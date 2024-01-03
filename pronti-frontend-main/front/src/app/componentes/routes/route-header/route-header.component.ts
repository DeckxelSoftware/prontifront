import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-route-header',
  templateUrl: './route-header.component.html',
  styleUrls: ['./route-header.component.scss']
})
export class RouteHeaderComponent {

  @Input()
  title: string = 'Title';
  @Input()
  help: string = 'This is a text to help the user';
  @Input()
  imagePath: string = '/assets/logo.png';

  constructor() {
  }

}
