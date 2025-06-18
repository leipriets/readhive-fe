import {Injectable} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {io, Socket} from 'socket.io-client';
import {environment} from '../../../../environments/environment.development';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {NotifCountResponseInterface} from '../../components/searchProfile/types/notifCountResponse.interface';
import {NotificationListResponseInterface} from '../types/notificationListResponse.interface';
import {NotificationMessagePart} from '../types/notifMessagePart.interface';
import {Store} from '@ngrx/store';
import {notificationCountActions} from '../../components/header/store/actions';
import {notificationActions} from '../../../containers/notificationList/store/actions';
import queryString from 'query-string';

@Injectable({providedIn: 'root'})
export class NotificationService {
  private socket: Socket;

  constructor(
    private http: HttpClient,
    private nzNotificationService: NzNotificationService,
    private store: Store
  ) {
    this.socket = io(environment.socketUrl);
  }

  registerUser(userId: string) {
    this.socket.emit('register', userId);
  }

  listenForNotifications() {
    const events = ['notification', 'notificationComment'];

    events.forEach((event) => {
      this.socket.on(event, (data: NotificationMessagePart[]) => {
        let messagePart = this.extractMsgParts(data, 'message') ?? '';
        let username = this.extractMsgParts(data, 'user') ?? '';

        const notifContent = `<b>${username}</b> ${messagePart}`;

        this.nzNotificationService.blank('', notifContent, {
          nzDuration: 10000,
        });

        this.store.dispatch(notificationCountActions.getNotificationCount());
        this.store.dispatch(
          notificationActions.getNotifications({limit: 5, offset: 0})
        );
      });
    });
  }

  getNotificationBadge(): Observable<NotifCountResponseInterface> {
    const fullUrl = environment.apiUrl + '/user-notifications-count';
    return this.http.get<NotifCountResponseInterface>(fullUrl);
  }

  getUserNotifications(
    limit?: number,
    offset?: number
  ): Observable<NotificationListResponseInterface> {
    const stringifiedParams = queryString.stringify({
      limit,
      offset,
    });

    const fullUrl = `${environment.apiUrl}/user-notifications?${stringifiedParams}`;
    return this.http.get<NotificationListResponseInterface>(fullUrl);
  }

  clearUserNotifications(): Observable<{data: any; message: string}> {
    const fullUrl = environment.apiUrl + '/clear-user-notifications';
    return this.http.post<{data: any; message: string}>(fullUrl, []);
  }

  extractMsgParts(
    parts: NotificationMessagePart[],
    type: string
  ): string | undefined {
    const msgPart = parts.find((p) => p.type === type);

    switch (type) {
      case 'user':
        if (msgPart && msgPart.type === 'user') {
          return msgPart.name;
        }
        break;

      case 'message':
        if (msgPart && msgPart.type === 'message') {
          return msgPart.value;
        }
        break;

      case 'content':
        if (msgPart && msgPart.type === 'content') {
          return msgPart.value;
        }
        break;

      case 'title':
        if (msgPart && msgPart.type === 'title') {
          return msgPart.value;
        }
        break;
    }

    return undefined;
  }
}
