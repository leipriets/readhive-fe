import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ActivatedRoute, Params, Router} from '@angular/router';

/** Ng Zorro */
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {select, Store} from '@ngrx/store';
import {CommonModule} from '@angular/common';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzImage, NzImageModule, NzImageService} from 'ng-zorro-antd/image';
import {NzResultModule} from 'ng-zorro-antd/result';
import {NzAlign, NzFlexModule, NzJustify} from 'ng-zorro-antd/flex';
import {NzStatisticModule} from 'ng-zorro-antd/statistic';
import {NzSkeletonModule} from 'ng-zorro-antd/skeleton';

import {combineLatest, filter, map} from 'rxjs';
import {selectCurrentUser} from '../../auth/store/reducers';
import {CurrentUserInterface} from '../../../library/data/types/currentUser.interface';
import {
  selectError,
  selectIsLoading,
  selectUserProfileData,
} from '../store/reducers';
import {UserProfileInterface} from '../types/userProfile.interface';
import {userProfileActions} from '../store/actions';
import {authActions} from '../../auth/store/actions';
import {FeedComponent} from '../../../library/components/feed/feed.component';
import {FollowButtonComponent} from '../../../library/components/followButton/followButton.component';
import {SkeletonProfileComponent} from '../../../library/components/skeletonProfile/skeletonProfile.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./userProfile.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NzAvatarModule,
    NzSpaceModule,
    NzButtonModule,
    NzGridModule,
    NzIconModule,
    NzCardModule,
    NzDividerModule,
    NzTabsModule,
    NzImageModule,
    NzStatisticModule,
    NzSkeletonModule,
    NzResultModule,
    NzFlexModule,
    FeedComponent,
    FollowButtonComponent,
    SkeletonProfileComponent,
  ],
})
export class UserProfileComponent implements OnInit {
  @ViewChild('followUserButton', {static: false}) followUserButton?: ElementRef;

  username: string = '';
  isFollowing: boolean = false;
  isNewPostTab: boolean = false;
  src = `https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`;
  isCurrentUserProfile$ = combineLatest({
    currentUser: this.store.pipe(
      select(selectCurrentUser),
      filter(
        (currentUser): currentUser is CurrentUserInterface =>
          currentUser !== undefined
      )
    ),
    userProfile: this.store.pipe(
      select(selectUserProfileData),
      filter((userProfile): userProfile is UserProfileInterface =>
        Boolean(userProfile)
      )
    ),
  }).pipe(
    map(({currentUser, userProfile}) => {
      return currentUser.username === userProfile.username;
    })
  );

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    userProfile: this.store.select(selectUserProfileData),
    isCurrentUserProfile: this.isCurrentUserProfile$,
  });

  onListenFollowing = 0;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    private nzImageService: NzImageService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams['tab'] && queryParams['tab'] == 'posts') {
        this.isNewPostTab = true;
      }
    });

    this.route.params.subscribe((params: Params) => {
      this.username = params['username'];
      this.fetchUserProfile();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    console.log(this.followUserButton);
  }

  fetchUserProfile(): void {
    this.store.dispatch(
      userProfileActions.getUserProfile({username: this.username})
    );
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    return isFavorites
      ? `/articles?favorited=${this.username}`
      : `/articles?author=${this.username}`;
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }

  previewAvatar(image: string) {
    const nzImage = [
      {
        src: image,
        width: '250px',
        height: '350px',
        alt: 'angular',
      },
    ];

    this.nzImageService.preview(nzImage, {nzZoom: 1.5, nzRotate: 0});
  }

  onHandleFollowCount(event: {isFollowing: boolean; username: string}) {
    if (event?.isFollowing) {
      this.onListenFollowing--;
    } else {
      this.onListenFollowing++;
    }
  }
}
