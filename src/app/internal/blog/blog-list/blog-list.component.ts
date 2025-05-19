import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { Blog } from '../models/blog.model';
import { Page } from '../../../shared/models/page.model';
import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [PageLoaderComponent, PaginationComponent],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css',
})
export class BlogListComponent implements OnInit {
  pageParams: Page = new Page();
  posts: Array<Blog> = [];
  pageLoader = false;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getBlogPosts();
  }

  getBlogPosts() {
    this.pageLoader = true;
    this.blogService
      .getBlogPosts()
      .subscribe((response: any) => {
        this.posts = response;
        this.pageParams.totalPage = Math.ceil(
          this.posts.length / this.pageParams.size,
        );
      })
      .add(() => (this.pageLoader = false));
  }

  onPageChange(event: any) {
    this.pageParams.page = event;
  }

  goToBlogDetails(id: number) {
    this.router.navigate(['..', id], {
      relativeTo: this.route,
    });
  }
}
