import { fakeAsync, flush } from '@angular/core/testing';
import { of } from 'rxjs';

import { PhotoService } from '../../services/photo.service';
import { PhotosComponent } from './photos.component';


describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let route: any;
  let photoService: jasmine.SpyObj<PhotoService>;

  beforeEach(() => {
    photoService = jasmine.createSpyObj('PhotoService', ['getPhotosInAlbum']);

    route = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get')
        }
      }
    };

    photoService.getPhotosInAlbum.and.returnValue(of({}));

    component = new PhotosComponent(route, photoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    beforeEach(() => {
      spyOn(component, 'getPhotos');
    });

    it('should call showPhotos if userId is present', () => {
      route.snapshot.paramMap.get.and.returnValue('1');

      component.ngOnInit();

      expect(component.getPhotos).toHaveBeenCalledTimes(1);
      expect((<any> component).albumId).toEqual('1');
    });

    it('should not call showPhotos if userId is absent', () => {
      route.snapshot.paramMap.get.and.returnValue(undefined);

      component.ngOnInit();

      expect(component.getPhotos).not.toHaveBeenCalled();
      expect((<any> component).albumId).toBeUndefined();
    });
  });

  describe('#getPhotos', () => {
    it('should subscribe to photoService.getPhotosInAlbum', () => {
      (<any> component).albumId = '123';

      component.getPhotos();

      expect(photoService.getPhotosInAlbum).toHaveBeenCalledTimes(1);
      expect(photoService.getPhotosInAlbum).toHaveBeenCalledWith('123');
    });

    it('should set the photos array', fakeAsync(() => {
      const mockPhotos = [{ photoId: '1' }, { photoId: '2' }, { photoId: '3' }];
      photoService.getPhotosInAlbum.and.returnValue(of(mockPhotos));

      component.getPhotos();
      flush();

      expect(component.photos).toEqual(mockPhotos);
    }));
  });

  describe('#OnDestroy', () => {
    it('should unsubscribe from the main subscription', () => {
      spyOn(component.subscriptions, 'unsubscribe');

      component.OnDestroy();

      expect(component.subscriptions.unsubscribe).toHaveBeenCalledTimes(1);
    });
  });

});
