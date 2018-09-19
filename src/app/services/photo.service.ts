import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { APP_CONSTANTS } from '../app.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(APP_CONSTANTS.url.getUsers);
  }

  getAlbumsForUser(userId: number): Observable<any> {
    return this.http.get(`${APP_CONSTANTS.url.getAlbums}${userId}`);
  }

  getPhotosInAlbum(albumId: number): Observable<any> {
    return this.http.get(`${APP_CONSTANTS.url.getPhotos}${albumId}`);
  }
}
