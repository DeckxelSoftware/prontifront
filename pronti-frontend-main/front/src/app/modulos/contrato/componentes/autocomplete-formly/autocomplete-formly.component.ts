import {Component, OnInit} from '@angular/core';
import {FieldType} from '@ngx-formly/core';

@Component({
  selector: 'app-autocomplete-formly',
  // templateUrl: './autocomplete-formly.component.html',
 template:  `<p-autoComplete
   [style]="{'width':'100%'}"
   [suggestions]="to['results']"
   (completeMethod)="to['onComplete'](to,$event)">
   </p-autoComplete> `,
  styleUrls: ['./autocomplete-formly.component.scss']
})
export class AutocompleteFormlyComponent extends FieldType {
  text: string = '';

  results: string[] = [];


  constructor() {
    super();
  }

/*
  onComplete(event: any) {

    console.log('cdcd', this.to);
    console.log('evento', this.to, event);

  }

  search(event: any) {
    this.onComplete(event)
    // this.mylookupservice.getResults(event.query).then(data => {
    //   this.results = data;
    // });
  }

*/
}
