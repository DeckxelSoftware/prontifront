import {Component, Input} from "@angular/core";
import {TabsArrays} from './interface/tabs-array';
import {DataTabsArrayEnum} from './enum/data-tabs-array.enum';

@Component({
  selector: "app-list-info",
  templateUrl: "./list-info.component.html",
  styleUrls: ["./list-info.component.scss"],
})
export class ListInfoComponent {
  @Input() tabArray: TabsArrays[] = [];

  @Input() record: any;

  dataTypeDate: DataTabsArrayEnum = DataTabsArrayEnum.date;
  dataTypeMoney: DataTabsArrayEnum = DataTabsArrayEnum.money;
  dataTypeString: DataTabsArrayEnum = DataTabsArrayEnum.string;
  dataTypeTextArea: DataTabsArrayEnum = DataTabsArrayEnum.textArea;
  dataTypeFile: DataTabsArrayEnum = DataTabsArrayEnum.file;


  constructor() {
  }

  descargarArchivo() {

    const source = this.record.sisArchivo.buffer;
    const link = document.createElement('a');
    link.href = source;
    link.download = `${this.record.sisArchivo.nombreOriginal}.pdf`;
    link.click();
  }
}
