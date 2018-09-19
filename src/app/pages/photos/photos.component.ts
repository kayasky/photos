import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
  providers: [PhotoService]
})
export class PhotosComponent implements OnInit {

  photos: Array<any>;
  subscriptions: Subscription = new Subscription();
  private albumId: string;

  constructor(private route: ActivatedRoute,
    private photoService: PhotoService) { }

  ngOnInit() {
    this.albumId = this.route.snapshot.paramMap.get('albumId');

    if (this.albumId) {
      this.getPhotos();
    }
  }

  getPhotos() {
    this.subscriptions.add(this.photoService.getPhotosInAlbum(this.albumId)
      .subscribe((photos) => {
        this.photos = photos;
      }));
  }

  OnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
