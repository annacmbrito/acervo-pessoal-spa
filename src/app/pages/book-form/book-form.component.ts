import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent implements OnInit {

  public bookId?: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if(params.has("id")) {
        this.bookId = parseInt(params.get('id')!, 10);
      }
    })
  }

  public isEditMode(): boolean {
    return !!this.bookId;
  }
}
