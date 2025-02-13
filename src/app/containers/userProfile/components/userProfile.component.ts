import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { RouterLink } from '@angular/router';
import {ActivatedRoute, Params, Router} from '@angular/router';

/** Ng Zorro */
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {select, Store} from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import {combineLatest, filter, map} from 'rxjs';
import {selectCurrentUser} from '../../auth/store/reducers';
import {CurrentUserInterface} from '../../../library/data/types/currentUser.interface';
import {selectError, selectIsLoading, selectUserProfileData} from '../store/reducers';
import {UserProfileInterface} from '../types/userProfile.interface';
import {userProfileActions} from '../store/actions';
import {authActions} from '../../auth/store/actions';
import { FeedComponent } from '../../../library/components/feed/feed.component';
import { FollowButtonComponent } from '../../../library/components/followButton/followButton.component';
import { NewPostComponent } from '../../../library/components/newPost/newPost.component';

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
    FeedComponent,
    FollowButtonComponent,
    NewPostComponent,
  ],
})
export class UserProfileComponent implements OnInit {
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

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      console.log(queryParams);
      if (queryParams['tab'] && queryParams['tab'] == 'posts') {
        this.isNewPostTab = true;
      }
    });

    this.route.params.subscribe((params: Params) => {
      this.username = params['username'];
      this.fetchUserProfile();
    });
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
}
