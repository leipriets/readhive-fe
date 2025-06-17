import {
  Component,
  inject,
  Input,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import {select, Store} from '@ngrx/store';

import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzAffixModule} from 'ng-zorro-antd/affix';
import {NzAlign, NzFlexModule, NzJustify} from 'ng-zorro-antd/flex';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzAutocompleteModule} from 'ng-zorro-antd/auto-complete';

import {
  catchError,
  combineLatest,
  debounceTime,
  filter,
  of,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';
import {selectCurrentUser} from '../../../containers/auth/store/reducers';
import {CommonModule} from '@angular/common';
import {authActions} from '../../../containers/auth/store/actions';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {selectNotifData} from './store/reducers';
import {SearchProfileService} from '../searchProfile/services/searchProfile.service';
import {SearchProfileInterface} from '../searchProfile/types/searchProfile.interface';
import {GetSearchResponseInterface} from '../searchProfile/types/getSearchResponse.interface';
import {FormsModule} from '@angular/forms';
import { SearchProfileComponent } from '../searchProfile/components/searchProfile.component';

interface Option {
  label: string;
  value: string;
  age: number;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    FormsModule,
    NzMenuModule,
    NzDropDownModule,
    RouterLink,
    NzLayoutModule,
    NzIconModule,
    NzGridModule,
    NzBadgeModule,
    NzAffixModule,
    NzFlexModule,
    NzAvatarModule,
    NzInputModule,
    NzAutocompleteModule
  ],
})
export class HeaderComponent implements OnInit {
  currentRoute: string = '';
  isSelected = false;
  isSelectedNotif = false;
  notifCount = 0;
  getUserNotifCountSubs?: Subscription;

  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
    notif_count: this.store.select(selectNotifData),
  });

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;
  }

  ngAfterViewInit(): void {
    const notificationRoute = this.currentRoute.split('/')[1];

    if (
      this.currentRoute == '/global-feed?tab=globalFeed' ||
      this.currentRoute == '/feed?tab=feed'
    ) {
      this.isSelected = true;
    }

    if (notificationRoute == 'notification') {
      this.isSelectedNotif = true;
    }
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }

  ngOnDestroy(): void {}
}
