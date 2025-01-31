import {Route} from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'global-feed',
  },
  {
    path: '',
    loadChildren: () =>
      import('./master-pages/inner-master-page/inner-page.routes').then(
        (m) => m.innerPageRoutes
      ),
  },
  {
    path: 'sp',
    loadChildren: () =>
      import('./master-pages/single-master-page/single-page.routes').then(
        (m) => m.singlePageRoutes
      ),
  },
];
