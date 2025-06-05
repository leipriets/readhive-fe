import {Component, OnInit, ViewChild} from '@angular/core';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {DrawerComponent} from '../../../library/components/drawer/drawer.component';
import {CreateArticleComponent} from './createArticle/createArticle.component';
import {combineLatest} from 'rxjs';
import {Store} from '@ngrx/store';
import {
  selectArticleData,
  selectError,
  selectIsLoading,
} from '../store/reducers';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { articleActions } from '../store/actions';
import { selectCurrentUser } from '../../auth/store/reducers';
import { CommonModule } from '@angular/common';
import { FeedTogglerComponent } from '../../../library/components/feedToggler/feedToggler.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
  standalone: true,
  imports: [
    CommonModule,
    NzGridModule,
    NzTabsModule,
    NzButtonModule,
    NzIconModule,
    DrawerComponent,
    CreateArticleComponent,
    FeedTogglerComponent
  ],
})
export class ArticleComponent implements OnInit {
  @ViewChild(DrawerComponent, {static: false}) drawerTemplate!: DrawerComponent;

  slug = this.route.snapshot.paramMap.get('slug') ?? '';
  currentUser$ = this.store.select(selectCurrentUser);

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    article: this.store.select(selectArticleData),
  });

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({slug: this.slug}));
  } 

  OpenCreateArticleForm() {
    this.drawerTemplate.openDrawer();
  }

}
