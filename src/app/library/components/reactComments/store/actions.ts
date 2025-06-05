import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { LikeCommentsRequestInterface } from "../../../data/types/likeCommentsRequest.interface";
import { LikeCommentsInterface } from "../../../data/types/likeComments.interface";
import { BackendErrorInterface } from "../../../data/types/backendError.interface";
import { LikeCommentsResponseInterface } from "../../../data/types/likeCommentsResponse.interface";

export const reactCommentsActions = createActionGroup({
    source: 'react comments',
    events: {
        'get react comment': props<{request: LikeCommentsRequestInterface}>(),    
        'get react success': props<{data: LikeCommentsInterface}>(),
        'get react failure': emptyProps(),

        'like comment': props<{request: LikeCommentsRequestInterface}>(),    
        'like comment success': props<{data: LikeCommentsResponseInterface}>(),
        'like comment failure': emptyProps(),

        'dislike comment': props<{request: LikeCommentsRequestInterface}>(),    
        'dislike comment success': props<{data: LikeCommentsResponseInterface}>(),
        'dislike comment failure': emptyProps(),
    }
});