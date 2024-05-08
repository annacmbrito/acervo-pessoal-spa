import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [NavbarComponent, RouterLink],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {

}
