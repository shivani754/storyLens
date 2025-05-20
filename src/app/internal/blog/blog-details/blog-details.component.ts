import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { Blog } from '../models/blog.model';
import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-blog-details',
  imports: [PageLoaderComponent, CommentsComponent],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css',
})
export class BlogDetailsComponent implements OnInit {
  postId = 0;
  pageLoader = false;
  post: Blog = {
    id: 0,
    title: '',
    body: '',
    userId: 0,
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.postId = +params.postId;
    });
    this.getBlogDetails();
  }

  /**
   * @description Get blog details
   */
  getBlogDetails() {
    this.pageLoader = true;
    const params: any = {
      postId: this.postId,
    };
    this.blogService
      .getBlogDetails(params)
      .subscribe((response: any) => {
        this.post = response;
      })
      .add(() => (this.pageLoader = false));
  }
}
