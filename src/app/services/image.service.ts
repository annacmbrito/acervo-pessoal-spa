import { Injectable } from '@angular/core';
import ImageKit from 'imagekit';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private kit!: ImageKit;

  constructor() {
    this.kit = new ImageKit({
      publicKey: environment.imageKit.publicKey,
      privateKey: environment.imageKit.privateKey,
      urlEndpoint: environment.imageKit.endpoint,
    });
  }

  public upload(file: File): Observable<string> {
    return new Observable(subscriber => {
      this.readFile(file, (content) => {
        this.kit.upload({
          file: content,
          fileName: v4(),
        }, (err, result) => {
          if(err) {
            subscriber.error(err);
          } else {
            subscriber.next(result?.url);
          }
          subscriber.complete();
        });
      });
    });
  }

  private readFile(file: File, callback: (content: string) => void) {
    const reader = new FileReader();
    reader.onload = (event) => {
      callback((event.target!.result as string).split(',')[1]);
    };
    reader.readAsDataURL(file);
  }
}
