import { Component, Input } from '@angular/core';
import { Book } from '../../models/book.model';
import { RatingComponent } from '../rating/rating.component';
import { BookStatus } from '../../models/book-status.enum';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RatingComponent, RouterLink],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {
  @Input()
  public book!: Book;

  public getBookStatus() {
    const statusKey = this.book.status as keyof typeof BookStatus;
    return BookStatus[statusKey];
  }
}
