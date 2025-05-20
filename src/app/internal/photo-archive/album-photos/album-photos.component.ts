import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlbumPhoto } from '../models/album-photos.model';
import { Page } from '../../../shared/models/page.model';
import { PhotoArchiveService } from '../photo-archive.service';
import { ActivatedRoute } from '@angular/router';
import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-album-photos',
  imports: [PageLoaderComponent],
  templateUrl: './album-photos.component.html',
  styleUrl: './album-photos.component.css',
})
export class AlbumPhotosComponent implements OnInit {
  albumId = 0;
  pageParams: Page = new Page();
  photos: AlbumPhoto[] = [];
  pageLoader = false;
  scrollPosition = 0;
  tempPhotos: string[] = [
    'https://media.istockphoto.com/id/2181735944/photo/natural-mountains-landscapes.jpg?b=1&s=612x612&w=0&k=20&c=7WJMhHseLhVBEDa8N7ww7J_oqm_w_PlvUlxZPsmF3UI=',
    'https://www.travelandleisure.com/thmb/Z6XGwXju9LHti6QeGeRG2iz7BTk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/japan-BEAUTCONT1021-7d58a9021f7e42fba9ca617ad668fc81.jpg',
    'https://media.istockphoto.com/id/1550071750/photo/green-tea-tree-leaves-camellia-sinensis-in-organic-farm-sunlight-fresh-young-tender-bud.jpg?s=612x612&w=0&k=20&c=RC_xD5DY5qPH_hpqeOY1g1pM6bJgGJSssWYjVIvvoLw=',
    'https://media.istockphoto.com/id/1480574526/photo/happy-multigenerational-people-having-fun-sitting-on-grass-in-a-public-park.jpg?s=612x612&w=0&k=20&c=iIzSiY2FK9mWTCmV8Ip8zpvXma7f1Qbd-UuKXNJodPg=',
    'https://media.istockphoto.com/id/1310814041/photo/portrait-of-a-businesswoman-standing-in-a-a-modern-office.jpg?s=612x612&w=0&k=20&c=rLDYEGaGfbFq6mJPLc2FHjc6KBKyJETu38y4a3x11cM=',
    'https://i0.wp.com/picjumbo.com/wp-content/uploads/woman-enjoying-the-sunset-by-the-sea-free-photo.jpg?w=600&quality=80',
    'https://www.freestock.com/450/freestock_57816976.jpg',
    'https://www.thehosteller.com/_next/image/?url=https%3A%2F%2Fstatic.thehosteller.com%2Fhostel%2Fimages%2Ffeat.jpg%2Ffeat-1720738119071.jpg&w=2048&q=75',
  ];
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private photoArchiveService: PhotoArchiveService,
    private toastService: ToastService,
  ) {
    this.pageParams.size = 12;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.albumId = +params.albumId;
    });
    this.getAlbumPhotos();
  }

  /**
   * @description Get album photos based on album id
   */
  getAlbumPhotos() {
    this.pageLoader = true;
    const params = {
      albumId: this.albumId,
    };
    this.photoArchiveService.getAlbumPhotos(params).subscribe({
      next: (response: any) => {
        this.photos = response;
        this.photos.forEach((photo) => {
          const index = Math.floor(Math.random() * this.tempPhotos.length);
          photo.url = this.tempPhotos[index];
        });
        this.pageParams.totalPage = Math.ceil(this.photos.length / this.pageParams.size);
      },
      error: () => this.toastService.showToast('Something went wrong', 'error'),
      complete: () => (this.pageLoader = false),
    });
  }

  /**
   * Get paginated photos for a specific page
   * @param page Page number to get photos for
   * @returns Array of photos for the specified page
   */
  getPaginatedPhotos(page: number): AlbumPhoto[] {
    const start = (page - 1) * this.pageParams.size;
    const end = Math.min(start + this.pageParams.size, this.photos.length);
    return this.photos.slice(start, end);
  }

  /**
   * Scroll to the previous page
   */
  scrollLeft() {
    if (this.pageParams.page > 1) {
      this.scrollPosition += this.scrollContainer.nativeElement.offsetWidth;
      this.pageParams.page--;
    }
  }

  /**
   * Scroll to the next page
   */
  scrollRight() {
    if (this.pageParams.page < this.pageParams.totalPage) {
      this.scrollPosition -= this.scrollContainer.nativeElement.offsetWidth;
      this.pageParams.page++;
    }
  }

  /**
   * Generate an array of page numbers for pagination
   * @returns Array of page numbers
   */
  getPages(): number[] {
    return Array.from({ length: this.pageParams.totalPage }, (_, i) => i + 1);
  }
}
