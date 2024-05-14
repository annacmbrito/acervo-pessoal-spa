import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Page } from '../models/page.model';
import { Publisher } from '../models/publisher.model';
import { convertPageToParam, convertParamsToPage } from '../util/mappers';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(private http: HttpClient) { }

  public getAll(page: Page<Publisher>): Observable<Page<Publisher>> {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/v1/publishers/`, {
      params: convertPageToParam(page),
    }).pipe(map(data => convertParamsToPage<Publisher>(data)));
  }
}
