import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Comment } from '../models/comment.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { GlobalService } from '../../../core/services/global.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-add-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css',
})
export class AddCommentComponent implements OnInit {
  commentData: Comment = {
    postId: 0,
    name: '',
    body: '',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private blogService: BlogService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.commentData.postId = +params.postId;
    });
    this.commentData.name = this.globalService.getUserDetails().username;
  }

  /**
   * @description Add comment
   */
  addComment() {
    this.blogService.addComment(this.commentData).subscribe({
      next: (response: any) => {
        this.commentData = response;
        this.router.navigate(['..'], {
          relativeTo: this.route,
          queryParams: {
            newComment: JSON.stringify(this.commentData),
          },
        });
      },
      error: () => {
        this.toastService.showToast('Something went wrong', 'error');
      },
    });
  }
}
