import {Component, inject, Input, OnInit, SimpleChanges} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzBadgeModule} from 'ng-zorro-antd/badge';

import {combineLatest, filter, Subscription} from 'rxjs';
import {selectCurrentUser} from '../../../containers/auth/store/reducers';
import {CommonModule} from '@angular/common';
import {authActions} from '../../../containers/auth/store/actions';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {selectNotifData} from './store/reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NzMenuModule,
    NzDropDownModule,
    RouterLink,
    NzLayoutModule,
    NzIconModule,
    NzGridModule,
    NzBadgeModule,
  ],
})
export class HeaderComponent implements OnInit {
  @Input() isCollapsed: boolean = false;
  currentRoute: string = '';
  isSelected = false;
  notifCount = 0;

  getUserNotifCountSubs?: Subscription;

  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
    notif_count: this.store.select(selectNotifData),
  });

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;

    console.log('header commponent current route',this.currentRoute);

    if (
      this.currentRoute == '/global-feed?tab=globalFeed' ||
      this.currentRoute == '/feed?tab=feed'
    ) {
      this.isSelected = true;
    }

  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }
}
