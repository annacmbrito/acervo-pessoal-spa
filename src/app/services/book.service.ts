import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Book, BookDTO } from '../models/book.model';
import { Page } from '../models/page.model';
import { convertPageToParam, convertParamsToPage } from '../util/mappers';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  public getAll(page: Page<Book>): Observable<Page<Book>> {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/v1/books/`, {
      params: convertPageToParam(page),
    }).pipe(map(data => convertParamsToPage<Book>(data)));
  }

  public save(book: BookDTO): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/api/v1/books/`, book);
  }
}
