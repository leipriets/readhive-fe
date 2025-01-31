import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {combineLatest} from 'rxjs';
import {ActivatedRoute, Params, Router, RouterLink} from '@angular/router';
import queryString from 'query-string';
import {feedActions} from './store/actions';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzSkeletonModule} from 'ng-zorro-antd/skeleton';
import { CommonModule } from '@angular/common';

import {environment} from '../../../../environments/environment.development';
import { PaginationComponent } from '../pagination/pagination.component';
import { selectCurrentUser } from '../../../containers/auth/store/reducers';
import {selectError, selectFeedData, selectIsLoading} from './store/reducers';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTagModule } from 'ng-zorro-antd/tag';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PaginationComponent,
    NzDividerModule,
    NzListModule,
    NzIconModule,
    NzButtonModule,
    NzSkeletonModule,
    NzPageHeaderModule,
    NzTagModule
  ],
})
export class FeedComponent implements OnInit {
  @Input() apiUrl: string = '';


  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedData),
    currentUser: this.store.select(selectCurrentUser)
  });

  limit = environment.limit;
  baseUrl = this.router.url.split('?')[0];
  currentPage: number = 0;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.loadData(1);
    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params['page'] || '1');
      this.fetchFeed();
    });
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = queryString.parseUrl(this.apiUrl);
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    this.store.dispatch(feedActions.getFeed({url: apiUrlWithParams}));
  }

  trackById(index: number, item: any): any {
    return item.id;  // Ensure the id is unique for each item
  }
}
