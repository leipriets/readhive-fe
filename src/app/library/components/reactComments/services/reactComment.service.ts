import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LikeCommentsRequestInterface } from "../../../data/types/likeCommentsRequest.interface";
import { map, Observable } from "rxjs";
import { LikeCommentsInterface } from "../../../data/types/likeComments.interface";
import { LikeCommentsResponseInterface } from "../../../data/types/likeCommentsResponse.interface";
import { environment } from "../../../../../environments/environment.development";

@Injectable()
export class ReactCommentService {
  constructor(private http: HttpClient) {}

    likeComment(
      request: LikeCommentsRequestInterface
    ): Observable<LikeCommentsResponseInterface> {
      const {slug} = request;
  
      const url = this.getUrl(slug) + '/like-comment';
      return this.http
        .post<LikeCommentsResponseInterface>(url, request)
        .pipe(map(this.getLikeResponse));
    }
  
    dislikeComment(
      request: LikeCommentsRequestInterface
    ): Observable<LikeCommentsResponseInterface> {
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
    ): LikeCommentsResponseInterface {
      return response;
    }

}