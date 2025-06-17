import {Component, OnDestroy, OnInit} from '@angular/core';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {combineLatest, filter, Subscription, take} from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectNotifData,
  selectActionData,
} from '../store/reducers';
import {select, Store} from '@ngrx/store';
import {NotificationService} from '../../../library/data/services/notification.service';
import {notificationActions} from '../store/actions';
import {NotificationMessagePart} from '../../../library/data/types/notifMessagePart.interface';
import {getShortTimeDifference} from '../../../library/utils/helper';
import {CommonModule} from '@angular/common';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzListModule,
    NzGridModule,
    NzCardModule,
    NzIconModule,
    NzDividerModule,
    NzSkeletonModule
  ],
})
export class NotificationListComponent implements OnInit, OnDestroy {
  notifSubs?: Subscription;

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    notifData: this.store.select(selectNotifData),
    actionData:  this.store.select(selectActionData)
  });

  notifContent: string = '';
  limit = 5;
  offset = 0;

  constructor(
    private store: Store,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      notificationActions.getNotifications({
        limit: this.limit,
        offset: this.offset,
      })
    );
    this.store.dispatch(notificationActions.clearNotifications());
  }

  extractMsgPart(data: NotificationMessagePart[], type: string) {
    const msgContent = this.notificationService.extractMsgParts(data, type);

    return msgContent;
  }

  onLoadMore(): void {
    this.offset += 5;
    this.store.dispatch(
      notificationActions.getNotificationsLoadMore({
        limit: this.limit,
        offset: this.offset,
      })
    );
  }

  getTimeDiff(dateString: string) {
    return getShortTimeDifference(dateString);
  }

  ngOnDestroy(): void {
    this.notifSubs?.unsubscribe();
  }
}
