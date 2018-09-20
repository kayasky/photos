import { fakeAsync, flush } from '@angular/core/testing';
import { of } from 'rxjs';

import { PhotoService } from '../../services/photo.service';
import { AlbumsComponent } from './albums.component';

describe('AlbumsComponent', () => {
  let component: AlbumsComponent;
  let route: any;
  let photoService: jasmine.SpyObj<PhotoService>;
  const appService = null;

  beforeEach(() => {
    photoService = jasmine.createSpyObj('PhotoService', ['getAlbumsForUser']);

    route = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get')
        }
      }
    };

    photoService.getAlbumsForUser.and.returnValue(of({}));

    component = new AlbumsComponent(appService, route, photoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    beforeEach(() => {
      spyOn(component, 'getAlbums');
    });

    it('should call showAlbums if userId is present', () => {
      route.snapshot.paramMap.get.and.returnValue('1');

      component.ngOnInit();

      expect(component.getAlbums).toHaveBeenCalledTimes(1);
      expect((<any> component).userId).toEqual('1');
    });

    it('should not call showAlbums if userId is absent', () => {
      route.snapshot.paramMap.get.and.returnValue(undefined);

      component.ngOnInit();

      expect(component.getAlbums).not.toHaveBeenCalled();
      expect((<any> component).userId).toBeUndefined();
    });
  });

  describe('#getAlbums', () => {
    it('should subscribe to photoService.getAlbumsForUser', () => {
      (<any> component).userId = '123';

      component.getAlbums();

      expect(photoService.getAlbumsForUser).toHaveBeenCalledTimes(1);
      expect(photoService.getAlbumsForUser).toHaveBeenCalledWith('123');
    });

    it('should set the albums array', fakeAsync(() => {
      const mockAlbums = [{ albumId: '1' }, { albumId: '2' }, { albumId: '3' }];
      photoService.getAlbumsForUser.and.returnValue(of(mockAlbums));

      component.getAlbums();
      flush();

      expect(component.albums).toEqual(mockAlbums);
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
