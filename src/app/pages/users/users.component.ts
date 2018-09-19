import { Component, OnInit } from '@angular/core';

import { PhotoService } from './../../services/photo.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [PhotoService]
})

export class UsersComponent implements OnInit {

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.photoService
      .getUsers()
      .subscribe((users) => {
        console.log(users);
      });
  }
}
