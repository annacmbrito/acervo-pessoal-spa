import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
import { BookService } from '../../services/book.service';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../../components/modal/modal.component';
import { UploadFileComponent } from '../../components/upload-file/upload-file.component';
import { ImageService } from '../../services/image.service';
import { environment } from '../../../environments/environment';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule, 
    NavbarComponent, 
    RatingComponent, 
    ModalComponent,
    SpinnerComponent,
    UploadFileComponent,
    RouterLink, 
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent implements OnInit {

  @ViewChild(ModalComponent)
  public modal!: ModalComponent;

  public bookId?: number;
  public bookImage: string = environment.bookImageDefault;
  public bookRating: number = 0;
  public commenting: boolean = false;

  private file: File | null = null;

  public form: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(128)]],
    description: [null, []],
    comment: [null, []],
    pages: [null, [Validators.min(0)]],
    rating: [0, [Validators.min(0), Validators.max(5)]],
    status: ['AVAILABLE', [Validators.required]],
    author: [null, [Validators.maxLength(32)]],
    language: [null, [Validators.maxLength(32)]],
    publisher: [null, [Validators.maxLength(32)]],
    category: [null, [Validators.maxLength(32)]],
    subcategory: [null, [Validators.maxLength(32)]],
    file: [null],
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
    return Object.entries(BookStatus);
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private imageService: ImageService,
    private toastrService: ToastrService,
    private bookService: BookService,
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
        this.loadBook();
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
  private loadBook(): void {
    this.bookService.getById(this.bookId!).subscribe({
      next: book => {
        this.bookImage = book.image;
        this.form.patchValue({
          name: book.name,
          description: book.description,
          comment: book.comment,
          pages: book.pages,
          rating: book.rating,
          status: book.status,
          author: book.author?.name,
          language: book.language?.name,
          publisher: book.publisher?.name,
          category: book.category?.name,
          subcategory: book.subcategory?.name,
        });
      },
      error: () => {
        this.toastrService.error('Livro não encontrado!');
        this.router.navigate(['/livros']);
      }
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

  public isFieldInvalid(name: string): boolean {
    const control = this.form.get(name);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  public getMessageValidationError(name: string): string {
    const control = this.form.get(name);
    if(control?.getError('required')) {
      return 'Campo obrigatório'
    } else if(control?.getError('minlength')) {
      const error = control?.errors as any;
      return `Tamanho mínimo de ${error.minlength.requiredLength} caracteres`;
    } else if(control?.getError('maxlength')) {
      const error = control?.errors as any;
      return `Tamanho máximo de ${error.maxlength.requiredLength} caracteres`;
    }
    return '';
  }

  public getBookImage(): string | null {
    return this.bookImage !== environment.bookImageDefault ? this.bookImage : null;
  }

  public onSelectFile(file: File): void {
    this.file = file;
  }

  public save(): void {
    if(this.form.valid && this.file) {
      this.form.disable();
      this.imageService.upload(this.file).subscribe({
        next: url => {
          this.bookImage = url;
          this.saveBook();
        },
        error: () => {
          this.toastrService.error('Falha ao cadastrar imagem');
        },
      }).add(() => this.form.enable());
    } else if (this.form.valid) {
      this.saveBook();
    } else {
      this.form.markAllAsTouched();
    }
  }

  private saveBook(): void {
    this.form.disable();
    this.bookService.save({
      name: this.form.value.name,
      description: this.form.value.description,
      comment: this.form.value.comment,
      pages: this.form.value.pages,
      rating: this.form.value.rating,
      status: this.form.value.status,
      author: this.form.value.author,
      language: this.form.value.language,
      publisher: this.form.value.publisher,
      category: this.form.value.category,
      subcategory: this.form.value.subcategory,
      image: this.bookImage,
    }).subscribe({
      next: () => {
        this.toastrService.success('Livro cadastrado com sucesso');
        this.router.navigate(['/livros']);
      },
      error: () => this.toastrService.error('Falha ao cadastrar livro'),
    }).add(() => this.form.enable());
  }

  public update(): void {
    if(this.form.valid && this.file) {
      this.form.disable();
      this.imageService.upload(this.file).subscribe({
        next: url => {
          this.bookImage = url;
          this.updateBook();
        },
        error: () => {
          this.toastrService.error('Falha ao cadastrar imagem');
        },
      }).add(() => this.form.enable());
    } else if (this.form.valid) {
      this.updateBook();
    } else {
      this.form.markAllAsTouched();
    }
  }

  private updateBook(): void {
    this.form.disable();
    this.bookService.update(this.bookId!, {
      name: this.form.value.name,
      description: this.form.value.description,
      comment: this.form.value.comment,
      pages: this.form.value.pages,
      rating: this.form.value.rating,
      status: this.form.value.status,
      author: this.form.value.author,
      language: this.form.value.language,
      publisher: this.form.value.publisher,
      category: this.form.value.category,
      subcategory: this.form.value.subcategory,
      image: this.bookImage,
    }).subscribe({
      next: () => {
        this.toastrService.success('Livro atualizado com sucesso');
      },
      error: () => this.toastrService.error('Falha ao atualizar livro'),
    }).add(() => this.form.enable());
  }

  public delete(): void {
    this.bookService.deleteById(this.bookId!).subscribe({
      next: () => {
        this.toastrService.success('Livro excluído com sucesso');
        this.router.navigate(['/livros']);
      },
      error: () => this.toastrService.error('Falha ao excluir livro')
    }).add(() => this.modal.hide());
  }
}
