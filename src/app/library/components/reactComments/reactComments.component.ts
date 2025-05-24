import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {NzCommentModule} from 'ng-zorro-antd/comment';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {CommentsInterface} from '../../data/types/comments.interface';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {Store} from '@ngrx/store';
import {reactCommentsActions} from './store/actions';
import { LikeCommentsRequestInterface } from '../../data/types/likeCommentsRequest.interface';

@Component({
  selector: 'app-react-comments',
  templateUrl: './reactComments.component.html',
  styleUrls: ['./reactComments.component.css'],
  standalone: true,
  imports: [NzCommentModule, NzToolTipModule, NzIconModule, NzButtonModule],
})
export class ReactCommentsComponent implements OnInit {

  @Input() nzType?: string | undefined;
  @Input() comment?: CommentsInterface;
  @Input() slug?: string;
  @Input() isLiked: boolean = false;
  @Input() isDisliked: boolean = false;
  @Input() likesCount: number = 0;
  @Input() dislikesCount: number = 0;
  commentId?: number = undefined;
  articleId?: number = undefined;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLiked = this.comment!.isLiked;
    this.isDisliked = this.comment!.isDisliked;
    this.likesCount = this.comment!.like_counts;
    this.dislikesCount = this.comment!.dislike_counts;
    this.commentId = this.comment?.id;
    this.articleId = this.comment?.article_id;
  }

  ngOnChanges(changes: SimpleChanges): void {
  
    this.isLiked = this.comment!.isLiked;
    this.isDisliked = this.comment!.isDisliked;
    this.likesCount = this.comment!.like_counts;
    this.dislikesCount = this.comment!.dislike_counts;
  }

  onSubmitLike() {
    this.isLiked = !this.isLiked;

    if (this.isLiked) {
      this.likesCount = this.likesCount! + 1;
    } else {
      this.likesCount = this.likesCount! - 1;
    }

    if (this.isLiked) {
      this.isDisliked = false;

      if (this.dislikesCount! > 0) {
        this.dislikesCount = this.dislikesCount! - 1;
      }
    }


    const likeRequest: LikeCommentsRequestInterface = {
      liked: this.isLiked,
      disliked: this.isDisliked,
      slug: this.slug!,
      commentId: this.commentId!,
      articleId: this.articleId!,
    };

    this.store.dispatch(
      reactCommentsActions.likeComment({request: likeRequest})
    );
  }

  onSubmitDislike() {
    this.isDisliked = !this.isDisliked;

    if (this.isDisliked) {
      this.dislikesCount = this.dislikesCount! + 1;
    } else if (!this.isDisliked) {
      this.dislikesCount = this.dislikesCount! - 1;
    }

    if (this.isDisliked) {
      this.isLiked = false;

      if (this.likesCount! > 0) {
        this.likesCount = this.likesCount! - 1;
      }
    }

    const likeRequest: LikeCommentsRequestInterface = {
        liked: this.isLiked,
        disliked: this.isDisliked,
        slug: this.slug!,
        commentId: this.commentId!,
        articleId: this.articleId!,
      };
  
      this.store.dispatch(
        reactCommentsActions.dislikeComment({request: likeRequest})
      );

  }
}
