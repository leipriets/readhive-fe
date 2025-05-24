import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { GetFeedResponseInterface } from "../../../data/types/getFeedResponse.interface";
import { ArticleInterface } from "../../../data/types/article.interface";


export const feedActions = createActionGroup({
    source: 'feed',
    events: {
        'Get feed': props<{url: string}>(),
        'Get feed success': props<{feed: GetFeedResponseInterface, isLastPage: boolean}>(),
        'Get feed failure': emptyProps(),
    }
});