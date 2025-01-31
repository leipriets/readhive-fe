import {Route} from '@angular/router';
import {InnerMasterPageComponent} from './inner-master-page.component';
import {ArticleComponent} from '../../containers/article/components/article.component';
import {CreateArticleComponent} from '../../containers/article/components/createArticle/createArticle.component';
import {ArticleSlugComponent} from '../../containers/article/components/articleSlug/articleSlug.component';
import { GlobalFeedComponent } from '../../containers/globalFeed/components/globalFeed.component';
import { TagFeedComponent } from '../../containers/tagFeed/components/tagFeed.component';
import { SettingsComponent } from '../../containers/settings/components/settings.component';

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
        path: 'articles',
        component: ArticleComponent,
        loadChildren: () =>
          import('../../containers/article/article.routes').then(
            (m) => m.routes
          ),
      },
      {
        path: 'articles/new',
        component: CreateArticleComponent,
        loadChildren: () =>
          import('../../containers/article/article.routes').then(
            (m) => m.routes
          ),
      },
      {
        path: 'articles/:slug',
        component: ArticleSlugComponent,
        loadChildren: () =>
          import('../../containers/article/article.routes').then(
            (m) => m.routes
          ),
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
      },
    ],
  },
];
