import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ArticleInterface } from "../../../data/types/article.interface";

export const addToFavoritesActions = createActionGroup({
    source: 'Add to favortes',
    events: {
        'Add to favorites': props<{isFavorited: boolean, slug: string}>(),
        'Add to favorites success': props<{article: ArticleInterface}>(),
        'Add to favorites failure': emptyProps(),
    }
})