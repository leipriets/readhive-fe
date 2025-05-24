import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import {provideRouter, withRouterConfig} from '@angular/router';

import {provideNzIcons} from './icons-provider';

import {en_US, provideNzI18n} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule} from '@angular/forms';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideState, provideStore} from '@ngrx/store';
import {provideRouterStore, routerReducer} from '@ngrx/router-store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {provideEffects} from '@ngrx/effects';

import {routes} from './app.routes';
import * as feedEffects from '../app/library/components/feed/store/effects';
import * as authEffects from '../app/containers/auth/store/effects';
import * as articleEffects from '../app/containers/article/store/effects';
import * as popularTagsEffect from './library/components/popularTags/store/effects';
import * as addToFavoritesEffect from './library/components/addToFavorites/store/effects';
import * as userProfileEffects from './containers/userProfile/store/effects';
import * as followUserEffect from './library/components/followButton/store/effects';
import * as commentsEffect from './library/components/comments/store/effects';
import * as reactCommentsEffect from './library/components/reactComments/store/effects';


import {
  feedFeatureKey,
  feedReducer,
} from './library/components/feed/store/reducers';
import {authFeatureKey, authReducer} from './containers/auth/store/reducers';
import {authInterceptor} from './library/data/services/auth.interceptor';
import {
  articleFeatureKey,
  articleReducer,
} from './containers/article/store/reducers';
import {
  drawerFeatureKey,
  drawerReducer,
} from './library/components/drawer/store/reducers';
import {
  popularTagsFeatureKey,
  popularTagsReducer,
} from './library/components/popularTags/store/reducers';
import {
  settingsFeatureKey,
  settingsReducer,
} from './containers/settings/store/reducers';
import {
  userProfileFeatureKey,
  userProfileReducer,
} from './containers/userProfile/store/reducers';
import {
  commentsFeatureKey,
  commentsReducer
} from './library/components/comments/store/reducers';


import {DrawerService} from './library/components/drawer/services/drawerService.service';
import {AddToFavoritesService} from './library/components/addToFavorites/services/addToFavorites.service';
import {UserProfileService} from './containers/userProfile/services/userProfile.service';
import {NzModalService} from 'ng-zorro-antd/modal';
import {FollowButtonService} from './library/components/followButton/services/followButton.service';
import { CommentsService } from './library/components/comments/services/comments.service';
import { ReactCommentService } from './library/components/reactComments/services/reactComment.service';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(
      routes
      // withRouterConfig({
      //   onSameUrlNavigation: 'ignore',
      // })
    ),
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore(),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
    provideState(articleFeatureKey, articleReducer),
    provideState(drawerFeatureKey, drawerReducer),
    provideState(popularTagsFeatureKey, popularTagsReducer),
    provideState(settingsFeatureKey, settingsReducer),
    provideState(userProfileFeatureKey, userProfileReducer),
    provideState(userProfileFeatureKey, userProfileReducer),
    provideState(commentsFeatureKey, commentsReducer),
    provideEffects(
      authEffects,
      feedEffects,
      articleEffects,
      popularTagsEffect,
      addToFavoritesEffect,
      userProfileEffects,
      followUserEffect,
      commentsEffect,
      reactCommentsEffect
    ),
    provideNzIcons(),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    DrawerService,
    AddToFavoritesService,
    UserProfileService,
    FollowButtonService,
    NzModalService,
    CommentsService,
    ReactCommentService
  ],
};
