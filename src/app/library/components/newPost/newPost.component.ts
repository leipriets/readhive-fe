import {CommonModule} from '@angular/common';
import {Component, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectCurrentUser} from '../../../containers/auth/store/reducers';
import {DrawerComponent} from '../drawer/drawer.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {CreateArticleComponent} from '../../../containers/article/components/createArticle/createArticle.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-new-post',
  templateUrl: './newPost.component.html',
  styleUrls: ['./newPost.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    DrawerComponent,
    CreateArticleComponent,
  ],
})
export class NewPostComponent {
  @ViewChild(DrawerComponent, {static: false}) drawerTemplate!: DrawerComponent;

  currentUser$ = this.store.select(selectCurrentUser);

  constructor(private store: Store) {}

  CreateArticleFormDrawer() {
    this.drawerTemplate.openDrawer();
  }
}
