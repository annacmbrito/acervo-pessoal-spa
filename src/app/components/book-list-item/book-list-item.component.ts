import { Component, Input } from '@angular/core';
import { Book } from '../../models/book.model';
import { RatingComponent } from '../rating/rating.component';
import { BookStatus } from '../../models/book-status.enum';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-list-item',
  standalone: true,
  imports: [RatingComponent, RouterLink],
  templateUrl: './book-list-item.component.html',
  styleUrl: './book-list-item.component.scss'
})
export class BookListItemComponent {
  @Input()
  public book!: Book;

  public getBookURL(): string | null {
    return this.book.image ? this.book.image.url : null;
  }

  public getBookStatus() {
    const statusKey = this.book.status as keyof typeof BookStatus;
    return BookStatus[statusKey];
  }
}
