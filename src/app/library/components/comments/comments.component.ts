import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {NzCommentModule} from 'ng-zorro-antd/comment';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzModalModule, NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';

import {CommentsInterface} from '../../data/types/comments.interface';
import {CommonModule} from '@angular/common';
import {formatDistanceToNow} from 'date-fns';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommentFormValuesInterface} from '../../data/types/commentFormValues.interface';
import {Actions, ofType} from '@ngrx/effects';
import {combineLatest, filter, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {commentsActions} from './store/actions';
import {
  selectCommentsData,
  selectError,
  selectIsLoading,
  selectUpdatedComment,
} from './store/reducers';
import {selectCurrentUser} from '../../../containers/auth/store/reducers';
import {CommentRequestInterface} from '../../data/types/commentRequest.interface';
import {ReactCommentsComponent} from '../reactComments/reactComments.component';
import {EditCommentFormValuesInterface} from './types/editCommentFormValues.interface';
import {EditCommentRequestInterface} from './types/editCommentRequest.interface';
import {getRelativeTime} from '../../utils/helper';

@Component({
  selector: 'app-comment',
  templateUrl: './comments.component.html',
  standalone: true,
  styleUrls: ['./comments.component.css'],
  imports: [
    CommonModule,
    NzCommentModule,
    NzAvatarModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,
    NzCardModule,
    NzIconModule,
    NzToolTipModule,
    NzDividerModule,
    NzDropDownModule,
    NzModalModule,
    ReactiveFormsModule,
    ReactCommentsComponent,
  ],
})
export class CommentComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() articleId?: number;
  @Input() slug!: string;
  @Input() isDirectComment?: boolean | undefined;
  @Output() commentSubmit = new EventEmitter<CommentFormValuesInterface>();
  @ViewChild('p') paragraphBody!: ElementRef;
  @ViewChild('commentInput') commentInput!: ElementRef;

  isLiked: boolean | null = null;
  isDisliked: boolean | null = null;
  likesCount: number = 0;
  comments?: CommentsInterface[];
  isEditComment: boolean = false;
  isEditIndex: number | null = null;
  isVisibleConfirm = false;

  private actionsSub!: Subscription;
  private selectCommentSub!: Subscription;

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    comments: this.store.select(selectCommentsData),
    currentUser: this.store.select(selectCurrentUser),
    updatedComment: this.store.select(selectUpdatedComment),
    // articlesCount: this.store.select(selectArticlesCount),
    // isLastPage: this.store.select(selectAllDataLoaded)
  });

  form = this.fb.nonNullable.group({
    body: ['', Validators.required],
  });

  formEditComment = this.fb.nonNullable.group({
    editCommentId: ['', Validators.required],
    editBody: ['', Validators.required],
  });

  constructor(
    private modalService: NzModalService,
    private messageService: NzMessageService,
    private fb: FormBuilder,
    private actions$: Actions,
    private store: Store
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.actionsSub = this.actions$
      .pipe(ofType(commentsActions.commentArticleSuccess))
      .subscribe(({comment}) => {
        setTimeout(() => this.scrollToComment(comment.id.toString()), 100);
      });

    this.selectCommentSub = this.actions$
      .pipe(ofType(commentsActions.updateCommentArticleSuccess))
      .subscribe(({comment}) => {
        // console.log('select Comment sub', comment);

        const element = document.getElementById('commentBody' + comment.id);

        if (element) {
          element.innerText = comment.body;
        }

        this.scrollToComment(comment.id.toString());

        setTimeout(() => this.scrollToComment(comment.id.toString()), 100);
      });

    if (changes['articleId'] && this.articleId !== null) {
      this.store.dispatch(
        commentsActions.getComment({
          articleId: this.articleId!,
          slug: this.slug!,
        })
      );
    }
  }

  ngAfterViewInit(): void {
    if (this.isDirectComment === true) {
      console.log(this.isDirectComment);
      setTimeout(() => {
        this.commentInput.nativeElement.focus();

        this.commentInput.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

      }, 500);

    }
  }

  getTimeDiff(dateString: string) {
    return getRelativeTime(dateString);
  }

  onSubmit(): void {
    const body = this.form.get('body')?.value!;
    const slug = this.slug!;

    const commentFormValues: CommentFormValuesInterface = {
      body,
      slug,
    };

    const request: CommentRequestInterface = {
      comment: commentFormValues,
    };

    // this.commentSubmit.emit(commentFormValues);

    this.store.dispatch(commentsActions.commentArticle({request}));

    this.form.reset();
  }

  onEditComment(comment: CommentsInterface, index: any) {
    this.formEditComment.patchValue({
      editCommentId: comment.id.toString(),
      editBody: comment.body,
    });

    this.isEditComment = true;
    this.isEditIndex = index;
  }

  onUpdateComment(index: number): void {
    const body = this.formEditComment.get('editBody')?.value!;
    const commentId = this.formEditComment.get('editCommentId')?.value!;
    const slug = this.slug!;

    const commentFormValues: EditCommentFormValuesInterface = {
      commentId,
      body,
      slug,
    };

    const request: EditCommentRequestInterface = {
      comment: commentFormValues,
    };

    this.store.dispatch(commentsActions.updateCommentArticle({request}));

    this.onCancelEdit();
  }

  onCancelEdit() {
    this.isEditComment = false;
    this.isEditIndex = null;
  }

  showConfirm(commentId: number): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this comment?',
      nzContent: '',
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        const slug = this.slug;
        this.store.dispatch(commentsActions.deleteComment({commentId, slug}));
        this.messageService.success('Comment was successfully deleted.');
      },
    });
  }

  scrollToComment(commentId: string): void {
    const el = document.getElementById('comment-' + commentId);
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }

  ngOnDestroy(): void {
    // avoid memory leaks
    this.actionsSub.unsubscribe();
    this.selectCommentSub.unsubscribe();
  }
}
