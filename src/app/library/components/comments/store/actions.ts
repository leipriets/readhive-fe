import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { LikeCommentsRequestInterface } from "../../../data/types/likeCommentsRequest.interface";
import { LikeCommentsInterface } from "../../../data/types/likeComments.interface";
import { CommentsInterface } from "../../../data/types/comments.interface";
import { CommentRequestInterface } from "../../../data/types/commentRequest.interface";
import { BackendErrorInterface } from "../../../data/types/backendError.interface";
import { EditCommentRequestInterface } from "../types/editCommentRequest.interface";

export const commentsActions = createActionGroup({
    source: 'comments',
    events: {
        'Comment article': props<{request: CommentRequestInterface}>(),
        'Comment article success': props<{comment: CommentsInterface}>(),
        'Comment article failure':  props<{errors: BackendErrorInterface}>(),

        'Update comment article': props<{request: EditCommentRequestInterface}>(),
        'Update comment article success': props<{comment: CommentsInterface}>(),
        'Update comment article failure':  props<{errors: BackendErrorInterface}>(),

        'Get comment': props<{articleId: number, slug: string}>(),    
        'Get comment success': props<{data: CommentsInterface[]}>(),
        'Get comment success pagination': props<{data: CommentsInterface[]}>(),
        'Get comment failure': emptyProps(),

        'Delete comment': props<{commentId: number, slug: string}>(),    
        'Delete comment success': props<{comment: CommentsInterface}>(),
        'Delete comment failure': emptyProps(),

        'like comment': props<{request: LikeCommentsRequestInterface}>(),    
        'like comment success': props<{data: LikeCommentsInterface}>(),
        'like comment failure': emptyProps(),

        'dislike comment': props<{request: LikeCommentsRequestInterface}>(),    
        'dislike comment success': props<{data: LikeCommentsInterface}>(),
        'dislike comment failure': emptyProps(),
    }
});