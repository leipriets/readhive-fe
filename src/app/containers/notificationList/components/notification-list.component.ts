import {Component} from '@angular/core';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzIconModule} from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { combineLatest } from 'rxjs';
import { selectError, selectIsLoading, selectNotifData } from '../store/reducers';
import { Store } from '@ngrx/store';
import { NotificationService } from '../../../library/data/services/notification.service';
import { notificationActions } from '../store/actions';
import { NotificationMessagePart } from '../../../library/data/types/notifMessagePart.interface';
import { getShortTimeDifference } from '../../../library/utils/helper';
import { CommonModule } from '@angular/common';

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
    NzDividerModule
  ],
})
export class NotificationListComponent {
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    notifData: this.store.select(selectNotifData),
  });

  notifContent: string = '';

  constructor(
    private store: Store,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {

      this.store.dispatch(notificationActions.getNotifications());
      this.store.dispatch(notificationActions.clearNotifications());

  }

  extractMsgPart(data: NotificationMessagePart[], type: string) {
    const msgContent = this.notificationService.extractMsgParts(data, type);

    return msgContent;
  }


  getTimeDiff(dateString: string) {
    return getShortTimeDifference(dateString);
  }

}
