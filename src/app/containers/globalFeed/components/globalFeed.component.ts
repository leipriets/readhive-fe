import {Component, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FeedComponent} from '../../../library/components/feed/feed.component';
import {Store} from '@ngrx/store';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {selectCurrentUser} from '../../auth/store/reducers';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {FeedTogglerComponent} from '../../../library/components/feedToggler/feedToggler.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { PopularTagsComponent } from '../../../library/components/popularTags/popularTags.component';
import { NewPostComponent } from '../../../library/components/newPost/newPost.component';
import { notificationCountActions } from '../../../library/components/header/store/actions';
import { NzAffixModule } from 'ng-zorro-antd/affix';

@Component({
  selector: 'app-global-feed',
  templateUrl: './globalFeed.component.html',
  styleUrls: ['./globalFeed.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FeedComponent,
    NzButtonModule,
    NzIconModule,
    NzGridModule,
    NzAffixModule,
    PopularTagsComponent,
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

  }

}
