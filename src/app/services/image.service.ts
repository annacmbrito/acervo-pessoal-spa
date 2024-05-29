import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { v4 } from 'uuid';
import { Image } from '../models/image.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {}

  public upload(file: File): Observable<Image> {
    const formData = new FormData();
    formData.append('file', file, v4());
    return this.http.post<Image>(`${environment.apiBaseUrl}/api/v1/images/upload`, formData)
  }

}
