import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RatingComponent } from '../../components/rating/rating.component';
import { LanguageService } from '../../services/language.service';
import { Page } from '../../models/page.model';
import { Language } from '../../models/language.model';

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

  public languagePage: Page<Language> = { 
    orderBy: 'name', 
    content: [] 
  };

  constructor(
    private route: ActivatedRoute,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if(params.has("id")) {
        this.bookId = parseInt(params.get('id')!, 10);
      }
    });
    this.languageService.getAll(this.languagePage).subscribe({
      next: page => this.languagePage = page,
    })
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
