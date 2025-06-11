import {
  Component,
  inject,
  Injectable,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';

import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzNoAnimationModule} from 'ng-zorro-antd/core/no-animation';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {NzImageModule} from 'ng-zorro-antd/image';

import {combineLatest, filter, map, Observable, Subscription} from 'rxjs';
import {
  selectArticleData,
  selectError,
  selectIsLoading,
} from '../../store/reducers';
import {articleActions} from '../../store/actions';
import {CommonModule, Location, TitleCasePipe} from '@angular/common';
import {DrawerComponent} from '../../../../library/components/drawer/drawer.component';
import {EditArticleComponent} from '../editArticle/editArticle.component';
import {selectCurrentUser} from '../../../auth/store/reducers';
import {CurrentUserInterface} from '../../../../library/data/types/currentUser.interface';
import {selectUserProfileData} from '../../../userProfile/store/reducers';
import {UserProfileInterface} from '../../../userProfile/types/userProfile.interface';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {CommentComponent} from '../../../../library/components/comments/comments.component';
import {CommentRequestInterface} from '../../../../library/data/types/commentRequest.interface';
import {CommentFormValuesInterface} from '../../../../library/data/types/commentFormValues.interface';
import {CommentsInterface} from '../../../../library/data/types/comments.interface';
import {environment} from '../../../../../environments/environment.development';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import { selectArticleContent } from '../../store/selectors';
import { AddToFavoritesComponent } from '../../../../library/components/addToFavorites/addToFavorites.component';

@Component({
  selector: 'app-article-slug',
  templateUrl: './articleSlug.component.html',
  styleUrls: ['./articleSlug.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TitleCasePipe,
    NzAvatarModule,
    NzButtonModule,
    NzDropDownModule,
    NzGridModule,
    NzIconModule,
    NzNoAnimationModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzTagModule,
    NzTypographyModule,
    NzImageModule,
    NzCardModule,
    NzDividerModule,
    DrawerComponent,
    EditArticleComponent,
    AddToFavoritesComponent,
    CommentComponent,
  ],
})
export class ArticleSlugComponent implements OnInit, OnDestroy {
  @ViewChild(DrawerComponent, {static: false}) drawerTemplate!: DrawerComponent;

  slug = this.route.snapshot.paramMap.get('slug') ?? '';
  currentUser?: CurrentUserInterface;
  currentUserSubscription?: Subscription;
  confirmModal?: NzModalRef;
  pathUrl = environment.apiPath + '/src/images';
  showToggle = false;
  isCollapse = true;

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    article: this.store.select(selectArticleData),
  });

  safeContent$!: Observable<SafeHtml>;

  modal = inject(NzModalService);

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({slug: this.slug}));

    this.safeContent$ = this.store.select(selectArticleContent).pipe(
      map(html => this.sanitizer.bypassSecurityTrustHtml(html))
    );

    this.currentUserSubscription = this.store
      .pipe(select(selectCurrentUser), filter(Boolean))
      .subscribe((currentUser: CurrentUserInterface) => {
        this.currentUser = currentUser;
      });
  }

  deleteArticle(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you want to delete this article?',
      nzOnOk: () => {
        this.store.dispatch(articleActions.deleteArticle({slug: this.slug}));
      },
    });
  }

  openDrawerComponent() {
    this.drawerTemplate.toggleDrawer();
  }

  onBack() {
    this.location.back();
  }

  toggleCollapse(){
    this.isCollapse = !this.isCollapse;    
  }

  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe();
  }
}
