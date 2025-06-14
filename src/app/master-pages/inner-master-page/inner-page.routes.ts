import {Route} from '@angular/router';
import {InnerMasterPageComponent} from './inner-master-page.component';
import {ArticleComponent} from '../../containers/article/components/article.component';
import {CreateArticleComponent} from '../../containers/article/components/createArticle/createArticle.component';
import {ArticleSlugComponent} from '../../containers/article/components/articleSlug/articleSlug.component';
import {GlobalFeedComponent} from '../../containers/globalFeed/components/globalFeed.component';
import {TagFeedComponent} from '../../containers/tagFeed/components/tagFeed.component';
import {SettingsComponent} from '../../containers/settings/components/settings.component';
import {YourFeedComponent} from '../../containers/yourFeed/components/yourFeed.component';
import {UserProfileComponent} from '../../containers/userProfile/components/userProfile.component';
import {NotificationListComponent} from '../../containers/notificationList/components/notification-list.component';
import {AuthGuard} from '../../auth.guard';

export const innerPageRoutes: Route[] = [
  {
    path: '',
    component: InnerMasterPageComponent,
    children: [
      {
        path: 'global-feed',
        component: GlobalFeedComponent,
        loadChildren: () =>
          import('../../containers/globalFeed/globalFeed.routes').then(
            (m) => m.routes
          ),
      },
      {
        path: 'feed',
        component: YourFeedComponent,
        loadChildren: () =>
          import('../../containers/yourFeed/yourFeed.routes').then(
            (m) => m.routes
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'articles',
        component: ArticleComponent,
        loadChildren: () =>
          import('../../containers/article/article.routes').then(
            (m) => m.routes
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'articles/new',
        component: CreateArticleComponent,
        loadChildren: () =>
          import('../../containers/article/article.routes').then(
            (m) => m.routes
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'articles/:slug',
        component: ArticleSlugComponent,
        loadChildren: () =>
          import('../../containers/article/article.routes').then(
            (m) => m.routes
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'tags/:slug',
        component: TagFeedComponent,
        loadChildren: () =>
          import('../../containers/tagFeed/tagFeed.routes').then(
            (m) => m.routes
          ),
      },
      {
        path: 'settings',
        component: SettingsComponent,
        loadChildren: () =>
          import('../../containers/settings/settings.routes').then(
            (m) => m.routes
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'profile/:username',
        component: UserProfileComponent,
        loadChildren: () =>
          import('../../containers/userProfile/userProfile.routes').then(
            (m) => m.routes
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'profile/:username/favorites',
        component: UserProfileComponent,
        loadChildren: () =>
          import('../../containers/userProfile/userProfile.routes').then(
            (m) => m.routes
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'notification/:username',
        component: NotificationListComponent,
        loadChildren: () =>
          import(
            '../../containers/notificationList/notificationList.routes'
          ).then((m) => m.routes),
        // canActivate: [AuthGuard]
      },
    ],
  },
];
