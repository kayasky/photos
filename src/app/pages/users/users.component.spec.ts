import { PhotoService } from '../../services/photo.service';
import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let photoService: jasmine.SpyObj<PhotoService>;

  beforeEach(() => {
    photoService = jasmine.createSpyObj('PhotoService', ['getUsers']);
    component = new UsersComponent(photoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
