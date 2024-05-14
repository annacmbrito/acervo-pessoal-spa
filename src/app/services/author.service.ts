import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '../models/page.model';
import { Author } from '../models/author.model';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { convertPageToParam, convertParamsToPage } from '../util/mappers';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  public getAll(page: Page<Author>): Observable<Page<Author>> {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/v1/authors/`, {
      params: convertPageToParam(page),
    }).pipe(map(data => convertParamsToPage<Author>(data)));
  }
}
