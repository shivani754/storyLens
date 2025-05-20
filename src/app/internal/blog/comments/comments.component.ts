import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { Comment } from '../models/comment.model';
import { ProfilePicComponent } from '../../../shared/components/profile-pic/profile-pic.component';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-comments',
  imports: [ProfilePicComponent],
  standalone: true,
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  @Input() postId = 0;
  comments: Comment[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((query_params: any) => {
      if (query_params.newComment) {
        this.comments.push(JSON.parse(query_params.newComment));
        this.router.navigate([]);
      }
    });
    this.getComments();
  }

  /**
   * @description Getting comments for post
   */
  getComments() {
    const params: any = {
      postId: this.postId,
    };
    this.blogService.getComments(params).subscribe({
      next: (response: any) => {
        this.comments.push(...response);
      },
      error: () => this.toastService.showToast('Something went wrong', 'error'),
    });
  }

  /**
   * @description Navigating to add comment page
   */
  goToAddComment() {
    this.router.navigate(['comment'], {
      relativeTo: this.route,
    });
  }
}
