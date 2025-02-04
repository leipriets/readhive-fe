import {Component} from '@angular/core';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzGridModule} from 'ng-zorro-antd/grid';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import {NzImageModule} from 'ng-zorro-antd/image';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-user-profile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./userProfile.component.css'],
  standalone: true,
  imports: [
    NzSpaceModule,
    NzImageModule,
    NzButtonModule,
    NzGridModule,
    NzPageHeaderModule,
    NzFlexModule,
    NzIconModule
  ],
})
export class UserProfileComponent {
  src = `https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`;
}
