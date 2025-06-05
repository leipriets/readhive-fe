import {Component, OnInit, ViewChild} from '@angular/core';
import {FeedComponent} from '../../../library/components/feed/feed.component';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {selectCurrentUser} from '../../auth/store/reducers';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {FeedTogglerComponent} from '../../../library/components/feedToggler/feedToggler.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { PopularTagsComponent } from '../../../library/components/popularTags/popularTags.component';
import { NewPostComponent } from '../../../library/components/newPost/newPost.component';
import { notificationCountActions } from '../../../library/components/header/store/actions';

@Component({
  selector: 'app-global-feed',
  templateUrl: './globalFeed.component.html',
  styleUrls: ['./globalFeed.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FeedTogglerComponent,
    FeedComponent,
    NzButtonModule,
    NzIconModule,
    NzGridModule,
    PopularTagsComponent,
    NewPostComponent
  ],
})
export class GlobalFeedComponent implements OnInit {
  @ViewChild(FeedComponent, {static: false}) feedComponent!: FeedComponent;

  apiUrl = '/articles';
  currentPage: number = 0;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.dispatch(notificationCountActions.getNotificationCount());


    this.route.queryParams.subscribe((params) => {
      if (!params['tab']) {
        // Add default query params if missing
        this.router.navigate(['global-feed'], {
          queryParams: {tab: 'globalFeed'},
          queryParamsHandling: 'merge', // Preserve existing query params
        });
      }
    });
  }

}
