import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { Blog } from '../models/blog.model';
import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-blog-details',
  imports: [PageLoaderComponent],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css',
})
export class BlogDetailsComponent implements OnInit {
  postId: number = 0;
  pageLoader = false;
  post: Blog = {
    id: 0,
    title: '',
    body: '',
    userId: 0,
  };
  comments: Array<Comment> = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.postId = +params.postId;
    });
    this.route.queryParams.subscribe((query_params: any) => {
      if (query_params.newComment) {
        this.comments.push(JSON.parse(query_params.newComment));
        this.router.navigate([]);
      }
    });
    this.getBlogDetails();
  }

  getBlogDetails() {
    this.pageLoader = true;
    const params: any = {
      postId: this.postId,
    };
    this.blogService
      .getBlogDetails(params)
      .subscribe((response: any) => {
        this.post = response;
        this.getComments();
      })
      .add(() => (this.pageLoader = false));
  }

  getComments() {
    const params: any = {
      postId: this.postId,
    };
    this.blogService.getComments(params).subscribe((response: any) => {
      this.comments.push(...response);
    });
  }

  goToAddComment() {
    this.router.navigate(['comment'], {
      relativeTo: this.route,
    });
  }
}
