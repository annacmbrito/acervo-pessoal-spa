import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '../models/page.model';
import { Language } from '../models/language.model';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { convertPageToParam, convertParamsToPage } from '../util/mappers';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) { }

  public getAll(page: Page<Language>): Observable<Page<Language>> {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/v1/languages/`, {
      params: convertPageToParam(page),
    }).pipe(map(data => convertParamsToPage<Language>(data)));
  }
}
