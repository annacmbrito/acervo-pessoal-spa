import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { BookFilterDTO } from '../../models/book-filter.dto';
import { Category } from '../../models/category.model';
import { Page } from '../../models/page.model';
import { Publisher } from '../../models/publisher.model';
import { Subcategory } from '../../models/subcategory.model';
import { CategoryService } from '../../services/category.service';
import { PublisherService } from '../../services/publisher.service';
import { SubcategoryService } from '../../services/subcategory.service';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-book-list-filter',
  standalone: true,
  imports: [ReactiveFormsModule, RatingComponent],
  templateUrl: './book-list-filter.component.html',
  styleUrl: './book-list-filter.component.scss'
})
export class BookListFilterComponent implements OnInit {

  @Output()
  public filter: EventEmitter<BookFilterDTO> = new EventEmitter();
  
  public form: FormGroup = this.formBuilder.group({
    token: [''],
    rating: [''],
    publisher_id: [''],
    category_id: [''],
    subcategory_id: [''],
    order_direction: [''],
  });

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

  constructor(
    private formBuilder: FormBuilder,
    private publisherService: PublisherService,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
  ) {}
  
  ngOnInit(): void {
    this.form.get('token')?.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
    ).subscribe(() => this.emitFilter());
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

  public emitFilter(): void {
    this.filter.emit(this.form.value);
  }
}
