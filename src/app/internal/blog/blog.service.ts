import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from './models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/';

  constructor(private httpClient: HttpClient) {}

  getBlogPosts() {
    return this.httpClient.get(this.baseUrl + 'posts');
  }

  getBlogDetails(params: any) {
    return this.httpClient.get(this.baseUrl + 'posts/' + params.postId);
  }

  getComments(params: any) {
    return this.httpClient.get(this.baseUrl + 'posts/' + params.postId + '/comments');
  }

  addComment(body: Comment) {
    return this.httpClient.post(this.baseUrl + 'posts/' + body.postId + '/comments', body);
  }
}
