import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Page } from '../models/page.model';
import { Subcategory } from '../models/subcategory.model';
import { convertPageToParam, convertParamsToPage } from '../util/mappers';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private http: HttpClient) { }

  public getAll(page: Page<Subcategory>): Observable<Page<Subcategory>> {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/v1/subcategories/`, {
      params: convertPageToParam(page),
    }).pipe(map(data => convertParamsToPage<Subcategory>(data)));
  }
}
