import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';

import {environment} from '../../../../environments/environment.development';
import {ArticleInterface} from '../types/article.interface';
import {ArticleResponseInterface} from '../types/articleResponse.interface';
import {ArticleRequestInterface} from '../types/articleRequest.interface';
import {CommentRequestInterface} from '../types/commentRequest.interface';
import {CommentsInterface} from '../types/comments.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticle(slug: string): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;
    return this.http
      .get<ArticleResponseInterface>(fullUrl)
      .pipe(map((response) => response.article));
  }

  createArticle(
    articleRequest: ArticleRequestInterface
  ): Observable<ArticleInterface> {
    const fullUrl = environment.apiUrl + '/articles';

    let postData = new FormData();

    postData.append('article[title]', articleRequest.article.title);
    postData.append('article[description]', articleRequest.article.description);
    postData.append('article[body]', articleRequest.article.body);

    // Append tagList array
    articleRequest.article.tagList.forEach((tag, index) => {
      postData.append(`article[tagList][${index}]`, tag);
    });

    articleRequest.article?.images?.forEach((image: any) => {
      postData.append('images', image.originFileObj as any);
    });

    return this.http
      .post<ArticleResponseInterface>(fullUrl, postData)
      .pipe(map((response) => response.article));
  }

  updateArticle(
    slug: string,
    articleRequest: ArticleRequestInterface
  ): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;

    let postData = new FormData();

    postData.append('article[title]', articleRequest.article.title);
    postData.append('article[description]', articleRequest.article.description);
    postData.append('article[body]', articleRequest.article.body);

    // Append tagList array
    articleRequest.article.tagList.forEach((tag, index) => {
      postData.append(`article[tagList][${index}]`, tag);
    });

    articleRequest.article?.images?.forEach((image: any) => {
      if (image?.originFileObj) {
        postData.append('images', image.originFileObj as any);
      } else {
        postData.append('images', JSON.stringify(image));
      }
    });

    return this.http
      .put<ArticleResponseInterface>(fullUrl, postData)
      .pipe(map((response) => response.article));
  }

  deleteArticle(slug: string): Observable<{}> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;
    return this.http.delete(fullUrl);
  }

  commentArticle(
    commentRequest: CommentRequestInterface
  ): Observable<CommentsInterface> {
    const slug = commentRequest.comment.slug;
    const fullUrl = `${environment.apiUrl}/articles/${slug}/comments`;

    return this.http.post<CommentsInterface>(fullUrl, commentRequest);
  }
}
