import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {HeaderComponent} from '../../library/components/header/header.component';
import {SidebarComponent} from '../../library/components/sidebar/sidebar.component';
import { NzAffixModule } from 'ng-zorro-antd/affix';

@Component({
  selector: 'app-inner-master-page',
  templateUrl: './inner-master-page.component.html',
  styleUrls: ['./inner-master-page.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzAffixModule,
    HeaderComponent,
    SidebarComponent
  ]
})
export class InnerMasterPageComponent {
  isCollapsed = false;

}
