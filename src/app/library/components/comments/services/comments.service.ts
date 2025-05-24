import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment.development';
import {LikeCommentsRequestInterface} from '../../../data/types/likeCommentsRequest.interface';
import {LikeCommentsResponseInterface} from '../../../data/types/likeCommentsResponse.interface';
import {LikeCommentsInterface} from '../../../data/types/likeComments.interface';
import {CommentsInterface} from '../../../data/types/comments.interface';
import {CommentRequestInterface} from '../../../data/types/commentRequest.interface';
import { EditCommentRequestInterface } from '../types/editCommentRequest.interface';

@Injectable()
export class CommentsService {
  constructor(private http: HttpClient) {}

  commentArticle(
    commentRequest: CommentRequestInterface
  ): Observable<CommentsInterface> {
    // console.log(commentRequest);
    const slug = commentRequest.comment.slug;
    const fullUrl = `${environment.apiUrl}/articles/${slug}/comment`;

    return this.http.post<CommentsInterface>(fullUrl, commentRequest);
  }

  getComments(
    articleId: number,
    slug: string
  ): Observable<CommentsInterface[]> {
    const url = `${environment.apiUrl}/articles/${slug}/comments`;

    const params = {
      articleId,
    };

    return this.http.get<CommentsInterface[]>(url, {params});
  }

  updateComment(commentRequest: EditCommentRequestInterface): Observable<CommentsInterface> {

    const slug = commentRequest.comment.slug;
    const fullUrl = `${environment.apiUrl}/articles/${slug}/comment`;

    return this.http.patch<CommentsInterface>(fullUrl, commentRequest);
  }


  deleteComment(commentId: number, slug: string): Observable<CommentsInterface> {

    const fullUrl = `${environment.apiUrl}/articles/${slug}/comment/${commentId}`;

    return this.http.delete<CommentsInterface>(fullUrl);
  }

  likeComment(
    request: LikeCommentsRequestInterface
  ): Observable<LikeCommentsInterface> {
    const {slug} = request;

    const url = this.getUrl(slug) + '/like-comment';
    return this.http
      .post<LikeCommentsResponseInterface>(url, request)
      .pipe(map(this.getLikeResponse));
  }

  dislikeComment(
    request: LikeCommentsRequestInterface
  ): Observable<LikeCommentsInterface> {
    const {slug} = request;

    const url = this.getUrl(slug) + '/dislike-comment';
    return this.http
      .post<LikeCommentsResponseInterface>(url, request)
      .pipe(map(this.getLikeResponse));
  }

  getUrl(slug: string): string {
    return `${environment.apiUrl}/articles/${slug}`;
  }

  getLikeResponse(
    response: LikeCommentsResponseInterface
  ): LikeCommentsInterface {
    return response.data;
  }
}
