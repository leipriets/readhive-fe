import {
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {combineLatest, filter, map, Observable, Subscription, tap} from 'rxjs';
import {ActivatedRoute, Params, Router, RouterLink} from '@angular/router';
import queryString from 'query-string';
import {feedActions} from './store/actions';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {CommonModule} from '@angular/common';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzAnchorModule} from 'ng-zorro-antd/anchor';
import {NzImageModule} from 'ng-zorro-antd/image';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import {environment} from '../../../../environments/environment.development';
import {PaginationComponent} from '../pagination/pagination.component';
import {selectCurrentUser} from '../../../containers/auth/store/reducers';
import {
  selectError,
  selectArticlesData,
  selectIsLoading,
  selectArticlesCount,
  selectAllDataLoaded,
} from './store/reducers';
import {AddToFavoritesComponent} from '../addToFavorites/addToFavorites.component';
import {SkeletonComponent} from '../skeleton/skeleton.component';

import {InfiniteScrollDirective} from 'ngx-infinite-scroll';
import {CurrentUserInterface} from '../../data/types/currentUser.interface';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';

import {ArticleInterface} from '../../data/types/article.interface';
import {ArticleSlugModalComponent} from '../articleSlugModal/articleSlugModal.component';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {selectArticleContent} from '../../../containers/article/store/selectors';
import {getRelativeTime} from '../../utils/helper';
import { ToolTipDateComponent } from '../tooltipDate/toolTipDate.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NzAnchorModule,
    NzDividerModule,
    NzListModule,
    NzIconModule,
    NzButtonModule,
    NzTypographyModule,
    NzPageHeaderModule,
    NzTagModule,
    NzAvatarModule,
    NzCardModule,
    NzGridModule,
    NzImageModule,
    NzBadgeModule,
    NzToolTipModule,
    AddToFavoritesComponent,
    SkeletonComponent,
    ToolTipDateComponent,
    InfiniteScrollDirective,
  ],
})
export class FeedComponent implements OnInit, OnDestroy {
  @Input() apiUrl: string = '';

  private subscription: Subscription = new Subscription();
  private currentUserSubscription?: Subscription;
  collapsedMap: {[id: number]: boolean} = {};

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectArticlesData),
    articlesCount: this.store.select(selectArticlesCount),
    currentUser: this.store.select(selectCurrentUser),
    isLastPage: this.store.select(selectAllDataLoaded),
  }).pipe(
    tap((data) => {
      // Initialize collapsedMap when articles are loaded
      for (const article of data.feed) {
        // if (!(article.id in this.collapsedMap)) {
        this.collapsedMap[article.id] = true; // or true if you want collapsed initially
        // }
      }
    })
  );

  offset = 0;
  limit = environment.limit;
  baseUrl = this.router.url.split('?')[0];
  currentPage: number = 1;
  pageSize = 0;
  noArticles: boolean = false;
  currentSessionId: string | null = null;
  backendApi = `${environment.apiPath}`;
  showToggle = true;
  safeContent: SafeHtml | undefined;
  isProfileTab = false;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NzModalService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // this.fetchFeed();
    this.onScroll();

    this.currentUserSubscription = this.store
      .pipe(select(selectCurrentUser), filter(Boolean))
      .subscribe((currentUser: CurrentUserInterface) => {
        console.log('app component current user ->', currentUser);
        this.currentSessionId = currentUser.id;
      });

    this.store.select(selectArticleContent).subscribe((articleBody) => {
      console.log('selector', articleBody);
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(articleBody);
    });

    const queryParams = this.route.snapshot.queryParams;

    if (
      queryParams['tab'] &&
      queryParams['tab'].trim() !== '' &&
      queryParams['tab'] == 'posts'
    ) {
      this.isProfileTab = true;
    }
  }

  fetchFeed(): void {
    const parsedUrl = queryString.parseUrl(this.apiUrl);
    const stringifiedParams = queryString.stringify({
      userId: this.currentSessionId,
      limit: this.limit,
      offset: this.offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;

    const dataSubs = this.data$.subscribe((response) => {
      this.pageSize = response.articlesCount;
    });

    if (this.pageSize >= this.offset) {
      this.store.dispatch(feedActions.getFeed({url: apiUrlWithParams}));
      this.offset += this.limit;
    }

    this.subscription.add(dataSubs);
  }

  onScroll(): void {
    console.log('scrolled!');
    setTimeout(() => {
      this.fetchFeed();
    }, 1000);
  }

  showArticleModal(
    article: ArticleInterface,
    userTitleAvatar?: TemplateRef<{}>,
    directComment?: boolean | undefined
  ): void {

    this.safeContent = this.sanitizer.bypassSecurityTrustHtml(article.body);

    const modal: NzModalRef = this.modalService.create({
      nzTitle: userTitleAvatar,
      nzContent: ArticleSlugModalComponent,
      nzWidth: '1000px',
      nzStyle: {top: '20px'},
      nzData: {
        articleData: article,
        articleBody: this.safeContent,
        articleUsername: article?.author.username,
        articleAvatar: article?.author?.image,
        isDirectComment: directComment
      },
      nzFooter: [
        {
          label: 'Close',
          shape: 'round',
          onClick: () => modal.destroy(),
        },
      ],
    });
  }

  toggleCollapse(id: number) {
    this.collapsedMap[id] = !this.collapsedMap[id];
  }

  getTimeDiff(dateString: string) {
    return getRelativeTime(dateString);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.currentUserSubscription?.unsubscribe();
  }
}
