import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ArticleInterface } from "../../../data/types/article.interface";
import { ProfileInterface } from "../../../data/types/profile.interface";

export const followUserActions = createActionGroup({
    source: 'Follow User',
    events: {
        'Follow user': props<{isFollowing: boolean | undefined, username: string | undefined}>(),
        'Follow user success': props<{profile: ProfileInterface}>(),
        'Follow user failure': emptyProps(),
    }
})