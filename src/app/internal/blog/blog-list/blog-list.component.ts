import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { Blog } from '../models/blog.model';
import { Page } from '../../../shared/models/page.model';
import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [PageLoaderComponent, PaginationComponent],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css',
})
export class BlogListComponent implements OnInit {
  pageParams: Page = new Page();
  posts: Blog[] = [];
  pageLoader = false;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.getBlogPosts();
  }

  /**
   * @description Get blog posts
   */
  getBlogPosts() {
    this.pageLoader = true;
    this.blogService.getBlogPosts().subscribe({
      next: (response: any) => {
        this.posts = response;
        this.pageParams.totalPage = Math.ceil(this.posts.length / this.pageParams.size);
      },
      error: () => this.toastService.showToast('Something went wrong', 'error'),
      complete: () => (this.pageLoader = false),
    });
  }

  /**
   * @description Changing page number on getting response from pagination component
   * @param event
   */
  onPageChange(event: any) {
    this.pageParams.page = event;
  }

  /**
   * @description Navigating to blog details page
   * @param id
   */
  goToBlogDetails(id: number) {
    this.router.navigate(['..', id], {
      relativeTo: this.route,
    });
  }
}
