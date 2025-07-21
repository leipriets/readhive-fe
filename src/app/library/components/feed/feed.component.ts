import {
  Component,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {combineLatest, filter, map, Observable, Subscription, take, tap} from 'rxjs';
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
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';

import {environment} from '../../../../environments/environment.development';
import {PaginationComponent} from '../pagination/pagination.component';
import {selectCurrentUser} from '../../../containers/auth/store/reducers';
import {
  selectError,
  selectArticlesData,
  selectIsLoading,
  selectArticlesCount,
  selectAllDataLoaded,
  selectHasMore,
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
import {ToolTipDateComponent} from '../tooltipDate/toolTipDate.component';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NewPostComponent } from '../newPost/newPost.component';

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
    NzAffixModule,
    NzBreadCrumbModule,
    AddToFavoritesComponent,
    SkeletonComponent,
    ToolTipDateComponent,
    InfiniteScrollDirective,
    NewPostComponent,
  ],
})
export class FeedComponent implements OnInit, OnDestroy {
  @ViewChild('divArticleContent') divArticleContent?: ElementRef;
  
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
        if (!(article.id in this.collapsedMap)) {
          this.collapsedMap[article.id] = true; // or true if you want collapsed initially

          if (this.currentSessionUsername !== article.author.username) {
            this.isProfileTab = false;
          } 

      //     this.safeContent = this.sanitizer.bypassSecurityTrustHtml(
      //       article.body
      //     );
        }
      }
    })
  );

  hasMore$ = this.store.select(selectHasMore);

  offset = 0;
  limit = environment.limit;
  baseUrl = this.router.url.split('?')[0];
  currentPage: number = 1;
  pageSize = 0;
  noArticles: boolean = false;
  currentSessionId: string | null = null;
  currentSessionUsername: string | null = null;
  backendApi = `${environment.apiPath}`;
  safeContent: SafeHtml | undefined;
  isProfileTab = false;
  queryParams: Params = {};
  currentRoute = '';
  currentRouteParam: string | null = null;


  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NzModalService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {

    this.setCurrentSession();
    this.fetchFeed();

    this.queryParams = this.route.snapshot.queryParams;

    if (
      this.queryParams['tab'] &&
      this.queryParams['tab'].trim() !== '' &&
      this.queryParams['tab'] == 'posts' &&
      this.queryParams['tab'] !== 'favorites'
    ) {
      this.isProfileTab = true;
    }

    this.currentRoute = this.router.url.split('?')[0];

    this.currentRouteParam = this.route.snapshot.paramMap.get('slug');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['apiUrl'] && !changes['apiUrl'].firstChange) {
      this.setCurrentSession();

      const newUrl = changes['apiUrl'].currentValue;
      const parsedUrl = queryString.parseUrl(newUrl);
      const stringifiedParams = queryString.stringify({
        userId: this.currentSessionId,
        limit: this.limit,
        offset: 0,
        ...parsedUrl.query,
      });

      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
      this.store.dispatch(feedActions.getFeed({url: apiUrlWithParams}));
    }

    this.queryParams = this.route.snapshot.queryParams;
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

    this.store.dispatch(feedActions.getFeed({url: apiUrlWithParams}));

    if (this.pageSize >= this.offset) this.offset += this.limit;
    
    this.subscription.add(dataSubs);
  }

  onScroll(): void {
    setTimeout(() => {
      combineLatest([this.hasMore$])
      .pipe(take(1))
      .subscribe(([hasMore]) => {
        if (hasMore) {
          this.fetchFeed();
        }
      });
    }, 1000);
  }

  setCurrentSession() {
    this.currentUserSubscription = this.store
      .pipe(select(selectCurrentUser), filter(Boolean), take(1))
      .subscribe((currentUser: CurrentUserInterface) => {
        this.currentSessionId = currentUser.id;
        this.currentSessionUsername = currentUser.username;
      });
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
        isDirectComment: directComment,
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
