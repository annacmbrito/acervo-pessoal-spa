import { Component, EventEmitter, Input, Output } from '@angular/core';
import { v4 } from 'uuid';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss'
})
export class UploadFileComponent {

  public id: string = v4();

  @Input()
  public disabled: boolean = false;

  @Input()
  public url: string | null = null;

  @Output()
  public selectFile: EventEmitter<File> = new EventEmitter();

  public triggerFileInput(): void {
    if(!this.disabled){
      const input = document.getElementById(this.id) as HTMLInputElement;
      input.click();
    }
  }

  public getUrlImage(): string {
    return this.url ?? "/assets/icons/image.png";
  }

  public onFileInputChange(target: any): void {
    const files = target.files as FileList;
    if(files.length > 0) {
      this.url = URL.createObjectURL(files[0]);
      this.selectFile.emit(files[0]);
    }
  }
}
