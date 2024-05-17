import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Page } from '../../models/page.model';
import { Book } from '../../models/book.model';
import { BookListItemComponent } from '../../components/book-list-item/book-list-item.component';
import { BookListFilterComponent } from '../../components/book-list-filter/book-list-filter.component';
import { BookFilterDTO } from '../../models/book-filter.dto';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    RouterLink, 
    NavbarComponent, 
    BookListItemComponent,
    BookListFilterComponent,
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {
  
  public bookPage: Page<Book> = { 
    orderBy: 'name', 
    content: [] 
  };

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getAll(this.bookPage).subscribe({
      next: page => this.bookPage = page
    })
  }

  public filter(filter: BookFilterDTO): void {}
}
