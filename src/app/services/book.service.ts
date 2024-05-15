import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BookDTO } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  public save(book: BookDTO): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/api/v1/books/`, book);
  }
}
