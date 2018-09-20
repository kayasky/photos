import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PhotoService } from '../../services/photo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
  providers: [PhotoService, AppService]
})
export class AlbumsComponent implements OnInit {

  albums: Array<any>;
  subscriptions: Subscription = new Subscription();
  private userId: string;

  constructor(public appService: AppService,
    private route: ActivatedRoute,
    private photoService: PhotoService) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');

    if (this.userId) {
      this.getAlbums();
    }
  }

  getAlbums() {
    this.subscriptions.add(this.photoService.getAlbumsForUser(this.userId)
      .subscribe((albums) => {
        this.albums = albums;
      }));
  }

  OnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
