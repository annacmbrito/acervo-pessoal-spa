import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {

  @Input()
  public value: number = 0;

  @Input()
  public disabled: boolean = false;

  @Output()
  public valueChange: EventEmitter<number> = new EventEmitter();

  public setValue(value: number): void {
    if (!this.disabled) {
      this.value = value;
      this.valueChange.emit(this.value);
    }
  }
}
