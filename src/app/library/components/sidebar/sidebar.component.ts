import {Component, Input, ViewChild} from '@angular/core';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {DrawerComponent} from '../drawer/drawer.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {CommonModule} from '@angular/common';
import {Store} from '@ngrx/store';
import {selectCurrentUser} from '../../../containers/auth/store/reducers';
import { CreateArticleComponent } from '../../../containers/article/components/createArticle/createArticle.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { RouterLink } from '@angular/router';
import { NewPostComponent } from '../newPost/newPost.component';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-sider',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NzMenuModule,
    NzLayoutModule,
    NzIconModule,
    NzGridModule,
    NzButtonModule,
    NzDividerModule,
    NzAvatarModule,
    NzAffixModule,
    NewPostComponent
  ],
})
export class SidebarComponent {
  @Input() isCollapsed?: boolean;
  @ViewChild(DrawerComponent, {static: false}) drawerTemplate!: DrawerComponent;

  currentUser$ = this.store.select(selectCurrentUser);

  constructor(private store: Store) {}

}
