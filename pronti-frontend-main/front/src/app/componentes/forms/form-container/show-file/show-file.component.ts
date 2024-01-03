import {Component, Input} from '@angular/core';
import {TipoDocumentEnum} from './enum/tipo-document.enum';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-show-file',
  templateUrl: './show-file.component.html',
  styleUrls: ['./show-file.component.scss']
})
export class ShowFileComponent {

  @Input()
  documentType: TipoDocumentEnum = TipoDocumentEnum.Imagen;


  @Input()
  fileName: string = 'manticore-labs.png';

  @Input()
  mimeType: string = 'image/png';

  @Input()
  buffer: string = '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';

  @Input()
  sliceStart = 0;

  @Input()
  sliceEnd = 10;

  isMoreThanSliceEnd = false;

  archivo: TipoDocumentEnum = TipoDocumentEnum.Archivo;
  imagen: TipoDocumentEnum = TipoDocumentEnum.Imagen;

  constructor(
    public readonly _domSanitizer: DomSanitizer,
  ) {
    setTimeout(
      () => {
        if (this.fileName.length > this.sliceEnd) {
          const step = this.fileName.length - this.sliceEnd;
          this.sliceStart += step;
          this.sliceEnd += step;
          this.isMoreThanSliceEnd = true;
        }
      },
      1
    );
  }

  showImage() {
    if (this.documentType === TipoDocumentEnum.Imagen) {
      let src = '';

      if (this.buffer) {
        src = this.buffer
      }

      if (this.mimeType !== '') {
        src = `data:${this.mimeType};base64,` + this.buffer; // Image Base64 Goes here
      } else {
        src = this.buffer; // Image Base64 Goes here
      }
      return this._domSanitizer.bypassSecurityTrustResourceUrl(src);
    } else {
      return '';
    }
  }

  downloadFile() {
    const a = document.createElement('a'); // Create <a>
    if (this.buffer) {
      a.href = this.buffer; // Image Base64 Goes here
    }
    if (this.mimeType !== '') {
      a.href = `data:${this.mimeType};base64,` + this.buffer; // Image Base64 Goes here
    } else {
      a.href = this.buffer; // Image Base64 Goes here
    }
    a.download = this.fileName; // File name Here
    a.click(); // Downloaded file
  }

}
