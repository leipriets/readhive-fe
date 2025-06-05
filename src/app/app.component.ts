import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';

import {HeaderComponent} from './library/components/header/header.component';
import {select, Store} from '@ngrx/store';
import {authActions} from './containers/auth/store/actions';
import {NotificationService} from './library/data/services/notification.service';
import {filter, Subscription} from 'rxjs';
import { selectCurrentUser } from './containers/auth/store/reducers';
import { CurrentUserInterface } from './library/data/types/currentUser.interface';
import { notificationCountActions } from './library/components/header/store/actions';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentUserSubscription?: Subscription;
  isCollapsed = false;

  constructor(
    private store: Store,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(authActions.getCurrentUser());
    this.store.dispatch(notificationCountActions.getNotificationCount());
    

    this.currentUserSubscription = this.store
      .pipe(select(selectCurrentUser), filter(Boolean))
      .subscribe((currentUser: CurrentUserInterface) => {
        console.log('app component current user ->',currentUser);
        const userId = currentUser.id;
        this.notificationService.registerUser(userId);
        this.notificationService.listenForNotifications();
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.currentUserSubscription?.unsubscribe();
  }
}
