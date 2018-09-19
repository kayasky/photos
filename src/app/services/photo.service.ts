import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { APP_CONSTANTS } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(APP_CONSTANTS.url.getUsers);
  }

  getAlbumsForUser(userId: string): Observable<any> {
    return this.http.get(`${APP_CONSTANTS.url.getAlbums}${userId}`);
  }

  getPhotosInAlbum(albumId: string): Observable<any> {
    return this.http.get(`${APP_CONSTANTS.url.getPhotos}${albumId}`);
  }
}
