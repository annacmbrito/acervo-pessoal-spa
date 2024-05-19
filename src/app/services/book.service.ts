import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Book, BookDTO } from '../models/book.model';
import { Page } from '../models/page.model';
import { convertFilterToParam, convertPageToParam, convertParamsToPage } from '../util/mappers';
import { BookFilterDTO } from '../models/book-filter.dto';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  public getAll(page: Page<Book>, filter?: BookFilterDTO): Observable<Page<Book>> {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/v1/books/`, {
      params: {
        ...convertPageToParam(page),
        ...convertFilterToParam(filter)
      },
    }).pipe(map(data => convertParamsToPage<Book>(data)));
  }

  public getById(id: number): Observable<Book> {
    return this.http.get<Book>(`${environment.apiBaseUrl}/api/v1/books/${id}`);
  }

  public save(book: BookDTO): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/api/v1/books/`, book);
  }

  public update(id: number, book: BookDTO): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/api/v1/books/${id}`, book);
  }

  public deleteById(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/v1/books/${id}`);
  }
}
