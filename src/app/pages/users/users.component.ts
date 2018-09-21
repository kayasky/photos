import { Component, OnInit } from '@angular/core';

import { PhotoService } from './../../services/photo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  providers: [PhotoService]
})

export class UsersComponent implements OnInit {

  users: Array<any> = [];
  loaded: boolean;
  subscriptions: Subscription = new Subscription();

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.loaded = false;

    this.subscriptions.add(this.photoService
      .getUsers()
      .subscribe((users) => {
        this.loaded = true;
        this.users = users;
      }));
  }

  OnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
