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
import { Subcategory } from '../../models/subcategory.model';
import { SubcategoryService } from '../../services/subcategory.service';
import { Publisher } from '../../models/publisher.model';
import { PublisherService } from '../../services/publisher.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookStatus } from '../../models/book-status.enum';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RatingComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent implements OnInit {

  public bookId?: number;
  public bookRating: number = 0;
  public commenting: boolean = false;

  public form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.minLength(32)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    comment: ['', [Validators.required, Validators.minLength(3)]],
    pages: ['', [Validators.required, Validators.min(0)]],
    rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
    status: [BookStatus.AVAILABLE, [Validators.required]],
    author: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
    language: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
    publisher: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
    category: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
    subcategory: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
  });

  public authorPage: Page<Author> = { 
    orderBy: 'name', 
    content: [] 
  };
  public languagePage: Page<Language> = { 
    orderBy: 'name', 
    content: [] 
  };
  public publisherPage: Page<Publisher> = { 
    orderBy: 'name', 
    content: [] 
  };
  public categoryPage: Page<Category> = { 
    orderBy: 'name', 
    content: [] 
  };
  public subcategoryPage: Page<Subcategory> = { 
    orderBy: 'name', 
    content: [] 
  };

  public get bookStatus() {
    return Object.values(BookStatus);
  }

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authorService: AuthorService,
    private languageService: LanguageService,
    private publisherService: PublisherService,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
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
    this.publisherService.getAll(this.publisherPage).subscribe({
      next: page => this.publisherPage = page,
    });
    this.categoryService.getAll(this.categoryPage).subscribe({
      next: page => this.categoryPage = page,
    });
    this.subcategoryService.getAll(this.subcategoryPage).subscribe({
      next: page => this.subcategoryPage = page,
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
