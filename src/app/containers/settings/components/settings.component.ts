import {Component, OnInit} from '@angular/core';

import {NzFormModule, NzFormTooltipIcon} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzIconModule} from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  standalone: true,
  imports: [
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzGridModule
  ],
})
export class SettingsComponent {}
