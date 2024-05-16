import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Modal } from 'bootstrap';
import { v4 } from 'uuid';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  public id: string = v4();
  private modal?: Modal;

  @Input()
  public title!: string;

  @Input()
  public description!: string;

  @Output()
  public confirm: EventEmitter<void> = new EventEmitter();

  public show(): void {
    this.getModal().show();
  }

  public hide(): void {
    this.getModal().hide();
  }

  public getModal(): Modal {
    if(!this.modal) {
      this.modal = new Modal(`#${this.id}`);
    }
    return this.modal;
  }
}
