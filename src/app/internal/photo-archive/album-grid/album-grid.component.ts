import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Album } from '../models/album.model';
import { PhotoArchiveService } from '../photo-archive.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component';

@Component({
  selector: 'app-album-grid',
  standalone: true,
  imports: [CommonModule, PageLoaderComponent],
  templateUrl: './album-grid.component.html',
  styleUrl: './album-grid.component.css',
})
export class AlbumGridComponent implements OnInit {
  pageLoader = false;
  albums: Album[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private photoArchiveService: PhotoArchiveService,
  ) {}

  ngOnInit(): void {
    this.getAlbums();
  }

  /**
   * @description Get albums for user
   */
  getAlbums() {
    this.pageLoader = true;
    const params = {
      userId: 1,
    };
    this.photoArchiveService
      .getALbums(params)
      .subscribe((response: any) => {
        this.albums = response;
      })
      .add(() => (this.pageLoader = false));
  }

  /**
   * @description Navigating to album photos
   * @param albumId
   */
  goToPhotos(albumId: number) {
    this.router.navigate([albumId], {
      relativeTo: this.route,
    });
  }
}
