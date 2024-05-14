import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RatingComponent } from '../../components/rating/rating.component';
import { LanguageService } from '../../services/language.service';
import { Page } from '../../models/page.model';
import { Language } from '../../models/language.model';
import { Author } from '../../models/author.model';
import { AuthorService } from '../../services/author.service';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RatingComponent, RouterLink],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent implements OnInit {

  public bookId?: number;
  public bookRating: number = 0;
  public commenting: boolean = false;

  public authorPage: Page<Author> = { 
    orderBy: 'name', 
    content: [] 
  };
  public languagePage: Page<Language> = { 
    orderBy: 'name', 
    content: [] 
  };
  public categoryPage: Page<Category> = { 
    orderBy: 'name', 
    content: [] 
  };

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private languageService: LanguageService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if(params.has("id")) {
        this.bookId = parseInt(params.get('id')!, 10);
      }
    });
    this.authorService.getAll(this.authorPage).subscribe({
      next: page => this.authorPage = page,
    });
    this.languageService.getAll(this.languagePage).subscribe({
      next: page => this.languagePage = page,
    });
    this.categoryService.getAll(this.categoryPage).subscribe({
      next: page => this.categoryPage = page,
    });
  }

  public isEditMode(): boolean {
    return !!this.bookId;
  }

  public showDescriptionInput(): void {
    this.commenting = false;
  }

  public showComentInput(): void {
    this.commenting = true;
  }
}
