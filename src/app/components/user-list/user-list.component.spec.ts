import { async } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;

  beforeEach(async(() => {
    component = new UserListComponent();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
