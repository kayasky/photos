import { HttpClient } from '@angular/common/http';
import { fakeAsync, flush } from '@angular/core/testing';
import { of } from 'rxjs';

import { APP_CONSTANTS } from './../app.constants';
import { PhotoService } from './photo.service';


describe('PhotoService', () => {
  let service: PhotoService;
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    service = new PhotoService(httpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getUsers', () => {
    it('should fetch the users list', fakeAsync(() => {
      const mockResponse = [{ 'userId': Math.random() }];
      httpClient.get.and.returnValue(of(mockResponse));

      service.getUsers().subscribe((response) => {
        expect(httpClient.get).toHaveBeenCalledTimes(1);
        expect(httpClient.get).toHaveBeenCalledWith(APP_CONSTANTS.url.getUsers);
        expect(response).toEqual(mockResponse);
        flush();
      });
    }));
  });

  describe('#getAlbumsForUser', () => {
    it('should fetch the albums list for a particular user', fakeAsync(() => {
      const mockResponse = [{ 'albumId': Math.random() }];
      const userId = Math.random();
      httpClient.get.and.returnValue(of(mockResponse));

      service.getAlbumsForUser(userId).subscribe((response) => {
        expect(httpClient.get).toHaveBeenCalledTimes(1);
        expect(httpClient.get).toHaveBeenCalledWith(`${APP_CONSTANTS.url.getAlbums}${userId}`);
        expect(response).toEqual(mockResponse);
        flush();
      });
    }));
  });

  describe('#getPhotosInAlbum', () => {
    it('should fetch the photos within a particular album', fakeAsync(() => {
      const mockResponse = [{ 'photoId': Math.random() }];
      const albumId = Math.random();
      httpClient.get.and.returnValue(of(mockResponse));

      service.getPhotosInAlbum(albumId).subscribe((response) => {
        expect(httpClient.get).toHaveBeenCalledTimes(1);
        expect(httpClient.get).toHaveBeenCalledWith(`${APP_CONSTANTS.url.getPhotos}${albumId}`);
        expect(response).toEqual(mockResponse);
        flush();
      });
    }));
  });

});
