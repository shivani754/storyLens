import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PhotoArchiveService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/';

  constructor(private httpClient: HttpClient) {}

  getALbums(params: any) {
    return this.httpClient.get(
      this.baseUrl + '/users/' + params.userId + '/albums',
    );
  }

  getAlbumPhotos(params: any) {
    return this.httpClient.get(
      this.baseUrl + 'albums/' + params.albumId + '/photos',
    );
  }
}
