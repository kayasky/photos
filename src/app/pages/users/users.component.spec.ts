import { fakeAsync, flush } from '@angular/core/testing';
import { of } from 'rxjs';

import { PhotoService } from '../../services/photo.service';
import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let photoService: jasmine.SpyObj<PhotoService>;

  beforeEach(() => {
    photoService = jasmine.createSpyObj('PhotoService', ['getUsers']);
    photoService.getUsers.and.returnValue(of({}));

    component = new UsersComponent(photoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should subscribe to photoService.getUsers', () => {
      component.ngOnInit();

      expect(photoService.getUsers).toHaveBeenCalledTimes(1);
    });

    it('should set the users array', fakeAsync(() => {
      const mockUsers = [{ userId: '1' }, { userId: '2' }, { userId: '3' }];
      photoService.getUsers.and.returnValue(of(mockUsers));

      component.ngOnInit();
      flush();

      expect(component.users).toEqual(mockUsers);
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
