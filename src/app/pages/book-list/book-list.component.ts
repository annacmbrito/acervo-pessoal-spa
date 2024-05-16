import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';
import { BookDetailsComponent } from '../../components/book-details/book-details.component';
import { Page } from '../../models/page.model';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [NavbarComponent, RouterLink, BookDetailsComponent],
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
}
