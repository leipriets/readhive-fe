import {Component, ViewChild} from '@angular/core';
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
    NzButtonModule,
    NzDividerModule,
    NzAvatarModule,
    NzAffixModule,
    DrawerComponent,
    CreateArticleComponent,
    NewPostComponent
  ],
})
export class SidebarComponent {
  @ViewChild(DrawerComponent, {static: false}) drawerTemplate!: DrawerComponent;

  currentUser$ = this.store.select(selectCurrentUser);

  constructor(private store: Store) {}

}
