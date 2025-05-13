import { Component } from "@angular/core";
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    standalone: true,
    imports: []
})
export class NotificationComponent {

    constructor(private notification: NzNotificationService) {}

    createNotification(): void {
      this.notification.error(
        'Error',
        'I will never close automatically. This is a purposely very very long description that has many many characters and words.',
        { nzDuration: 0 }
      );
    }

}