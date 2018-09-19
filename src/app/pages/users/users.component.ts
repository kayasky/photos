import { Component, OnInit } from '@angular/core';

import { PhotoService } from './../../services/photo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [PhotoService]
})

export class UsersComponent implements OnInit {

  users: Array<any> = [];
  subscriptions: Subscription = new Subscription();

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.subscriptions.add(this.photoService
      .getUsers()
      .subscribe((users) => {
        this.users = users;
      }));
  }

  OnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
