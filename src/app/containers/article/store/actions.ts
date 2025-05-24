import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ArticleInterface } from "../../../library/data/types/article.interface";
import { ArticleRequestInterface } from "../../../library/data/types/articleRequest.interface";
import { BackendErrorInterface } from "../../../library/data/types/backendError.interface";
import { CommentRequestInterface } from "../../../library/data/types/commentRequest.interface";
import { CommentsInterface } from "../../../library/data/types/comments.interface";


export const articleActions = createActionGroup({
    source: 'article',
    events: {
        'Create article': props<{request: ArticleRequestInterface}>(),
        'Create article success': props<{article: ArticleInterface}>(),
        'Create article failure': props<{errors: BackendErrorInterface}>(),

        'Get article': props<{slug: string}>(),
        'Get article success': props<{article: ArticleInterface}>(),
        'Get article failure': emptyProps(),

        'Delete article': props<{slug: string}>(),
        'Delete article success': emptyProps(),
        'Delete article failure': emptyProps(),

        'Update article': props<{request: ArticleRequestInterface, slug: string}>(),
        'Update article success': props<{article: ArticleInterface}>(),
        'Update article failure': props<{errors: BackendErrorInterface}>(),
    }
});